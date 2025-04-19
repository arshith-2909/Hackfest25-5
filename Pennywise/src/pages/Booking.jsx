import React, { useState, useEffect } from "react";
import axios from "axios";

const Booking = () => {
  const [category, setCategory] = useState("gas");
  const [amount, setAmount] = useState("");
  const [spareChange, setSpareChange] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingData, setBookingData] = useState(null);
  const [spareEnabled, setSpareEnabled] = useState(true);
  const [sparePercentage, setSparePercentage] = useState(0.02); // Default to 2%

  // Fetch spareChangePercentage from localStorage on component mount
  useEffect(() => {
    const storedSparePercentage = localStorage.getItem("userSpareChange");
    if (storedSparePercentage && !isNaN(storedSparePercentage)) {
      setSparePercentage(parseFloat(storedSparePercentage));
    } else {
      console.log("Invalid or no spareChangePercentage found in localStorage, using default 0.02");
    }
  }, []);

  const handleAmountChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setAmount(val);
    updateSpare(val, spareEnabled);
  };

  const updateSpare = (amt, isEnabled) => {
    if (isEnabled) {
      const spare = parseFloat((amt * sparePercentage/100).toFixed(2));
      setSpareChange(spare);
      setTotalAmount(amt + spare);
    } else {
      setSpareChange(0);
      setTotalAmount(amt);
    }
  };

  const toggleSpare = () => {
    const newStatus = !spareEnabled;
    setSpareEnabled(newStatus);
    updateSpare(amount, newStatus);
  };

  const email = localStorage.getItem("userEmail");

  const handleBooking = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/book", {
        email,
        category,
        amount,
        spareChange,
        totalAmount,
      });
      setBookingData(res.data);
      alert("✅ Booking successful!");
    } catch (err) {
      alert("❌ Booking failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-[#1A1D23] rounded-xl shadow-md text-white">
      <h2 className="text-2xl font-bold mb-4 text-[#34C759]">🚀 Make a Booking</h2>

      <label className="block mb-2 font-medium text-gray-300">Category:</label>
      <select
        className="w-full mb-4 p-2 border rounded bg-[#2F3436] text-white"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="gas">Gas</option>
        <option value="bus">Bus</option>
        <option value="flight">Flight</option>
        <option value="biking">Biking</option>
      </select>

      <label className="block mb-2 font-medium text-gray-300">Enter Amount:</label>
      <input
        type="number"
        className="w-full mb-4 p-2 border rounded bg-[#2F3436] text-white"
        value={amount}
        onChange={handleAmountChange}
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-300">
          🧾 Spare Change ({(sparePercentage).toFixed(0)}%): <strong className="text-white">₹{spareChange}</strong>
        </p>
        <button
          onClick={toggleSpare}
          className={`text-sm px-2 py-1 rounded ${
            spareEnabled
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-[#34C759] text-white hover:bg-green-700"
          }`}
        >
          {spareEnabled ? "Cancel Spare" : "Enable Spare"}
        </button>
      </div>

      <p className="mb-4 text-gray-300">
        💳 Total Payable Amount: <strong className="text-white">₹{totalAmount}</strong>
      </p>

      <button
        onClick={handleBooking}
        className="w-full bg-[#34C759] text-white py-2 rounded hover:bg-green-700"
      >
        Confirm & Pay ₹{totalAmount}
      </button>

      {bookingData && (
        <div className="mt-6 p-4 bg-[#2F3436] rounded">
          <h3 className="font-semibold text-lg mb-2 text-[#34C759]">✅ Booking Summary</h3>
          <p className="text-gray-300">🗂 Category: <span className="text-white">{bookingData.category}</span></p>
          <p className="text-gray-300">💰 Original Amount: <span className="text-white">₹{bookingData.amount}</span></p>
          <p className="text-gray-300">💸 Spare Change: <span className="text-white">₹{bookingData.spareChange}</span></p>
          <p className="text-gray-300">💳 Total Paid: <span className="text-white">₹{bookingData.totalAmount}</span></p>
        </div>
      )}
    </div>
  );
};

export default Booking;
