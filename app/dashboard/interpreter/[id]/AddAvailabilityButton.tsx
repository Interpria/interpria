'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AddAvailabilityButtonProps {
  interpreterId: number;
  attractionId: number;
  attractionName: string;
}

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AddAvailabilityButton({ interpreterId, attractionId, attractionName }: AddAvailabilityButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    weekday: '',
    start_time: '',
    end_time: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/interpreter/[id]/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interpreter_id: interpreterId,
          attraction_id: attractionId,
          weekday: parseInt(formData.weekday),
          start_time: formData.start_time,
          end_time: formData.end_time,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add availability');
      }

      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error adding availability:', error);
      alert(error instanceof Error ? error.message : 'Failed to add availability. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <button 
        className="btn btn-success btn-sm"
        onClick={() => setIsModalOpen(true)}
      >
        Add Availability
      </button>

      {isModalOpen && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Availability for {attractionName}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="weekday" className="form-label">Day of Week</label>
                    <select
                      className="form-select"
                      id="weekday"
                      name="weekday"
                      value={formData.weekday}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a day</option>
                      {weekdays.map((day, index) => (
                        <option key={index} value={index}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="start_time" className="form-label">Start Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="start_time"
                      name="start_time"
                      value={formData.start_time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="end_time" className="form-label">End Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="end_time"
                      name="end_time"
                      value={formData.end_time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Availability
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <div className="modal-backdrop show"></div>}
    </>
  );
} 