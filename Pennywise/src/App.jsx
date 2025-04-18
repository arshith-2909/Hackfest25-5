import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Ad from "./pages/Ad";
import Chatbot from "./pages/Chatbot";
import Game from "./pages/Game";
import UserInvestment from './pages/UserInvestment';
import AutoInvestment from './pages/AutoInvestment';
import Portfolio from './pages/Portfolio';
import Recommend from './pages/Recommend';
import QRScanner from "./pages/QRScanner";





const App = () => {
  const [user, setUser] = useState(null); // 👈 add this

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login setUser={setUser} />} /> {/* ✅ pass setUser here */}

        <Route path="/ad" element={<Ad />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/game" element={<Game />} />
        <Route path="/user-investment" element={<UserInvestment />} />
        <Route path="/auto-investment" element={<AutoInvestment />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/qr-scanner" element={<QRScanner />} />
        <Route path="/social-invest" element={<Social_invest />} />
       
      </Routes>
    </Router>
  );
};


export default App;
