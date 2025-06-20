import React, { useEffect } from 'react';
import { Brain, Shield, Search } from 'lucide-react';
import LoadingDots from '../components/LoadingDots';

interface AnalysisPageProps {
  onAnalysisComplete: (result: { score: number; type_document: string; anomalies: string[] }) => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ onAnalysisComplete }) => {
  useEffect(() => {
    // Simulate API call to http://localhost:3001/api/verify
    const timer = setTimeout(() => {
      // Mock analysis result based on JSON specification
      const mockResult = {
        score: Math.random() > 0.3 ? 85 + Math.floor(Math.random() * 15) : 45 + Math.floor(Math.random() * 30),
        type_document: "Carte d'identité",
        anomalies: Math.random() > 0.5 ? [] : [
          "Incohérence dans la police de caractères",
          "Qualité d'impression suspecte",
          "Éléments de sécurité manquants"
        ]
      };
      onAnalysisComplete(mockResult);
    }, 2000); // 2 seconds as specified in JSON

    return () => clearTimeout(timer);
  }, [onAnalysisComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Main Analysis Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-12 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-lg">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-20 animate-pulse"></div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Analyse IA en cours...
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Notre intelligence artificielle examine votre document
            </p>

            {/* Loading Animation */}
            <LoadingDots />

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600">
                🔒 Vos données sont traitées de manière sécurisée et confidentielle
              </p>
            </div>
          </div>

          {/* Technical Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl text-center border border-white/50">
              <div className="text-2xl font-bold text-blue-600">99.2%</div>
              <div className="text-sm text-gray-600">Précision</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl text-center border border-white/50">
              <div className="text-2xl font-bold text-green-600">{"<2s"}</div>
              <div className="text-sm text-gray-600">Temps d'analyse</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl text-center border border-white/50">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600">Critères analysés</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;