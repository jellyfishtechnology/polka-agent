import React, { useState } from 'react';

function RentModal({ agent, account, onClose }) {
  const [duration, setDuration] = useState(7);
  const [isRenting, setIsRenting] = useState(false);
  const [success, setSuccess] = useState(false);

  const totalCost = agent.price * duration;

  const handleRent = async () => {
    setIsRenting(true);

    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, call smart contract here:
      // await contract.tx.rentAgent(agent.id, duration).signAndSend(account);
      
      setSuccess(true);
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Rental error:', error);
      alert('Transaction failed. Please try again.');
    } finally {
      setIsRenting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 modal-overlay" onClick={onClose}>
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl text-center" onClick={e => e.stopPropagation()}>
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Rental Successful!</h3>
          <p className="text-gray-600 mb-4">
            You've successfully rented <strong>{agent.name}</strong> for {duration} days.
          </p>
          <p className="text-sm text-gray-500">
            The agent will start working for you immediately.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 modal-overlay" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Rent Agent</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Agent Info */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{agent.icon}</span>
            <div>
              <h4 className="font-bold text-gray-800">{agent.name}</h4>
              <p className="text-sm text-gray-600">{agent.price} DOT per day</p>
            </div>
          </div>
        </div>

        {/* Duration Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Rental Duration
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 3, 7, 30].map(days => (
              <button
                key={days}
                onClick={() => setDuration(days)}
                className={`py-2 rounded-lg font-semibold transition-all ${
                  duration === days
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {days}d
              </button>
            ))}
          </div>
          
          <div className="mt-3">
            <input
              type="range"
              min="1"
              max="30"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 day</span>
              <span>{duration} days</span>
              <span>30 days</span>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price per day</span>
            <span className="font-semibold text-gray-800">{agent.price} DOT</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Duration</span>
            <span className="font-semibold text-gray-800">{duration} days</span>
          </div>
          <div className="border-t border-gray-300 pt-2 flex justify-between">
            <span className="font-bold text-gray-800">Total Cost</span>
            <span className="font-bold text-purple-600 text-lg">{totalCost} DOT</span>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <div className="text-xs text-blue-600 mb-1">Connected Account</div>
          <div className="text-sm font-mono text-blue-800">
            {account?.address?.slice(0, 16)}...{account?.address?.slice(-8)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
            disabled={isRenting}
          >
            Cancel
          </button>
          <button
            onClick={handleRent}
            disabled={isRenting}
            className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRenting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Rent for ${totalCost} DOT`
            )}
          </button>
        </div>

        {/* Info Note */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Transaction will be processed via ink! smart contract on Polkadot
        </p>
      </div>
    </div>
  );
}

export default RentModal;
