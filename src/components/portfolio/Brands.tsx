import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const Brands = () => {
  const { ref, isInView } = useInView(0.2);
  const [data] = usePortfolioData<any>("brands");

  if (!data || !data.companies || data.companies.length === 0) {
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
            {data.heading || "Brands & Companies"}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {data.description || "Leading brands and companies I've had the privilege to work with throughout my career."}
          </p>
        </motion.div>

        <div className="space-y-12">
          {data.companies.map((company: any, companyIndex: number) => (
            <motion.div 
              key={company.id} 
              initial={{ opacity: 0, x: -20 }} 
              animate={isInView ? { opacity: 1, x: 0 } : {}} 
              transition={{ duration: 0.5, delay: companyIndex * 0.1 }} 
              className="bg-background rounded-xl border border-border p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {company.name}
                  </h3>
                  {company.duration && (
                    <p className="text-sm text-muted-foreground">
                      {company.duration}
                    </p>
                  )}
                  {company.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {company.description}
                    </p>
                  )}
                </div>
                {company.logo_url && (
                  <img 
                    src={company.logo_url} 
                    alt={company.name}
                    className="h-12 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </div>

              {company.brands && company.brands.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                    Brands:
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {company.brands.map((brand: any, brandIndex: number) => (
                      <motion.div 
                        key={brand.id} 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={isInView ? { opacity: 1, scale: 1 } : {}} 
                        transition={{ duration: 0.3, delay: (companyIndex * 0.1) + (brandIndex * 0.05) }} 
                        className="bg-muted/50 rounded-lg p-4 text-center border border-border"
                      >
                        {brand.logo_url ? (
                          <img 
                            src={brand.logo_url} 
                            alt={brand.name}
                            className="h-16 w-auto mx-auto mb-2 object-contain"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const nextElement = target.nextElementSibling as HTMLElement;
                              if (nextElement) {
                                nextElement.style.display = 'flex';
                              }
                            }}
                          />
                        ) : null}
                        <div className="h-16 w-auto mx-auto mb-2 flex items-center justify-center" style={{ display: brand.logo_url ? 'none' : 'flex' }}>
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-primary uppercase">
                              {brand.name?.slice(0, 2) || 'BR'}
                            </span>
                          </div>
                        </div>
                        <h5 className="font-medium text-foreground text-sm">
                          {brand.name}
                        </h5>
                        {brand.category && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {brand.category}
                          </p>
                        )}
                        {brand.description && (
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                            {brand.description}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
