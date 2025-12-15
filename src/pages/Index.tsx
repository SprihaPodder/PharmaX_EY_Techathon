import { useState } from 'react';
import { HeroSearch } from '@/components/pharmax/HeroSearch';
import { ResultsView } from '@/components/pharmax/ResultsView';
import { analyzeStub } from '@/services/mockDataService';
import { AnalysisResult } from '@/types/pharmax';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (drugName: string) => {
    setIsLoading(true);
    try {
      const data = await analyzeStub(drugName);
      setResults(data);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setResults(null);
  };

  if (results) {
    return <ResultsView data={results} onBack={handleBack} />;
  }

  return <HeroSearch onAnalyze={handleAnalyze} isLoading={isLoading} />;
};

export default Index;
