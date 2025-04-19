import React, { useState, useEffect } from 'react';
import axios from 'axios';

const companies = [
  { name: 'Apple', ticker: 'AAPL', type: 'stock' },
  { name: 'Tesla', ticker: 'TSLA', type: 'stock' },
  { name: 'Google', ticker: 'GOOGL', type: 'stock' },
  { name: 'Amazon', ticker: 'AMZN', type: 'stock' },
  { name: 'Microsoft', ticker: 'MSFT', type: 'stock' },
  { name: 'Bitcoin', ticker: 'bitcoin', type: 'crypto' },
  { name: 'Ethereum', ticker: 'ethereum', type: 'crypto' },
  { name: 'Ripple', ticker: 'ripple', type: 'crypto' },
  { name: 'Dogecoin', ticker: 'dogecoin', type: 'crypto' },
  { name: 'Solana', ticker: 'solana', type: 'crypto' },
  { name: 'Meta', ticker: 'META', type: 'stock' },
  { name: 'Netflix', ticker: 'NFLX', type: 'stock' },
  { name: 'Nvidia', ticker: 'NVDA', type: 'stock' },
  { name: 'Cardano', ticker: 'cardano', type: 'crypto' },
  { name: 'Polkadot', ticker: 'polkadot', type: 'crypto' },
  { name: 'Litecoin', ticker: 'litecoin', type: 'crypto' },
  { name: 'Intel', ticker: 'INTC', type: 'stock' },
  { name: 'Adobe', ticker: 'ADBE', type: 'stock' },
  { name: 'Chainlink', ticker: 'chainlink', type: 'crypto' },
  { name: 'Uniswap', ticker: 'uniswap', type: 'crypto' },
];

const UserInvestment = ({ onInvest }) => {
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [assetDetails, setAssetDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAssetDetails = async (ticker, type) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/recommendation', { ticker, type });
      if (res.data.success) {
        setAssetDetails(res.data.assetDetails);
      } else {
        setAssetDetails(null);
        setMessage('Could not fetch asset details.');
      }
    } catch (err) {
      console.error('Error fetching asset details:', err);
      setMessage('Error fetching asset details.');
    } finally {
      setLoading(false);
    }
  };

  const handleInvest = async () => {
    try {
      const res = await axios.post('http://localhost:5000/invest', {
        user_id: 'user123',
        asset_type: selected.type,
        ticker: selected.ticker,
        amount,
      });

      setMessage(res.data.message + ` at price ₹${res.data.price_at_investment}`);
      onInvest && onInvest(selected, amount);
    } catch (err) {
      console.error('Investment failed', err);
      setMessage('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    if (selected) {
      fetchAssetDetails(selected.ticker, selected.type);
    }
  }, [selected]);

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 rounded-xl bg-[#000000] text-white border border-[#355E3B] shadow-[0_0_80px_10px_rgba(52,199,89,0.25)]">
      <h2 className="text-2xl font-bold mb-6 text-[#34C759]">📊 Invest in Assets</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {companies.map((c) => (
          <div
            key={c.ticker}
            onClick={() => setSelected(c)}
            className={`p-4 border rounded-md text-center cursor-pointer transition hover:shadow-md ${
              selected?.ticker === c.ticker
                ? 'bg-[#1A1D23] border-[#34C759]'
                : 'bg-[#0B0C0F] border-gray-700'
            }`}
          >
            <h3 className="font-semibold text-white">{c.name}</h3>
            <p className="text-sm text-gray-400">{c.type.toUpperCase()}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-8 p-5 rounded-lg bg-[#0B0C0F] border border-[#355E3B] shadow-inner">
          <h3 className="text-lg font-bold text-[#34C759] mb-2">
            {selected.name} ({selected.ticker})
          </h3>
          <p className="mb-2 text-gray-400">Type: {selected.type.toUpperCase()}</p>

          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-gray-600/30 rounded w-1/3"></div>
              <div className="h-4 bg-gray-600/30 rounded w-1/2"></div>
              <div className="h-4 bg-gray-600/30 rounded w-1/4"></div>
            </div>
          ) : assetDetails ? (
            <div className="text-gray-300 mb-4">
              <p>
                <strong>Current Price:</strong> ₹{assetDetails.currentPrice}
              </p>
              <p>
                <strong>Market Cap:</strong> ₹{assetDetails.marketCap}
              </p>
              <p>
                <strong>24h Change:</strong> {assetDetails.priceChange24h}%
              </p>
            </div>
          ) : (
            <p className="text-red-400">No data available</p>
          )}

          <div className="flex items-center gap-3">
            <input
              type="number"
              className="px-3 py-2 w-40 border border-gray-600 rounded-md bg-[#1A1D23] text-white focus:outline-none focus:ring-2 focus:ring-[#34C759]"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button
              className="px-4 py-2 text-sm bg-[#34C759] text-white rounded-md hover:bg-green-700 transition"
              onClick={handleInvest}
            >
              Invest
            </button>
          </div>

          {message && <p className="mt-4 text-green-400 font-medium">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default UserInvestment;
