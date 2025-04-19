import React, { useState } from 'react';
import axios from 'axios';

const AutoInvestment = ({ onAutoInvest }) => {
  const [amount, setAmount] = useState(100);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAutoInvest = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/auto-investment', {
        amount: amount,
      });

      const investments = response.data; // Object of {ticker: {price, message}}
      setResults(investments);

      const formattedInvestments = Object.entries(investments).map(([ticker, data]) => ({
        ticker: ticker,
        type: /^[a-z]+$/.test(ticker) ? 'crypto' : 'stock',
        amount: Math.floor(amount / 3),
        price: data.price,
      }));

      onAutoInvest(formattedInvestments); // Optional: Update portfolio if parent wants
    } catch (err) {
      console.error('Auto investment error:', err);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-10 rounded-xl bg-[#000000] text-white border border-[#355E3B] border-[1px] shadow-[0_0_80px_10px_rgba(52,199,89,0.25)] animate-pulse">
        <div className="h-6 bg-gray-600/30 rounded w-1/3 mb-6"></div>

        {[...Array(2)].map((_, i) => (
          <div key={i} className="mb-4">
            <div className="h-4 bg-gray-500/30 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-500/30 rounded w-2/3"></div>
          </div>
        ))}

        <hr className="border-gray-700 my-6" />

        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between items-center mb-4 gap-4">
            <div className="flex flex-col flex-grow">
              <div className="h-4 bg-gray-500/30 rounded w-1/3 mb-2"></div>
              <div className="h-6 bg-gray-500/30 rounded w-2/3"></div>
            </div>
            <div className="h-8 w-16 bg-gray-500/30 rounded-md"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 rounded-xl bg-[#000000] text-white border border-[#355E3B] border-[1px] shadow-[0_0_80px_10px_rgba(52,199,89,0.25)]">
      <h2 className="text-2xl font-bold mb-6 text-[#34C759]">⚙️ Auto Investment</h2>
      <div className="flex items-center gap-3 mb-4">
        <input
          type="number"
          className="border p-2 w-40 bg-[#1A1D23] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#34C759]"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          className="bg-[#34C759] text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          onClick={handleAutoInvest}
        >
          Auto Invest
        </button>
      </div>

      {results && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">✅ Auto-Invested In:</h3>
          <ul className="space-y-2">
            {Object.entries(results).map(([ticker, data]) => (
              <li key={ticker} className="bg-gray-800 p-3 rounded shadow-sm">
                <strong>{ticker}</strong>: ₹{data.price} — {data.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutoInvestment;
