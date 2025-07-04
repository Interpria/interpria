'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Interpreter, Language } from '../lib/definitions';

export default function BookingForm({ interpreterId, attractionId }: { interpreterId: number, attractionId: number }) {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<number | ''>('');
  const [interpreterDetail, setInterpreterDetail] = useState<(Partial<Interpreter> & { name: string; languages: string; primary_language: string })>({ name: '', languages: '', primary_language: '' });
  const [attractionName, setAttractionName] = useState<string>('');
  const [formData, setFormData] = useState({
    start_time: '',
    end_time: '',
    num_people: '',
    price: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [interpreterLanguages, setInterpreterLanguages] = useState<{ language_id: number; name: string }[]>([]);
  const [price, setPrice] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch interpreter details
        let interpreterData: (Partial<Interpreter> & { name: string; languages: string; primary_language: string }) = { name: '', languages: '', primary_language: '' };
        const interpreterResponse = await fetch(`/api/interpreter/${interpreterId}`);
        if (interpreterResponse.ok) {
          interpreterData = await interpreterResponse.json();
          setInterpreterDetail(interpreterData);
          console.log('Interpreter Data:', interpreterData);
        }

        // fetch the existing languages
        const langRes = await fetch(`/api/interpreterxlanguage/${interpreterId}`);
        if (!langRes.ok) {
          setError('Failed to fetch interpreter languages');
          return;
        }
        const interpreterLanguagesData: { language_id: number; name: string }[] = await langRes.json();

        // Ensure primary language is included only if not already present and valid
        if (
          interpreterData.primary_language_id &&
          interpreterData.primary_language &&
          !interpreterLanguagesData.some(lang => lang.language_id === interpreterData.primary_language_id)
        ) {
          interpreterLanguagesData.push({
            language_id: interpreterData.primary_language_id,
            name: interpreterData.primary_language
          });
        }

        setInterpreterLanguages(interpreterLanguagesData.map((lang) => ({ language_id: lang.language_id, name: lang.name })));

        // Fetch attraction details
        const attractionResponse = await fetch(`/api/attraction/${attractionId}`);
        if (attractionResponse.ok) {
          const attractionData = await attractionResponse.json();
          setAttractionName(attractionData?.name || (Array.isArray(attractionData) ? attractionData[0]?.name : ''));
        }

        const interpretAttractionResponse = await fetch(`/api/interpreterxattraction/interpreter/${interpreterId}/${attractionId}`);
        if (interpretAttractionResponse.ok) {
          const interpretAttractionData = await interpretAttractionResponse.json();
          setPrice(interpretAttractionData?.price || null);
        } else {
          setError('Failed to fetch interpretation details for the attraction');
        }

        // Fetch user session (assume /api/auth/session returns { userId })
        const sessionResponse = await fetch('/api/auth/login');
        if (sessionResponse.ok) {
          const sessionData = await sessionResponse.json();
          setUserId(sessionData.user.userId);
        } else {
          setError('You must be logged in to book.');
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load required data. Please try again.');
      }
    };

    loadData();
  }, [interpreterId, attractionId]);

  const numPeople = parseInt(formData.num_people) || 0;
  const unitPrice = price || 0;
  const subtotal = unitPrice * numPeople;
  const totalPrice = subtotal ? (subtotal * 1.13).toFixed(2) : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError('You must be logged in to book.');
      return;
    }
    if (!selectedLanguage) {
      setError('Please select a language');
      return;
    }
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          interpreter_id: interpreterId,
          attraction_id: attractionId,
          language_id: selectedLanguage,
          start_time: formData.start_time,
          end_time: formData.end_time,
          num_people: parseInt(formData.num_people),
          price: totalPrice ? parseFloat(totalPrice) : null, // <-- send totalPrice
          status: 'pending'
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create booking');
      }
      setSelectedLanguage('');
      setFormData({
        start_time: '',
        end_time: '',
        num_people: '',
        price: '',
      });
      setError(null);
      setShowSuccess(true);
      // router.push('/profile/user/booking'); // Remove auto-redirect
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h3 className="card-title mb-0">Confirm Booking</h3>
      </div>
      <div className="card-body">
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
              <h4 className="text-xl font-semibold mb-4">Booking request is sent</h4>
              <button
                className="btn btn-primary w-full"
                onClick={() => router.push('/profile/user/booking')}
              >
                Go to My Bookings
              </button>
            </div>
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Interpreter</label>
              <input
                type="text"
                className="form-control"
                value={interpreterDetail.name}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Attraction</label>
              <input
                type="text"
                className="form-control"
                value={attractionName}
                readOnly
              />
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
                {interpreterLanguages.map((language) => (
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
                value={subtotal}
                min="0"
                step="0.01"
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Total Price (CAD, incl. 13% tax)</label>
              <input
                type="text"
                className="form-control"
                value={totalPrice}
                readOnly
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Confirm Booking
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
