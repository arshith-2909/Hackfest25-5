import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: Number,
  paymentId: String,
  orderId: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Transaction", transactionSchema);
