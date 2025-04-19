// Backend (server.js)
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
require('dotenv').config();
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); 
// const Razorpay = require('razorpay');


// API Keys (Replace with your actual keys)
const ALPHA_VANTAGE_API_KEY = 'your_alpha_vantage_api_key';
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';

// Dummy Data
const userProfile = { name: "John Doe", email: "john@example.com", riskLevel: "Medium" };
const expenses = [
    { id: 1, category: "Food", amount: 20, date: "2025-04-01" },
    { id: 2, category: "Rent", amount: 500, date: "2025-04-01" }
];
const investmentData = { risk: "Medium", suggestedInvestments: ["Stock A", "ETF B"] };
const adEarnings = { total: 15.50 };
const chatbotResponses = { "How to save money?": "Track your expenses and invest wisely." };

// Stock Data from Alpha Vantage
app.get('/stocks', async (req, res) => {
    try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${ALPHA_VANTAGE_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
});

// Crypto Prices from CoinGecko
app.get('/crypto', async (req, res) => {
    try {
        const response = await axios.get(COINGECKO_API_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch crypto data' });
    }
});

// Payment with Razorpay
app.post('/create-order', async (req, res) => {
    try {
        const razorpay = new Razorpay({ key_id: 'your_key_id', key_secret: 'your_key_secret' });
        const options = { amount: req.body.amount * 100, currency: 'INR', payment_capture: 1 };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Payment failed' });
    }
});

app.post('/classify-expense', async (req, res) => {
    const { features } = req.body;
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict/expense', { features });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error calling Flask API' });
    }
});

app.post('/predict-savings', async (req, res) => {
    const { features } = req.body;
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict/savings', { features });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error calling Flask API' });
    }
});

app.post('/investment-risk', async (req, res) => {
    const { features } = req.body;
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict/risk', { features });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error calling Flask API' });
    }
});


const fredRoutes = require('./routes/fred');
app.use( fredRoutes);




function roundUp(amount) {
  const rounded = Math.ceil(amount);
  return { rounded, saved: rounded - amount };
}





    app.post("/pay-bill", (req, res) => {
        const { amount } = req.body;
        const amt = parseFloat(amount);
        const twoPercent = amt * 0.02;
        const nextTen = Math.ceil(amt / 10) * 10;
        const roundUp = Math.max(nextTen, amt + twoPercent);
        const final = parseFloat(roundUp.toFixed(2));
        const saved = parseFloat((final - amt).toFixed(2));
        
//   saveExpense({
//     userId,
//     amount,
//     roundedAmount: rounded,
//     savedChange: saved,
//     category: 'Bills',
//     source: 'Utility Bill',
//     date: new Date(),
//     details: { type, provider }
//   });
      
        res.json({
          chargedAmount: final,
          savedChange: saved,
          billImg: "https://placehold.co/600x400?text=Bill+Image", // dummy bill image
        });
      });

      // Recharge route
app.post("/recharge", (req, res) => {
    const { amount } = req.body;
    const amt = parseFloat(amount);
    const twoPercent = amt * 0.02;
    const nextTen = Math.ceil(amt / 10) * 10;
    const final = Math.max(nextTen, amt + twoPercent).toFixed(2);
    const saved = (final - amt).toFixed(2);
  //   saveExpense({
//     userId,
//     amount,
//     roundedAmount: rounded,
//     savedChange: saved,
//     category: 'Recharge',
//     source: 'Mobile Recharge',
//     date: new Date(),
//     details: { number, operator }
//   });

    res.json({
      chargedAmount: final,
      savedChange: saved,
      rechargeImg: "https://placehold.co/600x400?text=Recharge+Success",
    });
  });
  
  // Flight booking route
  app.post("/book-flight", (req, res) => {
    const { amount } = req.body;
    const amt = parseFloat(amount);
    const twoPercent = amt * 0.02;
    const nextTen = Math.ceil(amt / 10) * 10;
    const final = Math.max(nextTen, amt + twoPercent).toFixed(2);
    const saved = (final - amt).toFixed(2);
  //   saveExpense({
//     userId,
//     amount: price,
//     roundedAmount: rounded,
//     savedChange: saved,
//     category: 'Travel',
//     source: 'Flight Booking',
//     date: new Date(),
//     details: { from, to, passengerName }
//   });
    res.json({
      chargedAmount: final,
      savedChange: saved,
      ticketImg: "https://placehold.co/600x400?text=Ticket+Booked",
    });
  });
  
      





