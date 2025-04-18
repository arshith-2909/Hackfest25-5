import React, { useState, useEffect } from "react";
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

      alert("Details saved successfully!");
      navigate("/game"); // or dashboard
    } catch (err) {
      console.error("Error saving details:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4 border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-indigo-600">Additional Details</h2>

        <input type="number" placeholder="Income" value={income} onChange={(e) => setIncome(e.target.value)} className="w-full p-2 border rounded" required />

        <input type="number" placeholder="Spare Change in percentage" value={spareChange} onChange={(e) => setSpareChange(e.target.value)} className="w-full p-2 border rounded" required />

        <input type="text" placeholder="Account Number" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} className="w-full p-2 border rounded" required />

        <input type="text" placeholder="ATM Number" value={atmNo} onChange={(e) => setAtmNo(e.target.value)} className="w-full p-2 border rounded" required />

        <input type="password" placeholder="Bank Password" value={bankPassword} onChange={(e) => setBankPassword(e.target.value)} className="w-full p-2 border rounded" required />

        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600">Submit</button>
      </form>
    </div>
  );
};

export default DetailsForm;
