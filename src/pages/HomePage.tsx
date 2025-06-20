import React, { useState } from 'react';
import { Shield, Sparkles, CheckCircle, Upload, FileText } from 'lucide-react';
import FileInput from '../components/FileInput';
import DocumentTypeSelector from '../components/DocumentTypeSelector';
import AIAnalysisLink from '../components/AIAnalysisLink';
import PrototypeLink from '../components/PrototypeLink';
import AIVerificationLink from '../components/AIVerificationLink';

interface HomePageProps {
  onFileSelect: (file: File) => void;
  onAnalyzeDocument: (documentType: string) => void;
  hasFile: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onFileSelect, onAnalyzeDocument, hasFile }) => {
  const [documentType, setDocumentType] = useState('');

  const handleAnalyze = () => {
    if (hasFile && documentType) {
      onAnalyzeDocument(documentType);
    }
  };

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
            Bienvenue sur FACTDOC
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Vérification intelligente de documents avec IA avancée
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
              <h3 className="font-semibold text-gray-900">IA HuggingFace</h3>
            </div>
            <p className="text-gray-600 text-sm">Analyse avec modèles LayoutLM et Vision Transformer</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/50">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold text-gray-900">Extraction Intelligente</h3>
            </div>
            <p className="text-gray-600 text-sm">Métadonnées extraites selon le type de document</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/50">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold text-gray-900">Confiance IA</h3>
            </div>
            <p className="text-gray-600 text-sm">Score basé sur les probabilités réelles des modèles</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
            <div className="space-y-6">
              <FileInput 
                onFileSelect={onFileSelect} 
                label="Uploader un document"
              />
              
              <DocumentTypeSelector
                value={documentType}
                onChange={setDocumentType}
              />
              
              {hasFile && documentType && (
                <div className="pt-4">
                  <button
                    onClick={handleAnalyze}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Analyser avec IA</span>
                  </button>
                </div>
              )}
              
              {hasFile && !documentType && (
                <div className="text-center text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <FileText className="w-5 h-5 inline-block mr-2" />
                  Veuillez sélectionner le type de document pour continuer
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">Propulsé par HuggingFace • Modèles IA de pointe</p>
          <div className="flex justify-center space-x-8 opacity-60">
            <div className="text-xs text-gray-400">🤖 LayoutLMv3</div>
            <div className="text-xs text-gray-400">⚡ Vision Transformer</div>
            <div className="text-xs text-gray-400">🎯 Document QA</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;