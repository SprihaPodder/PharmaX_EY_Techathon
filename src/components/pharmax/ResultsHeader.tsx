import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultsHeaderProps {
  drugName: string;
  onBack: () => void;
}

export function ResultsHeader({ drugName, onBack }: ResultsHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="hover:bg-secondary"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Research Results</h1>
                <p className="text-sm text-muted-foreground">for {drugName}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Powered by</span>
            <span className="text-sm font-semibold text-gradient-teal">PharmaX.ai</span>
          </div>
        </div>
      </div>
    </header>
  );
}
