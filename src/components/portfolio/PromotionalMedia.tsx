import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Play, ImageIcon, FileText, ExternalLink } from "lucide-react";

const PromotionalMedia = () => {
  const { ref, isInView } = useInView(0.2);
  const [data] = usePortfolioData<any>("promotional_media");
  
  if (!data) return null;
  
  const mediaItems = data?.media_items || [];
  
  if (mediaItems.length === 0) {
    return null;
  }

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play size={20} />;
      case 'image':
        return <ImageIcon size={20} />;
      case 'document':
        return <FileText size={20} />;
      default:
        return <ExternalLink size={20} />;
    }
  };

  const renderMediaContent = (item: any) => {
    try {
      if (item.type === 'video') {
        return (
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {item.thumbnail_url && (
              <img 
                src={item.thumbnail_url} 
                alt={item.title || 'Video thumbnail'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Play size={24} className="text-gray-800 ml-1" />
              </div>
            </div>
          </div>
        );
      }
      
      if (item.type === 'image') {
        return (
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={item.url} 
              alt={item.title || 'Image'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"%3E%3Crect width="400" height="225" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af"%3EImage not available%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>
        );
      }
    } catch (error) {
      console.error('Error rendering media:', error);
    }
    
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <FileText size={48} className="text-gray-400" />
      </div>
    );
  };

  if (mediaItems.length === 0) {
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
            {data?.heading || "Latest Updates & Media"}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {data?.description || "Stay updated with the latest videos, posts, and media content."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item: any, idx: number) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.5, delay: idx * 0.1 }} 
              className="bg-background rounded-xl border border-border overflow-hidden card-hover"
            >
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                {renderMediaContent(item)}
              </a>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                    {getMediaIcon(item.type)}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {item.type}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description?.slice(0, 100)}{item.description?.length > 100 ? '...' : ''}
                </p>
                {item.date && (
                  <p className="text-xs text-muted-foreground">
                    {(() => {
                      try {
                        return new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        });
                      } catch {
                        return item.date;
                      }
                    })()}
                  </p>
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
