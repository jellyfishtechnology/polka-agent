#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod agent_registry {
    use ink::prelude::string::String;

    #[ink(storage)]
    pub struct AgentRegistry {
        total_agents: u32,
        owner: AccountId,
    }

    #[ink(event)]
    pub struct AgentRegistered {
        #[ink(topic)]
        agent_id: u32,
    }

    impl AgentRegistry {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                total_agents: 0,
                owner: Self::env().caller(),
            }
        }

        #[ink(message)]
        pub fn register_agent(&mut self, name: String, price: Balance) -> u32 {
            let agent_id = self.total_agents;
            self.total_agents = self.total_agents.saturating_add(1);

            self.env().emit_event(AgentRegistered { agent_id });

            agent_id
        }

        #[ink(message)]
        pub fn get_total_agents(&self) -> u32 {
            self.total_agents
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
        fn it_works() {
            let mut contract = AgentRegistry::new();
            assert_eq!(contract.get_total_agents(), 0);
            
            let id = contract.register_agent(
                String::from("Test"),
                1000
            );
            
            assert_eq!(id, 0);
            assert_eq!(contract.get_total_agents(), 1);
        }
    }
}
