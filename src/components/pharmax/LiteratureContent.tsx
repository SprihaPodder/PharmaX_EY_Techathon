import { Literature } from '@/types/pharmax';
import { cn } from '@/lib/utils';

interface LiteratureContentProps {
  data: Literature[];
}

function getRelevanceColor(score: number): string {
  if (score >= 90) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  if (score >= 75) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  if (score >= 60) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  return 'bg-secondary text-muted-foreground border-border';
}

export function LiteratureContent({ data }: LiteratureContentProps) {
  return (
    <div className="space-y-3">
      {data.map((paper, index) => (
        <div 
          key={index}
          className="flex items-start justify-between gap-4 p-4 bg-secondary/30 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300"
        >
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm mb-1 line-clamp-2">{paper.title}</h4>
            <p className="text-xs text-muted-foreground">{paper.source}</p>
          </div>
          
          <div className="flex-shrink-0">
            <span className={cn(
              "inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border",
              getRelevanceColor(paper.relevance_score)
            )}>
              {paper.relevance_score}/100
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
