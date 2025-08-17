'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import apiClient from '@/lib/api';
import { useAppStore } from '@/lib/store';

export default function DocumentUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { addDocument } = useAppStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first.');
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading('Uploading document...');
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // We are not using the standard apiClient here because we need to send multipart/form-data
      const response = await apiClient.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // In a real app, the response would contain the new document's ID and details
      // For this MVP, we'll create a mock object.
      const newDoc = { id: Math.floor(Math.random() * 1000), filename: selectedFile.name };
      addDocument(newDoc);

      toast.success('Document uploaded successfully!', { id: toastId });
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload document.', { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold mb-2">Upload Document</h2>
      <div className="flex items-center space-x-2">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.docx,.txt,.md"
        />
        <label
          htmlFor="file-upload"
          className="flex-grow p-2 border border-gray-300 rounded-md text-sm text-gray-500 truncate cursor-pointer hover:bg-gray-50"
        >
          {selectedFile ? selectedFile.name : 'Choose a file...'}
        </label>
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center space-x-2 disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          <Upload size={16} />
          <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
        </button>
      </div>
    </div>
  );
}
