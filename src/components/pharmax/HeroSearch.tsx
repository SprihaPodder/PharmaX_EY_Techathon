import { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeroSearchProps {
  onAnalyze: (drugName: string) => void;
  isLoading: boolean;
}

export function HeroSearch({ onAnalyze, isLoading }: HeroSearchProps) {
  const [drugName, setDrugName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (drugName.trim()) {
      onAnalyze(drugName.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      
      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center gap-3 mb-4 animate-fade-in">
          <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <span className="text-2xl font-bold tracking-tight">PharmaX.ai</span>
        </div>
        
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="text-gradient-teal">Agentic AI</span> for{' '}
          <span className="text-foreground">Pharmaceutical Research</span>
        </h1>
        
        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Harness the power of specialized AI agents to explore new drug indications, 
          analyze clinical evidence, and accelerate your drug repurposing pipeline.
        </p>
        
        {/* Search Form */}
        <form 
          onSubmit={handleSubmit} 
          className="relative max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-all duration-500 opacity-0 group-hover:opacity-100" />
            
            <div className="relative flex items-center bg-card border border-border rounded-xl p-2 focus-within:border-primary/50 focus-within:shadow-lg focus-within:shadow-primary/10 transition-all duration-300">
              <Search className="w-5 h-5 text-muted-foreground ml-4" />
              <Input
                type="text"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                placeholder="e.g., Explore new indications for Metformin"
                className="flex-1 border-0 bg-transparent text-lg placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                disabled={!drugName.trim() || isLoading}
                className="h-12 px-8 rounded-lg font-semibold text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Analyze'
                )}
              </Button>
            </div>
          </div>
        </form>
        
        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-3 pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {['7 AI Agents', 'Real-Time Analysis', 'Evidence-Based', 'Patent Intelligence'].map((feature) => (
            <span 
              key={feature}
              className="px-4 py-1.5 text-sm text-muted-foreground bg-secondary/50 rounded-full border border-border/50"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
