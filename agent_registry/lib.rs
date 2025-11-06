#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod agent_registry {
    use ink::prelude::string::String;
    use ink::storage::Mapping;

    #[ink(storage)]
    pub struct AgentRegistry {
        total_agents: u32,
        agent_names: Mapping<u32, String>,
        agent_prices: Mapping<u32, Balance>,
        agent_owners: Mapping<u32, AccountId>,
        agent_active: Mapping<u32, bool>,
        owner: AccountId,
        platform_fee_percent: u8,
    }

    #[ink(event)]
    pub struct AgentRegistered {
        #[ink(topic)]
        agent_id: u32,
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
                total_agents: 0,
                agent_names: Mapping::default(),
                agent_prices: Mapping::default(),
                agent_owners: Mapping::default(),
                agent_active: Mapping::default(),
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
            let agent_id = self.total_agents;
            let caller = self.env().caller();

            self.agent_names.insert(agent_id, &name);
            self.agent_prices.insert(agent_id, &price_per_day);
            self.agent_owners.insert(agent_id, &caller);
            self.agent_active.insert(agent_id, &true);
            
            self.total_agents = self.total_agents.saturating_add(1);

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
            
            let owner = self.agent_owners.get(agent_id).ok_or(Error::AgentNotFound)?;
            let active = self.agent_active.get(agent_id).ok_or(Error::AgentNotFound)?;
            let price_per_day = self.agent_prices.get(agent_id).ok_or(Error::AgentNotFound)?;

            if !active {
                return Err(Error::AgentNotActive);
            }

            let total_cost = price_per_day.saturating_mul(duration_days as u128);

            if payment < total_cost {
                return Err(Error::InsufficientPayment);
            }

            let fee = total_cost
                .saturating_mul(self.platform_fee_percent as u128)
                .saturating_div(100);
            
            let creator_payment = total_cost.saturating_sub(fee);

            if self.env().transfer(owner, creator_payment).is_err() {
                return Err(Error::InsufficientPayment);
            }

            self.env().emit_event(AgentRented {
                agent_id,
                renter: caller,
                amount_paid: total_cost,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn get_agent_name(&self, agent_id: u32) -> Option<String> {
            self.agent_names.get(agent_id)
        }

        #[ink(message)]
        pub fn get_agent_price(&self, agent_id: u32) -> Option<Balance> {
            self.agent_prices.get(agent_id)
        }

        #[ink(message)]
        pub fn get_total_agents(&self) -> u32 {
            self.total_agents
        }

        #[ink(message)]
        pub fn deactivate_agent(&mut self, agent_id: u32) -> Result<(), Error> {
            let caller = self.env().caller();
            let owner = self.agent_owners.get(agent_id).ok_or(Error::AgentNotFound)?;

            if owner != caller {
                return Err(Error::Unauthorized);
            }

            self.agent_active.insert(agent_id, &false);
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
            
            let name = contract.get_agent_name(0);
            assert_eq!(name, Some(String::from("YieldOptimizer")));
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
        }
    }
}
