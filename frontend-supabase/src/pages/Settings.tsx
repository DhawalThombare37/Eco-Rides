import { User, Bell, Lock, Globe, Shield, CreditCard, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Settings() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Account Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-6">
            <User className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Email Address</h3>
                <p className="text-sm text-gray-500">user@example.com</p>
              </div>
              <Button variant="outline">Change</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Phone Number</h3>
                <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
              </div>
              <Button variant="outline">Change</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Password</h3>
                <p className="text-sm text-gray-500">Last changed 3 months ago</p>
              </div>
              <Button variant="outline">Change</Button>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-6">
            <Shield className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Profile Visibility</h3>
                <p className="text-sm text-gray-500">Control who can see your profile</p>
              </div>
              <Button variant="outline">Public</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Location Sharing</h3>
                <p className="text-sm text-gray-500">Share your location with ride partners</p>
              </div>
              <Button variant="outline">On</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Data Collection</h3>
                <p className="text-sm text-gray-500">Help improve EcoRide with anonymous data</p>
              </div>
              <Button variant="outline">On</Button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-6">
            <Bell className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Ride Updates</h3>
                <p className="text-sm text-gray-500">Get notified about your rides</p>
              </div>
              <Button variant="outline">On</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Points & Rewards</h3>
                <p className="text-sm text-gray-500">Receive updates about your Green Points</p>
              </div>
              <Button variant="outline">On</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Community Updates</h3>
                <p className="text-sm text-gray-500">Stay informed about community activities</p>
              </div>
              <Button variant="outline">On</Button>
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-6">
            <CreditCard className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Payment Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Payment Methods</h3>
                <p className="text-sm text-gray-500">Manage your payment options</p>
              </div>
              <Button variant="outline">Manage</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Billing History</h3>
                <p className="text-sm text-gray-500">View your payment history</p>
              </div>
              <Button variant="outline">View</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Auto-Pay</h3>
                <p className="text-sm text-gray-500">Set up automatic payments</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Help & Support */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-6">
          <HelpCircle className="h-6 w-6 text-green-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Help & Support</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="w-full">FAQ</Button>
          <Button variant="outline" className="w-full">Contact Support</Button>
          <Button variant="outline" className="w-full">Report an Issue</Button>
        </div>
      </div>
    </div>
  );
} 