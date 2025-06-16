'use client';

import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Attraction } from '@/app/lib/definitions';

export default function Home() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  // const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Fetch attractions
    const fetchAttractions = async () => {
      try {
        const response = await fetch('/api/attraction');
        const data = await response.json();
        setAttractions(data);
      } catch (error) {
        console.error('Error fetching attractions:', error);
      }
    };

    fetchAttractions();

    // Initialize map
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.MAP_API_KEY || '',
        version: 'weekly',
      });

      const { Map } = await loader.load();
      const mapInstance = new Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 43.6532, lng: -79.3832 }, // Toronto coordinates
        zoom: 12,
      });

      setMap(mapInstance);

      // Get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(location);
            mapInstance.setCenter(location);

            // Add user location marker
            new google.maps.Marker({
              position: location,
              map: mapInstance,
              title: 'You are here',
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              },
            });
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    };

    initMap();
  }, []);

  // Update markers when attractions or map changes
  useEffect(() => {
    if (!map || !attractions.length) return;

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null));
    const newMarkers: google.maps.Marker[] = [];

    // Create info window
    const infoWindow = new google.maps.InfoWindow();

    // Add markers for each attraction
    attractions.forEach((attraction) => {
      const marker = new google.maps.Marker({
        position: { lat: attraction.latitude, lng: attraction.longitude },
        map,
        title: attraction.name,
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        },
      });

      // Add click listener
      marker.addListener('click', () => {
        const content = `
          <div class="p-2">
            <h3 class="text-lg font-bold">${attraction.name}</h3>
            <p class="text-sm">${attraction.description}</p>
            <p class="text-sm"><strong>Address:</strong> ${attraction.address}</p>
            ${attraction.interpreters ? `<p class="text-sm"><strong>Interpreters:</strong> ${attraction.interpreters}</p>` : ''}
            <a href="https://www.google.com/maps/dir/?api=1&destination=${attraction.latitude},${attraction.longitude}" 
               target="_blank" 
               class="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded text-sm">
              Get Directions
            </a>
          </div>
        `;
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, attractions]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Explore Attractions</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
          <div id="map" className="w-full h-[600px] rounded-lg"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction) => (
            <div key={attraction.attraction_id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {attraction.image_url && (
                <img
                  src={attraction.image_url}
                  alt={attraction.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{attraction.name}</h2>
                <p className="text-gray-600 mb-2">{attraction.description}</p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Address:</strong> {attraction.address}
                </p>
                {attraction.interpreters && (
                  <p className="text-sm text-gray-500">
                    <strong>Interpreters:</strong> {attraction.interpreters}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
