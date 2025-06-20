import React from 'react';
import { CheckCircle, Shield, Home, Download, User, Calendar, MapPin, Hash } from 'lucide-react';

interface ResultOKPageProps {
  score: number;
  documentType: string;
  extractedData?: Record<string, any>;
  onBackToHome: () => void;
}

const ResultOKPage: React.FC<ResultOKPageProps> = ({ 
  score, 
  documentType, 
  extractedData = {},
  onBackToHome 
}) => {
  const downloadReport = () => {
    const reportData = {
      status: 'AUTHENTIQUE',
      score,
      documentType,
      extractedData,
      analysisDate: new Date().toISOString(),
      aiModel: 'HuggingFace LayoutLMv3 + Document QA',
      confidence: 'Élevée'
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport_authentique_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getMetadataIcon = (key: string) => {
    switch (key.toLowerCase()) {
      case 'name':
      case 'nom':
        return User;
      case 'date':
      case 'birth':
      case 'naissance':
        return Calendar;
      case 'address':
      case 'adresse':
        return MapPin;
      case 'number':
      case 'numero':
        return Hash;
      default:
        return Shield;
    }
  };

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
            <p className="text-lg text-gray-600">
              Analyse IA confirmée avec haute confiance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Results Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Résultats de l'analyse</h2>
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">Type de document :</p>
                  <p className="text-2xl font-bold text-gray-900">{documentType}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">Score de confiance :</p>
                  <div className="relative">
                    <p className="text-4xl font-bold text-green-600">{score}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Validation IA réussie</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    Document analysé avec les modèles HuggingFace LayoutLMv3 et Document QA
                  </p>
                </div>
              </div>
            </div>

            {/* Extracted Metadata */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Métadonnées extraites</h3>
              
              {Object.keys(extractedData).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(extractedData).map(([key, value]) => {
                    const IconComponent = getMetadataIcon(key);
                    return (
                      <div key={key} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <IconComponent className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 capitalize">{key}</p>
                          <p className="text-gray-600 text-sm">{String(value)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Métadonnées en cours d'extraction...
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Les informations détaillées seront disponibles dans le rapport complet
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={downloadReport}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger le rapport</span>
            </button>
            
            <button
              onClick={onBackToHome}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Nouvelle analyse</span>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Analyse effectuée par FACTDOC IA • Modèles HuggingFace • {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultOKPage;