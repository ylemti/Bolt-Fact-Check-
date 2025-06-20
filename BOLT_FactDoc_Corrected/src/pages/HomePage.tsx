import React from 'react';
import { Shield, Sparkles, CheckCircle } from 'lucide-react';
import FileInput from '../components/FileInput';
import AIAnalysisLink from '../components/AIAnalysisLink';
import PrototypeLink from '../components/PrototypeLink';
import AIVerificationLink from '../components/AIVerificationLink';

interface HomePageProps {
  onFileSelect: (file: File) => void;
  onAnalyzeDocument: () => void;
  hasFile: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onFileSelect, onAnalyzeDocument, hasFile }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bienvenue sur Affordact
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Chargez un document pour vérification automatique
          </p>
        </div>

        {/* Tools Section */}
        <div className="max-w-6xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AIAnalysisLink />
          <PrototypeLink />
          <AIVerificationLink />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/50">
            <div className="flex items-center space-x-3 mb-3">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <h3 className="font-semibold text-gray-900">IA Avancée</h3>
            </div>
            <p className="text-gray-600 text-sm">Détection automatique des falsifications et anomalies</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/50">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold text-gray-900">Résultats Précis</h3>
            </div>
            <p className="text-gray-600 text-sm">Score d'authenticité détaillé avec rapport complet</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/50">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold text-gray-900">Sécurisé</h3>
            </div>
            <p className="text-gray-600 text-sm">Vos documents sont traités de manière confidentielle</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
            <FileInput 
              onFileSelect={onFileSelect} 
              label="Uploader un document"
            />
            
            {hasFile && (
              <div className="mt-6">
                <button
                  onClick={onAnalyzeDocument}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Analyser le document
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">Utilisé par plus de 10,000+ professionnels</p>
          <div className="flex justify-center space-x-8 opacity-60">
            <div className="text-xs text-gray-400">🔒 Chiffrement SSL</div>
            <div className="text-xs text-gray-400">⚡ Analyse instantanée</div>
            <div className="text-xs text-gray-400">🎯 99.2% de précision</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;