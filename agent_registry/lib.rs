#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod agent_registry {
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;

    #[derive(scale::Encode, scale::Decode, Clone, PartialEq, Eq)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Agent {
        pub id: u32,
        pub owner: AccountId,
        pub name: String,
        pub description: String,
        pub price_per_day: Balance,
        pub active: bool,
        pub total_rentals: u32,
    }

    #[ink(storage)]
    pub struct AgentRegistry {
        agents: Vec<Agent>,
        owner: AccountId,
        platform_fee_percent: u8,
    }

    #[ink(event)]
    pub struct AgentRegistered {
        #[ink(topic)]
        agent_id: u32,
        #[ink(topic)]
        owner: AccountId,
        name: String,
    }

    #[ink(event)]
    pub struct AgentRented {
        #[ink(topic)]
        agent_id: u32,
        #[ink(topic)]
        renter: AccountId,
        amount_paid: Balance,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        AgentNotFound,
        AgentNotActive,
        InsufficientPayment,
        Unauthorized,
    }

    impl AgentRegistry {
        #[ink(constructor)]
        pub fn new(platform_fee_percent: u8) -> Self {
            Self {
                agents: Vec::new(),
                owner: Self::env().caller(),
                platform_fee_percent,
            }
        }

        #[ink(message)]
        pub fn register_agent(
            &mut self,
            name: String,
            description: String,
            price_per_day: Balance,
        ) -> u32 {
            let agent_id = self.agents.len() as u32;
            let caller = self.env().caller();

            let agent = Agent {
                id: agent_id,
                owner: caller,
                name: name.clone(),
                description,
                price_per_day,
                active: true,
                total_rentals: 0,
            };

            self.agents.push(agent);

            self.env().emit_event(AgentRegistered {
                agent_id,
                owner: caller,
                name,
            });

            agent_id
        }

        #[ink(message, payable)]
        pub fn rent_agent(
            &mut self,
            agent_id: u32,
            duration_days: u32,
        ) -> Result<(), Error> {
            let payment = self.env().transferred_value();
            let caller = self.env().caller();
            
            let agent = self.agents
                .get_mut(agent_id as usize)
                .ok_or(Error::AgentNotFound)?;

            if !agent.active {
                return Err(Error::AgentNotActive);
            }

            let total_cost = agent.price_per_day
                .saturating_mul(duration_days as u128);

            if payment < total_cost {
                return Err(Error::InsufficientPayment);
            }

            let fee = total_cost
                .saturating_mul(self.platform_fee_percent as u128)
                .saturating_div(100);
            
            let creator_payment = total_cost.saturating_sub(fee);

            if self.env().transfer(agent.owner, creator_payment).is_err() {
                return Err(Error::InsufficientPayment);
            }

            agent.total_rentals = agent.total_rentals.saturating_add(1);

            self.env().emit_event(AgentRented {
                agent_id,
                renter: caller,
                amount_paid: total_cost,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn get_agent(&self, agent_id: u32) -> Option<Agent> {
            self.agents.get(agent_id as usize).cloned()
        }

        #[ink(message)]
        pub fn get_all_agents(&self) -> Vec<Agent> {
            self.agents.clone()
        }

        #[ink(message)]
        pub fn get_total_agents(&self) -> u32 {
            self.agents.len() as u32
        }

        #[ink(message)]
        pub fn deactivate_agent(&mut self, agent_id: u32) -> Result<(), Error> {
            let caller = self.env().caller();
            let agent = self.agents
                .get_mut(agent_id as usize)
                .ok_or(Error::AgentNotFound)?;

            if agent.owner != caller {
                return Err(Error::Unauthorized);
            }

            agent.active = false;
            Ok(())
        }

        #[ink(message)]
        pub fn get_owner(&self) -> AccountId {
            self.owner
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn new_works() {
            let contract = AgentRegistry::new(5);
            assert_eq!(contract.get_total_agents(), 0);
        }

        #[ink::test]
        fn register_agent_works() {
            let mut contract = AgentRegistry::new(5);
            let id = contract.register_agent(
                String::from("YieldOptimizer"),
                String::from("Optimizes yield across parachains"),
                1_000_000_000_000,
            );
            assert_eq!(id, 0);
            assert_eq!(contract.get_total_agents(), 1);
            
            let agent = contract.get_agent(0).unwrap();
            assert_eq!(agent.name, "YieldOptimizer");
            assert_eq!(agent.price_per_day, 1_000_000_000_000);
            assert!(agent.active);
        }

        #[ink::test]
        fn deactivate_agent_works() {
            let mut contract = AgentRegistry::new(5);
            let id = contract.register_agent(
                String::from("Test"),
                String::from("Test agent"),
                1000,
            );
            
            assert!(contract.deactivate_agent(id).is_ok());
            let agent = contract.get_agent(id).unwrap();
            assert!(!agent.active);
        }
    }
}
