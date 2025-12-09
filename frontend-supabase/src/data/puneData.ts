export interface Route {
  id: number;
  from: string;
  to: string;
  distance: string;
  estimatedTime: string;
  price: number;
  availableSeats: number;
  rating: number;
  area: string;
  departureTime: string;
}

export interface Community {
  id: string;
  name: string;
  location: string;
  members: number;
  rating: number;
  description: string;
  area: string;
}

export interface GreenPoint {
  id: string;
  location: string;
  points: number;
  description: string;
  area: string;
}

export const puneAreas = {
  techParks: [
    "Hinjewadi Phase 1",
    "Hinjewadi Phase 2",
    "Hinjewadi Phase 3",
    "Magarpatta City",
    "Kharadi IT Park",
    "Viman Nagar IT Park"
  ],
  residential: [
    "Kothrud",
    "Baner",
    "Aundh",
    "Wakad",
    "Pimple Saudagar",
    "Viman Nagar",
    "Kalyani Nagar",
    "Koregaon Park",
    "Shivajinagar",
    "Deccan"
  ],
  educational: [
    "University of Pune",
    "COEP",
    "Symbiosis",
    "Fergusson College",
    "MIT",
    "Bharati Vidyapeeth"
  ],
  commercial: [
    "FC Road",
    "JM Road",
    "Camp",
    "Koregaon Park",
    "Magarpatta City",
    "Phoenix Market City"
  ]
};

export const puneRoutes: Route[] = [
  {
    id: 1,
    from: "Hinjewadi",
    to: "Kothrud",
    distance: "15 km",
    estimatedTime: "45 mins",
    price: 150,
    availableSeats: 3,
    rating: 4.5,
    area: "tech",
    departureTime: "2025-04-01T08:30:00"
  },
  {
    id: 2,
    from: "Kothrud",
    to: "Hinjewadi",
    distance: "15 km",
    estimatedTime: "45 mins",
    price: 150,
    availableSeats: 2,
    rating: 4.2,
    area: "tech",
    departureTime: "2025-04-01T17:30:00"
  },
  {
    id: 3,
    from: "Baner",
    to: "Wakad",
    distance: "8 km",
    estimatedTime: "25 mins",
    price: 100,
    availableSeats: 4,
    rating: 4.8,
    area: "residential",
    departureTime: "2025-04-02T09:00:00"
  },
  {
    id: 4,
    from: "Wakad",
    to: "Baner",
    distance: "8 km",
    estimatedTime: "25 mins",
    price: 100,
    availableSeats: 3,
    rating: 4.6,
    area: "residential",
    departureTime: "2025-04-02T18:00:00"
  },
  {
    id: 5,
    from: "FC Road",
    to: "Viman Nagar",
    distance: "12 km",
    estimatedTime: "35 mins",
    price: 120,
    availableSeats: 2,
    rating: 4.3,
    area: "commercial",
    departureTime: "2025-04-03T10:00:00"
  },
  {
    id: 6,
    from: "Viman Nagar",
    to: "FC Road",
    distance: "12 km",
    estimatedTime: "35 mins",
    price: 120,
    availableSeats: 1,
    rating: 4.4,
    area: "commercial",
    departureTime: "2025-04-03T19:00:00"
  },
  {
    id: 7,
    from: "Pune University",
    to: "COEP",
    distance: "6 km",
    estimatedTime: "20 mins",
    price: 80,
    availableSeats: 3,
    rating: 4.7,
    area: "education",
    departureTime: "2025-04-04T08:00:00"
  },
  {
    id: 8,
    from: "COEP",
    to: "Pune University",
    distance: "6 km",
    estimatedTime: "20 mins",
    price: 80,
    availableSeats: 2,
    rating: 4.5,
    area: "education",
    departureTime: "2025-04-04T16:00:00"
  }
];

export const puneCommunities: Community[] = [
  {
    id: '1',
    name: 'Hinjewadi Tech Park Community',
    location: 'Hinjewadi Phase 1',
    members: 250,
    rating: 4.8,
    description: 'Community for IT professionals working in Hinjewadi Tech Park',
    area: 'tech'
  },
  {
    id: '2',
    name: 'Magarpatta City Residents',
    location: 'Magarpatta City',
    members: 180,
    rating: 4.6,
    description: 'Residential community in Magarpatta City',
    area: 'residential'
  },
  {
    id: '3',
    name: 'University Area Commuters',
    location: 'Deccan',
    members: 150,
    rating: 4.5,
    description: 'Community for students and faculty in University area',
    area: 'education'
  }
];

export const puneGreenPoints: GreenPoint[] = [
  {
    id: '1',
    location: 'Hinjewadi to Kothrud',
    points: 50,
    description: 'Regular carpool route with 3+ passengers',
    area: 'tech'
  },
  {
    id: '2',
    location: 'Viman Nagar to Magarpatta',
    points: 40,
    description: 'Eco-friendly vehicle route',
    area: 'tech'
  },
  {
    id: '3',
    location: 'University Area Routes',
    points: 30,
    description: 'Student carpool program',
    area: 'education'
  }
];

export const puneSmartRoutes = [
  {
    id: '1',
    name: 'Tech Park Express',
    description: 'Optimized route for IT professionals',
    distance: '15 km',
    timeSaved: '20 mins',
    co2Saved: '2.5 kg',
    area: 'tech'
  },
  {
    id: '2',
    name: 'Educational Hub',
    description: 'Route connecting major educational institutions',
    distance: '12 km',
    timeSaved: '15 mins',
    co2Saved: '2.0 kg',
    area: 'education'
  },
  {
    id: '3',
    name: 'Commercial District',
    description: 'Efficient route for shopping and business areas',
    distance: '10 km',
    timeSaved: '10 mins',
    co2Saved: '1.5 kg',
    area: 'commercial'
  }
]; 