import { Dossier, AnalysisResult } from '@/types/pharmax';
import { Download, Target, Dna, BarChart3, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generatePharmaXReport } from '@/utils/pdfGenerator';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface DossierSectionProps {
  data: Dossier;
  drugName: string;
  fullData: AnalysisResult;
}

function getScoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-400';
  if (score >= 70) return 'text-blue-400';
  if (score >= 55) return 'text-amber-400';
  return 'text-red-400';
}

export function DossierSection({ data, drugName, fullData }: DossierSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    
    try {
      // Small delay for UX feedback
      await new Promise(resolve => setTimeout(resolve, 500));
      generatePharmaXReport(fullData);
      
      toast({
        title: "PDF Generated!",
        description: `Report for ${drugName} has been downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Error generating PDF",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Top banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 p-5 bg-secondary/50 rounded-xl border border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Generated Report</h2>
              <p className="text-sm text-muted-foreground">Comprehensive drug repurposing analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-muted-foreground block">Opportunity Score</span>
              <span className={cn("text-2xl font-bold", getScoreColor(data.opportunity_score))}>
                {data.opportunity_score}/100
              </span>
            </div>
            <Button 
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main dossier card */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {/* New Indication */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Proposed New Indication for {drugName}
            </div>
            <h3 className="text-2xl font-bold text-gradient-teal">{data.new_indication}</h3>
          </div>

          {/* Mechanism of Action */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <Dna className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Mechanism of Action</h4>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {data.mechanism_of_action}
            </p>
          </div>

          {/* Evidence Summary */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Evidence Summary</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Evidence Type</th>
                    <th className="text-center py-2 px-3 text-sm font-medium text-muted-foreground">Count</th>
                    <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Relevance</th>
                  </tr>
                </thead>
                <tbody>
                  {data.evidence_summary.map((evidence, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3 px-3 font-medium">{evidence.type}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                          {evidence.count}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={cn(
                          "px-2 py-0.5 text-xs rounded-full",
                          evidence.relevance === 'High' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        )}>
                          {evidence.relevance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h4 className="font-semibold">Risk Assessment</h4>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
                <h5 className="font-medium text-sm text-amber-400 mb-1">Regulatory Risk</h5>
                <p className="text-sm text-muted-foreground">{data.risk_assessment.regulatory}</p>
              </div>
              <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
                <h5 className="font-medium text-sm text-blue-400 mb-1">Manufacturing Risk</h5>
                <p className="text-sm text-muted-foreground">{data.risk_assessment.manufacturing}</p>
              </div>
              <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
                <h5 className="font-medium text-sm text-emerald-400 mb-1">Market Risk</h5>
                <p className="text-sm text-muted-foreground">{data.risk_assessment.market}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
