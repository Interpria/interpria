'use client';

import { useEffect, useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { Attraction } from '@/app/lib/definitions';

export default function Home() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    // Fetch attractions
    const fetchAttractions = async () => {
      try {
        const response = await fetch('/api/attraction');
        const data = await response.json();
        console.log('Raw attraction data:', data);
        
        // Validate and convert coordinates
        const validAttractions = data.filter((attraction: any) => {
          const lat = parseFloat(attraction.latitude);
          const lng = parseFloat(attraction.longitude);
          return !isNaN(lat) && !isNaN(lng);
        }).map((attraction: any) => ({
          ...attraction,
          latitude: parseFloat(attraction.latitude),
          longitude: parseFloat(attraction.longitude)
        }));

        console.log('Processed attractions:', validAttractions);
        setAttractions(validAttractions);
      } catch (error) {
        console.error('Error fetching attractions:', error);
      }
    };

    fetchAttractions();

    // Initialize map
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || '',
      version: "weekly",
      libraries: ["places"]
    });

    loader.load().then((google) => {
      const mapOptions = {
        center: { lat: 43.6532, lng: -79.3832 }, // Toronto coordinates
        zoom: 12,
      };

      const mapInstance = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        mapOptions
      );
      setMap(mapInstance);
    }).catch((error) => {
      console.error('Error loading Google Maps:', error);
    });
  }, []);

  // Add markers when map and attractions are loaded
  useEffect(() => {
    if (!map || !attractions.length) return;

    // Clear existing markers
    const markers: google.maps.Marker[] = [];

    // Add attraction markers
    attractions.forEach((attraction) => {
      // Double check coordinates are valid numbers
      const lat = parseFloat(attraction.latitude.toString());
      const lng = parseFloat(attraction.longitude.toString());

      if (isNaN(lat) || isNaN(lng)) {
        console.error('Invalid coordinates for attraction:', attraction);
        return;
      }

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: attraction.name,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="text-lg font-bold">${attraction.name}</h3>
            <p class="text-sm">${attraction.description}</p>
            <p class="text-sm"><strong>Address:</strong> ${attraction.address}</p>
            <p class="text-sm"><strong>Category:</strong> ${attraction.category}</p>
            ${attraction.website ? `<p class="text-sm"><strong>Website:</strong> <a href="${attraction.website}" target="_blank">${attraction.website}</a></p>` : ''}
            <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" 
               target="_blank" rel="noopener noreferrer" 
               class="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded text-sm">
              Get Directions
            </a>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      markers.push(marker);
    });

    // Cleanup function
    return () => {
      markers.forEach(marker => marker.setMap(null));
    };
  }, [map, attractions]);

  return (
    <div className="min-h-screen bg-gray-75">
      <div className="container mx-auto px-1 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Map</h1>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div id="map" className="w-full h-[600px] rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}