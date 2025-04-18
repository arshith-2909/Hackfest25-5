import React, { useState } from 'react';
import axios from 'axios';

const Booking = () => {
  const [amount, setAmount] = useState('');
  const [bookingType, setBookingType] = useState('flight');
  const [spareChange, setSpareChange] = useState(null);
  const [spareEnabled, setSpareEnabled] = useState(true);

  const handleBooking = async () => {
    try {
      const res = await axios.post("http://localhost:5002/api/transaction", {
        amount: parseFloat(amount),
        type: "booking",
        spareEnabled,
        details: bookingType
      });
      setSpareChange(res.data.spareChange);
      setAmount('');
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-3">Booking</h2>
      
      <div className="mb-2">
        <label className="block text-sm mb-1">Select Booking Type:</label>
        <select
          value={bookingType}
          onChange={(e) => setBookingType(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="flight">Flight</option>
          <option value="gas">Gas</option>
          <option value="hotel">Hotel</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
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

      <button onClick={handleBooking} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Confirm Booking
      </button>

      {spareChange !== null && (
        <div className="mt-3 text-green-600 text-sm">
          Spare Change Added: ₹{spareChange}
        </div>
      )}
    </div>
  );
};

export default Booking;
