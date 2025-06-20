import React from 'react';
import { ExternalLink, FileText, Zap } from 'lucide-react';

const PrototypeLink: React.FC = () => {
  const openPrototype = () => {
    window.open('/prototype.html', '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Zap className="w-8 h-8" />
        <h3 className="text-xl font-bold">Prototype Interactif</h3>
      </div>
      <p className="text-indigo-100 mb-4">
        Testez notre prototype d'analyse de documents avec simulation IA/OCR complète, sélection de type de document et génération de rapport PDF.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">📤 Upload</span>
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🔍 OCR</span>
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🤖 IA</span>
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">📄 PDF</span>
      </div>
      <button
        onClick={openPrototype}
        className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-200 flex items-center space-x-2"
      >
        <FileText className="w-4 h-4" />
        <span>Ouvrir le prototype</span>
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PrototypeLink;