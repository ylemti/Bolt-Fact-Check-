import React, { useRef } from 'react';
import { Upload, FileText } from 'lucide-react';

interface FileInputProps {
  onFileSelect: (file: File) => void;
  label: string;
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelect, label }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <button
        onClick={triggerFileUpload}
        className="w-full group relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="relative z-10 flex flex-col items-center space-y-4">
          <div className="p-4 bg-white/20 rounded-full">
            <Upload className="w-8 h-8" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{label}</h3>
            <p className="text-blue-100 text-sm mt-1">PDF, JPG, PNG</p>
          </div>
        </div>
      </button>

      <div className="text-center text-gray-500 text-sm">
        <FileText className="w-5 h-5 inline-block mr-2" />
        Formats supportés: PDF, JPEG, PNG (max 10MB)
      </div>
    </div>
  );
};

export default FileInput;