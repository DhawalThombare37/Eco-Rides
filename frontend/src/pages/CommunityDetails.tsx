import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Users, 
  Shield, 
  Star, 
  Calendar, 
  Clock,
  ChevronLeft,
  MessageSquare,
  Bell,
  Settings,
  Share2
} from 'lucide-react';

interface Community {
  id: string;
  name: string;
  description: string;
  location: string;
  members: number;
  rating: number;
  type: string;
  safetyFeatures: string[];
  verifiedMembers: number;
  upcomingRides: {
    id: string;
    date: string;
    time: string;
    route: string;
    availableSeats: number;
    organizer: string;
    participants: number;
  }[];
  recentActivities: {
    id: string;
    type: string;
    description: string;
    time: string;
  }[];
}

const CommunityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from an API
  const community: Community = {
    id: id || '1',
    name: 'Kalyani Nagar Safe Community',
    description: 'A well-established residential area with active community policing and regular safety patrols.',
    location: 'Kalyani Nagar, Pune',
    members: 1200,
    rating: 4.8,
    type: 'residential',
    safetyFeatures: [
      '24/7 Security Guards',
      'CCTV Surveillance',
      'Community Patrols',
      'Emergency Response Team'
    ],
    verifiedMembers: 850,
    upcomingRides: [
      {
        id: '1',
        date: '2024-03-15',
        time: '06:00 AM',
        route: 'Kalyani Nagar to Magarpatta',
        availableSeats: 3,
        organizer: 'Rahul Sharma',
        participants: 4
      },
      {
        id: '2',
        date: '2024-03-16',
        time: '07:00 AM',
        route: 'Kalyani Nagar to Hinjewadi',
        availableSeats: 2,
        organizer: 'Priya Patel',
        participants: 3
      }
    ],
    recentActivities: [
      {
        id: '1',
        type: 'ride',
        description: 'Morning commute to Magarpatta completed',
        time: '2 hours ago'
      },
      {
        id: '2',
        type: 'safety',
        description: 'New security measures implemented',
        time: '1 day ago'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Community Info */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{community.name}</h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-gray-600">{community.location}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 font-medium">{community.rating}</span>
            </div>
          </div>

          <p className="mt-4 text-gray-600">{community.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Total Members</p>
                <p className="font-medium">{community.members}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Verified Members</p>
                <p className="font-medium">{community.verifiedMembers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Features */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Safety Features</h2>
          <div className="grid grid-cols-2 gap-4">
            {community.safetyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center">
                <Shield className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Rides */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Rides</h2>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {community.upcomingRides.map((ride) => (
              <div key={ride.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{ride.route}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {ride.date}
                      <Clock className="h-4 w-4 ml-3 mr-1" />
                      {ride.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Organized by</p>
                    <p className="font-medium">{ride.organizer}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      {ride.participants} participants • {ride.availableSeats} seats left
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium">
                    Join Ride
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {community.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button className="flex-1 flex items-center justify-center text-gray-600 hover:text-gray-900">
              <MessageSquare className="h-5 w-5 mr-2" />
              Chat
            </button>
            <button className="flex-1 flex items-center justify-center text-gray-600 hover:text-gray-900">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </button>
            <button className="flex-1 flex items-center justify-center text-gray-600 hover:text-gray-900">
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails; 