import React, { useState ,useEffect } from "react";
import axios from "axios";

const BillPayment = () => {
  const [category, setCategory] = useState("electricity");
  const [amount, setAmount] = useState(0);
  const [spareChange, setSpareChange] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentData, setPaymentData] = useState(null);
  const [spareEnabled, setSpareEnabled] = useState(true);
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
=======
   const [sparePercentage, setSparePercentage] = useState(0.02);
 useEffect(() => {
    const storedSparePercentage = localStorage.getItem("userSpareChange");
>>>>>>> 174171a1af564b0b374ccf775d73111759255a85

    // Check if the value is valid and is a number
    if (storedSparePercentage && !isNaN(storedSparePercentage)) {
      setSparePercentage(parseFloat(storedSparePercentage)); // Update spare percentage if valid
    } else {
      console.log("Invalid or no spareChangePercentage found in localStorage, using default value 0.02");
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

  const handleBillPayment = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 rounded-xl bg-[#000000] text-white border border-[#355E3B] border-[1px] shadow-[0_0_80px_10px_rgba(52,199,89,0.25)] animate-pulse">
        <div className="h-6 bg-gray-600/30 rounded w-1/3 mb-6"></div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="mb-4">
            <div className="h-4 bg-gray-500/30 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-500/30 rounded w-2/3"></div>
          </div>
        ))}
        <hr className="border-gray-700 my-6" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between items-center mb-4 gap-4">
            <div className="flex flex-col flex-grow">
              <div className="h-4 bg-gray-500/30 rounded w-1/3 mb-2"></div>
              <div className="h-6 bg-gray-500/30 rounded w-2/3"></div>
            </div>
            <div className="h-8 w-16 bg-gray-500/30 rounded-md"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-[#000000] text-white border border-[#355E3B] border-[1px] shadow-[0_0_80px_10px_rgba(52,199,89,0.25)] rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-[#34C759]">💡 Pay Your Bills</h2>

      <label className="block mb-2 text-sm text-gray-300">Bill Type:</label>
      <select
        className="w-full mb-4 p-2 border border-gray-600 rounded bg-[#1A1D23] text-white focus:outline-none focus:ring-2 focus:ring-[#34C759]"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="electricity">Electricity</option>
        <option value="water">Water</option>
        <option value="internet">Internet</option>
        <option value="tv">DTH / TV</option>
      </select>

      <label className="block mb-2 text-sm text-gray-300">Enter Amount:</label>
      <input
        type="number"
        className="w-full mb-4 p-2 border border-gray-600 rounded bg-[#1A1D23] text-white focus:outline-none focus:ring-2 focus:ring-[#34C759]"
        value={amount}
        onChange={handleAmountChange}
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-300">
        🧾 Spare Change ({(sparePercentage).toFixed(0)}%): <strong>₹{spareChange}</strong>
        </p>
        <button
          onClick={toggleSpare}
          className={`text-sm px-2 py-1 rounded transition ${
            spareEnabled
              ? "bg-red-600 hover:bg-red-700"
              : "bg-[#34C759] hover:bg-green-700"
          } text-white`}
        >
          {spareEnabled ? "Cancel Spare" : "Enable Spare"}
        </button>
      </div>

      <p className="mb-4 text-gray-300">
        💳 Total Payable Amount: <strong className="text-white">₹{totalAmount}</strong>
      </p>

      <button
        onClick={handleBillPayment}
        className="w-full bg-[#34C759] text-white py-2 rounded hover:bg-green-700 transition"
      >
        Confirm & Pay ₹{totalAmount}
      </button>

      {paymentData && (
        <div className="mt-6 p-4 bg-[#1A1D23] border border-gray-600 rounded">
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