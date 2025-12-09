import { useParams } from 'react-router-dom';
import { 
  MapPin, 
  Leaf, 
  Car, 
  Bike, 
  Bus, 
  Train, 
  Clock,
  Users,
  TrendingUp,
  ArrowLeft,
  ChevronRight,
  Star,
  AlertCircle,
  Info
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
    coordinates: [number, number];
  }[];
  ecoFeatures: string[];
  description: string;
  tips: string[];
  alternativeRoutes: {
    name: string;
    mode: string;
    duration: number;
    carbonEmission: number;
  }[];
  weatherImpact: {
    condition: string;
    impact: string;
    recommendation: string;
  };
}

const RouteDetails = () => {
  const { id } = useParams<{ id: string }>();
  const route: Route = {
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
    description: 'A sustainable transportation corridor connecting Pune\'s IT hub with residential areas, featuring dedicated bus lanes, bicycle paths, and green spaces.',
    stops: [
      {
        name: 'Pashan Lake',
        type: 'park',
        description: 'Scenic lake with walking trails and bird watching spots',
        coordinates: [18.5368, 73.7904]
      },
      {
        name: 'Baner Hill',
        type: 'landmark',
        description: 'Popular viewpoint with gardens and walking paths',
        coordinates: [18.5606, 73.7897]
      },
      {
        name: 'Baner Market',
        type: 'market',
        description: 'Local market with fresh produce and eco-friendly shops',
        coordinates: [18.5592, 73.7873]
      }
    ],
    ecoFeatures: [
      'Dedicated bus lanes',
      'Bicycle paths',
      'Tree-lined route',
      'EV charging stations',
      'Solar-powered bus stops',
      'Rainwater harvesting systems'
    ],
    tips: [
      'Best time to travel: 7:00 AM - 9:00 AM or 5:00 PM - 7:00 PM',
      'Use the mobile app for real-time bus tracking',
      'Bicycle rentals available at major stops',
      'Carry reusable water bottles - water refill stations available'
    ],
    alternativeRoutes: [
      {
        name: 'Metro + Bus',
        mode: 'train',
        duration: 35,
        carbonEmission: 1.2
      },
      {
        name: 'Bicycle Path',
        mode: 'bike',
        duration: 55,
        carbonEmission: 0
      },
      {
        name: 'Shared Car',
        mode: 'car',
        duration: 30,
        carbonEmission: 3.5
      }
    ],
    weatherImpact: {
      condition: 'Rainy Season',
      impact: 'Slightly longer travel time due to increased traffic',
      recommendation: 'Use the metro option during heavy rains'
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'car': return <Car className="h-5 w-5" />;
      case 'bike': return <Bike className="h-5 w-5" />;
      case 'bus': return <Bus className="h-5 w-5" />;
      case 'train': return <Train className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">{route.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Route Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Route Overview</h2>
                  <p className="text-gray-600 mt-1">{route.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{route.popularity}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{route.duration} mins</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Distance</p>
                      <p className="font-medium">{route.distance} km</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">CO₂ Emission</p>
                      <p className="font-medium">{route.carbonEmission} kg</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Savings</p>
                      <p className="font-medium">{route.savings} kg CO₂</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stops */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Route Stops</h2>
              <div className="space-y-4">
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
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{stop.name}</h3>
                        <span className="text-xs text-gray-500">{index + 1}/{route.stops.length}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{stop.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eco Features */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Eco-Friendly Features</h2>
              <div className="grid grid-cols-2 gap-4">
                {route.ecoFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Impact */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Weather Impact</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium">{route.weatherImpact.condition}</span>
                </div>
                <p className="text-sm text-gray-600">{route.weatherImpact.impact}</p>
                <p className="text-sm text-green-600 font-medium">{route.weatherImpact.recommendation}</p>
              </div>
            </div>

            {/* Alternative Routes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Alternative Routes</h2>
              <div className="space-y-4">
                {route.alternativeRoutes.map((alt, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getModeIcon(alt.mode)}
                      <span className="text-sm font-medium">{alt.name}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {alt.duration} mins • {alt.carbonEmission} kg CO₂
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Tips */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Travel Tips</h2>
              <div className="space-y-3">
                {route.tips.map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                    <p className="text-sm text-gray-600">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetails; 