import React, { useState, useEffect } from "react";
import axios from "axios";

const Transaction = () => {
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [spareChange, setSpareChange] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [transData, setTransData] = useState(null);
  const [spareEnabled, setSpareEnabled] = useState(true);
  const [sparePercentage, setSparePercentage] = useState(0.02); // Default to 2%

  // Retrieve spareChange percentage from localStorage on mount
  useEffect(() => {
    const storedSparePercentage = localStorage.getItem("userSpareChange");

    // Check if the value is valid and is a number
    if (storedSparePercentage && !isNaN(storedSparePercentage)) {
      setSparePercentage(parseFloat(storedSparePercentage)); // Update spare percentage if valid
    } else {
      console.log("Invalid or no spareChangePercentage found in localStorage, using default value 0.02");
    }
  }, []);

  // Handle input change for amount
  const handleAmountChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setAmount(val);
    updateSpare(val, spareEnabled);
  };

  // Update spare change and total amount
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

  // Toggle spare change calculation
  const toggleSpare = () => {
    const newStatus = !spareEnabled;
    setSpareEnabled(newStatus);
    updateSpare(amount, newStatus);
  };

  // Fetch user email from localStorage
  const email = localStorage.getItem("userEmail");

  // Handle transaction
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">📲 Pay to Mobile</h2>

      <label className="block mb-2 font-medium">Mobile Number:</label>
      <input
        type="tel"
        className="w-full mb-4 p-2 border rounded"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Enter mobile number"
      />

      <label className="block mb-2 font-medium">Enter Amount:</label>
      <input
        type="number"
        className="w-full mb-4 p-2 border rounded"
        value={amount}
        onChange={handleAmountChange}
      />

      <div className="mb-4 flex items-center justify-between">
        <p>
          🧾 Spare Change ({(sparePercentage ).toFixed(0)}%): <strong>₹{spareChange}</strong>
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
        onClick={handleTransaction}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Confirm & Pay ₹{totalAmount}
      </button>

      {transData && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold text-lg mb-2">✅ Transaction Summary</h3>
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
