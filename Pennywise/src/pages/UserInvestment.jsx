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
  const [assetDetails, setAssetDetails] = useState(null);  // Added state to hold asset details

  // Function to fetch asset details (price, etc.) from the backend
  const fetchAssetDetails = async (ticker, type) => {
    try {
      const res = await axios.post('http://localhost:5000/recommendation', {
        ticker: ticker,
        type: type,
      });

      if (res.data.success) {
        setAssetDetails(res.data.assetDetails);  // Store asset details in state
      } else {
        setAssetDetails(null);
        setMessage('Could not fetch asset details.');
      }
    } catch (err) {
      console.error('Error fetching asset details:', err);
      setMessage('Error fetching asset details.');
    }
  };

  const handleInvest = async () => {
    try {
      const res = await axios.post('http://localhost:5000/invest', {
        user_id: 'user123', // Static user for now
        asset_type: selected.type,
        ticker: selected.ticker,
        amount: amount,
      });

      setMessage(res.data.message + ` at price ₹${res.data.price_at_investment}`);
      onInvest && onInvest(selected, amount); // Optional portfolio update
    } catch (err) {
      console.error('Investment failed', err);
      setMessage('Something went wrong. Please try again.');
    }
  };

  // Effect to fetch asset details when a company is selected
  useEffect(() => {
    if (selected) {
      fetchAssetDetails(selected.ticker, selected.type);
    }
  }, [selected]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 User Investment</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {companies.map((c) => (
          <div
            key={c.ticker}
            className={`p-4 border rounded cursor-pointer hover:shadow ${selected?.ticker === c.ticker ? 'bg-blue-100' : ''}`}
            onClick={() => setSelected(c)}
          >
            <h3 className="font-semibold">{c.name}</h3>
            <p className="text-sm text-gray-500">{c.type.toUpperCase()}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-6 border p-4 rounded bg-gray-100">
          <h3 className="text-lg font-bold mb-2">{selected.name} ({selected.ticker})</h3>
          <p className="mb-2">Type: {selected.type.toUpperCase()}</p>

          {/* Display asset details if available */}
          {assetDetails ? (
            <div className="mb-4">
              <p><strong>Current Price:</strong> ₹{assetDetails.currentPrice}</p>
              <p><strong>Market Cap:</strong> ₹{assetDetails.marketCap}</p>
              <p><strong>24h Change:</strong> {assetDetails.priceChange24h}%</p>
            </div>
          ) : (
            <p>Loading asset details...</p>
          )}

          <input
            type="number"
            className="border p-2 mr-2"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2"
            onClick={handleInvest}
          >
            Invest
          </button>

          {message && (
            <p className="mt-3 text-green-600 font-medium">{message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInvestment;
