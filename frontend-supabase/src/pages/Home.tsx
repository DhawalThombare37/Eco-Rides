import { Leaf, Users, Map, TrendingUp, ArrowRight, Phone, Mail, MapPin, Car } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleOfferRide = () => {
    if (user) {
      navigate('/offer-ride');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 -mt-16">
          <img
            className="w-full h-[60vh] object-cover"
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80"
            alt="Eco-friendly nature scene"
          />
        </div>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-80 mix-blend-multiply" />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-emerald-50 sm:text-5xl lg:text-6xl">
          Share Rides, Save Planet
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-emerald-100">
          Join our community of eco-conscious commuters. Find carpool partners,
          track your carbon savings, and earn rewards while making a difference.
        </p>
        <div className="mt-10 flex space-x-4">
          <Link to="/find-ride">
            <Button size="lg">Find a Ride</Button>
          </Link>
          <Button
            variant="secondary"
            size="lg"
            className="bg-white/90 text-gray-900 hover:bg-white"
            onClick={handleOfferRide}
          >
            Offer a Ride
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">10,000+</div>
              <p className="mt-2 text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">50,000+</div>
              <p className="mt-2 text-gray-600">Rides Shared</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">100+</div>
              <p className="mt-2 text-gray-600">Tons CO2 Saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Green Points */}
          <Link to="/green-points" className="block">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow h-[280px] flex flex-col">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Green Points</h3>
              <p className="mt-4 text-gray-600 flex-grow">
                Earn points for every eco-friendly ride. Redeem them for rewards
                and track your environmental impact.
              </p>
              <div className="mt-4 flex items-center text-green-600">
                <span className="text-sm font-medium">View Points</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </Link>

          {/* Safe Communities */}
          <Link to="/safe-communities" className="block">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow h-[280px] flex flex-col">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Safe Communities</h3>
              <p className="mt-4 text-gray-600 flex-grow">
                Join verified networks within your workplace or neighborhood.
                Travel with people you trust.
              </p>
              <div className="mt-4 flex items-center text-blue-600">
                <span className="text-sm font-medium">Join Communities</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </Link>

          {/* Smart Routes */}
          <Link to="/smart-routes" className="block">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow h-[280px] flex flex-col">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Map className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Smart Routes</h3>
              <p className="mt-4 text-gray-600 flex-grow">
                Get intelligent route suggestions that avoid pollution and
                high-traffic areas.
              </p>
              <div className="mt-4 flex items-center text-purple-600">
                <span className="text-sm font-medium">View Routes</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Sign Up</h3>
              <p className="mt-2 text-gray-600">Create your profile and verify your identity</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Find or Offer</h3>
              <p className="mt-2 text-gray-600">Search for rides or offer your own</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Ride & Earn</h3>
              <p className="mt-2 text-gray-600">Share your journey and earn rewards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Make a Difference</h2>
            <p className="text-lg text-gray-600 mb-6">
              Every shared ride reduces carbon emissions and traffic congestion.
              Join thousands of eco-conscious commuters making a positive impact
              on our planet.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                <span className="text-gray-600">Reduce your carbon footprint by up to 75%</span>
              </div>
              <div className="flex items-center">
                <Users className="h-6 w-6 text-green-600 mr-3" />
                <span className="text-gray-600">Connect with like-minded commuters</span>
              </div>
              <div className="flex items-center">
                <Leaf className="h-6 w-6 text-green-600 mr-3" />
                <span className="text-gray-600">Earn rewards for sustainable choices</span>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80"
              alt="Environmental impact"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              EcoRides is dedicated to creating sustainable transportation solutions through community-driven carpooling.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>info@ecorides.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Pune City</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block hover:text-green-400">Home</Link>
                <Link to="/find-ride" className="block hover:text-green-400">Find a Ride</Link>
                <Link to="/offer-ride" className="block hover:text-green-400">Offer a Ride</Link>
                <Link to="/profile" className="block hover:text-green-400">Profile</Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">About Us</h3>
              <p className="text-gray-400">
                EcoRides is dedicated to creating sustainable transportation solutions
                through community-driven carpooling.
              </p>
              <div className="mt-4">
                <p className="text-gray-400">Created by Team Zero</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 EcoRides. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}