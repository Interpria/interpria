'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingForm({ interpreterId, attractionId }: { interpreterId: number, attractionId: number }) {
  const router = useRouter();
  const [languages, setLanguages] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<number | ''>('');
  const [interpreterName, setInterpreterName] = useState<string>('');
  const [attractionName, setAttractionName] = useState<string>('');
  const [formData, setFormData] = useState({
    start_time: '',
    end_time: '',
    num_people: '',
    price: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [interpreterLanguages, setInterpreterLanguages] = useState<number[]>([]);
  const [interpretAttraction, setInterpretAttraction] = useState<any>(null);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch all languages
        const languageResponse = await fetch('/api/language');
        if (!languageResponse.ok) throw new Error('Failed to fetch languages');
        const languageData = await languageResponse.json();
        setLanguages(languageData);

        let interpreterData: any = [];
        // Fetch interpreter details
        const interpreterResponse = await fetch(`/api/interpreter/${interpreterId}`);
        if (interpreterResponse.ok) {
          interpreterData = await interpreterResponse.json();
          setInterpreterName(
            interpreterData?.name ||
            (Array.isArray(interpreterData) ? interpreterData[0]?.name : '')
          );
        }

        // fetch the existing languages
        const langRes = await fetch(`/api/interpreterxlanguage/${interpreterId}`);
        if (!langRes.ok) {
          setError('Failed to fetch interpreter languages');
          return;
        }
        const interpreterLanguagesData: { language_id: number; name: string }[] = await langRes.json();

        // fetch interpreter details (if not already fetched)
        let primary_language_id: number | undefined = undefined;
        let primary_language_name: string | undefined = undefined;
        if (interpreterData[0]?.primary_language_id && interpreterData[0]?.primary_language) {
          primary_language_id = interpreterData[0].primary_language_id;
          primary_language_name = interpreterData[0].primary_language;
        }

        // add primary language if not already in the list
        if (
          primary_language_id !== undefined &&
          !interpreterLanguagesData.some(lang => lang.language_id === primary_language_id)
        ) {
          interpreterLanguagesData.push({
            language_id: primary_language_id,
            name: primary_language_name!,
          });
        }

        // 4. pull out just the IDs into your state
        setInterpreterLanguages(interpreterLanguagesData.map((lang) => lang.language_id));

        // Fetch attraction details
        const attractionResponse = await fetch(`/api/attraction/${attractionId}`);
        if (attractionResponse.ok) {
          const attractionData = await attractionResponse.json();
          console.log('Attraction Data:', attractionData);
          setAttractionName(attractionData?.name || (Array.isArray(attractionData) ? attractionData[0]?.name : ''));
        }

        const interpretAttractionResponse = await fetch(`/api/interpreterxattraction/interpreter/${interpreterId}/${attractionId}`);
        if (interpretAttractionResponse.ok) {
          const interpretAttractionData = await interpretAttractionResponse.json();
          console.log('Interpretation Attraction Data:', interpretAttractionData);
          setInterpretAttraction(interpretAttractionData);
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
      router.push('/profile/user/booking');
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
                value={interpreterName}
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
                {languages
                  .filter((language) => interpreterLanguages.includes(language.language_id))
                  .map((language) => (
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