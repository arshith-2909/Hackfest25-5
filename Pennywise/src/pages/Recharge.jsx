import React, { useState } from "react";
import axios from "axios";

const Recharge = () => {
  const [provider, setProvider] = useState("Jio");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [spareChangeEnabled, setSpareChangeEnabled] = useState(true);
  const [spareChange, setSpareChange] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleSpareChangeToggle = (enabled) => {
    const amt = parseFloat(amount);
    if (!amt) return;
    if (enabled) {
      const sc = +(amt * 0.02).toFixed(2);
      setSpareChange(sc);
      setTotalAmount(amt + sc);
    } else {
      setSpareChange(0);
      setTotalAmount(amt);
    }
  };

  const handleAmountChange = (e) => {
    const amt = parseFloat(e.target.value);
    setAmount(e.target.value);
    if (!isNaN(amt)) {
      handleSpareChangeToggle(spareChangeEnabled);
    }
  };

  const handleCheckboxToggle = (e) => {
    const enabled = e.target.checked;
    setSpareChangeEnabled(enabled);
    handleSpareChangeToggle(enabled);
  };

  const handleCancelSpareChange = () => {
    setSpareChangeEnabled(false);
    setSpareChange(0);
    setTotalAmount(parseFloat(amount));
  };

  const email = localStorage.getItem("userEmail");

  const handleRecharge = async () => {
    try {
      await axios.post("http://localhost:5000/api/book", {
        email,
        category: "recharge",
        amount,
        spareChange,
        totalAmount,
      });
      alert("✅ Recharge saved successfully!");
    } catch (err) {
      console.error("Recharge failed:", err);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-[#1A1D23] rounded-xl shadow-md text-white">
      <h2 className="text-2xl font-bold mb-4 text-[#34C759]">📲 Recharge</h2>

      <label className="block mb-2 font-medium text-gray-300">Provider:</label>
      <select
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
        className="w-full mb-4 p-2 border rounded bg-[#2F3436] text-white"
      >
        <option value="Jio">Jio</option>
        <option value="Airtel">Airtel</option>
        <option value="Vi">Vi</option>
        <option value="BSNL">BSNL</option>
      </select>

      <label className="block mb-2 font-medium text-gray-300">Mobile Number:</label>
      <input
        type="tel"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="w-full mb-4 p-2 border rounded bg-[#2F3436] text-white"
        placeholder="Enter mobile number"
      />

      <label className="block mb-2 font-medium text-gray-300">Recharge Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        className="w-full mb-4 p-2 border rounded bg-[#2F3436] text-white"
        placeholder="e.g. 500"
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-300">
          <input
            type="checkbox"
            checked={spareChangeEnabled}
            onChange={handleCheckboxToggle}
          />
          <label>Enable Spare Change (2%)</label>
        </div>

        {spareChangeEnabled && (
          <button
            onClick={handleCancelSpareChange}
            className="text-sm px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cancel Spare Change
          </button>
        )}
      </div>

      <p className="mb-2 text-gray-300">
        🧾 Spare Change: <strong className="text-white">₹{spareChange.toFixed(2)}</strong>
      </p>

      <p className="mb-4 text-gray-300">
        💳 Total Payable Amount: <strong className="text-white">₹{totalAmount.toFixed(2)}</strong>
      </p>

      <button
        onClick={handleRecharge}
        className="w-full bg-[#34C759] text-white py-2 rounded hover:bg-green-700"
      >
        Confirm & Pay ₹{totalAmount || 0}
      </button>
    </div>
  );
};

export default Recharge;
