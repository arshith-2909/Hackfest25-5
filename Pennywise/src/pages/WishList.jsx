import { useState } from "react";

function Wishlist({ wishlist, customTarget, updateCustomTarget, removeFromWishlist }) {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Calculate total wishlist value
  const totalWishlist = wishlist.reduce((sum, item) => sum + item.price, 0);

  // Calculate final target as wishlist total + current custom target
  const totalTarget = totalWishlist + Number(customTarget);

  // Handle setting wishlist total as target and adding to existing target
  const handleSetWishlistAsTarget = () => {
    updateCustomTarget(Number(customTarget) + totalWishlist); // Add wishlist total to current target
  };

  // Handle manual target entry and addition to the current target
  const handleManualTarget = () => {
    const newTarget = Number(inputValue);
    updateCustomTarget(Number(customTarget) + newTarget); // Add manual target to current target
    setInputValue(""); // Clear input field after adding
  };

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
        {/* 1. Set Wishlist as Target */}
        <button
          onClick={handleSetWishlistAsTarget} // Add wishlist total to current target
          className="bg-indigo-600 text-white px-3 py-2 rounded w-full"
        >
          🎯 Set Wishlist as Target (₹{totalWishlist})+ {customTarget}
        </button>

        {/* 2. Set Custom Target */}
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
              onClick={handleManualTarget} // Add manually entered target to the current target
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
