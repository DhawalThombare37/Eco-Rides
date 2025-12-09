import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Users, 
  Calendar, 
  Clock, 
  ChevronRight,
  Building2,
  GraduationCap,
  School,
  Briefcase,
  Heart
} from 'lucide-react';

interface Community {
  id: string;
  name: string;
  description: string;
  location: string;
  members: number;
  type: 'institution' | 'school' | 'college' | 'corporate' | 'residential';
  icon: React.ReactNode;
  upcomingRides: {
    date: string;
    time: string;
    route: string;
    participants: number;
  }[];
}

const Communities: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const communities: Community[] = [
    {
      id: '1',
      name: 'Pune University Cycling Club',
      description: 'Join fellow students and faculty for eco-friendly rides around the campus and city.',
      location: 'University of Pune, Ganeshkhind',
      members: 250,
      type: 'institution',
      icon: <Building2 className="h-6 w-6 text-blue-600" />,
      upcomingRides: [
        {
          date: '2024-03-15',
          time: '06:00 AM',
          route: 'University Campus - Pashan Lake',
          participants: 15
        }
      ]
    },
    {
      id: '2',
      name: 'COEP Green Riders',
      description: 'College of Engineering Pune\'s official cycling community promoting sustainable transportation.',
      location: 'COEP, Shivajinagar',
      members: 180,
      type: 'college',
      icon: <GraduationCap className="h-6 w-6 text-green-600" />,
      upcomingRides: [
        {
          date: '2024-03-16',
          time: '05:30 AM',
          route: 'COEP - Sinhagad Fort',
          participants: 20
        }
      ]
    },
    {
      id: '3',
      name: 'Symbiosis Cycling Initiative',
      description: 'Symbiosis International University\'s cycling group for students and staff.',
      location: 'Symbiosis Campus, Viman Nagar',
      members: 120,
      type: 'college',
      icon: <GraduationCap className="h-6 w-6 text-purple-600" />,
      upcomingRides: [
        {
          date: '2024-03-17',
          time: '06:30 AM',
          route: 'Symbiosis - Koregaon Park',
          participants: 10
        }
      ]
    },
    {
      id: '4',
      name: 'Pune International School Cycling Club',
      description: 'Promoting cycling culture among school students and parents.',
      location: 'Pune International School, Kalyani Nagar',
      members: 80,
      type: 'school',
      icon: <School className="h-6 w-6 text-yellow-600" />,
      upcomingRides: [
        {
          date: '2024-03-18',
          time: '07:00 AM',
          route: 'School - Aga Khan Palace',
          participants: 12
        }
      ]
    },
    {
      id: '5',
      name: 'Infosys Pune Cycling Group',
      description: 'Corporate cycling community for Infosys employees in Pune.',
      location: 'Infosys Campus, Hinjewadi',
      members: 300,
      type: 'corporate',
      icon: <Briefcase className="h-6 w-6 text-red-600" />,
      upcomingRides: [
        {
          date: '2024-03-19',
          time: '06:00 AM',
          route: 'Infosys - Baner Hills',
          participants: 25
        }
      ]
    },
    {
      id: '6',
      name: 'Kalyani Nagar Residents Cycling Club',
      description: 'Local community cycling group for residents of Kalyani Nagar.',
      location: 'Kalyani Nagar',
      members: 150,
      type: 'residential',
      icon: <Heart className="h-6 w-6 text-pink-600" />,
      upcomingRides: [
        {
          date: '2024-03-20',
          time: '06:00 AM',
          route: 'Kalyani Nagar - Koregaon Park Loop',
          participants: 18
        }
      ]
    }
  ];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || community.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'institution': return 'bg-blue-100 text-blue-800';
      case 'college': return 'bg-green-100 text-green-800';
      case 'school': return 'bg-yellow-100 text-yellow-800';
      case 'corporate': return 'bg-red-100 text-red-800';
      case 'residential': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Communities</h1>
          <p className="mt-2 text-sm text-gray-600">
            Join local cycling communities, institutions, and groups in Pune
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search communities..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="institution">Institutions</option>
            <option value="college">Colleges</option>
            <option value="school">Schools</option>
            <option value="corporate">Corporate</option>
            <option value="residential">Residential</option>
          </select>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <div key={community.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      {community.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{community.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(community.type)}`}>
                        {community.type.charAt(0).toUpperCase() + community.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="mt-3 text-sm text-gray-600">{community.description}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {community.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    {community.members} members
                  </div>
                </div>

                {/* Upcoming Rides */}
                {community.upcomingRides.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Upcoming Ride</h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {community.upcomingRides[0].date}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {community.upcomingRides[0].time}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-900">{community.upcomingRides[0].route}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        {community.upcomingRides[0].participants} participants
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => navigate(`/community/${community.id}`)}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Join Community
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Communities; 