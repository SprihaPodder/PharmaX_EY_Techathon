import { Patent } from '@/types/pharmax';
import { FileText, User, Building2, Calendar } from 'lucide-react';

interface PatentInfoContentProps {
  data: Patent[];
}

export function PatentInfoContent({ data }: PatentInfoContentProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Patent Title
              </div>
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Inventor
              </div>
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Assignee
              </div>
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Filing Date
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((patent, index) => (
            <tr 
              key={index} 
              className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
            >
              <td className="py-4 px-4">
                <p className="font-medium text-sm max-w-xs">{patent.title}</p>
              </td>
              <td className="py-4 px-4 text-sm text-muted-foreground">{patent.inventor}</td>
              <td className="py-4 px-4 text-sm text-muted-foreground">{patent.assignee}</td>
              <td className="py-4 px-4 text-sm text-muted-foreground font-mono">{patent.filing_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
