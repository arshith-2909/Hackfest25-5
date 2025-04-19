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
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const withLoading = async (fn) => {
    setLoading(true);
    await fn();
    setLoading(false);
  };

  const createCircle = () =>
    withLoading(async () => {
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
    });

  const getAllCircles = () =>
    withLoading(async () => {
      try {
        const res = await axios.get('http://localhost:5001/circles');
        setAllCircles(res.data);
      } catch (err) {
        console.error(err);
        setResponseMsg('Error fetching circles');
      }
    });

  const getMembers = () =>
    withLoading(async () => {
      try {
        const res = await axios.get(`http://localhost:5001/circles/${memberCircleId}`);
        setMembersList(res.data.members || []);
      } catch (err) {
        console.error(err);
        setResponseMsg('Error fetching members');
      }
    });

  const joinCircle = () =>
    withLoading(async () => {
      try {
        const res = await axios.put(`http://localhost:5001/circles/${joinCircleId}/join`, {
          userId: joinUserId
        });
        setResponseMsg(res.data.message);
      } catch (err) {
        console.error(err);
        setResponseMsg('Error joining circle');
      }
    });

  const contribute = () =>
    withLoading(async () => {
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
    });

  // 🔄 Loading Animation
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10 rounded-xl bg-[#000000] text-white border border-[#355E3B] shadow-[0_0_80px_10px_rgba(52,199,89,0.25)] animate-pulse">
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
    <div className="min-h-screen py-10 px-4 text-white bg-[#000000]">
      <div className="max-w-3xl mx-auto bg-[#000000] border border-[#355E3B] shadow-[0_0_80px_10px_rgba(52,199,89,0.25)] rounded-xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-[#34C759] text-center">🔁 Social Invest</h1>

        <div className="text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#34C759]/20 hover:bg-[#34C759]/30 text-[#34C759] font-medium px-5 py-2 rounded-md transition"
          >
            {showForm ? 'Cancel' : 'Create Circle'}
          </button>
        </div>

        {showForm && (
          <div className="bg-[#1A1D23] p-6 rounded-lg border border-gray-600">
            <h2 className="text-xl font-semibold mb-4 text-white">Create a Circle</h2>
            <form className="space-y-4">
              {['name', 'createdBy', 'monthlyTarget', 'planType', 'riskLevel'].map((field) => (
                <input
                  key={field}
                  type={field === 'monthlyTarget' ? 'number' : 'text'}
                  name={field}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border border-gray-600 px-4 py-2 rounded-md bg-[#000000] text-white focus:outline-none focus:ring-2 focus:ring-[#34C759]"
                />
              ))}
              <button
                type="button"
                onClick={createCircle}
                className="bg-[#34C759] text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
              >
                Create Circle
              </button>
              {circleId && (
                <p className="mt-2 text-sm text-green-400">
                  New Circle ID: <strong>{circleId}</strong>
                </p>
              )}
            </form>
          </div>
        )}

        {/* All other sections follow the same theming */}
        {[
          {
            title: 'All Circles',
            color: 'teal',
            content: (
              <>
                <button
                  onClick={getAllCircles}
                  className="bg-[#34C759]/20 hover:bg-[#34C759]/30 text-[#34C759] font-medium px-5 py-2 rounded-md transition"
                >
                  Load Circles
                </button>
                <ul className="mt-3 text-left list-disc list-inside text-white">
                  {allCircles.map((id, idx) => (
                    <li key={idx}>{id}</li>
                  ))}
                </ul>
              </>
            )
          },
          {
            title: 'View Members',
            content: (
              <>
                <input
                  type="text"
                  placeholder="Enter Circle ID"
                  value={memberCircleId}
                  onChange={(e) => setMemberCircleId(e.target.value)}
                  className="w-full border border-gray-600 px-4 py-2 rounded-md mb-3 bg-[#1A1D23] text-white focus:ring-2 focus:ring-[#34C759]"
                />
                <button
                  onClick={getMembers}
                  className="bg-[#34C759] hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
                >
                  View Members
                </button>
                <ul className="mt-3 list-disc list-inside text-white">
                  {membersList.map((member, idx) => (
                    <li key={idx}>{member}</li>
                  ))}
                </ul>
              </>
            )
          },
          {
            title: 'Join Circle',
            content: (
              <>
                <input
                  type="text"
                  placeholder="Circle ID"
                  value={joinCircleId}
                  onChange={(e) => setJoinCircleId(e.target.value)}
                  className="w-full border border-gray-600 px-4 py-2 rounded-md mb-3 bg-[#1A1D23] text-white"
                />
                <input
                  type="text"
                  placeholder="User ID"
                  value={joinUserId}
                  onChange={(e) => setJoinUserId(e.target.value)}
                  className="w-full border border-gray-600 px-4 py-2 rounded-md mb-3 bg-[#1A1D23] text-white"
                />
                <button
                  onClick={joinCircle}
                  className="bg-[#34C759] hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
                >
                  Join Circle
                </button>
              </>
            )
          },
          {
            title: 'Contribute',
            content: (
              <>
                <input
                  type="text"
                  placeholder="Circle ID"
                  value={contributecircleId}
                  onChange={(e) => setContributecircleId(e.target.value)}
                  className="w-full border border-gray-600 px-4 py-2 rounded-md mb-3 bg-[#1A1D23] text-white"
                />
                <input
                  type="text"
                  placeholder="User ID"
                  value={contributeUserId}
                  onChange={(e) => setContributeUserId(e.target.value)}
                  className="w-full border border-gray-600 px-4 py-2 rounded-md mb-3 bg-[#1A1D23] text-white"
                />
                <input
                  type="number"
                  placeholder="Contribution Amount"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(e.target.value)}
                  className="w-full border border-gray-600 px-4 py-2 rounded-md mb-3 bg-[#1A1D23] text-white"
                />
                <button
                  onClick={contribute}
                  className="bg-[#34C759] hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
                >
                  Contribute
                </button>
              </>
            )
          }
        ].map((section, i) => (
          <div key={i} className="bg-[#1A1D23] p-6 rounded-lg border border-gray-600">
            <h2 className="text-lg font-medium mb-3 text-white">{section.title}</h2>
            {section.content}
          </div>
        ))}

        {/* Response Message */}
        {responseMsg && (
          <div className="text-center text-[#34C759] text-sm font-medium pt-2">
            {responseMsg}
          </div>
        )}
      </div>
    </div>
  );
}
