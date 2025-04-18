import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPrices, setCurrentPrices] = useState({}); // Store current prices

  useEffect(() => {
    // Fetch portfolio data from backend
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get('http://localhost:5000/portfolio');
        setPortfolio(response.data || []); // If response is empty, set an empty array
        setLoading(false);

        // Fetch current prices of assets (simulate this)
        const currentPricesResponse = await axios.get('http://localhost:5000/current-prices');
        setCurrentPrices(currentPricesResponse.data || {});
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const labels = portfolio.map((item) => item.ticker);
  const amounts = portfolio.map((item) => item.amount);

  // Calculate Profit/Loss for each asset
  const profitLoss = portfolio.map((item) => {
    const currentPrice = currentPrices[item.ticker] || 0;
    const purchasePrice = item.price_at_investment || 0;
    const profitLossAmount = (currentPrice - purchasePrice) * item.amount;
    return profitLossAmount;
  });

  // Data for the charts
  const investmentData = {
    labels,
    datasets: [
      {
        label: 'Investment Amount (₹)',
        data: amounts,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
    ],
  };

  const profitLossData = {
    labels,
    datasets: [
      {
        label: 'Profit/Loss (₹)',
        data: profitLoss,
        backgroundColor: profitLoss.map(amount => amount >= 0 ? 'rgba(34, 197, 94, 0.7)' : 'rgba(244, 63, 94, 0.7)'),
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📈 Your Portfolio</h2>

      {/* Investment Amount Graph */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Investment Amount</h3>
        <Bar data={investmentData} />
      </div>

      {/* Profit/Loss Graph */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Profit/Loss</h3>
        <Bar data={profitLossData} />
      </div>

      {/* Portfolio List */}
      <ul className="mt-4 space-y-2">
        {portfolio.map((item, index) => (
          <li key={index} className="border p-2 rounded">
            {item.ticker} - {item.amount} ₹ (Type: {item.asset_type}) <br />
            {`Profit/Loss: ₹${profitLoss[index].toFixed(2)}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
