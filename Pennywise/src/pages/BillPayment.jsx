import React, { useState, useEffect } from "react";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase"; // Update path based on your project structure

const BillPayment = () => {
  const [category, setCategory] = useState("electricity");
  const [amount, setAmount] = useState("");
  const [spareChange, setSpareChange] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentData, setPaymentData] = useState(null);
  const [spareEnabled, setSpareEnabled] = useState(true);
  const [userSpareWallet, setUserSpareWallet] = useState(null);

  // Fetch user's current spareChange from Firestore
  useEffect(() => {
    const fetchUserSpareChange = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserSpareWallet(data.spareChange || 0);
        }
      } catch (err) {
        console.error("Error fetching spareChange from Firestore:", err);
      }
    };

    fetchUserSpareChange();
  }, []);

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">💡 Pay Your Bills</h2>

      <label className="block mb-2 font-medium">Bill Type:</label>
      <select
        className="w-full mb-4 p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="electricity">Electricity</option>
        <option value="water">Water</option>
        <option value="internet">Internet</option>
        <option value="tv">DTH / TV</option>
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

      {userSpareWallet !== null && (
        <p className="mb-4 text-sm text-gray-600">
          🏦 Your Current Spare Wallet Balance: <strong>₹{userSpareWallet}</strong>
        </p>
      )}

      <button
        onClick={handleBillPayment}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        Confirm & Pay ₹{totalAmount}
      </button>

      {paymentData && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold text-lg mb-2">✅ Payment Summary</h3>
          <p>📂 Bill Type: {paymentData.category}</p>
          <p>💰 Bill Amount: ₹{paymentData.amount}</p>
          <p>💸 Spare Change: ₹{paymentData.spareChange}</p>
          <p>💳 Total Paid: ₹{paymentData.totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default BillPayment;
