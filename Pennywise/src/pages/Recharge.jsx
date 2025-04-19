import React, { useState } from "react";
import axios from "axios";

const Recharge = () => {
  const [provider, setProvider] = useState("Jio");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [spareChangeEnabled, setSpareChangeEnabled] = useState(true);
  const [spareChange, setSpareChange] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleSpareChangeToggle = () => {
    const amt = parseFloat(amount);
    if (!amt) return;
    if (spareChangeEnabled) {
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
      if (spareChangeEnabled) {
        const sc = +(amt * 0.02).toFixed(2);
        setSpareChange(sc);
        setTotalAmount(amt + sc);
      } else {
        setSpareChange(0);
        setTotalAmount(amt);
      }
    }
  };

  const handleCancelSpareChange = () => {
    setSpareChangeEnabled(false);
    setSpareChange(0);
    setTotalAmount(parseFloat(amount));
  };

  const handleRecharge = async () => {
    try {
      await axios.post("http://localhost:5000/save-recharge", {
        mobile,
        provider,
        enteredAmount: amount,
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center text-teal-700 mb-4">📲 Recharge</h2>

      <label className="block font-medium">Provider</label>
      <select
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="Jio">Jio</option>
        <option value="Airtel">Airtel</option>
        <option value="Vi">Vi</option>
        <option value="BSNL">BSNL</option>
      </select>

      <label className="block font-medium">Mobile Number</label>
      <input
        type="tel"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Enter mobile number"
      />

      <label className="block font-medium">Recharge Amount</label>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        className="w-full p-2 mb-4 border rounded"
        placeholder="e.g. 500"
      />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={spareChangeEnabled}
            onChange={(e) => {
              setSpareChangeEnabled(e.target.checked);
              handleSpareChangeToggle();
            }}
          />
          <label>Enable Spare Change (2%)</label>
        </div>

        {spareChangeEnabled && (
          <button
            onClick={handleCancelSpareChange}
            className="text-red-500 text-sm hover:underline"
          >
            Cancel Spare Change
          </button>
        )}
      </div>

      <div className="mb-4">
        <p>Spare Change: ₹{spareChange.toFixed(2)}</p>
        <p className="font-bold text-lg">Total: ₹{totalAmount.toFixed(2)}</p>
      </div>

      <button
        onClick={handleRecharge}
        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
      >
        🔁 Save Recharge ₹{totalAmount || 0}
      </button>
    </div>
  );
};

export default Recharge;
