import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({
    income: "",
    phoneNumber: "",
    accountNo: "",
    atmNo: "",
    bankPassword: "",
    spareChange: "",
    displayName: "",
  });
  const [editField, setEditField] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [editField]: e.target.value });
  };

  const handleSave = async () => {
    if (!user || !editField) return;
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        [editField]: data[editField],
      });
      setEditField(null);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleNameSave = async () => {
    if (!user || !newName) return;
    try {
      await updateDoc(doc(db, "users", user.uid), {
        displayName: newName,
      });
      setData((prevData) => ({ ...prevData, displayName: newName }));
      setNewName("");
      setEditingName(false);
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const fields = [
    { key: "income", label: "Income" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "accountNo", label: "Account Number" },
    { key: "atmNo", label: "ATM Number" },
    { key: "bankPassword", label: "Bank Password" },
    { key: "spareChange", label: "Spare Change" },
  ];

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-10 rounded-xl bg-[#000000] text-white border border-[#355E3B] border-[1px] shadow-[0_0_80px_10px_rgba(52,199,89,0.25)] animate-pulse">
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
    <div className="max-w-2xl mx-auto p-6 mt-10 rounded-xl bg-[#000000] text-white border border-[#355E3B] border-[1px] shadow-[0_0_80px_10px_rgba(52,199,89,0.25)]">
      <h2 className="text-2xl font-bold mb-6 text-[#34C759]">👤 Profile</h2>

      {user ? (
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-300">Name</p>
            {editingName ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="px-3 py-2 border border-gray-600 rounded-md bg-[#1A1D23] text-white focus:outline-none focus:ring-2 focus:ring-[#34C759]"
                />
                <button
                  onClick={handleNameSave}
                  className="px-4 py-1 text-sm bg-[#34C759] text-white rounded-md hover:bg-green-700 transition"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium">{data.displayName || "N/A"}</p>
                <button
                  onClick={() => setEditingName(true)}
                  className="px-4 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-300">Email</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>

          <hr className="border-gray-700" />

          {fields.map((field) => (
            <div key={field.key} className="flex items-center justify-between gap-4">
              <div className="flex flex-col flex-grow">
                <label className="text-sm text-gray-300">{field.label}</label>
                {editField === field.key ? (
                  <input
                    type="text"
                    className="mt-1 px-3 py-2 border border-gray-600 rounded-md bg-[#1A1D23] text-white focus:outline-none focus:ring-2 focus:ring-[#34C759]"
                    value={data[field.key] || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-base font-medium text-white mt-1">
                    {field.key === "income" || field.key === "spareChange"
                      ? `₹${data[field.key] || "Not set"}`
                      : data[field.key] || "Not set"}
                  </p>
                )}
              </div>

              <div className="flex-shrink-0 mt-6">
                {editField === field.key ? (
                  <button
                    onClick={handleSave}
                    className="px-4 py-1 text-sm bg-[#34C759] text-white rounded-md hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditField(field.key)}
                    className="px-4 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-400 text-center">User not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
