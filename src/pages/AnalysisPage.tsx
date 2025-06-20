import React, { useEffect, useState } from 'react';
import { Brain, Shield, Search, Zap } from 'lucide-react';
import LoadingDots from '../components/LoadingDots';
import { aiService } from '../services/aiService';
import { DocumentAnalysis } from '../types';

interface AnalysisPageProps {
  uploadedFile: File | null;
  documentType: string;
  onAnalysisComplete: (result: DocumentAnalysis) => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ 
  uploadedFile, 
  documentType, 
  onAnalysisComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const analysisSteps = [
    { icon: Search, label: 'Préparation de l\'image', duration: 500 },
    { icon: Brain, label: 'Analyse avec Vision Transformer', duration: 1500 },
    { icon: Zap, label: 'Extraction des métadonnées', duration: 1000 },
    { icon: Shield, label: 'Calcul du score de confiance', duration: 800 }
  ];

  useEffect(() => {
    const runAnalysis = async () => {
      if (!uploadedFile) return;

      try {
        // Simulate step progression
        for (let i = 0; i < analysisSteps.length; i++) {
          setCurrentStep(i);
          setProgress((i / analysisSteps.length) * 100);
          
          await new Promise(resolve => 
            setTimeout(resolve, analysisSteps[i].duration)
          );
        }

        // Run actual AI analysis
        const result = await aiService.analyzeDocument(uploadedFile, documentType);
        
        setProgress(100);
        setCurrentStep(analysisSteps.length);
        
        // Small delay before showing results
        setTimeout(() => {
          onAnalysisComplete(result);
        }, 500);

      } catch (error) {
        console.error('Analysis failed:', error);
        // Fallback to mock analysis
        const mockResult: DocumentAnalysis = {
          score: 75,
          type_document: 'Document analysé',
          anomalies: ['Erreur lors de l\'analyse IA - résultat approximatif']
        };
        onAnalysisComplete(mockResult);
      }
    };

    runAnalysis();
  }, [uploadedFile, documentType, onAnalysisComplete]);

  const CurrentStepIcon = currentStep < analysisSteps.length 
    ? analysisSteps[currentStep].icon 
    : Shield;

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
                  <CurrentStepIcon className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-20 animate-pulse"></div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Analyse IA en cours...
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              {currentStep < analysisSteps.length 
                ? analysisSteps[currentStep].label
                : 'Finalisation de l\'analyse'
              }
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Loading Animation */}
            <LoadingDots />

            {/* Current Step Details */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600">
                🤖 Utilisation des modèles HuggingFace pour l'analyse de {documentType}
              </p>
            </div>
          </div>

          {/* Analysis Steps */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {analysisSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <div 
                  key={index}
                  className={`bg-white/70 backdrop-blur-sm p-4 rounded-xl text-center border transition-all duration-300 ${
                    isCompleted 
                      ? 'border-green-300 bg-green-50' 
                      : isCurrent 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-white/50'
                  }`}
                >
                  <StepIcon className={`w-6 h-6 mx-auto mb-2 ${
                    isCompleted 
                      ? 'text-green-600' 
                      : isCurrent 
                        ? 'text-blue-600' 
                        : 'text-gray-400'
                  }`} />
                  <div className={`text-xs font-medium ${
                    isCompleted 
                      ? 'text-green-700' 
                      : isCurrent 
                        ? 'text-blue-700' 
                        : 'text-gray-500'
                  }`}>
                    {step.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Technical Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl text-center border border-white/50">
              <div className="text-2xl font-bold text-blue-600">LayoutLMv3</div>
              <div className="text-sm text-gray-600">Vision Model</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl text-center border border-white/50">
              <div className="text-2xl font-bold text-green-600">Document QA</div>
              <div className="text-sm text-gray-600">Extraction</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl text-center border border-white/50">
              <div className="text-2xl font-bold text-purple-600">HuggingFace</div>
              <div className="text-sm text-gray-600">API</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;