'use client';

interface DeleteLanguageButtonProps {
  languageId: number;
}

export default function DeleteLanguageButton({ languageId }: DeleteLanguageButtonProps) {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this language?')) {
      return;
    }

    try {
      const response = await fetch('/api/language', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language_id: languageId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete language');
      }

      window.location.reload();
    } catch (error) {
      console.error('Error deleting language:', error);
      alert('Failed to delete language. Please try again.');
    }
  };

  return (
    <button 
      className="btn btn-danger"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
} 