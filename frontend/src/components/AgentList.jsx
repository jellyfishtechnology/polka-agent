import React from 'react';
import AgentCard from './AgentCard';

function AgentList({ agents, account }) {
  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-2">Available AI Agents</h3>
        <p className="text-purple-200">Select an agent and start optimizing your DeFi strategies</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map(agent => (
          <AgentCard 
            key={agent.id} 
            agent={agent} 
            account={account}
          />
        ))}
      </div>
      
      {agents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-purple-200 text-lg">No agents available at the moment</p>
        </div>
      )}
    </div>
  );
}

export default AgentList;
