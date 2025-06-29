'use client';

import { useRouter } from 'next/navigation';

interface DeleteAttractionButtonProps {
  attractionId: number;
  onMainPage?: boolean;
}

export default function DeleteAttractionButton({ attractionId, onMainPage = false }: DeleteAttractionButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this attraction?')) {
      try {
        const response = await fetch(`/api/attraction/${attractionId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete attraction');
        }

        if (onMainPage) {
          router.refresh();
        } else {
          router.push('/dashboard/attraction');
          router.refresh();
        }
      } catch (error) {
        console.error('Error deleting attraction:', error);
        alert('Failed to delete attraction. Please try again.');
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="btn btn-danger"
    >
      Delete
    </button>
  );
} 