//game 


let user = {
  coins: 1000,
  portfolio: [],
  quizCompleted: false,
};

const market = [
  { id: 1, name: 'Tech Corp', price: 120, type: 'stock' },
  { id: 2, name: 'Health Inc', price: 80, type: 'stock' },
  { id: 3, name: 'Safe Bank FD', price: 100, type: 'fd' },
  { id: 4, name: 'Growth Fund', price: 200, type: 'mf' },
  { id: 5, name: 'CryptoCoin', price: 60, type: 'crypto' },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does ROI stand for in investing?',
    options: ['Return on Investment', 'Rate of Interest', 'Revenue on Income', 'Risk of Investment'],
    answer: 'Return on Investment',
  },
  {
    id: 2,
    question: 'Which is considered a safer investment?',
    options: ['Stocks', 'Mutual Funds', 'Fixed Deposits', 'Cryptocurrency'],
    answer: 'Fixed Deposits',
  },
  {
    id: 3,
    question: 'What is diversification in investing?',
    options: ['Putting all money in one stock', 'Investing in multiple asset types', 'Borrowing to invest', 'Only buying crypto'],
    answer: 'Investing in multiple asset types',
  },
  {
    id: 4,
    question: 'What’s the primary goal of investing?',
    options: ['Saving money', 'Avoiding tax', 'Growing wealth over time', 'Getting rich quick'],
    answer: 'Growing wealth over time',
  },
  {
    id: 5,
    question: 'What does a higher risk usually mean?',
    options: ['Higher possible returns', 'Lower returns', 'Guaranteed safety', 'No change'],
    answer: 'Higher possible returns',
  },
];

app.get('/quiz', (req, res) => {
  res.json(quizQuestions);
});

app.post('/quiz/submit', (req, res) => {
  const { answers } = req.body;
  let score = 0;
  quizQuestions.forEach((q, idx) => {
    if (answers[idx] && answers[idx] === q.answer) score++;
  });

  if (score >= 4 && !user.quizCompleted) {
    user.coins += 1000;
    user.quizCompleted = true;
    res.json({ message: 'Quiz passed! You Got Coins in Your Game Wallet', bonus: 1000, coins: user.coins });
  } else {
    res.json({ message: 'Quiz failed try again', coins: user.coins });
  }
});

app.post('/investt', (req, res) => {
  const { stockId } = req.body;
  const stock = market.find((s) => s.id === stockId);
  if (!stock) return res.status(404).json({ message: 'Stock not found' });

  if (user.coins >= stock.price) {
    const profitMultiplier = Math.random() * (1.5 - 0.5) + 0.5; // 0.5x to 1.5x
    const returnAmount = Math.round(stock.price * profitMultiplier);
    const isProfit = returnAmount > stock.price;
    user.coins = user.coins - stock.price + returnAmount;
    user.portfolio.push({ ...stock, returnAmount, isProfit });
    res.json({
      coins: user.coins,
      portfolio: user.portfolio,
      result: isProfit ? 'Profit' : 'Loss',
      change: returnAmount - stock.price,
    });
  } else {
    res.status(400).json({ message: 'Not enough coins' });
  }
});

//qrcode

app.post("/api/qrcode", (req, res) => {
  const { qr } = req.body;

  // Dummy logic: decode based on QR content
  const response = {
    name: "Scanned QR",
    message: `You scanned: ${qr}`,
  };

  res.json(response);
});

// //app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// Dummy data for portfolio and current prices
let portfolio = [
  {
    user_id: 'user123',
    ticker: 'AAPL',
    asset_type: 'stock',
    amount: 10,
    price_at_investment: 150,
  },
  {
    user_id: 'user123',
    ticker: 'bitcoin',
    asset_type: 'crypto',
    amount: 2,
    price_at_investment: 40000,
  },
  {
    user_id: 'user123',
    ticker: 'TSLA',
    asset_type: 'stock',
    amount: 5,
    price_at_investment: 600,
  },
];

