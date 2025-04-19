import React, { useState, useEffect } from "react";
import axios from "axios";

const Recharge = () => {
  const [provider, setProvider] = useState("Jio");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [spareChangeEnabled, setSpareChangeEnabled] = useState(true);
  const [spareChange, setSpareChange] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
<<<<<<< HEAD
  const [sparePercentage, setSparePercentage] = useState(0.02); // Default 2%
=======
  const [loading, setLoading] = useState(false);
>>>>>>> a1ce06147b4158dc12ccf5c665d30e3605aeece1

  useEffect(() => {
    const storedSpare = localStorage.getItem("userSpareChange");
    if (storedSpare && !isNaN(storedSpare)) {
      setSparePercentage(parseFloat(storedSpare));
    } else {
      console.log("Invalid or no spareChangePercentage found. Using default 2%");
    }
  }, []);

  const updateSpare = (amt, enabled) => {
    if (enabled) {
      const spare = parseFloat((amt * sparePercentage / 100).toFixed(2));
      setSpareChange(spare);
      setTotalAmount(amt + spare);
    } else {
      setSpareChange(0);
      setTotalAmount(amt);
    }
  };

  const handleAmountChange = (e) => {
    const amt = parseFloat(e.target.value) || 0;
    setAmount(e.target.value);
    updateSpare(amt, spareChangeEnabled);
  };

  const handleCheckboxToggle = (e) => {
    const enabled = e.target.checked;
    setSpareChangeEnabled(enabled);
    const amt = parseFloat(amount) || 0;
    updateSpare(amt, enabled);
  };

  const handleCancelSpareChange = () => {
    setSpareChangeEnabled(false);
    setSpareChange(0);
    setTotalAmount(parseFloat(amount) || 0);
  };

  const email = localStorage.getItem("userEmail");

  const handleRecharge = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-10 rounded-xl bg-[#000000] text-white border border-[#355E3B] border-[1px] shadow-[0_0_80px_10px_rgba(52,199,89,0.25)] animate-pulse">
        <div className="h-6 bg-gray-600/30 rounded w-1/3 mb-6"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="mb-4">
            <div className="h-4 bg-gray-500/30 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-500/30 rounded w-full"></div>
          </div>
        ))}
        <div className="h-10 bg-gray-500/30 rounded w-full mt-6"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-xl bg-[#000000] text-white border border-[#355E3B] border-[1px] shadow-[0_0_80px_10px_rgba(52,199,89,0.25)]">
      <h2 className="text-2xl font-bold mb-6 text-[#34C759]">📲 Recharge</h2>

      <label className="block mb-2 font-medium text-gray-300">Provider:</label>
      <select
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
        className="w-full mb-4 px-3 py-2 border border-gray-600 rounded-md bg-[#1A1D23] text-white"
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
        className="w-full mb-4 px-3 py-2 border border-gray-600 rounded-md bg-[#1A1D23] text-white"
        placeholder="Enter mobile number"
      />

      <label className="block mb-2 font-medium text-gray-300">Recharge Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        className="w-full mb-4 px-3 py-2 border border-gray-600 rounded-md bg-[#1A1D23] text-white"
        placeholder="e.g. 500"
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-300">
          <input
            type="checkbox"
            checked={spareChangeEnabled}
            onChange={handleCheckboxToggle}
          />
          <label>Enable Spare Change ({(sparePercentage).toFixed(0)}%)</label>
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
        className="w-full bg-[#34C759] text-black py-2 rounded hover:bg-green-700 transition font-semibold"

      >
        Confirm & Pay ₹{totalAmount || 0}
      </button>
    </div>
  );
};

export default Recharge;