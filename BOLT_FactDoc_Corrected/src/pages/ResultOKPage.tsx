import React from 'react';
import { CheckCircle, Shield, Home } from 'lucide-react';

interface ResultOKPageProps {
  score: number;
  documentType: string;
  onBackToHome: () => void;
}

const ResultOKPage: React.FC<ResultOKPageProps> = ({ score, documentType, onBackToHome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -inset-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ✅ Document authentique
            </h1>
          </div>

          {/* Results Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Résultats de l'analyse</h2>
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              
              {/* Document Info */}
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">Type :</p>
                  <p className="text-2xl font-bold text-gray-900">{documentType}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">Score :</p>
                  <p className="text-4xl font-bold text-green-600">{score} %</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={onBackToHome}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 mx-auto"
              >
                <Home className="w-5 h-5" />
                <span>Revenir à l'accueil</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Analyse effectuée par Affordact IA • Rapport généré le {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultOKPage;