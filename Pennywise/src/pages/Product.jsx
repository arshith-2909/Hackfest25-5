import { useState, useEffect } from "react";
import Wishlist from "./Wishlist";

// Example of initial products array with image URLs fetched from the internet
const initialProducts = [
  { id: 1, name: "iPhone 14", price: 79900, image: "https://example.com/images/iphone14.jpg" },
  { id: 2, name: "MacBook Air M2", price: 119900, image: "https://example.com/images/macbook_air.jpg" },
  { id: 3, name: "Boat Airdopes", price: 1799, image: "https://example.com/images/boat_airdopes.jpg" },
  { id: 4, name: "Sony WH-1000XM5", price: 29990, image: "https://example.com/images/sony_headphones.jpg" },
  { id: 5, name: "Canon EOS R50", price: 78999, image: "https://example.com/images/canon_eos_r50.jpg" },
  { id: 6, name: "iPad 10th Gen", price: 44900, image: "https://example.com/images/ipad_10th_gen.jpg" },
  { id: 7, name: "OnePlus 12", price: 64999, image: "https://example.com/images/oneplus12.jpg" },
  { id: 8, name: "Samsung Galaxy S24", price: 74999, image: "https://example.com/images/samsung_galaxy_s24.jpg" },
  { id: 9, name: "Dell XPS 15", price: 149999, image: "https://example.com/images/dell_xps_15.jpg" },
  { id: 10, name: "GoPro Hero 12", price: 41990, image: "https://example.com/images/gopro_hero12.jpg" },
  { id: 11, name: "AirTag (4 Pack)", price: 10900, image: "https://example.com/images/airtag_4pack.jpg" },
  { id: 12, name: "Logitech MX Master 3", price: 9990, image: "https://example.com/images/logitech_mx_master3.jpg" },
  { id: 13, name: "Amazon Kindle", price: 8999, image: "https://example.com/images/amazon_kindle.jpg" },
  { id: 14, name: "Apple Watch SE", price: 29900, image: "https://example.com/images/apple_watch_se.jpg" },
  { id: 15, name: "Echo Dot (5th Gen)", price: 4499, image: "https://example.com/images/echo_dot.jpg" },
  { id: 16, name: "PS5 Digital", price: 44990, image: "https://example.com/images/ps5_digital.jpg" },
  { id: 17, name: "Xbox Series S", price: 34990, image: "https://example.com/images/xbox_series_s.jpg" },
  { id: 18, name: "Samsung M8 Monitor", price: 49999, image: "https://example.com/images/samsung_m8_monitor.jpg" },
  { id: 19, name: "ASUS ROG Strix", price: 169999, image: "https://example.com/images/asus_rog_strix.jpg" },
  { id: 20, name: "Lenovo Legion 5 Pro", price: 139999, image: "https://example.com/images/lenovo_legion5_pro.jpg" },
];

function ProductList() {
  const [wishlist, setWishlist] = useState([]);
  const [customTarget, setCustomTarget] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedTarget = localStorage.getItem("customTarget");
    if (savedTarget) setCustomTarget(Number(savedTarget));
  }, []);

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const updateCustomTarget = (value) => {
    setCustomTarget(value);
    localStorage.setItem("customTarget", value);
    fetch("http://localhost:5000/target", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(value) }),
    });
  };

  const filteredProducts = initialProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-black text-green-500">
      <div className="md:w-2/3">
        <input
          type="text"
          placeholder="Search product..."
          className="border border-green-500 bg-black text-green-500 p-2 w-full mb-4 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-black shadow border border-green-500 p-4 rounded"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="font-bold text-green-500">{product.name}</h3>
              <p>₹{product.price}</p>
              <button
                onClick={() => addToWishlist(product)}
                className="mt-2 bg-green-700 text-black px-3 py-1 rounded"
              >
                Add to Wishlist
              </button>
            </div>
          ))}
        </div>
      </div>
      <Wishlist
        wishlist={wishlist}
        customTarget={customTarget}
        updateCustomTarget={updateCustomTarget}
        removeFromWishlist={removeFromWishlist}
      />
    </div>
  );
}

export default ProductList;
