import { ClinicalTrial } from '@/types/pharmax';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClinicalTrialsContentProps {
  data: ClinicalTrial[];
}

const statusStyles: Record<string, string> = {
  'Recruiting': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Completed': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Terminated': 'bg-red-500/20 text-red-400 border-red-500/30',
};

export function ClinicalTrialsContent({ data }: ClinicalTrialsContentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((trial, index) => (
        <div 
          key={index}
          className="bg-secondary/30 rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <span className="text-xs text-muted-foreground">NCT ID</span>
              <p className="font-mono text-sm font-medium text-primary">{trial.nct_id}</p>
            </div>
            <span className={cn(
              "px-2.5 py-1 text-xs font-medium rounded-full border",
              statusStyles[trial.status] || 'bg-secondary text-muted-foreground'
            )}>
              {trial.status}
            </span>
          </div>
          
          <div className="mb-3">
            <span className="text-xs text-muted-foreground">Phase</span>
            <p className="font-medium">{trial.phase}</p>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {trial.summary}
          </p>
          
          <button className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors">
            <span>View Details</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
