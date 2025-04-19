import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "📆 Booking",
    description: "Easily book appointments, travel, or events with just a click.",
    buttonText: "Book Now",
    bgColor: "bg-blue-100",
    route: "/booking",
  },
  {
    title: "💳 Bill Payment",
    description: "Pay electricity, water, gas, and broadband bills securely.",
    buttonText: "Pay Bills",
    bgColor: "bg-yellow-100",
    route: "/bill-payment",
  },
  {
    title: "🔌 Recharge",
    description: "Recharge your mobile, DTH, and FASTag instantly and safely.",
    buttonText: "Recharge",
    bgColor: "bg-green-100",
    route: "/recharge",
  },
  {
    title: "💬 Social",
    description: "Engage with the GoPushti community and share updates.",
    buttonText: "Join Now",
    bgColor: "bg-pink-100",
    route: "/social-invest",
  },
  {
    title: "📊 Invest",
    description: "Grow your savings with smart, guided investment options.",
    buttonText: "Start Investing",
    bgColor: "bg-purple-100",
    route: "/recommend",
  },
  {
    title: "🤖 Recommend",
    description: "Get intelligent suggestions tailored just for you.",
    buttonText: "Explore",
    bgColor: "bg-gray-200",
    route: "/chatbot",
  },
  {
    title: "Purchase and Set Target",
    description: "Set your savings goals and start purchasing smartly.",
    buttonText: "Explore",
    bgColor: "bg-white",
    route: "/product",
  },
];

const DashboardSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16 px-6" id="dashboard">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">⚙️ Dashboard</h2>
        <p className="text-lg text-gray-600 mb-10">
          Access all essential services in one place. Simple, fast, and reliable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 ${feature.bgColor}`}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 mb-4">{feature.description}</p>
              <button
                onClick={() => navigate(feature.route)}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition"
              >
                {feature.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
