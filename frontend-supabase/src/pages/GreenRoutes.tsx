import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Leaf, Car, Clock, Battery, Trees, Info } from 'lucide-react';

// Set your Mapbox access token
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

interface GreenRoute {
  id: string;
  name: string;
  start: [number, number];
  end: [number, number];
  distance: number;
  duration: number;
  co2Saved: number;
  treesSaved: number;
  batteryEfficiency: number;
  description: string;
  stops: {
    name: string;
    coordinates: [number, number];
    type: 'charging' | 'rest' | 'eco';
  }[];
}

const GreenRoutes = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<GreenRoute | null>(null);

  const greenRoutes: GreenRoute[] = [
    {
      id: '1',
      name: 'Pune Heritage Green Route',
      start: [73.8567, 18.5204], // Pune Station
      end: [73.8557, 18.5200], // Shaniwar Wada
      distance: 8.5,
      duration: 35,
      co2Saved: 2.1,
      treesSaved: 3,
      batteryEfficiency: 88,
      description: 'A scenic route through Pune\'s heritage sites with eco-friendly stops and charging stations.',
      stops: [
        {
          name: 'Pune Station Charging Point',
          coordinates: [73.8567, 18.5204],
          type: 'charging',
        },
        {
          name: 'FC Road Eco Stop',
          coordinates: [73.8500, 18.5200],
          type: 'eco',
        },
        {
          name: 'Shaniwar Wada Rest Area',
          coordinates: [73.8557, 18.5200],
          type: 'rest',
        },
      ],
    },
    {
      id: '2',
      name: 'Hinjewadi Tech Park Route',
      start: [73.7300, 18.5900], // Hinjewadi Phase 1
      end: [73.7400, 18.6000], // Hinjewadi Phase 3
      distance: 6.2,
      duration: 25,
      co2Saved: 1.5,
      treesSaved: 2,
      batteryEfficiency: 92,
      description: 'A tech park route with multiple charging stations and green spaces.',
      stops: [
        {
          name: 'Hinjewadi Phase 1 Charging',
          coordinates: [73.7300, 18.5900],
          type: 'charging',
        },
        {
          name: 'Tech Park Green Zone',
          coordinates: [73.7350, 18.5950],
          type: 'eco',
        },
        {
          name: 'Phase 3 Charging Hub',
          coordinates: [73.7400, 18.6000],
          type: 'charging',
        },
      ],
    },
    {
      id: '3',
      name: 'Koregaon Park Eco Route',
      start: [73.9000, 18.5300], // Koregaon Park
      end: [73.9100, 18.5400], // Viman Nagar
      distance: 7.8,
      duration: 30,
      co2Saved: 1.9,
      treesSaved: 2,
      batteryEfficiency: 90,
      description: 'A premium route through Pune\'s greenest neighborhoods with eco-friendly stops.',
      stops: [
        {
          name: 'Koregaon Park Charging',
          coordinates: [73.9000, 18.5300],
          type: 'charging',
        },
        {
          name: 'Kalyani Nagar Eco Stop',
          coordinates: [73.9050, 18.5350],
          type: 'eco',
        },
        {
          name: 'Viman Nagar Charging Hub',
          coordinates: [73.9100, 18.5400],
          type: 'charging',
        },
      ],
    }
  ];

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [73.8567, 18.5204], // Pune coordinates
      zoom: 12,
      attributionControl: false
    });

    // Add navigation control
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add route layers
    map.current.on('load', () => {
      greenRoutes.forEach((route) => {
        // Add route line
        map.current!.addSource(`route-${route.id}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [route.start, ...route.stops.map(stop => stop.coordinates), route.end],
            },
          },
        });

        map.current!.addLayer({
          id: `route-${route.id}`,
          type: 'line',
          source: `route-${route.id}`,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#22c55e',
            'line-width': 3,
          },
        });

        // Add markers for stops
        route.stops.forEach((stop, index) => {
          const marker = document.createElement('div');
          marker.className = 'w-6 h-6 rounded-full flex items-center justify-center';
          marker.style.backgroundColor = stop.type === 'charging' ? '#22c55e' : 
                                       stop.type === 'eco' ? '#10b981' : '#059669';
          
          new mapboxgl.Marker(marker)
            .setLngLat(stop.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(`
              <div class="p-2">
                <h3 class="font-medium">${stop.name}</h3>
                <p class="text-sm text-gray-600">${stop.type === 'charging' ? 'Charging Station' : 
                                                 stop.type === 'eco' ? 'Eco-Friendly Stop' : 'Rest Area'}</p>
              </div>
            `))
            .addTo(map.current!);
        });
      });
    });

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Routes List */}
          <div className="lg:col-span-1 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Green Routes</h1>
            <p className="text-gray-600">
              Discover eco-friendly routes in Pune with charging stations and green stops.
            </p>
            <div className="space-y-4">
              {greenRoutes.map((route) => (
                <div
                  key={route.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedRoute?.id === route.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setSelectedRoute(route)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{route.name}</h3>
                    <div className="flex items-center text-green-600">
                      <Leaf className="w-4 h-4 mr-1" />
                      <span>{route.co2Saved} kg CO₂ saved</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Car className="w-4 h-4 mr-2" />
                      {route.distance} km
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {route.duration} min
                    </div>
                    <div className="flex items-center">
                      <Battery className="w-4 h-4 mr-2" />
                      {route.batteryEfficiency}% efficiency
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-green-600">
                    <Trees className="w-4 h-4 mr-2" />
                    {route.treesSaved} trees saved
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div 
              ref={mapContainer} 
              className="w-full h-[600px] rounded-lg shadow-lg border border-gray-200"
            />
            {selectedRoute && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                <h3 className="font-medium text-gray-900">{selectedRoute.name}</h3>
                <p className="mt-2 text-gray-600">{selectedRoute.description}</p>
                <div className="mt-4 space-y-2">
                  {selectedRoute.stops.map((stop, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        stop.type === 'charging' ? 'bg-green-500' : 
                        stop.type === 'eco' ? 'bg-green-400' : 'bg-green-300'
                      }`} />
                      {stop.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenRoutes; 