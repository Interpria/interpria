'use client';

import { useRouter } from 'next/navigation';

type Props = {
  interpreterId: number;
  attractionId: number;
  attractionName: string;
};

export default function DeleteAttractionButton({ interpreterId, attractionId, attractionName }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to remove ${attractionName} from this interpreter? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/interpreterxattraction/interpreter/${interpreterId}/${attractionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete attraction');
      }

      router.refresh();
    } catch (error) {
      console.error('Error deleting attraction:', error);
      alert('Failed to delete attraction. Please try again.');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-danger btn-sm"
    >
      Remove
    </button>
  );
} 