import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Ad from "./pages/Ad";
import Chatbot from "./pages/Chatbot";
import Game from "./pages/Game";
import UserInvestment from './pages/UserInvestment';
import AutoInvestment from './pages/AutoInvestment';
import Portfolio from './pages/Portfolio';
import Recommend from './pages/Recommend';
import QRScanner from "./pages/QRScanner";
import Social_invest from "./pages/Social_invest";

import Booking from "./pages/Booking";
import BillPayment from "./pages/BillPayment";
import SpareChangeWidget from "./pages/SpareChangeWidget";
import UnusedSubscriptions from "./pages/UnusedSubscriptions";




const App = () => {
  return (
    <Router>
      <Routes>
 

       
        
        <Route path="/ad" element={<Ad />} />
    
        <Route path="/chatbot" element={<Chatbot />} />
       
      
     
        <Route path="/game" element={<Game />} />
        <Route path="/user-investment" element={<UserInvestment />} />
        <Route path="/auto-investment" element={<AutoInvestment />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/qr-scanner" element={<QRScanner />} />
        <Route path="/social-invest" element={<Social_invest />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bill-payment" element={<BillPayment />} />
        <Route path="/spare-change-widget" element={<SpareChangeWidget />} />
        <Route path="/unused-subscriptions" element={<UnusedSubscriptions />} />


       
      </Routes>
    </Router>
  );
};

export default App;
