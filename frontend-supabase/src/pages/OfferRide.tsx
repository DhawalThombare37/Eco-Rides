import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { puneAreas } from '@/data/puneData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Users, Car, ChevronDown } from 'lucide-react';
import { ridesService } from '@/services/rides';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const OfferRide = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    area: '',
    date: '',
    time: '',
    availableSeats: '',
    pricePerSeat: '',
    carModel: '',
    carNumber: '',
    pickupPoints: [] as string[]
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('You must be logged in to offer a ride');
      }

      // Create ride in Supabase
      const { data: ride, error: rideError } = await supabase
        .from('rides')
        .insert([{
          user_id: user.id,
          from_location: formData.from,
          to_location: formData.to,
          area: formData.area,
          date: formData.date,
          time: formData.time,
          car_model: formData.carModel,
          car_number: formData.carNumber,
          available_seats: parseInt(formData.availableSeats),
          price_per_seat: parseInt(formData.pricePerSeat),
          pickup_points: formData.pickupPoints,
          status: 'active'
        }])
        .select()
        .single();

      if (rideError) {
        throw rideError;
      }

      // Navigate to confirmation page with ride data
      navigate('/offer-ride/confirm', { state: { ride } });
      toast.success('Ride offered successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to offer ride');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getAreaOptions = () => [
    { value: 'tech', label: 'Tech Park' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'education', label: 'Educational' }
  ];

  const getAllLocations = () => {
    const allLocations = [
      ...puneAreas.techParks,
      ...puneAreas.residential,
      ...puneAreas.educational,
      ...puneAreas.commercial
    ];
    return allLocations;
  };

  const getSuggestedDestinations = (fromLocation: string) => {
    return getAllLocations().filter(location => location !== fromLocation);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Offer a Ride</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Route Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Route Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                  <div className="relative">
                    <div
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 cursor-pointer bg-white"
                      onClick={() => setShowFromDropdown(!showFromDropdown)}
                    >
                      {formData.from || 'Select pickup location'}
                    </div>
                    {showFromDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        {getAllLocations().map((location) => (
                          <div
                            key={location}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, from: location }));
                              setShowFromDropdown(false);
                            }}
                          >
                            {location}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <div className="relative">
                    <div
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 cursor-pointer bg-white"
                      onClick={() => setShowToDropdown(!showToDropdown)}
                    >
                      {formData.to || 'Select drop location'}
                    </div>
                    {showToDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        {getSuggestedDestinations(formData.from).map((location) => (
                          <div
                            key={location}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, to: location }));
                              setShowToDropdown(false);
                            }}
                          >
                            {location}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area Type</label>
                  <div className="relative">
                    <div
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 cursor-pointer bg-white"
                      onClick={() => setShowAreaDropdown(!showAreaDropdown)}
                    >
                      {formData.area ? getAreaOptions().find(opt => opt.value === formData.area)?.label : 'Select area type'}
                    </div>
                    {showAreaDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        {getAreaOptions().map((option) => (
                          <div
                            key={option.value}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, area: option.value }));
                              setShowAreaDropdown(false);
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Date and Time</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Car Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Car Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Car Model</label>
                  <input
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Car Number</label>
                  <input
                    type="text"
                    name="carNumber"
                    value={formData.carNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Seats and Price */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Seats and Price</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Available Seats</label>
                  <input
                    type="number"
                    name="availableSeats"
                    value={formData.availableSeats}
                    onChange={handleChange}
                    min="1"
                    max="7"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price per Seat (₹)</label>
                  <input
                    type="number"
                    name="pricePerSeat"
                    value={formData.pricePerSeat}
                    onChange={handleChange}
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Offer Ride'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfferRide;