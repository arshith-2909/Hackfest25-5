import React from "react";

const Dashboard = () => {
  const features = [
    {
      title: "🚀 Booking",
      description: "Book gas, bus, flight, or biking services quickly and securely.",
      buttonText: "Go to Booking",
      route: "/booking",
      bg: "bg-blue-100",
    },
    {
      title: "💡 Bill Payment",
      description: "Pay electricity, water, mobile and internet bills with spare change option.",
      buttonText: "Pay Bills",
      route: "/bill-payment",
      bg: "bg-yellow-100",
    },
    {
      title: "📲 Recharge",
      description: "Recharge your mobile, DTH, and other prepaid services instantly.",
      buttonText: "Recharge Now",
      route: "/recharge",
      bg: "bg-green-100",
    },
    {
      title: "🌐 Social",
      description: "Connect, share, and stay updated with your friends and groups.",
      buttonText: "Open Social",
      route: "/social",
      bg: "bg-pink-100",
    },
    {
      title: "📈 Invest",
      description: "Explore smart investment options to grow your savings over time.",
      buttonText: "Start Investing",
      route: "/invest",
      bg: "bg-purple-100",
    },
    {
      title: "🤖 Recommendations",
      description: "Get personalized suggestions based on your usage and goals.",
      buttonText: "View Suggestions",
      route: "/recommend",
      bg: "bg-gray-100",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">🚀 Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 ${feature.bg}`}
          >
            <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-700 mb-4">{feature.description}</p>
            <a
              href={feature.route}
              className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              {feature.buttonText}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
