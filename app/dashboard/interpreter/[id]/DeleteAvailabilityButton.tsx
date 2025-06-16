'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteAvailabilityButtonProps {
  availabilityId: number;
  weekday: string;
  startTime: string;
  endTime: string;
}

export default function DeleteAvailabilityButton({ 
  availabilityId, 
  weekday, 
  startTime, 
  endTime 
}: DeleteAvailabilityButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/interpreter/availability/${availabilityId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete availability');
      }

      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error deleting availability:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete availability. Please try again.');
    }
  };

  return (
    <>
      <button 
        className="btn btn-danger btn-sm ms-2"
        onClick={() => setIsModalOpen(true)}
      >
        Delete
      </button>

      {isModalOpen && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Availability</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this availability?</p>
                <p className="mb-0">
                  {weekday} {startTime} - {endTime}
                </p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && <div className="modal-backdrop show"></div>}
    </>
  );
} 