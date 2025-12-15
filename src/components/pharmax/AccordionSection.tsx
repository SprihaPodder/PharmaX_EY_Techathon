import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function AccordionSection({ title, icon, children, defaultOpen = false }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between p-5 transition-all duration-300",
          isOpen 
            ? "bg-primary text-primary-foreground" 
            : "bg-card hover:bg-secondary/50"
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300",
            isOpen ? "bg-primary-foreground/20" : "bg-primary/10"
          )}>
            {icon}
          </div>
          <span className="font-semibold text-lg">{title}</span>
        </div>
        <ChevronDown 
          className={cn(
            "w-5 h-5 transition-transform duration-300",
            isOpen && "rotate-180"
          )} 
        />
      </button>
      
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="p-5 bg-card/50">
          {children}
        </div>
      </div>
    </div>
  );
}
