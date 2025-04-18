import React, { useState } from 'react';
import axios from 'axios';

const BillPayment = () => {
  const [amount, setAmount] = useState('');
  const [billType, setBillType] = useState('electricity');
  const [spareChange, setSpareChange] = useState(null);
  const [spareEnabled, setSpareEnabled] = useState(true);

  const handleBill = async () => {
    try {
      const res = await axios.post("http://localhost:5002/api/transaction", {
        amount: parseFloat(amount),
        type: "bill",
        spareEnabled,
        details: billType
      });
      setSpareChange(res.data.spareChange);
      setAmount('');
    } catch (err) {
      console.error("Bill payment failed:", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-3">Bill Payment</h2>

      <div className="mb-2">
        <label className="block text-sm mb-1">Select Bill Type:</label>
        <select
          value={billType}
          onChange={(e) => setBillType(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="electricity">Electricity</option>
          <option value="water">Water</option>
          <option value="broadband">Broadband</option>
          <option value="gas">Gas</option>
          <option value="mobile">Mobile Recharge</option>
        </select>
      </div>

      <div className="mb-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter amount"
        />
      </div>

      <div className="mb-2 flex items-center space-x-2">
        <input
          type="checkbox"
          checked={spareEnabled}
          onChange={() => setSpareEnabled(!spareEnabled)}
        />
        <label>Enable Spare Change</label>
      </div>

      <button onClick={handleBill} className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Pay Bill
      </button>

      {spareChange !== null && (
        <div className="mt-3 text-green-600 text-sm">
          Spare Change Added: ₹{spareChange}
        </div>
      )}
    </div>
  );
};

export default BillPayment;
