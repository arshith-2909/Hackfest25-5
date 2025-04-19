import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      axios
        .get(`http://localhost:5000/api/bookings?email=${email}`)
        .then((res) => {
          setBookings(res.data);
        })
        .catch((err) => {
          console.error("❌ Error fetching bookings:", err);
        });
    }
  }, []);

  return (
    <div className="p-6 text-white bg-[#1A1D23] min-h-screen">
      <h2 className="text-3xl font-bold text-green-400 mb-4">🧾 Transaction History</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-300">No records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300 border border-gray-600">
            <thead className="text-xs uppercase bg-[#2F3436] text-green-300">
              <tr>
                <th className="px-6 py-3 border border-gray-600">Email</th>
                <th className="px-6 py-3 border border-gray-600">Category</th>
                <th className="px-6 py-3 border border-gray-600">Amount</th>
                <th className="px-6 py-3 border border-gray-600">Created At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i} className="hover:bg-[#2a2f35]">
                  <td className="px-6 py-4 border border-gray-700">{b.email}</td>
                  <td className="px-6 py-4 border border-gray-700">{b.category}</td>
                  <td className="px-6 py-4 border border-gray-700">{b.amount}</td>
                  <td className="px-6 py-4 border border-gray-700">
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
