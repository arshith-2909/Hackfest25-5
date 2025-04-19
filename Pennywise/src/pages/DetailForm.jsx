import React, { useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const DetailsForm = () => {
  const [income, setIncome] = useState("");
  const [spareChange, setSpareChange] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [atmNo, setAtmNo] = useState("");
  const [bankPassword, setBankPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid), {
        income,
        spareChange,
        accountNo,
        atmNo,
        bankPassword,
      }, { merge: true });
      localStorage.setItem("userSpareChange", spareChange);
      alert("Details saved successfully!");
      navigate("/dashboard"); // or dashboard
    } catch (err) {
      console.error("Error saving details:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1D23]">
      <form onSubmit={handleSubmit} className="bg-[#2F3436] p-8 rounded-xl shadow-md w-full max-w-md space-y-6 text-white">
        <h2 className="text-2xl font-bold mb-4 text-[#34C759]">📊 Enter Your Details</h2>

        <input
          type="number"
          placeholder="Income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full p-2 border rounded bg-[#2F3436] text-white border-gray-400 focus:ring-[#34C759] focus:outline-none"
          required
        />

        <input
          type="number"
          placeholder="Spare Change (%)"
          value={spareChange}
          onChange={(e) => setSpareChange(e.target.value)}
          className="w-full p-2 border rounded bg-[#2F3436] text-white border-gray-400 focus:ring-[#34C759] focus:outline-none"
          required
        />

        <input
          type="text"
          placeholder="Account Number"
          value={accountNo}
          onChange={(e) => setAccountNo(e.target.value)}
          className="w-full p-2 border rounded bg-[#2F3436] text-white border-gray-400 focus:ring-[#34C759] focus:outline-none"
          required
        />

        <input
          type="text"
          placeholder="ATM Number"
          value={atmNo}
          onChange={(e) => setAtmNo(e.target.value)}
          className="w-full p-2 border rounded bg-[#2F3436] text-white border-gray-400 focus:ring-[#34C759] focus:outline-none"
          required
        />

        <input
          type="password"
          placeholder="Bank Password"
          value={bankPassword}
          onChange={(e) => setBankPassword(e.target.value)}
          className="w-full p-2 border rounded bg-[#2F3436] text-white border-gray-400 focus:ring-[#34C759] focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#34C759] text-white py-2 rounded hover:bg-green-700 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DetailsForm;