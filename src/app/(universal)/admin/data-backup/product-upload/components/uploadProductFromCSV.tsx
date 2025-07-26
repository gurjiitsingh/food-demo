'use client';

import { useState } from 'react';
import Papa from 'papaparse';

export default function UploadCategoryCSV() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage('');

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        try {
          const rows = result.data as any[];

          for (const row of rows) {
            console.log('Category row --->', row);
            await uploadCategoryFromCSV(row);
          }

          setMessage(`✅ Uploaded ${rows.length} categories successfully.`);
        } catch (err) {
          console.error(err);
          setMessage('❌ Upload failed. Check console for details.');
        } finally {
          setUploading(false);
        }
      },
      error: (error) => {
        console.error(error);
        setMessage('❌ Error reading CSV file.');
        setUploading(false);
      },
    });
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold">Upload Category CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {uploading && <p className="text-blue-500">Uploading...</p>}
      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}
