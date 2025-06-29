'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Attraction } from '@/app/lib/definitions';
import InterpreterSection from './components/InterpreterSection';

export default function Home() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [showInterpreters, setShowInterpreters] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  // Stable handler for our custom event
  const handleViewInterpreters = useCallback((event: Event) => {
    const detail = (event as CustomEvent).detail;
    try {
      const data: Attraction = JSON.parse(detail);
      setSelectedAttraction(data);
      setShowInterpreters(true);
      // Scroll to InterpreterSection after showing it
      setTimeout(() => {
        const section = document.getElementById('interpreter-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Wait for render
    } catch (err) {
      console.error('Failed to parse attraction detail:', err);
    }
  }, []);

  // Fetch attractions
  useEffect(() => {
    async function fetchAttractions() {
      try {
        const res = await fetch('/api/attraction');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const valid = data
          .filter((a: any) => !isNaN(+a.latitude) && !isNaN(+a.longitude))
          .map((a: any) => ({
            ...a,
            latitude: +a.latitude,
            longitude: +a.longitude,
          }));
        setAttractions(valid);
      } catch (err: any) {
        console.error('Error fetching attractions:', err);
        setErrorMessage('Could not load attractions.');
      }
    }
    fetchAttractions();
  }, []);

  // Initialize map
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || '',
      version: 'weekly',
      libraries: ['places'],
    });

    loader
      .load()
      .then((google) => {
        const mapInstance = new google.maps.Map(
          document.getElementById('map') as HTMLElement,
          { center: { lat: 43.6532, lng: -79.3832 }, zoom: 12 }
        );
        setMap(mapInstance);
      })
      .catch((err) => {
        console.error('Error loading Google Maps:', err);
        setErrorMessage('Could not load map.');
      });
  }, []);

  // Add/remove markers
  useEffect(() => {
    if (!map || attractions.length === 0) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    attractions.forEach((attraction) => {
      const { latitude: lat, longitude: lng } = attraction;
      const marker = new google.maps.Marker({ position: { lat, lng }, map, title: attraction.name });
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="text-lg font-bold">${attraction.name}</h3>
            <p class="text-sm">${attraction.description}</p>
            <p class="text-sm"><strong>Address:</strong> ${attraction.address}, ${attraction.city}${attraction.province ? `, ${attraction.province}` : ''}, ${attraction.country} ${attraction.postal_code}</p>
            <p class="text-sm"><strong>Category:</strong> ${attraction.category}</p>
            ${attraction.email ? `<p class="text-sm"><strong>Email:</strong> <a href=\"mailto:${attraction.email}\">${attraction.email}</a></p>` : ''}
            ${attraction.phone ? `<p class="text-sm"><strong>Phone:</strong> ${attraction.phone}</p>` : ''}
            ${attraction.website ? `<p class="text-sm"><strong>Website:</strong> <a href=\"${attraction.website}\" target=\"_blank\">${attraction.website}</a></p>` : ''}
            <p class="text-sm"><strong>Status:</strong> ${attraction.is_closed ? 'Closed' : 'Open'}</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" rel="noopener noreferrer" class="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded text-sm">
              Get Directions
            </a>
            <button id="view-interpreters-${attraction.attraction_id}" class="mt-2 px-3 py-1 rounded text-sm button-view">
              View Interpreters
            </button>
          </div>
        `,
      });

      marker.addListener('click', () => infoWindow.open(map, marker));

      // Delegate click on infoWindow button
      google.maps.event.addListener(infoWindow, 'domready', () => {
        const btn = document.getElementById(`view-interpreters-${attraction.attraction_id}`);
        btn?.addEventListener('click', () => {
          window.dispatchEvent(new CustomEvent('viewInterpreters', { detail: JSON.stringify(attraction) }));
        });
      });

      markersRef.current.push(marker);
    });

    // Add custom event listener
    window.addEventListener('viewInterpreters', handleViewInterpreters);
    return () => {
      // Cleanup markers
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
      // Cleanup event listener
      window.removeEventListener('viewInterpreters', handleViewInterpreters);
    };
  }, [map, attractions, handleViewInterpreters]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-1 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Map</h1>
        {errorMessage ? (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div id="map" className="w-full h-[600px] rounded-lg"></div>
          </div>
        )}

        {showInterpreters && selectedAttraction && (
          <>
            <div id="interpreter-section">
              <InterpreterSection
                attractionId={selectedAttraction.attraction_id}
                attractionName={selectedAttraction.name}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