// Dummy data for current prices
const currentPrices = {
  AAPL: 160,
  bitcoin: 25000,
  TSLA: 650,
  AMZN: 3500,
  GOOGL: 2800,
  MSFT: 300,
};

// Fetch current prices of assets (dummy data)
app.get('/current-prices', (req, res) => {
  res.json(currentPrices);
});

// Fetch portfolio data (dummy data)
app.get('/portfolio', (req, res) => {
  res.json(portfolio);
});

// Endpoint to simulate investment action (dummy investment, adds to portfolio)
app.post('/invest', (req, res) => {
  const { user_id, asset_type, ticker, amount } = req.body;

  // Dummy price (in a real case, fetch from an API)
  const price_at_investment = currentPrices[ticker] || 0;

  const newInvestment = {
    user_id,
    ticker,
    asset_type,
    amount,
    price_at_investment,
  };

  // Add the investment to the portfolio
  portfolio.push(newInvestment);

  res.json({
    message: `Successfully invested in ${ticker}`,
    price_at_investment,
  });
});

// Auto Invest Endpoint: Invests in 3 random assets (stocks/crypto)
app.post('/auto-invest', (req, res) => {
  const { amount } = req.body;

  const allAssets = Object.keys(currentPrices);
  const selectedAssets = [];

  // Randomly select 3 assets from the available list
  while (selectedAssets.length < 3) {
    const randomTicker = allAssets[Math.floor(Math.random() * allAssets.length)];
    const assetType = randomTicker.match(/^[a-z]+$/) ? 'crypto' : 'stock';
    selectedAssets.push({
      ticker: randomTicker,
      asset_type: assetType,
      amount: Math.floor(amount / 3),
    });
  }

  // Fetch prices of the selected assets
  const selectedWithPrices = selectedAssets.map((asset) => ({
    ...asset,
    price_at_investment: currentPrices[asset.ticker] || 0,
  }));

  // Add the investments to the portfolio
  selectedWithPrices.forEach((asset) => {
    portfolio.push(asset);
  });

  res.json({
    message: 'Auto-investment completed successfully!',
    investments: selectedWithPrices,
  });
});

// Recommendation Endpoint: Fetch recommended assets for investment
app.get('/recommendation', (req, res) => {
  // For demo purposes, returning a static list of assets
  const recommendations = [
    { ticker: 'AAPL', type: 'stock' },
    { ticker: 'TSLA', type: 'stock' },
    { ticker: 'GOOGL', type: 'stock' },
    { ticker: 'bitcoin', type: 'crypto' },
    { ticker: 'ethereum', type: 'crypto' },
    { ticker: 'ripple', type: 'crypto' },
  ];

  res.json(recommendations);
});

// Calculate Profit/Loss for a user based on current prices
app.post('/profit-loss', (req, res) => {
  const { user_id } = req.body;

  // Filter portfolio for the specified user (in this case, it's hardcoded)
  const userPortfolio = portfolio.filter((investment) => investment.user_id === user_id);

  // Calculate the profit/loss for each asset
  const profitLoss = userPortfolio.map((investment) => {
    const currentPrice = currentPrices[investment.ticker] || 0;
    const profitLossAmount = (currentPrice - investment.price_at_investment) * investment.amount;

    return {
      ticker: investment.ticker,
      amount_invested: investment.price_at_investment * investment.amount,
      current_value: currentPrice * investment.amount,
      profit_loss: profitLossAmount,
    };
  });

  // Calculate total profit/loss
  const totalProfitLoss = profitLoss.reduce((total, asset) => total + asset.profit_loss, 0);

  res.json({
    profitLoss,
    totalProfitLoss,
  });
});
// 🛒 Frontend-only wishlist storage
let wishlist = [];

app.post("/wishlist", (req, res) => {
  const { id, name, price } = req.body;
  wishlist.push({ id, name, price });
  res.status(201).json({ message: "Added to wishlist (frontend only)" });
});

