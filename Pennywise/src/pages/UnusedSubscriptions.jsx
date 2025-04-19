import React, { useEffect, useState } from "react";

const dummyData = [
  {
    name: "Netflix",
    amount: 499,
    lastUsed: "2024-12-12",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "Spotify",
    amount: 119,
    lastUsed: "2024-11-01",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  },
  {
    name: "Amazon Prime",
    amount: 179,
    lastUsed: "2024-10-05",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
  },
  {
    name: "Hotstar",
    amount: 299,
    lastUsed: "2024-09-25",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/11/Disney%2B_Hotstar_logo.svg",
  },
];

const UnusedSubscriptions = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10 rounded-xl bg-[#000000] text-white border border-[#355E3B] border-[1px] shadow-[0_0_80px_10px_rgba(52,199,89,0.25)] animate-pulse">
        <div className="h-6 bg-gray-600/30 rounded w-1/3 mb-6"></div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between items-center mb-4 gap-4">
            <div className="flex items-center gap-4 flex-grow">
              <div className="h-10 w-10 rounded-full bg-gray-600/30"></div>
              <div className="flex flex-col flex-grow">
                <div className="h-4 bg-gray-600/30 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-600/30 rounded w-1/3"></div>
              </div>
            </div>
            <div className="h-6 w-20 bg-gray-600/30 rounded-md"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 rounded-xl bg-[#000000] text-white border border-[#355E3B] border-[1px] shadow-[0_0_80px_10px_rgba(52,199,89,0.25)]">
      <h2 className="text-2xl font-bold mb-4 text-[#34C759]">📺 Unused Subscriptions</h2>
      <p className="mb-6 text-gray-400">
        These subscriptions haven't been used in a while. Consider reviewing or canceling them.
      </p>
      <div className="space-y-4">
        {dummyData.map((sub, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-[#1A1D23] rounded-lg border border-[#2A2D33] hover:shadow-[0_0_40px_2px_rgba(52,199,89,0.15)] transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={sub.logo}
                alt={sub.name}
                className="w-10 h-10 object-contain rounded bg-white p-1"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">{sub.name}</h3>
                <p className="text-sm text-gray-400">Last used: {sub.lastUsed}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-md font-medium text-red-500">₹{sub.amount}/mo</p>
              <button className="text-sm text-blue-400 hover:underline">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnusedSubscriptions;
