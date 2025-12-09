import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OfferRideConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ride } = location.state || {};

  if (!ride) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ride Not Found</h1>
            <p className="text-gray-600 mb-6">The ride details could not be found.</p>
            <Button onClick={() => navigate('/offer-ride')} className="bg-green-600 hover:bg-green-700">
              Back to Offer Ride
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ride Offered Successfully!</h1>
            <p className="text-gray-600">Your ride has been listed and is now available for booking.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ride Details</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Route</p>
                  <p className="font-medium">{ride.from} → {ride.to}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">{new Date(ride.date).toLocaleDateString()} at {ride.time}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Available Seats</p>
                  <p className="font-medium">{ride.available_seats}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Car className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Car Details</p>
                  <p className="font-medium">{ride.car_model} ({ride.car_number})</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Your ride is now visible to other users</li>
              <li>You'll receive notifications when someone books your ride</li>
              <li>Make sure to check your messages for booking requests</li>
              <li>Be ready at the pickup location on time</li>
            </ul>
          </div>

          <div className="flex justify-between">
            <Button 
              onClick={() => navigate('/my-rides')}
              className="bg-green-600 hover:bg-green-700"
            >
              View My Rides
            </Button>
            <Button 
              onClick={() => navigate('/offer-ride')}
              variant="outline"
            >
              Offer Another Ride
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferRideConfirmation; 