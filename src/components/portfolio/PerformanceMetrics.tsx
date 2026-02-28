import CircularProgress from "./CircularProgress";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const colors = ["hsl(42 50% 58%)", "hsl(30 24% 44%)", "hsl(20 22% 53%)", "hsl(110 16% 40%)"];

const PerformanceMetrics = () => {
  const { ref, isInView } = useInView(0.2);
  const [data] = usePortfolioData<any>("performance_metrics");
  const metrics = data?.metrics || [];

  return (
    <section ref={ref} className="section-padding bg-dark-section">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3" style={{ color: "hsl(var(--dark-fg))" }}>{data?.heading || "Performance Impact"}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-sm" style={{ color: "hsl(var(--text-tertiary))" }}>{data?.description || ""}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((m: any, idx: number) => (
            <motion.div key={m.id} initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: idx * 0.15 }}>
              <CircularProgress percentage={m.percentage} label={m.label} color={colors[idx % colors.length]} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceMetrics;
