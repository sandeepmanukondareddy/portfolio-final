import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const PromotionalMedia = () => {
  const { ref, isInView } = useInView(0.2);
  const [data] = usePortfolioData<any>("promotional_media");

  if (!data || !data.media_items || data.media_items.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.7 }} 
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            {data.heading || "Latest Updates & Media"}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {data.description || "Stay updated with the latest videos, posts, and media content."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.media_items.map((item: any) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              className="bg-background rounded-xl border border-border overflow-hidden card-hover"
            >
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500 text-sm">{item.type || 'media'}</span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title || 'Untitled'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description || 'No description available'}
                </p>
                {item.url && (
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline"
                  >
                    View Media →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalMedia;
