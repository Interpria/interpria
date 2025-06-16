'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchAttractionById } from '@/app/api/attraction/route';
import { Attraction } from '@/app/lib/definitions';

type FormData = Omit<Attraction, 'attraction_id' | 'created_at' | 'updated_at'>;

export default function EditAttractionPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    address: '',
    postal_code: '',
    city: '',
    province: '',
    country: '',
    email: '',
    phone: '',
    website: null,
    category: 'museum',
    longitude: 0,
    latitude: 0,
    is_closed: 0,
  });

  useEffect(() => {
    const loadAttractionData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const attractions = await fetchAttractionById(parseInt(params.id));
        
        if (!attractions || attractions.length === 0) {
          throw new Error('Attraction not found');
        }

        const attraction = attractions[0];
        setFormData({
          name: attraction.name,
          description: attraction.description,
          address: attraction.address,
          postal_code: attraction.postal_code,
          city: attraction.city,
          province: attraction.province,
          country: attraction.country,
          email: attraction.email,
          phone: attraction.phone,
          website: attraction.website,
          category: attraction.category,
          longitude: attraction.longitude,
          latitude: attraction.latitude,
          is_closed: attraction.is_closed,
        });
      } catch (error) {
        console.error('Error loading attraction:', error);
        setError('Failed to load attraction data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadAttractionData();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/attraction/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attraction_id: parseInt(params.id),
          ...formData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update attraction');
      }

      router.push(`/dashboard/attraction/${params.id}`);
      router.refresh();
    } catch (error) {
      console.error('Error updating attraction:', error);
      alert('Failed to update attraction. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading attraction data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link href={`/dashboard/attraction/${params.id}`} className="btn btn-secondary">
          Back to Attraction Details
        </Link>
      </div>
    );
  }

  return (
    <div className='container py-5'>
      <div className='mb-4'>
        <Link href={`/dashboard/attraction/${params.id}`} className='btn btn-secondary'>
          ← Back to Attraction Details
        </Link>
      </div>

      <div className='card'>
        <div className='card-header'>
          <h1 className='card-title mb-0'>Edit Attraction</h1>
        </div>

        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='row g-3'>
              <div className='col-md-6'>
                <label className='form-label'>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className='form-control'
                  required
                />
              </div>

              <div className='col-md-6'>
                <label className='form-label'>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className='form-control'
                  required
                >
                  <option value="museum">Museum</option>
                  <option value="art">Art</option>
                  <option value="nature">Nature</option>
                  <option value="historical">Historical</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className='col-12'>
                <label className='form-label'>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className='form-control'
                  rows={3}
                  required
                />
              </div>

              <div className='col-12'>
                <label className='form-label'>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className='form-control'
                  required
                />
              </div>

              <div className='col-md-4'>
                <label className='form-label'>Postal Code</label>
                <input
                  type="text"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>

              <div className='col-md-4'>
                <label className='form-label'>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className='form-control'
                  required
                />
              </div>

              <div className='col-md-4'>
                <label className='form-label'>Province</label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>

              <div className='col-md-6'>
                <label className='form-label'>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className='form-control'
                  required
                />
              </div>

              <div className='col-md-6'>
                <label className='form-label'>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>

              <div className='col-md-6'>
                <label className='form-label'>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>

              <div className='col-md-6'>
                <label className='form-label'>Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website || ''}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>

              <div className='col-md-6'>
                <label className='form-label'>Longitude</label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className='form-control'
                  required
                />
              </div>

              <div className='col-md-6'>
                <label className='form-label'>Latitude</label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className='form-control'
                  required
                />
              </div>

              <div className='col-md-6'>
                <label className='form-label'>Is Closed</label>
                <input
                  type="checkbox"
                  name="is_closed"
                  value={formData.is_closed}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>

              <div className='col-12'>
                <button type="submit" className='btn btn-primary'>
                  Update Attraction
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 