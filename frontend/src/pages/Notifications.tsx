import { Bell, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Notifications() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <Button variant="outline" className="text-gray-600">
          Mark all as read
        </Button>
      </div>

      {/* Notification Filters */}
      <div className="flex space-x-4 mb-8">
        <Button variant="default">All</Button>
        <Button variant="outline">Ride Updates</Button>
        <Button variant="outline">Points & Rewards</Button>
        <Button variant="outline">Community</Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {/* Ride Updates */}
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Ride Confirmed</h3>
                <p className="text-gray-600">Your ride to Tech Park has been confirmed for tomorrow at 8:30 AM</p>
                <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Points & Rewards */}
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <Info className="h-6 w-6 text-blue-500 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Points Earned</h3>
                <p className="text-gray-600">You've earned 50 Green Points for your eco-friendly ride yesterday</p>
                <p className="text-sm text-gray-500 mt-1">1 day ago</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Community */}
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <Bell className="h-6 w-6 text-purple-500 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">New Community Member</h3>
                <p className="text-gray-600">John Doe joined your Tech Park Community</p>
                <p className="text-sm text-gray-500 mt-1">2 days ago</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Alert */}
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Ride Reminder</h3>
                <p className="text-gray-600">Don't forget your scheduled ride tomorrow morning</p>
                <p className="text-sm text-gray-500 mt-1">3 days ago</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Ride Updates</h3>
                <p className="text-sm text-gray-500">Get notified about ride confirmations and changes</p>
              </div>
              <Button variant="outline">On</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Points & Rewards</h3>
                <p className="text-sm text-gray-500">Receive updates about your Green Points and rewards</p>
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
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <Button variant="outline">On</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 