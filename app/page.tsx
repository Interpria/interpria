'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Attraction } from '@/app/lib/definitions';
import InterpreterSection from './components/InterpreterSection';

const categoryColors: Record<string, string> = {
  museum: 'blue',
  art: 'purple',
  nature: 'green',
  historical: 'orange',
  religion: 'red',
  other: 'gray',
};

export default function Home() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [showInterpreters, setShowInterpreters] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const markersRef = useRef<google.maps.Marker[]>([]);

  // Filtered attractions by category and search
  const filteredAttractions = attractions.filter(a => {
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          .filter((a: Attraction) => !isNaN(+a.latitude) && !isNaN(+a.longitude))
          .map((a: Attraction) => ({
            ...a,
            latitude: +a.latitude,
            longitude: +a.longitude,
          }));
        setAttractions(valid);
      } catch (error) {
        console.error('Error fetching attractions:', error);
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
    if (!map || filteredAttractions.length === 0) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    filteredAttractions.forEach((attraction) => {
      const { latitude: lat, longitude: lng, category } = attraction;
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: attraction.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: categoryColors[category] || 'gray',
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: '#333',
        },
      });
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
  }, [map, filteredAttractions, handleViewInterpreters]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-1 py-8">
        <div className="flex flex-col gap-2 justify-center mb-4">
          <input
            type="text"
            placeholder="Search for an attraction..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="px-3 py-1 rounded border border-gray-300 w-full md:w-80 mx-auto mb-2"
          />
          <div className="flex flex-row gap-2 justify-center mb-2">
            <button
              className={`px-3 py-1 rounded ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedCategory('all')}
            >All</button>
            {['museum', 'art', 'nature', 'historical', 'religion', 'other'].map(cat => (
              <button
                key={cat}
                className={`px-3 py-1 rounded ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                style={{ border: `2px solid ${categoryColors[cat]}` }}
                onClick={() => setSelectedCategory(cat)}
              >{cat.charAt(0).toUpperCase() + cat.slice(1)}</button>
            ))}
          </div>
        </div>

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
