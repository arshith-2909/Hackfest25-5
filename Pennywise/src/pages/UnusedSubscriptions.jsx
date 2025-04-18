import React from 'react';

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
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Unused Subscriptions</h2>
      <p className="mb-4 text-gray-600">These subscriptions haven't been used in a while. Consider reviewing or canceling them.</p>
      <div className="space-y-4">
        {dummyData.map((sub, idx) => (
          <div key={idx} className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <img src={sub.logo} alt={sub.name} className="w-10 h-10 object-contain" />
              <div>
                <h3 className="text-lg font-semibold">{sub.name}</h3>
                <p className="text-sm text-gray-500">Last used: {sub.lastUsed}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-md font-medium text-red-600">₹{sub.amount}/mo</p>
              <button className="text-sm text-blue-500 hover:underline">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnusedSubscriptions;
