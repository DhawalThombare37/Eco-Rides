import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { RideOffer } from '../services/rides';
import { puneRoutes } from '../data/routes';

const FindRide: React.FC = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [suggestedDestinations, setSuggestedDestinations] = useState<string[]>([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [availableRides, setAvailableRides] = useState<RideOffer[]>([]);
  const [loading, setLoading] = useState(false);

  // Sample rides data with 2025 dates
  const sampleRides: RideOffer[] = [
    {
      id: '1',
      user_id: 'user1',
      from: 'Hinjewadi',
      to: 'Kothrud',
      area: 'tech',
      date: '2025-01-15',
      time: '08:00 AM',
      car_model: 'Maruti Swift',
      car_number: 'MH12AB1234',
      available_seats: 3,
      price_per_seat: 150,
      pickup_points: [
        'Tech Park One, Hinjewadi Phase 1',
        'Wipro Circle, Hinjewadi Phase 2',
        'Infosys Gate 1, Hinjewadi Phase 3'
      ]
    },
    {
      id: '2',
      user_id: 'user2',
      from: 'Magarpatta',
      to: 'Baner',
      area: 'tech',
      date: '2025-01-16',
      time: '09:00 AM',
      car_model: 'Hyundai i20',
      car_number: 'MH12CD5678',
      available_seats: 2,
      price_per_seat: 120,
      pickup_points: [
        'Magarpatta City, Cyber City Mall',
        'Eon IT Park, Kharadi',
        'Hadapsar Bus Stand'
      ]
    },
    {
      id: '3',
      user_id: 'user3',
      from: 'Viman Nagar',
      to: 'Hinjewadi',
      area: 'tech',
      date: '2025-01-17',
      time: '10:00 AM',
      car_model: 'Honda City',
      car_number: 'MH12EF9012',
      available_seats: 4,
      price_per_seat: 180,
      pickup_points: [
        'Phoenix Market City, Viman Nagar',
        'Kalyani Nagar Chowk',
        'Koregaon Park, German Bakery'
      ]
    },
    {
      id: '4',
      user_id: 'user4',
      from: 'FC Road',
      to: 'Pune University',
      area: 'education',
      date: '2025-01-18',
      time: '08:30 AM',
      car_model: 'Tata Tiago',
      car_number: 'MH12GH3456',
      available_seats: 3,
      price_per_seat: 100,
      pickup_points: [
        'FC Road, Goodluck Cafe',
        'JM Road, Deccan Gymkhana',
        'Fergusson College Main Gate'
      ]
    },
    {
      id: '5',
      user_id: 'user5',
      from: 'Kothrud',
      to: 'COEP',
      area: 'education',
      date: '2025-01-19',
      time: '09:30 AM',
      car_model: 'Maruti Baleno',
      car_number: 'MH12IJ7890',
      available_seats: 2,
      price_per_seat: 80,
      pickup_points: [
        'Kothrud Bus Stand, Near McDonalds',
        'Paud Road, MIT College',
        'Karve Nagar, Near Post Office'
      ]
    },
    {
      id: '6',
      user_id: 'user6',
      from: 'Camp',
      to: 'Shivajinagar',
      area: 'commercial',
      date: '2025-01-20',
      time: '10:30 AM',
      car_model: 'Hyundai Verna',
      car_number: 'MH12KL1234',
      available_seats: 3,
      price_per_seat: 90,
      pickup_points: [
        'Camp Area, Dorabjee Mall',
        'MG Road, Westend Mall',
        'Bund Garden, Boat Club'
      ]
    }
  ];

  useEffect(() => {
    if (from) {
      const route = puneRoutes.find(r => r.from === from);
      if (route) {
        setSuggestedDestinations(route.to);
      } else {
        setSuggestedDestinations([]);
      }
    } else {
      setSuggestedDestinations([]);
    }
  }, [from]);

  // Load sample rides by default
  useEffect(() => {
    setAvailableRides(sampleRides);
  }, []);

  const handleSearch = () => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      const filteredRides = sampleRides.filter(ride => {
        const matchesFrom = !from || ride.from.toLowerCase().includes(from.toLowerCase());
        const matchesTo = !to || ride.to.toLowerCase().includes(to.toLowerCase());
        return matchesFrom && matchesTo;
      });
      setAvailableRides(filteredRides);
      setLoading(false);
    }, 500);
  };

  const handleBookRide = (ride: RideOffer) => {
    navigate('/ride-details', { state: { ride } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find a Ride</h1>
          <p className="mt-2 text-gray-600">Search for available rides in your area</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* From Location */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <div className="relative">
                <div
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 cursor-pointer bg-white"
                  onClick={() => setShowFromDropdown(!showFromDropdown)}
                >
                  {from || 'Select pickup location'}
                </div>
                {showFromDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {puneRoutes.map((route) => (
                      <div
                        key={route.from}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setFrom(route.from);
                          setShowFromDropdown(false);
                        }}
                      >
                        {route.from}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* To Location */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <div className="relative">
                <div
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 cursor-pointer bg-white ${!from ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => from && setShowToDropdown(!showToDropdown)}
                >
                  {to || (from ? 'Select drop location' : 'Select from location first')}
                </div>
                {showToDropdown && from && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {suggestedDestinations.map((destination) => (
                      <div
                        key={destination}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setTo(destination);
                          setShowToDropdown(false);
                        }}
                      >
                        {destination}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSearch}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Search Rides
            </button>
          </div>
        </div>

        {/* Available Rides */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading available rides...</p>
            </div>
          ) : availableRides.length > 0 ? (
            availableRides.map((ride) => (
              <div key={ride.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {ride.from} → {ride.to}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {ride.date} at {ride.time}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Area: {ride.area.charAt(0).toUpperCase() + ride.area.slice(1)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Car: {ride.car_model} ({ride.car_number})
                    </p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Available Seats</p>
                        <p className="text-lg font-semibold">{ride.available_seats}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Price per Seat</p>
                        <p className="text-lg font-semibold">₹{ride.price_per_seat}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBookRide(ride)}
                      className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No rides available matching your criteria.</p>
              <p className="text-gray-500 mt-2">Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindRide;