'use client';

import { useEffect } from 'react';
import { FileText } from 'lucide-react';
import apiClient from '@/lib/api';
import { useAppStore } from '@/lib/store';

export default function DocumentList() {
  const { documents, setDocuments } = useAppStore();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await apiClient.get('/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error('Failed to fetch documents:', error);
      }
    };
    fetchDocuments();
  }, [setDocuments]);

  return (
    <div className="p-4 flex-grow">
      <h2 className="text-lg font-semibold mb-3">My Documents</h2>
      {documents.length === 0 ? (
        <p className="text-sm text-gray-500">No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li key={doc.id} className="flex items-center space-x-2 p-2 rounded-md bg-gray-50">
              <FileText size={16} className="text-gray-500" />
              <span className="text-sm text-gray-800">{doc.filename}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
