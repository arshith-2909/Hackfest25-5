import React, { useState } from "react";
import axios from "axios";

const Booking = () => {
  const [category, setCategory] = useState("gas");
  const [amount, setAmount] = useState("");
  const [spareChange, setSpareChange] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingData, setBookingData] = useState(null);
  const [spareEnabled, setSpareEnabled] = useState(true);

  const handleAmountChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setAmount(val);
    updateSpare(val, spareEnabled);
  };

  const updateSpare = (amt, isEnabled) => {
    if (isEnabled) {
      const spare = parseFloat((amt * 0.02).toFixed(2));
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

  const handleBooking = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/book", {
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">🚀 Make a Booking</h2>

      <label className="block mb-2 font-medium">Category:</label>
      <select
        className="w-full mb-4 p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="gas">Gas</option>
        <option value="bus">Bus</option>
        <option value="flight">Flight</option>
        <option value="biking">Biking</option>
      </select>

      <label className="block mb-2 font-medium">Enter Amount:</label>
      <input
        type="number"
        className="w-full mb-4 p-2 border rounded"
        value={amount}
        onChange={handleAmountChange}
      />

      <div className="mb-4 flex items-center justify-between">
        <p>
          🧾 Spare Change (2%): <strong>₹{spareChange}</strong>
        </p>
        <button
          onClick={toggleSpare}
          className={`text-sm px-2 py-1 rounded ${
            spareEnabled
              ? "bg-red-100 text-red-700 hover:bg-red-200"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          {spareEnabled ? "Cancel Spare" : "Enable Spare"}
        </button>
      </div>

      <p className="mb-4">
        💳 Total Payable Amount: <strong>₹{totalAmount}</strong>
      </p>

      <button
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Confirm & Pay ₹{totalAmount}
      </button>

      {bookingData && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold text-lg mb-2">✅ Booking Summary</h3>
          <p>🗂 Category: {bookingData.category}</p>
          <p>💰 Original Amount: ₹{bookingData.amount}</p>
          <p>💸 Spare Change: ₹{bookingData.spareChange}</p>
          <p>💳 Total Paid: ₹{bookingData.totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default Booking;
