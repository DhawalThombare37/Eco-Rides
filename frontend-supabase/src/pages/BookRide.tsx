import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { puneRoutes, puneAreas } from '@/data/puneData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, Clock, Users } from 'lucide-react';

export default function BookRide() {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [area, setArea] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState(puneRoutes);

  const handleSearch = () => {
    const filtered = puneRoutes.filter(route => {
      const matchesFrom = !from || route.from === from;
      const matchesTo = !to || route.to === to;
      const matchesArea = !area || route.area === area;
      const matchesDate = !date || route.departureTime.includes(date);
      return matchesFrom && matchesTo && matchesArea && matchesDate;
    });
    setFilteredRoutes(filtered);
  };

  const handleBookRide = (ride: typeof puneRoutes[0]) => {
    navigate('/ride-details', { state: { ride } });
  };

  const getAreaOptions = () => {
    return [
      { value: '', label: 'All Areas' },
      { value: 'tech', label: 'Tech Parks' },
      { value: 'education', label: 'Educational' },
      { value: 'commercial', label: 'Commercial' }
    ];
  };

  const getLocationOptions = () => {
    const allLocations = Object.values(puneAreas).flat();
    return allLocations.map(location => ({
      value: location,
      label: location
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book a Ride in Pune</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Locations</SelectItem>
              {getLocationOptions().map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Locations</SelectItem>
              {getLocationOptions().map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Area Type</label>
          <Select value={area} onValueChange={setArea}>
            <SelectTrigger>
              <SelectValue placeholder="Select area type" />
            </SelectTrigger>
            <SelectContent>
              {getAreaOptions().map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full"
          />
        </div>

        <Button onClick={handleSearch} className="w-full md:col-span-4">
          Search Rides
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map(route => (
            <Card key={route.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                  {route.from} → {route.to}
                </CardTitle>
                <CardDescription>
                  Departure: {route.departureTime}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{route.estimatedTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{route.availableSeats} seats</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">₹{route.price}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{route.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={() => handleBookRide(route)}>Book Now</Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No rides found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
} 