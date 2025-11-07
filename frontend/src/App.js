import React, { useState } from 'react';
import './App.css';
import AgentList from './components/AgentList';
import WalletConnect from './components/WalletConnect';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('0');

  // Mock agents data (in production, fetch from smart contract)
  const agents = [
    {
      id: 1,
      name: '🎯 Yield Optimizer',
      description: 'Analyzes APY across parachains and optimizes your fund allocation automatically',
      price: 2,
      icon: '🎯',
      active: true,
      rentals: 156,
      rating: 4.8,
      creator: '5GrwvaEF...',
      features: ['Multi-chain analysis', 'Auto-rebalancing', 'Risk scoring']
    },
    {
      id: 2,
      name: '📈 Trading Bot',
      description: 'Executes automated trading strategies based on technical indicators and market sentiment',
      price: 3,
      icon: '📈',
      active: true,
      rentals: 89,
      rating: 4.6,
      creator: '5FHneW46...',
      features: ['24/7 trading', 'Stop-loss protection', 'Multiple strategies']
    },
    {
      id: 3,
      name: '🗳️ Governance Assistant',
      description: 'Monitors governance proposals and votes based on your preferences and best practices',
      price: 1,
      icon: '🗳️',
      active: true,
      rentals: 234,
      rating: 4.9,
      creator: '5DAAnrj4...',
      features: ['Proposal analysis', 'Auto-voting', 'Delegation management']
    }
  ];

  const handleAccountChange = (newAccount) => {
    setAccount(newAccount);
  };

  const handleBalanceChange = (newBalance) => {
    setBalance(newBalance);
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">🤖</span>
              <div>
                <h1 className="text-2xl font-bold text-white">PolkaAgent</h1>
                <p className="text-purple-200 text-sm">AI Agent Marketplace on Polkadot</p>
              </div>
            </div>
            
            <WalletConnect 
              onAccountChange={handleAccountChange}
              onBalanceChange={handleBalanceChange}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Rent AI Agents for Your DeFi Strategies
          </h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Browse, rent, and deploy autonomous AI agents that work 24/7 across the Polkadot ecosystem
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-white">{agents.length}</div>
              <div className="text-purple-200">Active Agents</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-white">
                {agents.reduce((sum, agent) => sum + agent.rentals, 0)}
              </div>
              <div className="text-purple-200">Total Rentals</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-white">4.8★</div>
              <div className="text-purple-200">Avg Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent List */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <AgentList agents={agents} account={account} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-purple-200">
          <p className="mb-2">Built with ❤️ for Polkadot Hackathon 2025</p>
          <p className="text-sm">
            <a 
              href="https://github.com/jellyfishtechnology/polka-agent" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              View on GitHub →
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
