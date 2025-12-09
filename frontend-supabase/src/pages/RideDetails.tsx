import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { RideOffer } from '../services/rides';
import { MapPin, Clock, Users, Star, Car, Calendar, ArrowLeft, CheckCircle2, User, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { ridesService } from '@/services/rides';

interface LocationState {
  ride?: RideOffer;
  rideId?: string;
}

interface FormData {
  name: string;
  phone: string;
  pickupPoint: string;
}

const RideDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ride, setRide] = React.useState<RideOffer | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    phone: '',
    pickupPoint: ''
  });
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchRide = async () => {
      try {
        const state = location.state as LocationState;
        const rideId = state?.rideId;
        if (!rideId) {
          throw new Error('Ride ID not found');
        }

        const { data: rides, error } = await ridesService.getAvailableRides();
        if (error) throw error;

        const foundRide = rides?.find((r: RideOffer) => r.id === rideId);
        if (!foundRide) {
          throw new Error('Ride not found');
        }

        setRide(foundRide);
        setFormData((prev: FormData) => ({
          ...prev,
          pickupPoint: foundRide.pickup_points?.[0] || ''
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load ride details');
        toast.error('Failed to load ride details');
      }
    };

    const state = location.state as LocationState;
    if (state?.ride) {
      setRide(state.ride);
      setFormData((prev: FormData) => ({
        ...prev,
        pickupPoint: state.ride?.pickup_points?.[0] || ''
      }));
    } else {
      fetchRide();
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        throw new Error('You must be logged in to book a ride');
      }

      if (!ride) {
        throw new Error('Ride not found');
      }

      // Navigate to confirmation page with booking data
      navigate('/booking-confirmation', {
        state: {
          ride,
          bookingData: {
            name: formData.name,
            phone: formData.phone,
            pickupPoint: formData.pickupPoint
          }
        }
      });

      toast.success('Booking confirmed!');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  if (!ride) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Ride Not Found</h1>
            <p className="mt-4 text-gray-600">Please go back and try again.</p>
            <button
              onClick={() => navigate('/find-ride')}
              className="mt-6 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Back to Find Ride
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Ride Details</h1>
          
          {/* Ride Information */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ride Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-medium">{ride.from} → {ride.to}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{ride.date}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{ride.time}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Car className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Car Details</p>
                    <p className="font-medium">{ride.car_model} ({ride.car_number})</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Price per Seat</p>
                    <p className="font-medium">₹{ride.price_per_seat}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Information Form */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickupPoint">Pickup Point</Label>
                <select
                  id="pickupPoint"
                  value={formData.pickupPoint}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, pickupPoint: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                >
                  {ride.pickup_points?.map((point: string) => (
                    <option key={point} value={point}>
                      {point}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Confirm Booking'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetails; 