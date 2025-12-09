import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Login from './pages/Login';
import SignUp from '@/pages/SignUp';
import FindRide from '@/pages/FindRide';
import OfferRide from '@/pages/OfferRide';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import GreenPoints from '@/pages/GreenPoints';
import SafeCommunities from '@/pages/SafeCommunities';
import CommunityDetails from '@/pages/CommunityDetails';
import CreateCommunity from '@/pages/CreateCommunity';
import SmartRoutes from '@/pages/SmartRoutes';
import Notifications from '@/pages/Notifications';
import Settings from '@/pages/Settings';
import RideDetails from '@/pages/RideDetails';
import BookingConfirmation from '@/pages/BookingConfirmation';
import MyRides from '@/pages/MyRides';
import OfferRideConfirmation from '@/pages/OfferRideConfirmation';
import DatabaseTest from '@/pages/DatabaseTest';
import RedeemPoints from '@/pages/RedeemPoints';
import RouteDetails from './pages/RouteDetails';
import Chat from '@/pages/Chat';
import GreenRoutes from '@/pages/GreenRoutes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/test-db" element={<DatabaseTest />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/find-ride"
                element={
                  <ProtectedRoute>
                    <FindRide />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/offer-ride"
                element={
                  <ProtectedRoute>
                    <OfferRide />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/offer-ride/confirm"
                element={
                  <ProtectedRoute>
                    <OfferRideConfirmation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ride-details"
                element={
                  <ProtectedRoute>
                    <RideDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/booking-confirmation"
                element={
                  <ProtectedRoute>
                    <BookingConfirmation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-rides"
                element={
                  <ProtectedRoute>
                    <MyRides />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/green-points"
                element={
                  <ProtectedRoute>
                    <GreenPoints />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/safe-communities"
                element={
                  <ProtectedRoute>
                    <SafeCommunities />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/community/:id"
                element={
                  <ProtectedRoute>
                    <CommunityDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-community"
                element={
                  <ProtectedRoute>
                    <CreateCommunity />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/route/:id"
                element={
                  <ProtectedRoute>
                    <RouteDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/smart-routes"
                element={
                  <ProtectedRoute>
                    <SmartRoutes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/redeem-points"
                element={
                  <ProtectedRoute>
                    <RedeemPoints />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/green-routes"
                element={
                  <ProtectedRoute>
                    <GreenRoutes />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;