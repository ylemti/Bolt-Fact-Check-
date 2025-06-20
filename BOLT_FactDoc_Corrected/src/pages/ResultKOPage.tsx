import React from 'react';
import { XCircle, AlertTriangle, Home, Download } from 'lucide-react';

interface ResultKOPageProps {
  score: number;
  documentType: string;
  anomalies: string[];
  onBackToHome: () => void;
}

const ResultKOPage: React.FC<ResultKOPageProps> = ({ 
  score, 
  documentType, 
  anomalies, 
  onBackToHome 
}) => {
  const downloadReport = () => {
    // Mock PDF download as specified in JSON
    const reportData = {
      score,
      documentType,
      anomalies,
      date: new Date().toISOString(),
      status: 'SUSPECT'
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rapport.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Warning Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="p-6 bg-gradient-to-br from-red-500 to-orange-600 rounded-full shadow-2xl">
                  <XCircle className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -inset-3 bg-gradient-to-r from-red-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ❌ Document douteux ou falsifié
            </h1>
          </div>

          {/* Results Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Résultats de l'analyse</h2>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              
              {/* Document Info */}
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">Type :</p>
                  <p className="text-2xl font-bold text-gray-900">{documentType}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">Score :</p>
                  <p className="text-4xl font-bold text-red-600">{score} %</p>
                </div>

                {/* Anomalies List */}
                {anomalies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Anomalies détectées :</h3>
                    <ul className="space-y-2">
                      {anomalies.map((anomaly, index) => (
                        <li key={index} className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-red-800">{anomaly}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={downloadReport}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le rapport</span>
              </button>
              
              <button
                onClick={onBackToHome}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
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

export default ResultKOPage;