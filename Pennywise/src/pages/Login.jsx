import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const features = [
    { title: "Gamified Quiz", subtitle: "Fun Learning Financial Literacy Tool" },
    { title: "Smart Money Saving", subtitle: "Effortless Savings Through Smart Rounding" },
    { title: "Bill Payment", subtitle: "Seamless Transactions Anytime, Anywhere" },
    { title: "Wishlist Manager", subtitle: "Organized Dream List Made Easy" },
  ];

  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  // Automatically cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("userEmail", user.email);

        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          phoneNumber: phoneNumber,
        });

        navigate("/details-form");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("userEmail", userCredential.user.email);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const featureVariants = {
    enter: {
      opacity: 0,
      x: "100%",
      scale: 0.9,
    },
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      x: "-100%",
      scale: 0.9,
    },
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#1A1D23]">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center bg-[#2F3436] text-white p-8">
        <div className="w-full max-w-md bg-[#1A1D23] backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#E0E0E0]">
            {isRegistering ? "Create Account" : "Login"}
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-[#34C759] focus:outline-none focus:ring-2 focus:ring-[#34C759] text-[#E0E0E0]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-[#34C759] focus:outline-none focus:ring-2 focus:ring-[#34C759] text-[#E0E0E0]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isRegistering && (
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full px-4 py-2 rounded-lg bg-transparent border border-[#34C759] focus:outline-none focus:ring-2 focus:ring-[#34C759] text-[#E0E0E0]"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            )}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#34C759] hover:bg-[#8BC34A] text-[#1A1D23] font-bold transition"
            >
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>
          <div className="mt-4 text-center">
            {isRegistering ? (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setIsRegistering(false)}
                  className="text-[#34C759] hover:underline"
                >
                  Login
                </button>
              </p>
            ) : (
              <p>
                New user?{" "}
                <button
                  onClick={() => setIsRegistering(true)}
                  className="text-[#34C759] hover:underline"
                >
                  Register
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-[#2F3436] flex flex-col justify-center items-center p-6 overflow-hidden relative">
        <div className="w-full max-w-md h-48 relative">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={activeFeatureIndex}
              variants={featureVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col justify-center items-center text-center bg-[#34C759] text-[#1A1D23] shadow-lg rounded-2xl p-6"
              style={{
                margin: "2rem",
              }}
            >
              <h3 className="text-xl font-bold">{features[activeFeatureIndex].title}</h3>
              <p className="text-sm mt-2">{features[activeFeatureIndex].subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Login;