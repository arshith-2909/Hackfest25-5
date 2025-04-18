import React, { useState } from 'react';
import axios from 'axios';

const AutoInvestment = ({ onAutoInvest }) => {
  const [amount, setAmount] = useState(100);
  const [results, setResults] = useState(null);

  const handleAutoInvest = async () => {
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
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl mt-4">
      <h2 className="text-2xl font-bold mb-4">⚙️ Auto Investment</h2>
      <div className="flex items-center gap-3 mb-4">
        <input
          type="number"
          className="border p-2 w-40"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
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
              <li key={ticker} className="bg-gray-100 p-3 rounded shadow-sm">
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
