'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CreateBookingFormProps {
  userId: number;
  userName: string;
}

export default function CreateBookingForm({ userId, userName }: CreateBookingFormProps) {
  const router = useRouter();
  const [interpreters, setInterpreters] = useState<any[]>([]);
  const [attractions, setAttractions] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);
  const [selectedInterpreter, setSelectedInterpreter] = useState<number | ''>('');
  const [selectedAttraction, setSelectedAttraction] = useState<number | ''>('');
  const [selectedLanguage, setSelectedLanguage] = useState<number | ''>('');
  const [formData, setFormData] = useState({
    start_time: '',
    end_time: '',
    num_people: '',
    price: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch interpreters
        const interpreterResponse = await fetch('/api/interpreter');
        if (!interpreterResponse.ok) throw new Error('Failed to fetch interpreters');
        const interpreterData = await interpreterResponse.json();
        setInterpreters(interpreterData);

        // Fetch attractions
        const attractionResponse = await fetch('/api/attraction');
        if (!attractionResponse.ok) throw new Error('Failed to fetch attractions');
        const attractionData = await attractionResponse.json();
        setAttractions(attractionData);

        // Fetch languages
        const languageResponse = await fetch('/api/language');
        if (!languageResponse.ok) throw new Error('Failed to fetch languages');
        const languageData = await languageResponse.json();
        setLanguages(languageData);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load required data. Please try again.');
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedInterpreter || !selectedAttraction || !selectedLanguage) {
      setError('Please select an interpreter, attraction, and language');
      return;
    }

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          traveler_id: userId,
          interpreter_id: selectedInterpreter,
          attraction_id: selectedAttraction,
          language_id: selectedLanguage,
          start_time: formData.start_time,
          end_time: formData.end_time,
          num_people: parseInt(formData.num_people),
          price: formData.price ? parseFloat(formData.price) : null,
          status: 'pending'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      // Reset form
      setSelectedInterpreter('');
      setSelectedAttraction('');
      setSelectedLanguage('');
      setFormData({
        start_time: '',
        end_time: '',
        num_people: '',
        price: '',
      });
      setError(null);

      // Refresh the page to show new booking
      router.refresh();
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h3 className="card-title mb-0">Create New Booking for {userName}</h3>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Attraction</label>
              <select
                className="form-select"
                value={selectedAttraction}
                onChange={(e) => setSelectedAttraction(e.target.value ? parseInt(e.target.value) : '')}
                required
              >
                <option value="">Select an attraction</option>
                {attractions.map((attraction) => (
                  <option key={attraction.attraction_id} value={attraction.attraction_id}>
                    {attraction.name}
                  </option>
                ))}
              </select>
            </div>
                  
            <div className="col-md-6">
              <label className="form-label">Interpreter</label>
              <select
                className="form-select"
                value={selectedInterpreter}
                onChange={(e) => setSelectedInterpreter(e.target.value ? parseInt(e.target.value) : '')}
                required
              >
                <option value="">Select an interpreter</option>
                {interpreters.map((interpreter) => (
                  <option key={interpreter.interpreter_id} value={interpreter.interpreter_id}>
                    {interpreter.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Language</label>
              <select
                className="form-select"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value ? parseInt(e.target.value) : '')}
                required
              >
                <option value="">Select a language</option>
                {languages.map((language) => (
                  <option key={language.language_id} value={language.language_id}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Number of People</label>
              <input
                type="number"
                className="form-control"
                value={formData.num_people}
                onChange={(e) => setFormData({ ...formData, num_people: e.target.value })}
                min="1"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Start Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">End Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Price (CAD)</label>
              <input
                type="number"
                className="form-control"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                min="0"
                step="0.01"
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Create Booking
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 