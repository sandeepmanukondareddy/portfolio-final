import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const DigitalSystems = () => {
  const { ref, isInView } = useInView(0.2);
  const [data] = usePortfolioData<any>("digital_systems");
  const technologies = data?.technologies || [];

  return (
    <section ref={ref} className="section-padding bg-section">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{data?.heading || "Digital & Systems Exposure"}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-muted-foreground">{data?.description || ""}</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {technologies.map((tech: any, idx: number) => (
            <motion.span key={tech.id} initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3, delay: idx * 0.05 }} className="px-4 py-2 rounded-full bg-background border border-border text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200 cursor-default">
              {tech.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalSystems;
