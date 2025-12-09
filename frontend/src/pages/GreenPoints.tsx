import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Car, Trophy, TrendingUp, Calendar, MapPin, Gift, ShoppingBag, Ticket, Info } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Sample data for testing
const sampleGreenPointsData = {
  totalPoints: 1250,
  level: 'Eco Warrior',
  nextLevelPoints: 500,
  rideHistory: [
    {
      id: '1',
      date: '2025-03-20',
      from: 'Kothrud',
      to: 'Hinjewadi',
      points: 50,
      type: 'shared'
    },
    {
      id: '2',
      date: '2025-03-22',
      from: 'Viman Nagar',
      to: 'Magarpatta',
      points: 30,
      type: 'shared'
    },
    {
      id: '3',
      date: '2025-03-23',
      from: 'Pune',
      to: 'Lonavala',
      points: 100,
      type: 'shared'
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'First Ride',
      description: 'Completed your first shared ride',
      points: 50,
      unlocked: true
    },
    {
      id: '2',
      title: 'Regular Commuter',
      description: 'Completed 5 shared rides',
      points: 200,
      unlocked: true
    },
    {
      id: '3',
      title: 'Eco Champion',
      description: 'Saved 100kg of CO2 emissions',
      points: 500,
      unlocked: false
    }
  ]
};

export default function GreenPoints() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [greenPointsData, setGreenPointsData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setGreenPointsData(sampleGreenPointsData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-red-500 text-center">{error}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Green Points</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-semibold text-gray-900">{greenPointsData.totalPoints} Points</span>
            </div>
            <Button 
              onClick={() => navigate('/redeem-points')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Gift className="h-4 w-4 mr-2" />
              Redeem Points
            </Button>
          </div>
        </div>

        {/* Main Stats Card */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Level</p>
                  <p className="text-xl font-semibold text-gray-900">{greenPointsData.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Points to Next Level</p>
                  <p className="text-xl font-semibold text-gray-900">{greenPointsData.nextLevelPoints}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Car className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Rides</p>
                  <p className="text-xl font-semibold text-gray-900">{greenPointsData.rideHistory.length}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ride History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Ride History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {greenPointsData.rideHistory.map((ride: any) => (
                  <div key={ride.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-100 rounded-full">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{ride.from} → {ride.to}</p>
                        <p className="text-sm text-gray-500">{ride.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span className="font-semibold">+{ride.points}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-green-600" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {greenPointsData.achievements.map((achievement: any) => (
                  <div key={achievement.id} className={`p-4 rounded-lg ${achievement.unlocked ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">+{achievement.points}</span>
                      </div>
                    </div>
                    {achievement.unlocked ? (
                      <div className="mt-2 text-sm text-green-600">Unlocked!</div>
                    ) : (
                      <div className="mt-2 text-sm text-gray-500">Locked</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How to Earn More Points */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              How to Earn More Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Share Your Ride</h3>
                <p className="text-sm text-gray-600">Earn 50 points for every ride you share with others</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Regular Commuting</h3>
                <p className="text-sm text-gray-600">Get bonus points for consistent shared commuting</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Refer Friends</h3>
                <p className="text-sm text-gray-600">Earn 100 points for each friend who joins and takes a ride</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Redeem Points Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-green-600" />
              Redeem Your Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <Car className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-lg">Free Rides</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Use your points to get free rides on selected routes</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Short Distance Ride</span>
                    <span className="font-semibold">100 points</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Medium Distance Ride</span>
                    <span className="font-semibold">200 points</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Long Distance Ride</span>
                    <span className="font-semibold">300 points</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-lg">Eco Products</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Exchange points for sustainable products</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Reusable Water Bottle</span>
                    <span className="font-semibold">150 points</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Eco-friendly Bag</span>
                    <span className="font-semibold">200 points</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Solar Charger</span>
                    <span className="font-semibold">500 points</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <Ticket className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-lg">Vouchers & Discounts</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Redeem points for exclusive discounts</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Restaurant Voucher</span>
                    <span className="font-semibold">250 points</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Shopping Discount</span>
                    <span className="font-semibold">300 points</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Movie Tickets</span>
                    <span className="font-semibold">400 points</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-green-600" />
                <p className="text-sm text-gray-600">
                  Points can be redeemed once you reach the minimum required points for each reward. 
                  Some rewards may have limited availability.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 