app.get("/wishlist", (req, res) => {
  res.json(wishlist);
});

// 📦 MongoDB connection
// const MONGO_URI = "mongodb+srv://karthik12:Karthik1234@cluster0.zi1bjbr.mongodb.net/target";

// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // 📄 Target schema with email
// const targetSchema = new mongoose.Schema({
//   email: String,
//   amount: Number,
// });

// const Target = mongoose.model("Target", targetSchema);

// // 💾 Save or update target for specific email
// app.post("/api/target", async (req, res) => {
//   const { email, amount } = req.body;

//   try {
//     let target = await Target.findOne({ email });

//     if (target) {
//       target.amount = amount;
//       await target.save();
//     } else {
//       target = new Target({ email, amount });
//       await target.save();
//     }

//     res.status(201).json({ message: "Target saved", target });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to save target" });
//   }
// });

// // 📤 Get target by email
// app.get("/target", async (req, res) => {
//   const { email } = req.query;

//   try {
//     const target = await Target.findOne({ email });
//     res.json(target || { amount: 0 });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch target" });
//   }
// });


// ✅ Connect to MongoDB
// mongoose.connect("mongodb+srv://karthik12:Karthik1234@cluster0.zi1bjbr.mongodb.net/target", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // ✅ Target Schema (has email + amount)
// const targetSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   amount: { type: Number, required: true },
// });

// const Target = mongoose.model("Target", targetSchema);

