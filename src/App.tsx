import React, { useState } from 'react';
import { AppState } from './types';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import ResultOKPage from './pages/ResultOKPage';
import ResultKOPage from './pages/ResultKOPage';

function App() {
  const [state, setState] = useState<AppState>({
    currentPage: 'Accueil',
    uploadedFile: null,
    documentType: '',
    authenticityScore: 0,
    detectedAnomalies: [],
    isAnalyzing: false
  });

  const handleFileSelect = (file: File) => {
    setState(prev => ({
      ...prev,
      uploadedFile: file
    }));
  };

  const handleAnalyzeDocument = (documentType: string) => {
    setState(prev => ({ 
      ...prev, 
      currentPage: 'Analyse', 
      documentType,
      isAnalyzing: true 
    }));
  };

  const handleAnalysisComplete = (result: { score: number; type_document: string; anomalies: string[] }) => {
    setState(prev => ({
      ...prev,
      authenticityScore: result.score,
      documentType: result.type_document,
      detectedAnomalies: result.anomalies,
      isAnalyzing: false,
      currentPage: result.score >= 70 ? 'Résultat OK' : 'Résultat KO'
    }));
  };

  const handleBackToHome = () => {
    setState({
      currentPage: 'Accueil',
      uploadedFile: null,
      documentType: '',
      authenticityScore: 0,
      detectedAnomalies: [],
      isAnalyzing: false
    });
  };

  const renderCurrentPage = () => {
    switch (state.currentPage) {
      case 'Accueil':
        return (
          <HomePage
            onFileSelect={handleFileSelect}
            onAnalyzeDocument={handleAnalyzeDocument}
            hasFile={!!state.uploadedFile}
          />
        );
      
      case 'Analyse':
        return (
          <AnalysisPage 
            uploadedFile={state.uploadedFile}
            documentType={state.documentType}
            onAnalysisComplete={handleAnalysisComplete} 
          />
        );
      
      case 'Résultat OK':
        return (
          <ResultOKPage
            score={state.authenticityScore}
            documentType={state.documentType}
            onBackToHome={handleBackToHome}
          />
        );
      
      case 'Résultat KO':
        return (
          <ResultKOPage
            score={state.authenticityScore}
            documentType={state.documentType}
            anomalies={state.detectedAnomalies}
            onBackToHome={handleBackToHome}
          />
        );
      
      default:
        return (
          <HomePage
            onFileSelect={handleFileSelect}
            onAnalyzeDocument={handleAnalyzeDocument}
            hasFile={!!state.uploadedFile}
          />
        );
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  );
}

export default App;