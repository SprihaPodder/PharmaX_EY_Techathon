import { TEAM_MEMBERS } from '@/services/mockDataService';

export function TeamSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet the <span className="text-gradient-teal">Team</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            World-class scientists and AI researchers driving pharmaceutical innovation.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {TEAM_MEMBERS.map((member, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-all duration-300 min-w-[200px]"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">{member.initials}</span>
              </div>
              <h3 className="font-semibold text-center">{member.name}</h3>
              <p className="text-sm text-muted-foreground text-center">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
