import React from 'react';
import { FileText } from 'lucide-react';

interface DocumentTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({ 
  value, 
  onChange, 
  className = '' 
}) => {
  const documentTypes = [
    { value: '', label: 'Sélectionnez le type de document' },
    { value: 'id', label: 'Carte d\'identité' },
    { value: 'passport', label: 'Passeport' },
    { value: 'title', label: 'Titre de propriété' },
    { value: 'salary', label: 'Fiche de paie' },
    { value: 'rental', label: 'Bail locatif' },
    { value: 'bank', label: 'Relevé bancaire' },
    { value: 'tax', label: 'Avertissement extrait de rôle' },
    { value: 'insurance', label: 'Attestation d\'assurance' },
    { value: 'utility', label: 'Facture de services publics' }
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
        <FileText className="w-4 h-4" />
        <span>Type de document</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-200"
      >
        {documentTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      {value && (
        <p className="text-xs text-gray-500 mt-1">
          L'analyse sera optimisée pour ce type de document
        </p>
      )}
    </div>
  );
};

export default DocumentTypeSelector;