import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Gift, Car, ShoppingBag, Ticket, CheckCircle2, XCircle, ArrowLeft, Sparkles, Coins } from 'lucide-react';
import { toast } from 'sonner';

const rewards = [
  {
    id: 'free-ride',
    category: 'Free Rides',
    icon: Car,
    description: 'Get free rides on your favorite routes',
    items: [
      { id: 'short-ride', name: 'Short Distance Ride', points: 100, description: 'Up to 5km' },
      { id: 'medium-ride', name: 'Medium Distance Ride', points: 200, description: '5-15km' },
      { id: 'long-ride', name: 'Long Distance Ride', points: 300, description: '15km+' }
    ]
  },
  {
    id: 'eco-products',
    category: 'Eco Products',
    icon: ShoppingBag,
    description: 'Sustainable products for a greener lifestyle',
    items: [
      { id: 'water-bottle', name: 'Reusable Water Bottle', points: 150, description: 'Stainless steel, 750ml' },
      { id: 'eco-bag', name: 'Eco-friendly Bag', points: 200, description: 'Organic cotton tote bag' },
      { id: 'solar-charger', name: 'Solar Charger', points: 500, description: 'Portable 10W solar panel' }
    ]
  },
  {
    id: 'vouchers',
    category: 'Vouchers & Discounts',
    icon: Ticket,
    description: 'Exclusive deals and discounts',
    items: [
      { id: 'restaurant', name: 'Restaurant Voucher', points: 250, description: '20% off at eco-friendly restaurants' },
      { id: 'shopping', name: 'Shopping Discount', points: 300, description: '15% off at sustainable stores' },
      { id: 'movie', name: 'Movie Tickets', points: 400, description: '2 tickets to eco-documentaries' }
    ]
  }
];

export default function RedeemPoints() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedReward, setSelectedReward] = useState('');
  const [userPoints, setUserPoints] = useState(1250);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const selectedCategoryData = rewards.find(cat => cat.id === selectedCategory);
  const selectedRewardData = selectedCategoryData?.items.find(item => item.id === selectedReward);

  const handleRedeem = async () => {
    if (!selectedRewardData) return;

    setIsRedeeming(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (userPoints >= selectedRewardData.points) {
      toast.success('Reward redeemed successfully!', {
        description: `You have redeemed ${selectedRewardData.name} for ${selectedRewardData.points} points.`,
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
      });
      setUserPoints(prev => prev - selectedRewardData.points);
    } else {
      toast.error('Insufficient points', {
        description: `You need ${selectedRewardData.points - userPoints} more points to redeem this reward.`,
        icon: <XCircle className="h-5 w-5 text-red-500" />
      });
    }

    setIsRedeeming(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/green-points')}
            className="hover:bg-green-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Redeem Your Points</h1>
            <p className="text-gray-600">Exchange your green points for exciting rewards</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Points Balance Card */}
          <Card className="lg:col-span-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-full">
                    <Coins className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Available Points</p>
                    <p className="text-3xl font-bold">{userPoints}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm">Eco Warrior Level</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selection Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Select Your Reward</CardTitle>
              <CardDescription>Choose from our range of eco-friendly rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Category</label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  className="w-full h-12 border-2 border-gray-200 hover:border-green-500 focus:border-green-500"
                >
                  <option value="">Choose a category</option>
                  {rewards.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.category} - {category.description}
                    </option>
                  ))}
                </Select>
              </div>

              {selectedCategory && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Reward</label>
                  <Select
                    value={selectedReward}
                    onValueChange={setSelectedReward}
                    className="w-full h-12 border-2 border-gray-200 hover:border-green-500 focus:border-green-500"
                  >
                    <option value="">Choose a reward</option>
                    {selectedCategoryData?.items.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name} - {item.points} points
                      </option>
                    ))}
                  </Select>
                </div>
              )}

              {selectedRewardData && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{selectedRewardData.name}</p>
                      <p className="text-sm text-gray-600">{selectedRewardData.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-green-600" />
                      <span className="text-lg font-semibold text-green-600">{selectedRewardData.points}</span>
                    </div>
                  </div>
                  <p className={`text-sm ${userPoints >= selectedRewardData.points ? 'text-green-600' : 'text-red-600'}`}>
                    {userPoints >= selectedRewardData.points
                      ? 'You have enough points to redeem this reward!'
                      : `You need ${selectedRewardData.points - userPoints} more points to redeem this reward.`}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/green-points')}
                  className="hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleRedeem}
                  disabled={!selectedRewardData || userPoints < selectedRewardData.points || isRedeeming}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isRedeeming ? 'Redeeming...' : 'Redeem Now'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Redemptions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Redemptions</CardTitle>
              <CardDescription>Your latest point redemptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Movie Tickets</p>
                      <p className="text-sm text-gray-500">March 15, 2025</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-600">-400</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Restaurant Voucher</p>
                      <p className="text-sm text-gray-500">March 10, 2025</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-600">-250</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 