import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SpareChangeWidget = () => {
  const [total, setTotal] = useState(0);

  const fetchTotal = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/spare-change");
      setTotal(res.data.totalSpareChange);
    } catch (err) {
      console.error("Failed to load spare change:", err);
    }
  };

  useEffect(() => {
    fetchTotal();
    const interval = setInterval(fetchTotal, 3000); // auto refresh every 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-yellow-100 p-4 rounded shadow text-lg">
      🪙 Total Spare Change Saved: ₹{total}
    </div>
  );
};

export default SpareChangeWidget;
