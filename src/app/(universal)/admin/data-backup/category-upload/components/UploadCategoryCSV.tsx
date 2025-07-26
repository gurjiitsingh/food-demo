'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import { uploadCategories1 } from '@/app/(universal)/action/category/dbOperations';

export default function UploadCategoryCSV() {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        try {
          const parsed = result.data as any[];
          await uploadCategories1(parsed);
          alert('Categories uploaded successfully!');
        } catch (err) {
          console.error('Upload failed', err);
          alert('Upload failed');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={loading}
        className="mb-2"
      />
      {loading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
}
