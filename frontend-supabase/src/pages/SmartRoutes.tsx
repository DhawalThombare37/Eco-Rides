import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Leaf, 
  Car, 
  Bike, 
  Bus, 
  Train, 
  ChevronRight,
  Clock,
  Users,
  TrendingUp,
  Filter,
  Search
} from 'lucide-react';

interface Route {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  distance: number;
  duration: number;
  mode: 'car' | 'bike' | 'bus' | 'train' | 'walk';
  carbonEmission: number;
  savings: number;
  popularity: number;
  stops: {
    name: string;
    type: 'park' | 'market' | 'station' | 'landmark';
    description: string;
  }[];
  ecoFeatures: string[];
}

const SmartRoutes = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'emission' | 'distance' | 'popularity'>('emission');

  const routes: Route[] = [
    {
      id: '1',
      name: 'Hinjewadi to Kothrud Green Corridor',
      startPoint: 'Hinjewadi IT Park',
      endPoint: 'Kothrud',
      distance: 15.2,
      duration: 45,
      mode: 'bus',
      carbonEmission: 2.1,
      savings: 3.8,
      popularity: 85,
      stops: [
        {
          name: 'Pashan Lake',
          type: 'park',
          description: 'Scenic lake with walking trails'
        },
        {
          name: 'Baner Hill',
          type: 'landmark',
          description: 'Popular viewpoint with gardens'
        }
      ],
      ecoFeatures: [
        'Dedicated bus lanes',
        'Bicycle paths',
        'Tree-lined route',
        'EV charging stations'
      ]
    },
    {
      id: '2',
      name: 'Koregaon Park Heritage Trail',
      startPoint: 'Koregaon Park',
      endPoint: 'Shaniwar Wada',
      distance: 4.5,
      duration: 20,
      mode: 'walk',
      carbonEmission: 0,
      savings: 1.2,
      popularity: 92,
      stops: [
        {
          name: 'Osho Garden',
          type: 'park',
          description: 'Peaceful meditation garden'
        },
        {
          name: 'MG Road',
          type: 'market',
          description: 'Historic shopping street'
        }
      ],
      ecoFeatures: [
        'Pedestrian-only zones',
        'Heritage buildings',
        'Green spaces',
        'Public art installations'
      ]
    },
    {
      id: '3',
      name: 'PCMC Metro Green Route',
      startPoint: 'Pimpri',
      endPoint: 'Chinchwad',
      distance: 8.7,
      duration: 25,
      mode: 'train',
      carbonEmission: 1.5,
      savings: 2.9,
      popularity: 78,
      stops: [
        {
          name: 'PCMC Garden',
          type: 'park',
          description: 'Large public garden'
        },
        {
          name: 'Chinchwad Station',
          type: 'station',
          description: 'Major transport hub'
        }
      ],
      ecoFeatures: [
        'Metro connectivity',
        'Bike sharing stations',
        'Solar-powered stations',
        'Rainwater harvesting'
      ]
    },
    {
      id: '4',
      name: 'Wakad Eco Expressway',
      startPoint: 'Wakad',
      endPoint: 'Aundh',
      distance: 6.3,
      duration: 15,
      mode: 'bike',
      carbonEmission: 0.3,
      savings: 1.8,
      popularity: 88,
      stops: [
        {
          name: 'Wakad Garden',
          type: 'park',
          description: 'Community garden space'
        },
        {
          name: 'Aundh Market',
          type: 'market',
          description: 'Local shopping area'
        }
      ],
      ecoFeatures: [
        'Bike lanes',
        'Solar street lights',
        'Waste segregation points',
        'Community gardens'
      ]
    }
  ];

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         route.startPoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         route.endPoint.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode = selectedMode === 'all' || route.mode === selectedMode;
    return matchesSearch && matchesMode;
  });

  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    if (sortBy === 'emission') return a.carbonEmission - b.carbonEmission;
    if (sortBy === 'distance') return a.distance - b.distance;
    return b.popularity - a.popularity;
  });

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'car': return <Car className="h-5 w-5" />;
      case 'bike': return <Bike className="h-5 w-5" />;
      case 'bus': return <Bus className="h-5 w-5" />;
      case 'train': return <Train className="h-5 w-5" />;
      default: return null;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'car': return 'bg-blue-100 text-blue-800';
      case 'bike': return 'bg-green-100 text-green-800';
      case 'bus': return 'bg-yellow-100 text-yellow-800';
      case 'train': return 'bg-purple-100 text-purple-800';
      case 'walk': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Smart Routes</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search routes..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
              >
                <option value="all">All Modes</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="bus">Bus</option>
                <option value="train">Train</option>
                <option value="walk">Walk</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'emission' | 'distance' | 'popularity')}
              >
                <option value="emission">Sort by Emissions</option>
                <option value="distance">Sort by Distance</option>
                <option value="popularity">Sort by Popularity</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{route.name}</h2>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {route.startPoint} → {route.endPoint}
                      </span>
                    </div>
                  </div>
                  <div className={`flex items-center px-2 py-1 rounded-full ${getModeColor(route.mode)}`}>
                    {getModeIcon(route.mode)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{route.duration} mins</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Distance</p>
                      <p className="font-medium">{route.distance} km</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">CO₂ Emission</p>
                      <p className="font-medium">{route.carbonEmission} kg</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Popularity</p>
                      <p className="font-medium">{route.popularity}%</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Eco Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {route.ecoFeatures.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Key Stops</h3>
                  <div className="space-y-2">
                    {route.stops.map((stop, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className={`h-2 w-2 rounded-full mt-1 ${
                            stop.type === 'park' ? 'bg-green-500' :
                            stop.type === 'market' ? 'bg-yellow-500' :
                            stop.type === 'station' ? 'bg-blue-500' :
                            'bg-purple-500'
                          }`} />
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-medium text-gray-900">{stop.name}</p>
                          <p className="text-xs text-gray-500">{stop.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/route/${route.id}`)}
                  className="mt-auto w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  View Route Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartRoutes; 