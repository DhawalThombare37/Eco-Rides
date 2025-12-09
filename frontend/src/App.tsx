import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";

import Home from "@/pages/Home";
import FindRide from "@/pages/FindRide";
import OfferRide from "@/pages/OfferRide";
import Profile from "@/pages/Profile";
import GreenPoints from "@/pages/GreenPoints";
import SafeCommunities from "@/pages/SafeCommunities";
import CommunityDetails from "@/pages/CommunityDetails";
import CreateCommunity from "@/pages/CreateCommunity";
import SmartRoutes from "@/pages/SmartRoutes";
import Notifications from "@/pages/Notifications";
import Settings from "@/pages/Settings";
import RideDetails from "@/pages/RideDetails";
import BookingConfirmation from "@/pages/BookingConfirmation";
import MyRides from "@/pages/MyRides";
import OfferRideConfirmation from "@/pages/OfferRideConfirmation";
import DatabaseTest from "@/pages/DatabaseTest";
import RedeemPoints from "@/pages/RedeemPoints";
import RouteDetails from "@/pages/RouteDetails";
import Chat from "@/pages/Chat";
import GreenRoutes from "@/pages/GreenRoutes";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            {/* Public routes (No login required) */}
            <Route path="/" element={<Home />} />
            <Route path="/find-ride" element={<FindRide />} />
            <Route path="/offer-ride" element={<OfferRide />} />
            <Route path="/offer-ride/confirm" element={<OfferRideConfirmation />} />
            <Route path="/ride-details" element={<RideDetails />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/my-rides" element={<MyRides />} />
            <Route path="/green-points" element={<GreenPoints />} />
            <Route path="/safe-communities" element={<SafeCommunities />} />
            <Route path="/community/:id" element={<CommunityDetails />} />
            <Route path="/create-community" element={<CreateCommunity />} />
            <Route path="/route/:id" element={<RouteDetails />} />
            <Route path="/smart-routes" element={<SmartRoutes />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/redeem-points" element={<RedeemPoints />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/green-routes" element={<GreenRoutes />} />

            {/* Optional test route */}
            <Route path="/test-db" element={<DatabaseTest />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
