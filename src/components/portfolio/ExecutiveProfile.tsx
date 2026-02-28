import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const ExecutiveProfile = () => {
  const { ref, isInView } = useInView(0.2);
  const [data] = usePortfolioData<any>("executive_profile");

  return (
    <section id="profile" ref={ref} className="section-padding bg-section">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{data?.heading || "Executive Profile"}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-8" />
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: data?.content || "" }} />
        </motion.div>
      </div>
    </section>
  );
};

export default ExecutiveProfile;
