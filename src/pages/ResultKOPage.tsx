import React from 'react';
import { XCircle, AlertTriangle, Home, Download, Shield, Eye } from 'lucide-react';

interface ResultKOPageProps {
  score: number;
  documentType: string;
  anomalies: string[];
  extractedData?: Record<string, any>;
  onBackToHome: () => void;
}

const ResultKOPagePage: React.FC<ResultKOPageProps> = ({ 
  score, 
  documentType, 
  anomalies,
  extractedData = {},
  onBackToHome 
}) => {
  const downloadReport = () => {
    const reportData = {
      status: 'SUSPECT',
      score,
      documentType,
      anomalies,
      extractedData,
      analysisDate: new Date().toISOString(),
      aiModel: 'HuggingFace LayoutLMv3 + Document QA',
      confidence: score > 50 ? 'Moyenne' : 'Faible',
      recommendation: score > 50 
        ? 'Vérification manuelle recommandée' 
        : 'Document probablement falsifié - rejet recommandé'
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport_suspect_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (score: number) => {
    if (score < 30) return 'from-red-500 to-red-600';
    if (score < 60) return 'from-orange-500 to-red-500';
    return 'from-yellow-500 to-orange-500';
  };

  const getSeverityText = (score: number) => {
    if (score < 30) return 'Très suspect';
    if (score < 60) return 'Suspect';
    return 'Douteux';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Warning Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className={`p-6 bg-gradient-to-br ${getSeverityColor(score)} rounded-full shadow-2xl`}>
                  <XCircle className="w-16 h-16 text-white" />
                </div>
                <div className={`absolute -inset-3 bg-gradient-to-r ${getSeverityColor(score)} rounded-full opacity-20 animate-pulse`}></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ❌ Document {getSeverityText(score).toLowerCase()}
            </h1>
            <p className="text-lg text-gray-600">
              L'analyse IA a détecté des anomalies significatives
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Results Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Résultats de l'analyse</h2>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">Type de document :</p>
                  <p className="text-2xl font-bold text-gray-900">{documentType}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">Score de confiance :</p>
                  <div className="relative">
                    <p className="text-4xl font-bold text-red-600">{score}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                      <div 
                        className={`bg-gradient-to-r ${getSeverityColor(score)} h-3 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-800">
                    <Eye className="w-5 h-5" />
                    <span className="font-semibold">Vérification manuelle requise</span>
                  </div>
                  <p className="text-red-700 text-sm mt-1">
                    {score < 50 
                      ? 'Document probablement falsifié ou altéré'
                      : 'Anomalies détectées nécessitant une inspection humaine'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Anomalies List */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Anomalies détectées</h3>
              
              {anomalies.length > 0 ? (
                <div className="space-y-4">
                  {anomalies.map((anomaly, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-red-800 font-medium">Anomalie #{index + 1}</p>
                        <p className="text-red-700 text-sm mt-1">{anomaly}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-yellow-800">
                      <Shield className="w-5 h-5" />
                      <span className="font-semibold">Recommandation</span>
                    </div>
                    <p className="text-yellow-700 text-sm mt-1">
                      {score < 30 
                        ? 'Rejet du document recommandé - trop d\'anomalies critiques'
                        : score < 60
                          ? 'Vérification manuelle obligatoire avant acceptation'
                          : 'Demander des documents complémentaires pour validation'
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Score de confiance faible détecté
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Aucune anomalie spécifique identifiée, mais la qualité générale est insuffisante
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Extracted Data (if any) */}
          {Object.keys(extractedData).length > 0 && (
            <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Données partiellement extraites</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(extractedData).map(([key, value]) => (
                  <div key={key} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-medium text-gray-900 capitalize">{key}</p>
                    <p className="text-gray-600 text-sm">{String(value)}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-4">
                ⚠️ Ces données peuvent être incomplètes ou incorrectes en raison des anomalies détectées
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={downloadReport}
              className={`bg-gradient-to-r ${getSeverityColor(score)} hover:opacity-90 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2`}
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

export default ResultKOPagePage;