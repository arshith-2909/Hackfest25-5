import React from "react";
import axios from "axios";

const Recharge = () => {
  const handleRecharge = async () => {
    try {
      const amount = 500; // amount in rupees

      const { data } = await axios.post("http://localhost:5000/create-order", {
        amount,
      });

      const options = {
        key: "rzp_test_324CoSO7L2dLSO", // Razorpay test key
        amount: data.amount,
        currency: data.currency,
        name: "Recharge Payment",
        description: "Test Transaction",
        order_id: data.id,
        handler: function (response) {
          alert("Payment Successful!");
          console.log("Razorpay Response:", response);
        },
        prefill: {
          name: "Aadithya Nayak V",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error during payment:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <h1>Recharge</h1>
      <button onClick={handleRecharge}>Pay ₹500</button>
    </div>
  );
};

export default Recharge;
