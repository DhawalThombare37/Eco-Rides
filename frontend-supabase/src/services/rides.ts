import { supabase } from '@/lib/supabase';

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

export const ridesService = {
  // Get available rides with optional filters
  async getAvailableRides(filters?: { from?: string; to?: string; date?: string }) {
    try {
      let query = supabase
        .from('rides')
        .select(`
          *,
          user:users (
            name,
            phone,
            email
          )
        `)
        .eq('status', 'active')
        .gte('available_seats', 1);

      if (filters?.from) {
        query = query.eq('from', filters.from);
      }
      if (filters?.to) {
        query = query.eq('to', filters.to);
      }
      if (filters?.date) {
        query = query.eq('date', filters.date);
      }

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching rides:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error in getAvailableRides:', error);
      throw error;
    }
  },

  // Offer a new ride
  async offerRide(rideData: Omit<RideOffer, 'id' | 'created_at' | 'status'>) {
    try {
      console.log('Creating ride with data:', rideData);
      
      // First, ensure the user exists in the users table
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', rideData.user_id)
        .single();

      if (userError && userError.code !== 'PGRST116') {
        console.error('Error checking user:', userError);
        throw userError;
      }

      // If user doesn't exist, create them
      if (!user) {
        const { error: createUserError } = await supabase
          .from('users')
          .insert([{ id: rideData.user_id }]);

        if (createUserError) {
          console.error('Error creating user:', createUserError);
          throw createUserError;
        }
      }

      // Create the ride
      const { data, error } = await supabase
        .from('rides')
        .insert([{
          user_id: rideData.user_id,
          from: rideData.from,
          to: rideData.to,
          area: rideData.area,
          date: rideData.date,
          time: rideData.time,
          car_model: rideData.car_model,
          car_number: rideData.car_number,
          available_seats: rideData.available_seats,
          price_per_seat: rideData.price_per_seat,
          pickup_points: rideData.pickup_points,
          status: 'active'
        }])
        .select(`
          *,
          user:users (
            name,
            phone,
            email
          )
        `)
        .single();

      if (error) {
        console.error('Error creating ride:', error);
        throw error;
      }

      console.log('Ride created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error in offerRide:', error);
      throw error;
    }
  },

  // Book a ride
  async bookRide(bookingData: Omit<Booking, 'id' | 'created_at' | 'status'>) {
    try {
      // Start a transaction
      const { data: ride, error: rideError } = await supabase
        .from('rides')
        .select('available_seats')
        .eq('id', bookingData.ride_id)
        .single();

      if (rideError) {
        console.error('Error fetching ride:', rideError);
        throw rideError;
      }
      if (ride.available_seats < 1) {
        throw new Error('No seats available');
      }

      // Create booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert([{
          ride_id: bookingData.ride_id,
          user_id: bookingData.user_id,
          passenger_name: bookingData.passenger_name,
          passenger_phone: bookingData.passenger_phone,
          pickup_point: bookingData.pickup_point,
          status: 'confirmed'
        }])
        .select(`
          *,
          ride:rides (
            *,
            user:users (
              name,
              phone,
              email
            )
          )
        `)
        .single();

      if (bookingError) {
        console.error('Error creating booking:', bookingError);
        throw bookingError;
      }

      // Update available seats
      const { error: updateError } = await supabase
        .from('rides')
        .update({ available_seats: ride.available_seats - 1 })
        .eq('id', bookingData.ride_id);

      if (updateError) {
        console.error('Error updating seats:', updateError);
        // If seat update fails, rollback the booking
        await supabase
          .from('bookings')
          .delete()
          .eq('id', booking.id);
        throw updateError;
      }

      return booking;
    } catch (error) {
      console.error('Error in bookRide:', error);
      throw error;
    }
  },

  // Get rides offered by a user
  async getUserOfferedRides(userId: string) {
    try {
      const { data, error } = await supabase
        .from('rides')
        .select(`
          *,
          bookings (
            *,
            user:users (
              name,
              phone,
              email
            )
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user rides:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error in getUserOfferedRides:', error);
      throw error;
    }
  },

  // Get rides booked by a user
  async getUserBookedRides(userId: string) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          ride:rides (
            *,
            user:users (
              name,
              phone,
              email
            )
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user bookings:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error in getUserBookedRides:', error);
      throw error;
    }
  },

  // Cancel a ride
  async cancelRide(rideId: string) {
    try {
      const { error } = await supabase
        .from('rides')
        .update({ status: 'cancelled' })
        .eq('id', rideId);

      if (error) {
        console.error('Error cancelling ride:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in cancelRide:', error);
      throw error;
    }
  },

  // Cancel a booking
  async cancelBooking(bookingId: string) {
    try {
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .select('ride_id')
        .eq('id', bookingId)
        .single();

      if (bookingError) {
        console.error('Error fetching booking:', bookingError);
        throw bookingError;
      }

      // Update booking status
      const { error: updateBookingError } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (updateBookingError) {
        console.error('Error updating booking status:', updateBookingError);
        throw updateBookingError;
      }

      // Get current available seats
      const { data: ride, error: rideError } = await supabase
        .from('rides')
        .select('available_seats')
        .eq('id', booking.ride_id)
        .single();

      if (rideError) {
        console.error('Error fetching ride:', rideError);
        throw rideError;
      }

      // Update available seats by incrementing
      const { error: updateRideError } = await supabase
        .from('rides')
        .update({ available_seats: ride.available_seats + 1 })
        .eq('id', booking.ride_id);

      if (updateRideError) {
        console.error('Error updating ride seats:', updateRideError);
        throw updateRideError;
      }
    } catch (error) {
      console.error('Error in cancelBooking:', error);
      throw error;
    }
  },

  // Test database connection and create sample data
  async testDatabaseConnection() {
    try {
      console.log('Testing database connection...');

      // Use a specific test email
      const testEmail = 'dhawal.tp37@gmail.com';
      const testPassword = 'TestPassword123';

      // Sign in as a test user
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword
      });

      if (authError) {
        console.log('Test user not found, attempting to sign up...');
        // If sign in fails, try to sign up
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: testEmail,
          password: testPassword,
          options: {
            data: {
              name: 'Test User',
              phone: '1234567890'
            }
          }
        });

        if (signUpError) {
          console.error('Error creating test user:', signUpError);
          throw new Error(`Failed to create test user: ${signUpError.message}`);
        }

        if (!signUpData.user) {
          throw new Error('Failed to create test user: No user data returned');
        }

        console.log('Test user created successfully');
      }

      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('Error getting user:', userError);
        throw new Error(`Failed to get user: ${userError?.message || 'No user found'}`);
      }

      console.log('Test user authenticated:', user.email);

      // 1. Create a test user profile
      const testUserProfile = {
        id: user.id,
        name: 'Test User',
        phone: '1234567890',
        email: user.email
      };

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .insert([testUserProfile])
        .select()
        .single();

      if (profileError && profileError.code !== '23505') { // Ignore duplicate key error
        console.error('Error creating user profile:', profileError);
        throw new Error(`Failed to create user profile: ${profileError.message}`);
      }
      console.log('Test user profile created:', profile);

      // 2. Create a test ride
      const testRide = {
        user_id: user.id,
        from_location: 'Test From',
        to_location: 'Test To',
        area: 'Test Area',
        date: new Date().toISOString().split('T')[0],
        time: '12:00',
        car_model: 'Test Car',
        car_number: 'TEST123',
        available_seats: 4,
        price_per_seat: 100,
        pickup_points: ['Test Point 1', 'Test Point 2']
      };

      const { data: ride, error: rideError } = await supabase
        .from('rides')
        .insert([testRide])
        .select()
        .single();

      if (rideError) {
        console.error('Error creating test ride:', rideError);
        throw new Error(`Failed to create test ride: ${rideError.message}`);
      }
      console.log('Test ride created:', ride);

      // 3. Create a test booking
      const testBooking = {
        ride_id: ride.id,
        user_id: user.id,
        passenger_name: 'Test Passenger',
        passenger_phone: '9876543210',
        pickup_point: 'Test Point 1'
      };

      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert([testBooking])
        .select()
        .single();

      if (bookingError) {
        console.error('Error creating test booking:', bookingError);
        throw new Error(`Failed to create test booking: ${bookingError.message}`);
      }
      console.log('Test booking created:', booking);

      // 4. Verify the data - Modified query to handle missing relationships
      const { data: verifiedRide, error: verifyError } = await supabase
        .from('rides')
        .select('*')
        .eq('id', ride.id)
        .single();

      if (verifyError) {
        console.error('Error verifying data:', verifyError);
        throw new Error(`Failed to verify data: ${verifyError.message}`);
      }

      // Get user data separately
      const { data: userData, error: userDataError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userDataError) {
        console.error('Error getting user data:', userDataError);
        throw new Error(`Failed to get user data: ${userDataError.message}`);
      }

      // Get booking data separately
      const { data: bookingData, error: bookingDataError } = await supabase
        .from('bookings')
        .select('*')
        .eq('ride_id', ride.id)
        .single();

      if (bookingDataError) {
        console.error('Error getting booking data:', bookingDataError);
        throw new Error(`Failed to get booking data: ${bookingDataError.message}`);
      }

      console.log('Database test completed successfully!');
      console.log('Verified ride data:', {
        ride: verifiedRide,
        user: userData,
        booking: bookingData
      });

      return {
        user: userData,
        ride: verifiedRide,
        booking: bookingData
      };
    } catch (error) {
      console.error('Error in testDatabaseConnection:', error);
      throw error;
    }
  }
}; 