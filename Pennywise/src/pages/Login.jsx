import React, { useState } from "react";
import { auth, provider, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          phoneNumber: phoneNumber,
        });
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      navigate("/form");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        phoneNumber: phoneNumber || "N/A",
      }, { merge: true });

      navigate("/form");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 shadow-lg rounded-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-semibold text-indigo-600 text-center mb-6">
          {isRegistering ? "Create Account" : "Login"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isRegistering && (
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <div className="text-center text-sm mt-4 text-gray-600">
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsRegistering(false)}
                className="text-indigo-600 font-medium hover:underline"
              >
                Login
              </button>
            </>
          ) : (
            <>
              New user?{" "}
              <button
                onClick={() => setIsRegistering(true)}
                className="text-indigo-600 font-medium hover:underline"
              >
                Register
              </button>
            </>
          )}
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 bg-white border border-gray-300 rounded-lg hover:shadow-md flex items-center justify-center transition"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
