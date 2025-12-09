import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Car, MapPin, Clock, Users, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function MyRides() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offeredRides, setOfferedRides] = useState<any[]>([]);
  const [bookedRides, setBookedRides] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'offered' | 'booked'>('offered');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setOfferedRides([
        {
          id: '1',
          from_location: 'Kothrud',
          to_location: 'Hinjewadi',
          date: '2025-03-20',
          time: '08:00 AM',
          available_seats: 3,
          price_per_seat: 150,
          status: 'active',
          bookings: [
            {
              id: '1',
              passenger_name: 'Rahul Sharma',
              passenger_phone: '+919876543210',
              pickup_point: 'Paud Road',
              status: 'confirmed'
            }
          ]
        },
        {
          id: '2',
          from_location: 'Viman Nagar',
          to_location: 'Magarpatta',
          date: '2025-03-22',
          time: '09:30 AM',
          available_seats: 2,
          price_per_seat: 100,
          status: 'active',
          bookings: []
        }
      ]);

      setBookedRides([
        {
          id: '1',
          passenger_name: 'Amit Singh',
          passenger_phone: '+919876543212',
          pickup_point: 'Baner',
          status: 'confirmed',
          ride: {
            id: '3',
            from_location: 'Pune',
            to_location: 'Lonavala',
            date: '2025-03-23',
            time: '10:00 AM',
            user: {
              name: 'Suresh Kumar',
              phone: '+919876543213'
            }
          }
        },
        {
          id: '2',
          passenger_name: 'Neha Gupta',
          passenger_phone: '+919876543214',
          pickup_point: 'Koregaon Park',
          status: 'confirmed',
          ride: {
            id: '4',
            from_location: 'Pune',
            to_location: 'Lavasa',
            date: '2025-03-24',
            time: '08:30 AM',
            user: {
              name: 'Rajesh Mehta',
              phone: '+919876543215'
            }
          }
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleCancelRide = async (rideId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setOfferedRides(prev => prev.map(ride => 
        ride.id === rideId ? { ...ride, status: 'cancelled' } : ride
      ));
      toast.success('Ride cancelled successfully');
    } catch (err) {
      console.error('Error cancelling ride:', err);
      toast.error('Failed to cancel ride. Please try again.');
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setBookedRides(prev => prev.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      ));
      toast.success('Booking cancelled successfully');
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error('Failed to cancel booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
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
              <div className="mt-4 flex justify-center space-x-4">
                <Button onClick={() => navigate('/')}>Go to Home</Button>
                <Button variant="outline" onClick={() => setError(null)}>Try Again</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Rides</h1>
        
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'offered' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('offered')}
            className="flex items-center gap-2"
          >
            <Car className="h-4 w-4" />
            Rides Offered
          </Button>
          <Button
            variant={activeTab === 'booked' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('booked')}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Rides Booked
          </Button>
        </div>

        {activeTab === 'offered' ? (
          <div className="space-y-4">
            {offeredRides.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-gray-500">You haven't offered any rides yet.</p>
                  <Button onClick={() => navigate('/offer-ride')} className="mt-4">
                    Offer a Ride
                  </Button>
                </CardContent>
              </Card>
            ) : (
              offeredRides.map((ride) => (
                <Card key={ride.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      {ride.from_location} → {ride.to_location}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <span>{ride.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-gray-500" />
                          <span>{ride.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-gray-500" />
                          <span>{ride.available_seats} seats available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">₹{ride.price_per_seat} per seat</span>
                        </div>
                      </div>
                      
                      {ride.bookings && ride.bookings.length > 0 && (
                        <div className="mt-4">
                          <h3 className="font-semibold mb-2">Bookings:</h3>
                          {ride.bookings.map((booking: any) => (
                            <div key={booking.id} className="ml-4 mt-2 p-2 bg-gray-50 rounded">
                              <p className="font-medium">{booking.passenger_name}</p>
                              <p className="text-sm text-gray-500">Phone: {booking.passenger_phone}</p>
                              <p className="text-sm text-gray-500">Pickup: {booking.pickup_point}</p>
                              <p className="text-sm text-gray-500">Status: {booking.status}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {ride.status === 'active' && (
                        <Button
                          variant="outline"
                          onClick={() => handleCancelRide(ride.id)}
                          className="mt-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Cancel Ride
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {bookedRides.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-gray-500">You haven't booked any rides yet.</p>
                  <Button onClick={() => navigate('/find-ride')} className="mt-4">
                    Find a Ride
                  </Button>
                </CardContent>
              </Card>
            ) : (
              bookedRides.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      {booking.ride.from_location} → {booking.ride.to_location}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <span>{booking.ride.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-gray-500" />
                          <span>{booking.ride.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-gray-500" />
                          <span>Driver: {booking.ride.user.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Phone: {booking.ride.user.phone}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-2 bg-gray-50 rounded">
                        <p className="font-medium">Your Details:</p>
                        <p className="text-sm text-gray-500">Name: {booking.passenger_name}</p>
                        <p className="text-sm text-gray-500">Phone: {booking.passenger_phone}</p>
                        <p className="text-sm text-gray-500">Pickup: {booking.pickup_point}</p>
                        <p className="text-sm text-gray-500">Status: {booking.status}</p>
                      </div>

                      {booking.status === 'confirmed' && (
                        <Button
                          variant="outline"
                          onClick={() => handleCancelBooking(booking.id)}
                          className="mt-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Cancel Booking
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
} 