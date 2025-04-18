import { useEffect, useState } from "react";

function Wishlist({ wishlist, removeFromWishlist }) {
  const email = localStorage.getItem("userEmail"); // Get email from localStorage

  const [customTarget, setCustomTarget] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [editMode, setEditMode] = useState(false);

  // Function to send email and target to the backend
  const updateCustomTarget = async (newTarget) => {
    try {
      // Send email and target amount to backend
      const res = await fetch("http://localhost:5000/api/target", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, amount: newTarget }),
      });

      const data = await res.json();
      console.log("Saved to MongoDB:", data);
      setCustomTarget(newTarget);
    } catch (err) {
      console.error("Failed to save to MongoDB:", err);
    }
  };

  const handleSetWishlistAsTarget = () => {
    const totalWishlist = wishlist.reduce((sum, item) => sum + item.price, 0);
    updateCustomTarget(Number(customTarget) + totalWishlist);
  };

  const handleManualTarget = () => {
    const newTarget = Number(inputValue);
    updateCustomTarget(Number(customTarget) + newTarget);
    setInputValue("");
  };

  // Calculate total wishlist value
  const totalWishlist = wishlist.reduce((sum, item) => sum + item.price, 0);
  const totalTarget = totalWishlist + customTarget;

  return (
    <div className="bg-gray-100 p-4 rounded-xl w-full md:w-1/3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Wishlist</h2>
        <button onClick={() => window.history.back()} className="text-blue-600 underline text-sm">
          ← Back
        </button>
      </div>

      {(wishlist.length === 0 && customTarget === 0) ? (
        <p>No items yet — just set a target below 👇</p>
      ) : (
        <ul className="space-y-2">
          {wishlist.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b pb-1">
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                <span>₹{item.price}</span>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-500 text-sm"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}

          <li className="flex justify-between text-blue-700 mt-2">
            <span>Custom Target</span>
            <span>₹{customTarget}</span>
          </li>

          <li className="flex justify-between font-bold border-t pt-2 mt-2">
            <span>Total Wishlist Value</span>
            <span>₹{totalWishlist}</span>
          </li>

          <li className="flex justify-between font-bold border-t pt-2 mt-2 text-green-700">
            <span>Final Target</span>
            <span>₹{totalTarget}</span>
          </li>
        </ul>
      )}

      {/* BUTTONS */}
      <div className="mt-4 space-y-3">
        <button
          onClick={handleSetWishlistAsTarget}
          className="bg-indigo-600 text-white px-3 py-2 rounded w-full"
        >
          🎯 Set Wishlist as Target (₹{totalWishlist}) + ₹{customTarget}
        </button>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-purple-600 text-white px-3 py-2 rounded w-full"
          >
            ✍️ Set Custom Target
          </button>
        ) : (
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Enter custom ₹"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border px-3 py-1 rounded w-full"
            />
            <button
              onClick={handleManualTarget}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