// ✅ Save or Update target
app.post("/api/target", async (req, res) => {
  const { email, amount } = req.body;

  if (!email || amount == null) {
    return res.status(400).json({ error: "Email and amount are required" });
  }

  try {
    let existing = await Target.findOne({ email });

    if (existing) {
      existing.amount = amount;
      await existing.save();
      res.status(200).json({ message: "Target updated", data: existing });
    } else {
      const newTarget = new Target({ email, amount });
      await newTarget.save();
      res.status(201).json({ message: "Target saved", data: newTarget });
    }
  } catch (err) {
    console.error("Error saving target:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get target by email
app.get("/api/target/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const target = await Target.findOne({ email });
    res.status(200).json(target || { amount: 0 });
  } catch (err) {
    console.error("Error fetching target:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// const Razorpay = require("razorpay");



// ✅ Recharge DB (separate connection)
// const rechargeConnection = mongoose.createConnection(
//   "mongodb+srv://karthik12:Karthik1234@cluster0.zi1bjbr.mongodb.net/rechargeDB",
//   {
//     useNewUrlParser: true,
//   }
// );

// rechargeConnection.once("open", () =>
//   console.log("✅ Connected to Recharge DB")
// );

// // ✅ Transaction Schema + Model (using separate connection)
// const transactionSchema = new mongoose.Schema({
//   amount: Number,
//   paymentId: String,
//   orderId: String,
//   status: String,
//   date: { type: Date, default: Date.now },
// });

// const Transaction = rechargeConnection.model("Transaction", transactionSchema);

// // ✅ Razorpay setup
// const razorpay = new Razorpay({
//   key_id: "rzp_test_324CoSO7L2dLSO",
//   key_secret: "CngumTuOFvI2Qc7AhxNuZBWX",
// });app.post('/create-order', async (req, res) => {
//   try {
//     console.log("Received request body:", req.body);  // Add this line to log the request body
//     const { amount } = req.body;

//     if (!amount) {
//       console.log("Amount is missing!");
//       return res.status(400).json({ error: 'Amount is required' });
//     }

//     const order = await razorpay.orders.create({
//       amount: amount * 100,
//       currency: 'INR',
//       receipt: `receipt_order_${Math.random().toString(36).substr(2, 9)}`,
//     });

//     console.log("Razorpay order created:", order);
//     res.json(order);
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);  // More detailed error logging
//     res.status(500).json({ error: 'Payment failed', message: error.message });
//   }
// });
// app.post("/save-recharge", async (req, res) => {
//   const { mobile, provider, enteredAmount, spareChange, totalAmount } = req.body;
//   try {
//     const conn = await mongoose.createConnection(MONGO_URI).asPromise();
//     const Recharge = conn.model("Recharge", new mongoose.Schema({
//       mobile: String,
//       provider: String,
//       enteredAmount: Number,
//       spareChange: Number,
//       totalAmount: Number,
//     }));
//     await Recharge.create({ mobile, provider, enteredAmount, spareChange, totalAmount });
//     res.send({ success: true });
//   } catch (err) {
//     res.status(500).send({ error: "Recharge save failed" });
//   }
// });


// ✅ Save Transaction to MongoDB
app.post("/save-transaction", async (req, res) => {
  const { amount, paymentId, orderId, status } = req.body;

  try {
    const newTransaction = new Transaction({
      amount,
      paymentId,
      orderId,
      status,
    });

    await newTransaction.save();
    res.json({ message: "Transaction saved successfully" });
  } catch (err) {
    console.error("Error saving transaction:", err);
    res.status(500).json({ error: "Failed to save transaction" });
  }
});

// ✅ Optional: Get all transactions
app.get("/transactions", async (req, res) => {
  try {
    const all = await Transaction.find().sort({ date: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});









// ✅ Book API
// app.post("/api/book", async (req, res) => {
//   try {
//     const { category, amount } = req.body;

//     const spareChange = parseFloat((amount * 0.02).toFixed(2));
//     const totalAmount = amount + spareChange;

//     const booking = new Booking({
//       category,
//       amount,
//       spareChange,
//       totalAmount,
//       status: "Booked",
//     });

//     await booking.save();
//     res.status(201).json(booking);
//   } catch (error) {
//     console.error("Booking Error:", error);
//     res.status(500).json({ error: "Booking failed" });
//   }
// });

// // ✅ Cancel spare change API
// app.post("/api/cancel", async (req, res) => {
//   try {
//     const { bookingId } = req.body;

//     const booking = await Booking.findById(bookingId);
//     if (!booking) {
//       return res.status(404).json({ error: "Booking not found" });
//     }

//     booking.totalAmount -= booking.spareChange;
//     booking.spareChange = 0;
//     booking.status = "Spare Change Canceled";

//     await booking.save();
//     res.json(booking);
//   } catch (error) {
//     console.error("Cancel Error:", error);
//     res.status(500).json({ error: "Cancel failed" });
//   }
// });



// app.post("/api/transaction", async (req, res) => {
//   try {
//     const { mobile, amount, spareChange, totalAmount } = req.body;
//     const db = await createConnection();
//     const collection = db.collection("transactions");

//     const result = await collection.insertOne({
//       mobile,
//       amount,
//       spareChange,
//       totalAmount,
//       createdAt: new Date(),
//     });

//     res.status(200).json({ mobile, amount, spareChange, totalAmount });
//   } catch (err) {
//     console.error("Transaction error:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
mongoose.connect("mongodb+srv://karthik12:Karthik1234@cluster0.zi1bjbr.mongodb.net/spareDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

// 📦 Mongoose Schema
const bookingSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Make email unique
  category: String,
  amount: Number,
  spareChange: Number,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);

// 📩 Route to handle booking POST request
// 📩 Route to handle booking POST request
app.post("/api/book", async (req, res) => {
  const { email, category, amount, spareChange, totalAmount } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    // Check if booking already exists for the email
    const existingBooking = await Booking.findOne({ email });

    if (existingBooking) {
      // Increment the spare change if email already exists
      const updatedSpareChange = existingBooking.spareChange + spareChange;
      const updatedTotalAmount = existingBooking.totalAmount + totalAmount;

      // Update the document
      existingBooking.spareChange = updatedSpareChange;
      existingBooking.totalAmount = updatedTotalAmount;
      existingBooking.category = category;  // Update category if needed
      existingBooking.amount = amount;      // Update amount if needed

      const updatedBooking = await existingBooking.save();
      return res.status(200).json(updatedBooking);
    }

    // If email doesn't exist, create a new booking
    const newBooking = new Booking({
      email,
      category,
      amount,
      spareChange,
      totalAmount,
    });
    const savedBooking = await newBooking.save();

    res.status(201).json(savedBooking);
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

// ----------------- Start Server ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
