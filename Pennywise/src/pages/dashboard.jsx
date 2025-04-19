import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const features = [
  {
    title: "Booking",
    description: "Book appointments, travel, or events with ease.",
    buttonText: "Book Now",
    route: "/booking",
  },
  {
    title: "Bill Payment",
    description: "Pay bills securely and quickly.",
    buttonText: "Pay Bills",
    route: "/bill-payment",
  },
  {
    title: "Recharge",
    description: "Recharge mobile, DTH, and FASTag effortlessly.",
    buttonText: "Recharge",
    route: "/recharge",
  },
  {
    title: "Social",
    description: "Engage with the community and share updates.",
    buttonText: "Join Now",
    route: "/social-invest",
  },
  {
    title: "Invest",
    description: "Grow your savings with smart investment options.",
    buttonText: "Start Investing",
    route: "/recommend",
  },
  {
    title: "Recommend",
    description: "Get intelligent suggestions for better choices.",
    buttonText: "Explore",
    route: "/chatbot",
  },
  {
    title: "Purchase and Set Target",
    description: "Set savings goals and purchase smartly.",
    buttonText: "Start Now",
    route: "/product",
  },
  {
    title: "Transaction Detail",
    description: "View detailed history of your transactions.",
    buttonText: "View Details",
    route: "/transactions",
  },
  {
    title: "Game",
    description: "Play fun games and win rewards.",
    buttonText: "Play Now",
    route: "/game",
  },
  {
    title: "Unused Subscriptions",
    description: "Identify and cancel unused subscriptions.",
    buttonText: "Check Now",
    route: "/unused-subscription",
  },
];

const DashboardSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-radial from-black to-[#013220] py-16 px-6">
      {/* Profile Section */}
      <div className="fixed top-6 right-6 flex items-center space-x-4 z-10">
        <div className="relative group">
          <div className="bg-gray-900 p-3 rounded-full cursor-pointer hover:bg-[#34C759] transition-all">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="rounded-full w-12 h-12 border-2 border-[#355E3B] hover:border-white transition-all"
            />
          </div>
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity">
            <ul className="py-2">
              <li
                className="px-4 py-2 hover:bg-[#34C759] cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-[#34C759] cursor-pointer"
                onClick={() => navigate("/")}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
        <div className="text-white">
          <span className="font-medium">Hello, User</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-[#34C759] mb-6 animate-pulse">
          PayVest
        </h2>
        <p className="text-lg text-gray-300 mb-12">
          Manage your finances effectively and achieve your goals.
        </p>

        {/* Scanner Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => navigate("/qr-scanner")}
            className="bg-[#34C759] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-all transform hover:scale-105"
          >
            Open Scanner
          </button>
        </div>

        {/* Dashboard Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-black rounded-xl p-6 shadow-[0_0_20px_5px_rgba(52,199,89,0.25)] hover:shadow-[0_0_20px_5px_rgba(52,199,89,0.25)] transition-all duration-300 ease-out border-[1px] border-[#355E3B]"
              aria-label={feature.title}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 mb-6">{feature.description}</p>
              <button
                onClick={() => navigate(feature.route)}
                className="bg-[#34C759] text-white font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105"
              >
                {feature.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Progress Visualizations */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          <div className="bg-black rounded-xl p-6 shadow-[0_0_20px_5px_rgba(52,199,89,0.25)] flex flex-col items-center justify-center border-[1px] border-[#355E3B]">
            <h3 className="text-lg font-semibold text-white mb-4">
              Savings Progress
            </h3>
            <div className="w-full flex justify-center items-center">
              <div className="w-48 h-48">
                <CircularProgressbar
                  value={75}
                  text={`${75}%`}
                  styles={buildStyles({
                    pathColor: "#FFFFFF",
                    textColor: "#FFFFFF",
                    trailColor: "#333333",
                    strokeLinecap: "round",
                  })}
                />
              </div>
            </div>
          </div>

          <div className="bg-black rounded-xl p-6 shadow-[0_0_20px_5px_rgba(52,199,89,0.25)] flex flex-col items-center justify-center border-[1px] border-[#355E3B]">
            <h3 className="text-lg font-semibold text-white mb-4">
              Monthly Expenses
            </h3>
            <div className="h-40 w-full flex items-center justify-center text-gray-600">
              {/* Bar Graph Placeholder */}
            </div>
          </div>

          <div className="bg-black rounded-xl p-6 shadow-[0_0_20px_5px_rgba(52,199,89,0.25)] flex flex-col items-center justify-center border-[1px] border-[#355E3B]">
            <h3 className="text-lg font-semibold text-white mb-4">
              Transaction Detail
            </h3>
            <div className="h-40 w-full flex items-center justify-center text-gray-600">
              {/* Line Graph Placeholder */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
