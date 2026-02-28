import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { GraduationCap, Award } from "lucide-react";

const EducationCertifications = () => {
  const { ref, isInView } = useInView(0.2);
  const [data] = usePortfolioData<any>("education_certifications");
  const education = data?.education || [];
  const certifications = data?.certifications || [];

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{data?.heading || "Education & Credentials"}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 mb-6"><GraduationCap size={22} className="text-primary" /><h3 className="font-display text-xl font-semibold text-foreground">Education</h3></div>
            <div className="space-y-4">
              {education.map((e: any) => (
                <div key={e.id} className="bg-card-surface rounded-lg p-5 border border-border">
                  <h4 className="font-display font-semibold text-foreground">{e.degree}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{e.institution}</p>
                  <span className="font-data text-xs font-semibold text-accent mt-1 inline-block">{e.year}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}>
            <div className="flex items-center gap-2 mb-6"><Award size={22} className="text-accent" /><h3 className="font-display text-xl font-semibold text-foreground">Certifications</h3></div>
            <div className="space-y-4">
              {certifications.map((c: any) => (
                <div key={c.id} className="bg-card-surface rounded-lg p-5 border border-border">
                  <h4 className="font-display font-semibold text-foreground">{c.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{c.org}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationCertifications;
