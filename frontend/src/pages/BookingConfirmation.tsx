import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RideOffer } from '../services/rides';
import { CheckCircle2, ArrowLeft, MapPin, Clock, Users, Car, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const ride = location.state?.ride as RideOffer;
  const bookingData = location.state?.bookingData;

  useEffect(() => {
    if (!ride || !bookingData) {
      navigate('/find-ride');
    }
  }, [ride, bookingData, navigate]);

  if (!ride || !bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Booking Not Found</h1>
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
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h1>
            <p className="mt-2 text-gray-600">Your ride has been successfully booked.</p>
          </div>

          {/* Booking Details */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Pickup Point</p>
                    <p className="font-medium">{bookingData.pickupPoint}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>You will receive a confirmation email with your booking details</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Please arrive at the pickup location 10 minutes before departure</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Have your booking confirmation ready to show the driver</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Contact support if you need to make any changes to your booking</span>
                </li>
              </ul>
            </div>

            {/* Support Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p>If you have any questions or need assistance, please contact our support team:</p>
                <p>📞 Phone: +91 1234567890</p>
                <p>📧 Email: support@ridepool.com</p>
                <p>🕒 Support Hours: 24/7</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={() => navigate('/find-ride')}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Find Ride
            </button>
            <button
              onClick={() => navigate('/my-rides')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              View My Rides
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation; 