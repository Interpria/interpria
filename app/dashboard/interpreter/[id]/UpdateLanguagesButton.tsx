'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Language } from '@/app/lib/definitions';

type Props = {
  interpreterId: number;
  // currentLanguages: string[];
};

export default function UpdateLanguagesButton({ interpreterId }: Props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const response = await fetch('/api/language');
        if (!response.ok) {
          throw new Error('Failed to fetch languages');
        }
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.error('Error loading languages:', error);
        setError('Failed to load languages');
      }
    };
    loadLanguages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`/api/interpreterxlanguage/${interpreterId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language_ids: selectedLanguages.map(id => parseInt(id)),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update languages');
      }

      setShowModal(false);
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <>
      <button
        className="btn btn-warning"
        onClick={() => setShowModal(true)}
      >
        Update Languages
      </button>

      {showModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Languages</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Select Languages</label>
                    <select
                      multiple
                      className="form-select"
                      size={5}
                      value={selectedLanguages}
                      onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, option => option.value);
                        setSelectedLanguages(values);
                      }}
                    >
                      {languages.map((language) => (
                        <option key={language.language_id} value={language.language_id}>
                          {language.name}
                        </option>
                      ))}
                    </select>
                    <div className="form-text">
                      Hold Ctrl (Windows) or Command (Mac) to select multiple languages
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop show"></div>}
    </>
  );
} 