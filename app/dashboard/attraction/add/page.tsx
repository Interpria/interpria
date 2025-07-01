'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateAttractionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    postal_code: '',
    city: '',
    province: '',
    country: '',
    email: '',
    phone: '',
    website: '',
    category: '',
    longitude: '',
    latitude: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/attraction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create attraction');
      }

      router.push('/dashboard/attraction');
      router.refresh();
    } catch (error) {
      console.error('Error creating attraction:', error);
      alert('Failed to create attraction. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className='container py-5'>
      <div className='mb-4'>
        <Link href="/dashboard/attraction" className='btn btn-secondary'>
          ← Back to Attraction List
        </Link>
      </div>

      <div className='card'>
        <div className='card-header'>
          <h1 className='card-title mb-0'>Create New Attraction</h1>
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
                  <option value="">Select a category</option>
                  <option value="museum">Museum</option>
                  <option value="art">Art</option>
                  <option value="nature">Nature</option>
                  <option value="historical">Historical</option>
                  <option value="religion">Religion</option>
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
                  value={formData.website}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>

              <div className='col-md-6'>
                <label className='form-label'>Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>

              <div className='col-md-6'>
                <label className='form-label'>Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>

              <div className='col-12'>
                <button type="submit" className='btn btn-primary'>
                  Create Attraction
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 