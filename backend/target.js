const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mongoose schema & model
const targetSchema = new mongoose.Schema({
  email: { type: String, required: true },
  customTarget: { type: Number, required: true },
  totalWishlist: { type: Number, required: true },
  totalTarget: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const Target = mongoose.model('Target', targetSchema); // will map to "targets" collection

// ✅ POST route to save target info
app.post('/api/target', async (req, res) => {
  const { email, customTarget, totalWishlist } = req.body;

  try {
    const totalTarget = Number(customTarget) + Number(totalWishlist);

    const targetData = new Target({
      email,
      customTarget,
      totalWishlist,
      totalTarget
    });

    await targetData.save();

    res.status(201).json({ message: 'Target saved successfully!', data: targetData });
  } catch (error) {
    console.error("Error saving target:", error);
    res.status(500).json({ error: 'Failed to save target' });
  }
});

// ✅ MongoDB connection (your "target" DB)
mongoose.connect('mongodb+srv://karthik12:Karthik1234@cluster0.zi1bjbr.mongodb.net/target', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB (target DB)');
  app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
