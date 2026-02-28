import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Linkedin, ChevronDown } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { useInView } from "@/hooks/useInView";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => {
  const { ref, isInView } = useInView(0.1);
  const [data] = usePortfolioData<any>("hero_section");
  const [siteAssets] = usePortfolioData<any>("site_assets");

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 right-20 w-96 h-96 border border-primary rounded-full" />
        <div className="absolute bottom-40 left-10 w-64 h-64 border border-accent rotate-45" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 border border-secondary rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-[var(--shadow-lg)] border-2 border-border">
                <img src={data?.profile_photo_url || data?.profile_photo_base64 || profilePhoto} alt={data?.full_name || "Profile"} className="w-full h-full object-cover" />
              </div>
              <a href={data?.linkedin_url || "#"} target="_blank" rel="noopener noreferrer" className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground p-3 rounded-xl shadow-[var(--shadow-md)] hover:scale-105 transition-transform">
                <Linkedin size={22} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">
              {data?.professional_title || "Associate Vice President"}
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-4">
              {(data?.full_name || "Sumit Agarwal").split(" ")[0]}<br />
              <span className="text-gradient-gold">{(data?.full_name || "Sumit Agarwal").split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
              {data?.tagline || ""}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10">
              {(data?.stats || []).map((stat: any) => (
                <div key={stat.id || stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl text-foreground mb-1">
                    <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} isInView={isInView} />
                  </div>
                  <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition shadow-[var(--shadow-md)]">
                <Mail size={16} /> Get in Touch
              </a>
            </div>

            <div className="flex flex-wrap gap-5 justify-center lg:justify-start mt-8 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {data?.location || "Hyderabad, India"}</span>
              <span className="inline-flex items-center gap-1.5"><Phone size={14} /> {data?.phone || "+91 8008503991"}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown size={24} className="text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
