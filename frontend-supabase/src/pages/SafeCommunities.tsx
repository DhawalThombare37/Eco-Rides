import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Users, 
  Shield, 
  Star, 
  ChevronRight,
  Building2,
  Home,
  Briefcase,
  School,
  Heart,
  Plus
} from 'lucide-react';

interface SafeCommunity {
  id: string;
  name: string;
  description: string;
  location: string;
  members: number;
  rating: number;
  type: 'residential' | 'commercial' | 'educational' | 'corporate' | 'mixed';
  icon: React.ReactNode;
  safetyFeatures: string[];
  verifiedMembers: number;
}

const SafeCommunities = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const communities: SafeCommunity[] = [
    {
      id: '1',
      name: 'Kalyani Nagar Safe Community',
      description: 'A well-established residential area with active community policing and regular safety patrols.',
      location: 'Kalyani Nagar, Pune',
      members: 1200,
      rating: 4.8,
      type: 'residential',
      icon: <Home className="h-6 w-6 text-blue-600" />,
      safetyFeatures: [
        '24/7 Security Guards',
        'CCTV Surveillance',
        'Community Patrols',
        'Emergency Response Team'
      ],
      verifiedMembers: 850
    },
    {
      id: '2',
      name: 'Magarpatta City',
      description: 'A self-contained township with comprehensive security measures and community initiatives.',
      location: 'Magarpatta, Hadapsar',
      members: 2500,
      rating: 4.9,
      type: 'mixed',
      icon: <Building2 className="h-6 w-6 text-green-600" />,
      safetyFeatures: [
        'Gated Community',
        'Biometric Access',
        'Patrol Vehicles',
        'Community Watch Program'
      ],
      verifiedMembers: 1800
    },
    {
      id: '3',
      name: 'Hinjewadi IT Park',
      description: 'Corporate hub with dedicated security personnel and emergency response systems.',
      location: 'Hinjewadi Phase 1',
      members: 5000,
      rating: 4.7,
      type: 'corporate',
      icon: <Briefcase className="h-6 w-6 text-purple-600" />,
      safetyFeatures: [
        'Dedicated Security Force',
        'Emergency Response Team',
        'Regular Safety Drills',
        'Visitor Management System'
      ],
      verifiedMembers: 3500
    },
    {
      id: '4',
      name: 'University of Pune Campus',
      description: 'Educational institution with comprehensive safety measures and student support systems.',
      location: 'Ganeshkhind Road',
      members: 3000,
      rating: 4.6,
      type: 'educational',
      icon: <School className="h-6 w-6 text-yellow-600" />,
      safetyFeatures: [
        'Campus Security',
        'Student Patrols',
        'Emergency Call Boxes',
        'Safety Workshops'
      ],
      verifiedMembers: 2000
    },
    {
      id: '5',
      name: 'Koregaon Park',
      description: 'Upscale residential and commercial area with active community safety initiatives.',
      location: 'Koregaon Park',
      members: 1800,
      rating: 4.8,
      type: 'mixed',
      icon: <Heart className="h-6 w-6 text-pink-600" />,
      safetyFeatures: [
        'Neighborhood Watch',
        'Private Security',
        'Community Safety App',
        'Regular Safety Meetings'
      ],
      verifiedMembers: 1200
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
      case 'residential': return 'bg-blue-100 text-blue-800';
      case 'commercial': return 'bg-green-100 text-green-800';
      case 'educational': return 'bg-yellow-100 text-yellow-800';
      case 'corporate': return 'bg-purple-100 text-purple-800';
      case 'mixed': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Safe Communities</h1>
            <button
              onClick={() => navigate('/create-community')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Community
            </button>
          </div>
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
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="educational">Educational</option>
            <option value="corporate">Corporate</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <div
              key={community.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      {community.icon}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{community.name}</h2>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">{community.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 font-medium">{community.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 flex-grow">{community.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Members</p>
                      <p className="font-medium">{community.members}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium capitalize">{community.type}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Safety Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {community.safetyFeatures.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/community/${community.id}`)}
                  className="mt-auto w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Join Community
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafeCommunities; 