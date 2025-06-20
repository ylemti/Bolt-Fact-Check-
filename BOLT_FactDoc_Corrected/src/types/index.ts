export interface DocumentAnalysis {
  score: number;
  type_document: string;
  anomalies: string[];
}

export interface AppState {
  currentPage: string;
  uploadedFile: File | null;
  documentType: string;
  authenticityScore: number;
  detectedAnomalies: string[];
  isAnalyzing: boolean;
}

export type PageName = 'Accueil' | 'Analyse' | 'Résultat OK' | 'Résultat KO';