import React, { useState } from 'react';
import RentModal from './RentModal';

function AgentCard({ agent, account }) {
  const [showModal, setShowModal] = useState(false);

  const handleRentClick = () => {
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      <div className="agent-card bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all">
        {/* Agent Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl">{agent.icon}</div>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span className="text-white font-semibold">{agent.rating}</span>
          </div>
        </div>

        {/* Agent Info */}
        <h3 className="text-xl font-bold text-white mb-2">{agent.name}</h3>
        <p className="text-purple-200 text-sm mb-4 h-12">{agent.description}</p>

        {/* Features */}
        <div className="mb-4 space-y-2">
          {agent.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-purple-200">
              <span className="text-green-400 mr-2">✓</span>
              {feature}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="text-purple-200">
            <span className="font-semibold text-white">{agent.rentals}</span> rentals
          </div>
          <div className="text-purple-200">
            by <span className="text-white">{agent.creator}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <div className="text-2xl font-bold text-white">{agent.price} DOT</div>
            <div className="text-xs text-purple-200">per day</div>
          </div>
          
          <button
            onClick={handleRentClick}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Rent Now
          </button>
        </div>

        {/* Status Badge */}
        {agent.active && (
          <div className="mt-4 flex items-center justify-center">
            <span className="bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full border border-green-500/30">
              ● Active
            </span>
          </div>
        )}
      </div>

      {/* Rent Modal */}
      {showModal && (
        <RentModal
          agent={agent}
          account={account}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default AgentCard;
