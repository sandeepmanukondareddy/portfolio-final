import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { TrendingUp, Users, Target, BarChart3, Megaphone, ShoppingCart } from "lucide-react";

const iconMap: Record<string, any> = { ShoppingCart, TrendingUp, Megaphone, Users, Target, BarChart3 };

const CoreExpertise = () => {
  const { ref, isInView } = useInView(0.1);
  const [data] = usePortfolioData<any>("core_expertise");
  const cards = data?.cards || [];

  return (
    <section id="expertise" ref={ref} className="section-padding bg-section">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{data?.heading || "Core Expertise"}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-muted-foreground">{data?.description || ""}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((item: any, idx: number) => {
            const Icon = iconMap[item.icon] || Target;
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: idx * 0.1 }} className="bg-background rounded-xl p-6 border border-border card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-card-surface"><Icon size={22} className="text-primary" /></div>
                  <span className="font-data text-sm font-bold text-accent">{item.mastery}%</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                <div className="w-full h-1.5 bg-border rounded-full overflow-hidden mb-4">
                  <motion.div initial={{ width: 0 }} animate={isInView ? { width: `${item.mastery}%` } : {}} transition={{ duration: 1.2, delay: idx * 0.1 + 0.3, ease: "easeOut" }} className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="font-data font-semibold">{item.projects} Projects</span>
                  <span className="text-border">|</span>
                  <span className="font-data font-semibold">{item.impact} Impact</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreExpertise;
