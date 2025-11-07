import React, { useState } from 'react';

function WalletConnect({ onAccountChange, onBalanceChange }) {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('0');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Check if Polkadot.js extension is installed
      const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp');
      
      // Enable extension
      const extensions = await web3Enable('PolkaAgent');
      
      if (extensions.length === 0) {
        throw new Error('Please install Polkadot.js extension');
      }

      // Get accounts
      const accounts = await web3Accounts();
      
      if (accounts.length === 0) {
        throw new Error('No accounts found in extension');
      }

      // Use first account
      const selectedAccount = accounts[0];
      setAccount(selectedAccount);
      onAccountChange(selectedAccount);

      // Mock balance (in production, query from blockchain)
      const mockBalance = '12.5 DOT';
      setBalance(mockBalance);
      onBalanceChange(mockBalance);

    } catch (err) {
      console.error('Wallet connection error:', err);
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance('0');
    onAccountChange(null);
    onBalanceChange('0');
  };

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (account) {
    return (
      <div className="flex items-center space-x-4">
        <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
          <div className="text-xs text-purple-200">Balance</div>
          <div className="text-sm font-semibold text-white">{balance}</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
          <div className="text-xs text-purple-200">Connected</div>
          <div className="text-sm font-semibold text-white flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 pulse"></span>
            {truncateAddress(account.address)}
          </div>
        </div>
        
        <button
          onClick={disconnectWallet}
          className="bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-2 rounded-lg transition-colors border border-red-500/30"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-lg transition-all border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isConnecting ? (
          <span className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </span>
        ) : (
          'Connect Wallet'
        )}
      </button>
    </div>
  );
}

export default WalletConnect;
