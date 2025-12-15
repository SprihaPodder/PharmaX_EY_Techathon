import { AGENTS } from '@/services/mockDataService';
import { Brain, BookOpen, FlaskConical, Shield, TrendingUp, AlertTriangle, FileText } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-6 h-6 text-primary" />,
  BookOpen: <BookOpen className="w-6 h-6 text-primary" />,
  FlaskConical: <FlaskConical className="w-6 h-6 text-primary" />,
  Shield: <Shield className="w-6 h-6 text-primary" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-primary" />,
  AlertTriangle: <AlertTriangle className="w-6 h-6 text-primary" />,
  FileText: <FileText className="w-6 h-6 text-primary" />,
};

export function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-gradient-teal">PharmaX.ai</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our multi-agent AI system orchestrates specialized agents to analyze drug repurposing 
            opportunities from every angle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {AGENTS.map((agent, index) => (
            <div 
              key={index}
              className="group p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                {iconMap[agent.icon]}
              </div>
              <h3 className="font-semibold mb-2">{agent.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {agent.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
