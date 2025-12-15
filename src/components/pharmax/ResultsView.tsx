import { AnalysisResult } from '@/types/pharmax';
import { ResultsHeader } from './ResultsHeader';
import { AccordionSection } from './AccordionSection';
import { MarketInsightsContent } from './MarketInsightsContent';
import { ClinicalTrialsContent } from './ClinicalTrialsContent';
import { PatentInfoContent } from './PatentInfoContent';
import { LiteratureContent } from './LiteratureContent';
import { DossierSection } from './DossierSection';
import { HowItWorks } from './HowItWorks';
import { TeamSection } from './TeamSection';
import { ContactForm } from './ContactForm';
import { TrendingUp, FlaskConical, Shield, BookOpen } from 'lucide-react';
import { KnowledgeGraph } from './KnowledgeGraph';
import { buildKnowledgeGraph } from '@/lib/graphBuilder';
import type { GraphNode } from '@shared/schema';
import { useMemo } from 'react';

interface ResultsViewProps {
  data: AnalysisResult;
  onBack: () => void;
}

export function ResultsView({ data, onBack }: ResultsViewProps) {
  const graph = useMemo(() => buildKnowledgeGraph(data), [data]);

  const handleNodeClick = (node: GraphNode) => {
    const url = (node as any)?.url;
    if (url && typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    // Fallback: log node or implement detail scrolling
    // console.log('Node clicked:', node);
  };

  return (
    <div className="min-h-screen bg-background">
      <ResultsHeader drugName={data.target_drug} onBack={onBack} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Accordions */}
        <div className="space-y-4 animate-fade-in">
          <AccordionSection 
            title="Market Insights" 
            icon={<TrendingUp className="w-5 h-5 text-primary" />}
            defaultOpen
          >
            <MarketInsightsContent data={data.market_insights} />
          </AccordionSection>

          <AccordionSection 
            title="Clinical Trials" 
            icon={<FlaskConical className="w-5 h-5 text-primary" />}
          >
            <ClinicalTrialsContent data={data.clinical_trials} />
          </AccordionSection>

          <AccordionSection 
            title="Patent Information" 
            icon={<Shield className="w-5 h-5 text-primary" />}
          >
            <PatentInfoContent data={data.patents} />
          </AccordionSection>

          <AccordionSection 
            title="Literature Summary" 
            icon={<BookOpen className="w-5 h-5 text-primary" />}
          >
            <LiteratureContent data={data.literature} />
          </AccordionSection>
        </div>

        {/* Knowledge Graph (visual) */}
        <div className="mt-6">
          <KnowledgeGraph graph={graph} onNodeClick={handleNodeClick} />
        </div>
      </main>

      {/* Dossier Section - now receives full data for PDF */}
      <DossierSection data={data.dossier} drugName={data.target_drug} fullData={data} />
      
      {/* Marketing Sections */}
      <HowItWorks />
      <TeamSection />
      <ContactForm />
      
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 PharmaX.ai — Accelerating Drug Discovery Through AI
          </p>
        </div>
      </footer>
    </div>
  );
}
