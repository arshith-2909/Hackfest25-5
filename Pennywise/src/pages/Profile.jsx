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

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading user info...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">👤 Profile</h2>

      {user ? (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleNameSave}
                  className="px-4 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium">{data.displayName || "N/A"}</p>
                <button
                  onClick={() => setEditingName(true)}
                  className="px-4 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>

          <hr className="my-4" />

          {fields.map((field) => (
            <div key={field.key} className="flex items-center justify-between gap-4">
              <div className="flex flex-col flex-grow">
                <label className="text-sm text-gray-500">{field.label}</label>
                {editField === field.key ? (
                  <input
                    type="text"
                    className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={data[field.key] || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-base font-medium text-gray-800 mt-1">
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
                    className="px-4 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditField(field.key)}
                    className="px-4 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500 text-center">User not logged in.</p>
      )}
    </div>
  );
};

export default Profile;
