import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeedbackDialog from "@/components/FeedbackDialog";
import {
  Car,
  Leaf,
  Users,
  Map,
  Bell,
  Settings,
  User,
  MessageSquare,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Leaf className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  EcoRides
                </span>
              </Link>

              {/* Desktop menu */}
              <div className="hidden md:flex md:ml-10 md:space-x-8">
                <Link
                  to="/find-ride"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-green-600"
                >
                  <Car className="h-4 w-4 mr-1" />
                  Find Ride
                </Link>
                <Link
                  to="/offer-ride"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-green-600"
                >
                  <Car className="h-4 w-4 mr-1" />
                  Offer Ride
                </Link>
                <Link
                  to="/green-points"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-green-600"
                >
                  <Leaf className="h-4 w-4 mr-1" />
                  Green Points
                </Link>
                <Link
                  to="/safe-communities"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-green-600"
                >
                  <Users className="h-4 w-4 mr-1" />
                  Communities
                </Link>
                <Link
                  to="/smart-routes"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-green-600"
                >
                  <Map className="h-4 w-4 mr-1" />
                  Smart Routes
                </Link>
              </div>
            </div>

            {/* Right side - PUBLIC version (no login/logout) */}
            <div className="flex items-center space-x-4">
              <Link
                to="/notifications"
                className="p-2 text-gray-600 hover:text-green-600"
              >
                <Bell className="h-5 w-5" />
              </Link>

              <button
                onClick={() => setIsFeedbackOpen(true)}
                className="p-2 text-gray-600 hover:text-green-600"
              >
                <HelpCircle className="h-5 w-5" />
              </button>

              <Link
                to="/settings"
                className="p-2 text-gray-600 hover:text-green-600"
              >
                <Settings className="h-5 w-5" />
              </Link>

              <button
                onClick={() => navigate("/profile")}
                className="flex items-center space-x-2 text-gray-900 hover:text-green-600"
              >
                <User className="h-5 w-5" />
              </button>

              <Link
                to="/chat"
                className="flex items-center space-x-2 text-gray-600 hover:text-green-500"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Chat</span>
              </Link>

              <Link
                to="/green-routes"
                className="flex items-center space-x-2 text-gray-700 hover:text-green-500"
              >
                <Leaf className="h-5 w-5" />
                <span>Green Routes</span>
              </Link>

              {/* Mobile menu toggle */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-gray-600 hover:text-green-600"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
            <Link to="/find-ride" className="block text-gray-700 hover:text-green-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium">
              <Car className="h-4 w-4 mr-1 inline" />
              Find Ride
            </Link>
            <Link to="/offer-ride" className="block text-gray-700 hover:text-green-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium">
              <Car className="h-4 w-4 mr-1 inline" />
              Offer Ride
            </Link>
            <Link to="/green-points" className="block text-gray-700 hover:text-green-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium">
              <Leaf className="h-4 w-4 mr-1 inline" />
              Green Points
            </Link>
            <Link to="/safe-communities" className="block text-gray-700 hover:text-green-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium">
              <Users className="h-4 w-4 mr-1 inline" />
              Communities
            </Link>
            <Link to="/smart-routes" className="block text-gray-700 hover:text-green-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium">
              <Map className="h-4 w-4 mr-1 inline" />
              Smart Routes
            </Link>
          </div>
        )}
      </nav>

      {/* Feedback modal */}
      <FeedbackDialog isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  );
};

export default Navbar;
