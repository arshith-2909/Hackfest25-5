// History.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail"); // your stored email

    if (email) {
        axios.get(`http://localhost:5000/api/bookings?email=${email}`)
        .then((res) => {
          setBookings(res.data);
        })
        .catch((err) => {
          console.error("❌ Error fetching bookings:", err);
        });
    }
  }, []);

  return (
    <div>
      <h2>🧾 Transaction History</h2>
      {bookings.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i}>
                <td>{b.email}</td>
                <td>{b.category}</td>
                <td>{b.amount}</td>
                <td>{new Date(b.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
