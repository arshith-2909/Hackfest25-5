import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [circleId, setCircleId] = useState('');
  const [allCircles, setAllCircles] = useState([]);
  const [contributeUserId, setContributeUserId] = useState('');
  const [contributecircleId, setContributecircleId] = useState('');
  const [memberCircleId, setMemberCircleId] = useState('');
  const [membersList, setMembersList] = useState([]);
  const [contributionAmount, setContributionAmount] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    createdBy: '',
    monthlyTarget: '',
    planType: '',
    riskLevel: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [joinCircleId, setJoinCircleId] = useState('');
  const [joinUserId, setJoinUserId] = useState('');

  // API: Create Circle
  const createCircle = async () => {
    try {
      const res = await axios.post('http://localhost:5000/circles/create', {
        ...formData,
        monthlyTarget: parseFloat(formData.monthlyTarget)
      });
      setCircleId(res.data.circleId);
      setResponseMsg(res.data.message);
    } catch (err) {
      console.error(err);
      setResponseMsg('Error creating circle');
    }
  };

  // API: Get All Circles
  const getAllCircles = async () => {
    try {
      const res = await axios.get('http://localhost:5001/circles');
      setAllCircles(res.data);
    } catch (err) {
      console.error(err);
      setResponseMsg('Error fetching circles');
    }
  };

  // API: Get Members of a Circle
  const getMembers = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/circles/${memberCircleId}`);
      setMembersList(res.data.members || []);
    } catch (err) {
      console.error(err);
      setResponseMsg('Error fetching members');
    }
  };

  // API: Join Circle
  const joinCircle = async () => {
    try {
      const res = await axios.put(`http://localhost:5001/circles/${joinCircleId}/join`, {
        userId: joinUserId
      });
      setResponseMsg(res.data.message);
    } catch (err) {
      console.error(err);
      setResponseMsg('Error joining circle');
    }
  };

  // API: Contribute to Circle
  const contribute = async () => {
    try {
      const res = await axios.post(`http://localhost:5001/circles/${contributecircleId}/contribute`, {
     
        userId: contributeUserId,
        amount: parseFloat(contributionAmount)
      });
      setResponseMsg(res.data.message);
    } catch (err) {
      console.error(err);
      setResponseMsg('Error contributing');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 text-gray-700">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-800 text-center">🔵 Circle Manager</h1>

        {/* Create Circle Toggle */}
        <div className="text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-medium px-5 py-2 rounded-md transition shadow-sm"
          >
            {showForm ? 'Cancel' : 'Create Circle'}
          </button>
        </div>

        {/* Create Circle Form */}
        {showForm && (
          <div className="bg-indigo-50 p-6 rounded-lg shadow-sm border border-indigo-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create a Circle</h2>
            <form className="space-y-4">
              {['name', 'createdBy', 'monthlyTarget', 'planType', 'riskLevel'].map((field) => (
                <input
                  key={field}
                  type={field === 'monthlyTarget' ? 'number' : 'text'}
                  name={field}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-200 outline-none"
                />
              ))}
              <button
                type="button"
                onClick={createCircle}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Create Circle
              </button>
              {circleId && (
                <p className="mt-2 text-sm text-green-600">
                  New Circle ID: <strong>{circleId}</strong>
                </p>
              )}
            </form>
          </div>
        )}

        {/* View All Circles */}
        <div className="bg-teal-50 p-6 rounded-lg shadow-sm border border-teal-100">
          <h2 className="text-lg font-medium text-gray-800 mb-3">All Circles</h2>
          <button
            onClick={getAllCircles}
            className="bg-teal-300 hover:bg-teal-400 text-teal-900 font-medium px-5 py-2 rounded-md transition shadow-sm"
          >
            Load Circles
          </button>
          <ul className="mt-3 text-left list-disc list-inside text-gray-700">
            {allCircles.map((id, idx) => (
              <li key={idx}>{id}</li>
            ))}
          </ul>
        </div>

        {/* View Members */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-100">
          <h2 className="text-lg font-medium text-gray-800 mb-3">View Members</h2>
          <input
            type="text"
            placeholder="Enter Circle ID"
            value={memberCircleId}
            onChange={(e) => setMemberCircleId(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md mb-3 focus:ring-2 focus:ring-yellow-200"
          />
          <button
            onClick={getMembers}
            className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-medium px-5 py-2 rounded-md transition shadow-sm"
          >
            View Members
          </button>
          <ul className="mt-3 text-left list-disc list-inside text-gray-800">
            {membersList.map((member, idx) => (
              <li key={idx}>{member}</li>
            ))}
          </ul>
        </div>

        {/* Join Circle */}
        <div className="bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-100">
          <h2 className="text-lg font-medium text-gray-800 mb-3">Join Circle</h2>
          <input
            type="text"
            placeholder="Circle ID"
            value={joinCircleId}
            onChange={(e) => setJoinCircleId(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md mb-3 focus:ring-2 focus:ring-purple-200"
          />
          <input
            type="text"
            placeholder="User ID"
            value={joinUserId}
            onChange={(e) => setJoinUserId(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md mb-3 focus:ring-2 focus:ring-purple-200"
          />
          <button
            onClick={joinCircle}
            className="bg-purple-300 hover:bg-purple-400 text-purple-900 font-medium px-6 py-2 rounded-md transition shadow-sm"
          >
            Join Circle
          </button>
        </div>

        {/* Contribute */}
        <div className="bg-pink-50 p-6 rounded-lg shadow-sm border border-pink-100">
          <h2 className="text-lg font-medium text-gray-800 mb-3">Contribute</h2>
          <input
            type="text"
            placeholder="Circle ID"
            value={contributecircleId}
            onChange={(e) => setContributecircleId(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md mb-3 focus:ring-2 focus:ring-purple-200"
          />
          <input
            type="text"
            placeholder="User ID"
            value={contributeUserId}
            onChange={(e) => setContributeUserId(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md mb-3 focus:ring-2 focus:ring-pink-200"
          />
          <input
            type="number"
            placeholder="Contribution Amount"
            value={contributionAmount}
            onChange={(e) => setContributionAmount(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md mb-3 focus:ring-2 focus:ring-pink-200"
          />
          <button
            onClick={contribute}
            className="bg-pink-300 hover:bg-pink-400 text-pink-900 font-medium px-6 py-2 rounded-md transition shadow-sm"
          >
            Contribute
          </button>
        </div>

        {/* Response Message */}
        {responseMsg && (
          <div className="text-center text-blue-600 text-sm font-medium pt-2">
            {responseMsg}
          </div>
        )}
      </div>
    </div>
  );
}
