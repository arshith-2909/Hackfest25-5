import React, { useState } from "react";
import axios from "axios";

const Transaction = () => {
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [spareChange, setSpareChange] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [transData, setTransData] = useState(null);
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
  const email = localStorage.getItem("userEmail");
  const handleTransaction = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/book", {
        email,
        category: "transaction",
        amount,
        spareChange,
        totalAmount,
      });
      setTransData(res.data);
      alert("✅ Transaction successful!");
    } catch (err) {
      alert("❌ Transaction failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black text-white rounded-xl shadow-xl border-2 border-green-600">
      <h2 className="text-2xl font-bold mb-4 text-green-600">📲 Pay to Mobile</h2>

      <label className="block mb-2 font-medium">Mobile Number:</label>
      <input
        type="tel"
        className="w-full mb-4 p-2 border border-gray-600 bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Enter mobile number"
      />

      <label className="block mb-2 font-medium">Enter Amount:</label>
      <input
        type="number"
        className="w-full mb-4 p-2 border border-gray-600 bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        value={amount}
        onChange={handleAmountChange}
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="text-lg">
          🧾 Spare Change (2%): <strong>₹{spareChange}</strong>
        </p>
        <button
          onClick={toggleSpare}
          className={`text-sm px-2 py-1 rounded ${spareEnabled ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
        >
          {spareEnabled ? "Cancel Spare" : "Enable Spare"}
        </button>
      </div>

      <p className="text-lg mb-4">
        💳 Total Payable Amount: <strong>₹{totalAmount}</strong>
      </p>

      <button
        onClick={handleTransaction}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Confirm & Pay ₹{totalAmount}
      </button>

      {transData && (
        <div className="mt-6 p-4 bg-gray-800 rounded">
          <h3 className="font-semibold text-lg mb-2 text-green-600">✅ Transaction Summary</h3>
          <p>📱 Mobile: {transData.mobile}</p>
          <p>💰 Original Amount: ₹{transData.amount}</p>
          <p>💸 Spare Change: ₹{transData.spareChange}</p>
          <p>💳 Total Paid: ₹{transData.totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default Transaction;