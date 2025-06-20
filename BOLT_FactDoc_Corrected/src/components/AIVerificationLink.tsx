import React from 'react';
import { ExternalLink, Brain, Star, BarChart3 } from 'lucide-react';

const AIVerificationLink: React.FC = () => {
  const openAIVerification = () => {
    window.open('/ai-verification.html', '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Brain className="w-8 h-8" />
        <h3 className="text-xl font-bold">Vérification IA TensorFlow</h3>
      </div>
      <p className="text-emerald-100 mb-4">
        Analyse de documents avec TensorFlow.js et MobileNet. Vérification côté client avec étoiles de fiabilité, graphiques d'analyse et badges de validation.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <Brain className="w-3 h-3" />
          TensorFlow.js
        </span>
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <Star className="w-3 h-3" />
          Étoiles Fiabilité
        </span>
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <BarChart3 className="w-3 h-3" />
          Graphiques
        </span>
      </div>
      <button
        onClick={openAIVerification}
        className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors duration-200 flex items-center space-x-2"
      >
        <span>Ouvrir la vérification IA</span>
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AIVerificationLink;