import { Linkedin, Mail, Phone, MapPin, Lock } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [footerData] = usePortfolioData<any>("footer");
  const [contactData] = usePortfolioData<any>("contact_section");
  const [heroData] = usePortfolioData<any>("hero_section");
  const navigate = useNavigate();

  return (
    <footer className="bg-dark-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "hsl(var(--dark-fg))" }}>
              {heroData?.full_name || "Sumit Agarwal"}
            </h3>
            <p className="text-sm" style={{ color: "hsl(var(--text-tertiary))" }}>
              {heroData?.professional_title || "Associate Vice President"}<br />
              FMCG & Consumer Health Leader
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "hsl(var(--dark-fg))" }}>Contact</h4>
            <div className="space-y-3 text-sm" style={{ color: "hsl(var(--text-tertiary))" }}>
              <p className="flex items-center gap-2"><Phone size={14} /> {contactData?.phone || "+91 8008503991"}</p>
              <p className="flex items-center gap-2"><Mail size={14} /> {contactData?.email || "emailsumitagarwal@gmail.com"}</p>
              <p className="flex items-center gap-2"><MapPin size={14} /> {contactData?.location || "Hyderabad, India"}</p>
              <a href={contactData?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors"><Linkedin size={14} /> LinkedIn Profile</a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "hsl(var(--dark-fg))" }}>Quick Links</h4>
            <div className="space-y-2 text-sm" style={{ color: "hsl(var(--text-tertiary))" }}>
              {[{ label: "Executive Profile", href: "#profile" }, { label: "Career Journey", href: "#journey" }, { label: "Core Expertise", href: "#expertise" }, { label: "Experience", href: "#experience" }, { label: "Contact", href: "#contact" }].map((link) => (
                <a key={link.href} href={link.href} className="block hover:text-accent transition-colors">{link.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "hsl(0 0% 25%)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "hsl(var(--text-tertiary))" }}>{footerData?.copyright_text || "© 2026 Sumit Agarwal. All Rights Reserved."}</p>
          <div className="flex items-center gap-4 text-xs" style={{ color: "hsl(var(--text-tertiary))" }}>
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-accent transition-colors">Terms & Conditions</a>
            <span>•</span>
            <button
              onClick={() => navigate("/admin")}
              className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-white/10 transition-colors"
              style={{ borderColor: "hsl(0 0% 35%)" }}
              title="Admin Portal"
            >
              <Lock size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
