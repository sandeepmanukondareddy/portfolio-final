import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { BarChart3, Users, Target, Lightbulb } from "lucide-react";

const iconMap: Record<string, any> = { BarChart3, Users, Target, Lightbulb };

const LeadershipPhilosophy = () => {
  const { ref, isInView } = useInView(0.2);
  const [data] = usePortfolioData<any>("leadership_philosophy");
  const principles = data?.principles || [];

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{data?.heading || "Leadership Philosophy"}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-muted-foreground">{data?.description || ""}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {principles.map((principle: string, idx: number) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: idx * 0.1 }} className="bg-card-surface rounded-xl p-6 border border-border card-hover">
              <div className="w-10 h-10 rounded-full bg-accent/20 text-accent font-data font-bold text-lg flex items-center justify-center mb-4">{idx + 1}</div>
              <h3 className="font-display text-base font-semibold text-foreground mb-2">{principle}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipPhilosophy;
