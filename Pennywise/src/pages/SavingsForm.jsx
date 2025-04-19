import React, { useState } from 'react';
import axios from 'axios';

const SavingsForm = () => {
  const [formData, setFormData] = useState({
    salary: '',
    this_recharge: '',
    this_food: '',
    this_grocery: '',
    this_bills: '',
    last_recharge: '',
    last_food: '',
    last_grocery: '',
    last_bills: ''
  });

  const [report, setReport] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/predict-savings', formData);
      setReport(res.data.report);
    } catch (err) {
      setReport('Error: ' + (err.response?.data?.error || 'Something went wrong'));
    }
  };

  return (
    <div style={{
      backgroundColor: '#121212',
      color: '#00FF7F',
      minHeight: '100vh',
      padding: '40px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '30px' }}>
        💰 Predict Your Monthly Savings 💰
      </h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <label>Salary</label>
        <input type="number" name="salary" onChange={handleChange} required />

        <h4>This Month's Spending</h4>
        <input type="number" name="this_recharge" placeholder="Recharge" onChange={handleChange} required />
        <input type="number" name="this_food" placeholder="Food" onChange={handleChange} required />
        <input type="number" name="this_grocery" placeholder="Grocery" onChange={handleChange} required />
        <input type="number" name="this_bills" placeholder="Bills" onChange={handleChange} required />

        <h4>Last Month's Spending</h4>
        <input type="number" name="last_recharge" placeholder="Recharge" onChange={handleChange} required />
        <input type="number" name="last_food" placeholder="Food" onChange={handleChange} required />
        <input type="number" name="last_grocery" placeholder="Grocery" onChange={handleChange} required />
        <input type="number" name="last_bills" placeholder="Bills" onChange={handleChange} required />

        <br /><br />
        <button
          type="submit"
          style={{
            backgroundColor: '#00FF7F',
            color: '#121212',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🚀 Predict
        </button>
      </form>

      {report && (
        <pre
          style={{
            backgroundColor: '#1e1e1e',
            padding: '20px',
            marginTop: '40px',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap',
            maxWidth: '600px',
            margin: '40px auto 0 auto'
          }}
        >
          {report}
        </pre>
      )}

      <style>{`
        input {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          background-color: #1e1e1e;
          color: #00FF7F;
          border: 1px solid #00FF7F;
          border-radius: 6px;
        }
        h4 {
          margin-top: 20px;
        }
        label {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default SavingsForm;
