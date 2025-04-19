import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPrices, setCurrentPrices] = useState({});

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get("http://localhost:5000/portfolio");
        setPortfolio(response.data || []);
        const currentPricesResponse = await axios.get("http://localhost:5000/current-prices");
        setCurrentPrices(currentPricesResponse.data || {});
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const labels = portfolio.map((item) => item.ticker);
  const amounts = portfolio.map((item) => item.amount);

  const profitLoss = portfolio.map((item) => {
    const currentPrice = currentPrices[item.ticker] || 0;
    const purchasePrice = item.price_at_investment || 0;
    return (currentPrice - purchasePrice) * item.amount;
  });

  const investmentData = {
    labels,
    datasets: [
      {
        label: "Investment Amount (₹)",
        data: amounts,
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  const profitLossData = {
    labels,
    datasets: [
      {
        label: "Profit/Loss (₹)",
        data: profitLoss,
        backgroundColor: profitLoss.map((val) =>
          val >= 0 ? "rgba(34, 197, 94, 0.7)" : "rgba(244, 63, 94, 0.7)"
        ),
      },
    ],
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
      <h2 className="text-2xl font-bold mb-6 text-[#34C759]">📈 Your Portfolio</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Investment Amount</h3>
        <div className="bg-[#1A1D23] p-4 rounded-lg shadow-inner">
          <Bar data={investmentData} />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Profit/Loss</h3>
        <div className="bg-[#1A1D23] p-4 rounded-lg shadow-inner">
          <Bar data={profitLossData} />
        </div>
      </div>

      <ul className="mt-6 space-y-4">
        {portfolio.map((item, index) => (
          <li
            key={index}
            className="bg-[#1A1D23] p-4 rounded-md border border-gray-700 text-white shadow-md"
          >
            <p className="text-lg font-medium text-[#34C759]">
              {item.ticker} - {item.amount} ₹
            </p>
            <p className="text-sm text-gray-300">Type: {item.asset_type}</p>
            <p className={`text-sm font-semibold ${profitLoss[index] >= 0 ? "text-green-400" : "text-red-400"}`}>
              Profit/Loss: ₹{profitLoss[index].toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
