import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { MapPin, Briefcase, Calendar } from "lucide-react";

const ProfessionalExperience = () => {
  const { ref, isInView } = useInView(0.1);
  const [data] = usePortfolioData<any>("professional_experience");
  const entries = data?.entries || [];

  return (
    <section id="experience" ref={ref} className="section-padding bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{data?.heading || "Professional Experience"}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-muted-foreground">{data?.description || ""}</p>
        </motion.div>

        <div className="space-y-6">
          {entries.map((exp: any, idx: number) => (
            <motion.div key={exp.id} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: idx * 0.1 }} className={`rounded-xl border p-6 md:p-8 card-hover ${exp.current ? "bg-gradient-to-br from-card-surface to-background border-accent/30 shadow-[var(--shadow-md)]" : "bg-card-surface border-border"}`}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  {exp.current && <span className="text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-foreground px-2 py-0.5 rounded">Current</span>}
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">{exp.title}</h3>
                  <p className="text-sm font-semibold text-primary mt-0.5">{exp.company}</p>
                </div>
                <div className="text-right text-sm text-muted-foreground space-y-1">
                  <p className="inline-flex items-center gap-1"><MapPin size={12} /> {exp.location}</p>
                  <p className="inline-flex items-center gap-1"><Calendar size={12} /> {exp.period}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-4">
                <span className="inline-flex items-center gap-1 font-data font-semibold"><Briefcase size={12} /> {exp.scale}</span>
                <span className="text-border">•</span>
                <span className="font-data">{exp.duration}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(exp.brands || []).map((brand: string) => (
                  <span key={brand} className="text-xs px-2.5 py-1 rounded-full bg-background border border-border text-muted-foreground">{brand}</span>
                ))}
              </div>
              {exp.stats && (
                <div className="flex gap-6 mt-4 pt-4 border-t border-border">
                  {exp.stats.map((s: any) => (
                    <div key={s.label}><span className="font-data text-lg font-bold text-foreground">{s.value}</span><p className="text-xs text-muted-foreground">{s.label}</p></div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalExperience;
