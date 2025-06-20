import React from 'react';
import { ExternalLink, Brain } from 'lucide-react';

const AIAnalysisLink: React.FC = () => {
  const openAIAnalysis = () => {
    window.open('/affordact-ai.html', '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Brain className="w-8 h-8" />
        <h3 className="text-xl font-bold">Analyse IA Avancée</h3>
      </div>
      <p className="text-purple-100 mb-4">
        Utilisez notre outil d'analyse IA avancé avec reconnaissance d'images, OCR et génération de rapports PDF.
      </p>
      <button
        onClick={openAIAnalysis}
        className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200 flex items-center space-x-2"
      >
        <span>Ouvrir l'analyseur IA</span>
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AIAnalysisLink;