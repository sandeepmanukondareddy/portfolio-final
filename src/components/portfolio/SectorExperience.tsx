import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const SectorExperience = () => {
  const { ref, isInView } = useInView(0.2);
  const [data] = usePortfolioData<any>("sector_experience");
  const categories = data?.categories || [];

  return (
    <section ref={ref} className="section-padding bg-section">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{data?.heading || "Sector Experience"}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-muted-foreground">{data?.description || ""}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((sector: any, idx: number) => (
            <motion.div key={sector.id} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: idx * 0.15 }} className="bg-background rounded-xl p-6 border border-border card-hover">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">{sector.title}</h3>
              <ul className="space-y-2.5">
                {(sector.items || []).map((item: string) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="font-data text-xs font-semibold text-primary">{sector.items?.length || 0} Categories</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorExperience;
