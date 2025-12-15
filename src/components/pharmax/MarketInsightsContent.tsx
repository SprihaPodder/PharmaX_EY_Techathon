import { MarketInsights } from '@/types/pharmax';
import { TrendingUp, Globe, Users } from 'lucide-react';

interface MarketInsightsContentProps {
  data: MarketInsights;
}

export function MarketInsightsContent({ data }: MarketInsightsContentProps) {
  return (
    <div className="space-y-6">
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm">Market Size</span>
          </div>
          <p className="text-2xl font-bold text-gradient-teal">{data.market_size}</p>
        </div>
        
        <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-sm">Growth Rate (CAGR)</span>
          </div>
          <p className="text-2xl font-bold text-gradient-teal">{data.cagr}</p>
        </div>
      </div>

      {/* Competitors table */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-primary" />
          <h4 className="font-semibold">Key Market Players</h4>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Competitor</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Region</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.competitors.map((competitor, index) => (
                <tr 
                  key={index} 
                  className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">{competitor.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{competitor.region}</td>
                  <td className="py-3 px-4 text-muted-foreground text-sm">{competitor.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
