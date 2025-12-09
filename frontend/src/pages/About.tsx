import { Leaf, Users, Map, Car, Target, Award, Mail, MapPin, Phone } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About Us</h1>

      {/* Mission Statement */}
      <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg">
          EcoRides is dedicated to creating sustainable transportation solutions through community-driven carpooling.
        </p>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Leaf className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="font-medium text-gray-900 mb-2">Green Points</h3>
          <p className="text-gray-600">Rewarding sustainable transportation choices with our innovative points system.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Users className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="font-medium text-gray-900 mb-2">Safe Communities</h3>
          <p className="text-gray-600">Building trusted networks of verified users for safer ridesharing experiences.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Map className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="font-medium text-gray-900 mb-2">Smart Routes</h3>
          <p className="text-gray-600">Optimizing travel paths to reduce carbon emissions and save time.</p>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-green-50 p-8 rounded-lg shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900">10,000+</p>
            <p className="text-gray-600">Rides Shared</p>
          </div>
          <div className="text-center">
            <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900">50,000+</p>
            <p className="text-gray-600">Tons CO2 Saved</p>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900">5,000+</p>
            <p className="text-gray-600">Green Points Awarded</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Team</h2>
        <p className="text-gray-600 mb-8">
          EcoRides is powered by a diverse team of transportation experts, environmental enthusiasts, and technology innovators. 
          Together, we're working to make sustainable transportation accessible to everyone.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="font-medium text-gray-900 text-center">Sarah Johnson</h3>
            <p className="text-gray-600 text-center">CEO & Founder</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="font-medium text-gray-900 text-center">Michael Chen</h3>
            <p className="text-gray-600 text-center">CTO</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="font-medium text-gray-900 text-center">Emma Rodriguez</h3>
            <p className="text-gray-600 text-center">Head of Sustainability</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Mail className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-gray-600">info@ecorides.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Address</h3>
                <p className="text-gray-600">Pune City, India</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Phone</h3>
                <p className="text-gray-600">+91 1234567890</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Business Hours</h3>
            <div className="space-y-2">
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 