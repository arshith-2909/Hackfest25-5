import React, { useState } from "react";
import axios from "axios";

const BillPayment = () => {
  const [category, setCategory] = useState("electricity");
  const [amount, setAmount] = useState("");
  const [spareChange, setSpareChange] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentData, setPaymentData] = useState(null);
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
  const handleBillPayment = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/book", {
        email,
        category,
        amount,
        spareChange,
        totalAmount,
      });
      setPaymentData(res.data);
      alert("✅ Bill paid successfully!");
    } catch (err) {
      alert("❌ Payment failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-[#1A1D23] rounded-xl shadow-md text-white">
      <h2 className="text-2xl font-bold mb-4 text-[#34C759]">💡 Pay Your Bills</h2>

      <label className="block mb-2 font-medium text-gray-300">Bill Type:</label>
      <select
        className="w-full mb-4 p-2 border rounded bg-[#2F3436] text-white"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="electricity">Electricity</option>
        <option value="water">Water</option>
        <option value="internet">Internet</option>
        <option value="tv">DTH / TV</option>
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
          🧾 Spare Change (2%): <strong className="text-white">₹{spareChange}</strong>
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
        onClick={handleBillPayment}
        className="w-full bg-[#34C759] text-white py-2 rounded hover:bg-green-700"
      >
        Confirm & Pay ₹{totalAmount}
      </button>

      {paymentData && (
        <div className="mt-6 p-4 bg-[#2F3436] rounded">
          <h3 className="font-semibold text-lg mb-2 text-[#34C759]">✅ Payment Summary</h3>
          <p className="text-gray-300">📂 Bill Type: <span className="text-white">{paymentData.category}</span></p>
          <p className="text-gray-300">💰 Bill Amount: <span className="text-white">₹{paymentData.amount}</span></p>
          <p className="text-gray-300">💸 Spare Change: <span className="text-white">₹{paymentData.spareChange}</span></p>
          <p className="text-gray-300">💳 Total Paid: <span className="text-white">₹{paymentData.totalAmount}</span></p>
        </div>
      )}
    </div>
  );
};

export default BillPayment;