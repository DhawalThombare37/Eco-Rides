export interface RideOffer {
  id: string;
  user_id: string;
  from: string;
  to: string;
  area: string;
  date: string;
  time: string;
  car_model: string;
  car_number: string;
  available_seats: number;
  price_per_seat: number;
  pickup_points: string[];
  created_at: string;
  status: string;
}

export interface Booking {
  id: string;
  ride_id: string;
  user_id: string;
  passenger_name: string;
  passenger_phone: string;
  pickup_point: string;
  created_at: string;
  status: string;
}

const sampleRides: RideOffer[] = [
  {
    id: 'ride-1',
    user_id: 'user-1',
    from: 'Kothrud',
    to: 'Hinjewadi',
    area: 'Tech Park',
    date: '2025-03-20',
    time: '08:00 AM',
    car_model: 'Hyundai i20',
    car_number: 'MH12 AB 1234',
    available_seats: 3,
    price_per_seat: 150,
    pickup_points: ['Kothrud Depot', 'Paud Road'],
    created_at: new Date().toISOString(),
    status: 'active',
  },
  {
    id: 'ride-2',
    user_id: 'user-2',
    from: 'Viman Nagar',
    to: 'Magarpatta',
    area: 'Commercial',
    date: '2025-03-22',
    time: '09:30 AM',
    car_model: 'Tata Nexon EV',
    car_number: 'MH12 XY 5678',
    available_seats: 2,
    price_per_seat: 120,
    pickup_points: ['Phoenix Mall', 'Kharadi Bypass'],
    created_at: new Date().toISOString(),
    status: 'active',
  },
  {
    id: 'ride-3',
    user_id: 'user-3',
    from: 'Pune',
    to: 'Lonavala',
    area: 'Leisure',
    date: '2025-03-23',
    time: '10:00 AM',
    car_model: 'Toyota Hyryder Hybrid',
    car_number: 'MH14 ZZ 9988',
    available_seats: 4,
    price_per_seat: 220,
    pickup_points: ['Swargate', 'Chandni Chowk'],
    created_at: new Date().toISOString(),
    status: 'active',
  },
];

let rides = [...sampleRides];
let bookings: Booking[] = [
  {
    id: 'booking-1',
    ride_id: 'ride-1',
    user_id: 'user-guest',
    passenger_name: 'Rahul Sharma',
    passenger_phone: '+919876543210',
    pickup_point: 'Kothrud Depot',
    created_at: new Date().toISOString(),
    status: 'confirmed',
  },
];

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const ridesService = {
  async getAvailableRides(filters?: { from?: string; to?: string; date?: string }) {
    await delay();
    return rides.filter((ride) => {
      const fromMatch = filters?.from ? ride.from === filters.from : true;
      const toMatch = filters?.to ? ride.to === filters.to : true;
      const dateMatch = filters?.date ? ride.date === filters.date : true;
      return fromMatch && toMatch && dateMatch;
    });
  },

  async offerRide(rideData: Omit<RideOffer, 'id' | 'created_at' | 'status'>) {
    await delay();
    const newRide: RideOffer = {
      ...rideData,
      id: `ride-${crypto.randomUUID()}`,
      created_at: new Date().toISOString(),
      status: 'active',
    };
    rides = [newRide, ...rides];
    return newRide;
  },

  async bookRide(bookingData: Omit<Booking, 'id' | 'created_at' | 'status'>) {
    await delay();
    const ride = rides.find((r) => r.id === bookingData.ride_id);
    if (!ride) {
      throw new Error('Ride not found');
    }
    if (ride.available_seats < 1) {
      throw new Error('No seats available');
    }

    ride.available_seats -= 1;

    const booking: Booking = {
      ...bookingData,
      id: `booking-${crypto.randomUUID()}`,
      created_at: new Date().toISOString(),
      status: 'confirmed',
    };
    bookings = [...bookings, booking];
    return booking;
  },

  async getUserOfferedRides(userId: string) {
    await delay();
    return rides.filter((ride) => ride.user_id === userId);
  },

  async getUserBookedRides(userId: string) {
    await delay();
    return bookings
      .filter((booking) => booking.user_id === userId)
      .map((booking) => ({
        ...booking,
        ride: rides.find((ride) => ride.id === booking.ride_id),
      }));
  },

  async cancelRide(rideId: string) {
    await delay();
    rides = rides.map((ride) =>
      ride.id === rideId ? { ...ride, status: 'cancelled' } : ride,
    );
  },

  async cancelBooking(bookingId: string) {
    await delay();
    bookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking,
    );
  },

  async testDatabaseConnection() {
    await delay();
    return {
      status: 'ok',
      message: 'App is running in UI-only mode with mock data.',
      rides: rides.length,
      bookings: bookings.length,
    };
  },
};