import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const CareerTimeline = () => {
  const { ref, isInView } = useInView(0.1);
  const [data] = usePortfolioData<any>("career_trajectory");
  const points = data?.timeline_points || [];

  return (
    <section id="journey" ref={ref} className="section-padding bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{data?.heading || "Career Trajectory"}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-muted-foreground">{data?.description || ""}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-secondary" />
          {points.map((item: any, idx: number) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: idx * 0.15 }} className={`relative flex items-center mb-12 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                <div className="w-4 h-4 rounded-full bg-accent border-4 border-background shadow-[var(--shadow-sm)]" />
              </div>
              <div className={`ml-20 md:ml-0 md:w-[45%] ${idx % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="bg-card-surface rounded-xl p-6 card-hover border border-border group cursor-default">
                  <span className="font-data text-sm font-semibold text-accent">{item.year}</span>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.company}</p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{item.description}</p>
                  )}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Leadership Level</span>
                      <span className="font-data">{item.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={isInView ? { width: `${item.level}%` } : {}} transition={{ duration: 1.2, delay: idx * 0.15 + 0.3, ease: "easeOut" }} className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
                    </div>
                  </div>
                  {item.achievements && item.achievements.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Key Achievements</h4>
                      <ul className="space-y-1">
                        {item.achievements.map((achievement: string, achIdx: number) => (
                          <motion.li 
                            key={achIdx} 
                            initial={{ opacity: 0, x: -10 }} 
                            animate={isInView ? { opacity: 1, x: 0 } : {}} 
                            transition={{ duration: 0.4, delay: idx * 0.15 + 0.6 + (achIdx * 0.1) }} 
                            className="text-xs text-muted-foreground flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5 flex-shrink-0"></span>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {item.brands && item.brands.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Brands</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.brands.map((b: string, bIdx: number) => (
                          <span key={bIdx} className="px-2 py-1 rounded-full text-xs bg-muted text-foreground border border-border">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
