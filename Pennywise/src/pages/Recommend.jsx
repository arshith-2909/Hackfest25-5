import React, { useState } from 'react';
import UserInvestment from './UserInvestment';
import AutoInvestment from './AutoInvestment';
import Portfolio from './Portfolio';

const Recommend = () => {
  const [activeTab, setActiveTab] = useState('portfolio'); // Default to portfolio view
  const [portfolio, setPortfolio] = useState([]);

  const handleInvest = (asset, amount) => {
    if (!amount || amount <= 0) return;
    setPortfolio((prev) => [...prev, { ...asset, amount }]);
  };

  const handleAutoInvest = (amount) => {
    const allAssets = [
      'AAPL', 'TSLA', 'GOOGL', 'AMZN', 'MSFT',
      'bitcoin', 'ethereum', 'ripple', 'dogecoin', 'solana',
    ];
    const selected = Array.from({ length: 3 }, () => {
      const randomTicker = allAssets[Math.floor(Math.random() * allAssets.length)];
      const type = randomTicker.match(/^[a-z]+$/) ? 'crypto' : 'stock';
      return { ticker: randomTicker, type, amount: Math.floor(amount / 3) };
    });
    setPortfolio((prev) => [...prev, ...selected]);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab('user')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          User Investment
        </button>
        <button
          onClick={() => setActiveTab('auto')}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Auto Investment
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Portfolio
        </button>
      </div>

      {activeTab === 'user' && <UserInvestment onInvest={handleInvest} />}
      {activeTab === 'auto' && <AutoInvestment onAutoInvest={handleAutoInvest} />}
      {activeTab === 'portfolio' && <Portfolio portfolio={portfolio} />}
    </div>
  );
};

export default Recommend;
