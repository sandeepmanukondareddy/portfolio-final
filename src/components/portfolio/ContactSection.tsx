import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Phone, Mail, Linkedin, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key] ?? ""))
    .join("&");

const ContactSection = () => {
  const { ref, isInView } = useInView(0.2);
  const [data] = usePortfolioData<any>("contact_section");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields (Name, Email, and Message).");
      return;
    }

    try {
      const payload = {
        "form-name": "contact",
        ...formData,
      };

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });

      if (!res.ok) throw new Error(`Submit failed: ${res.status}`);

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Form submission error:", err);
      setError("There was an error submitting your message. Please try again.");
    }
  };

  const contactInfo = [
    { icon: Phone, label: "Phone", value: data?.phone || "+91 8008503991", href: `tel:${data?.phone || "+918008503991"}` },
    { icon: Mail, label: "Email", value: data?.email || "emailsumitagarwal@gmail.com", href: `mailto:${data?.email || "emailsumitagarwal@gmail.com"}` },
    { icon: Linkedin, label: "LinkedIn", value: "LinkedIn Profile", href: data?.linkedin || "https://linkedin.com/in/sumitagarwal-avp" },
    { icon: MapPin, label: "Location", value: data?.location || "Hyderabad, India", href: "#" },
  ];

  return (
    <section id="contact" ref={ref} className="section-padding bg-section">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{data?.heading || "Get In Touch"}</h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-muted-foreground">{data?.description || "Let's discuss how we can create value together"}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.form
            name="contact"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Netlify Forms required hidden field */}
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                Thanks! Your message has been sent.
              </div>
            )}

            {[
              { name: "name", label: "Name", type: "text", placeholder: "Your full name", required: true },
              { name: "email", label: "Email", type: "email", placeholder: "your@email.com", required: true },
              { name: "phone", label: "Phone", type: "tel", placeholder: "+91 XXXXX XXXXX", required: false },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor={field.name}>
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  value={(formData as any)[field.name]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="message">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me what you need help with…"
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="space-y-6">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "LinkedIn" ? "_blank" : undefined}
                rel={item.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                className="flex items-start gap-4 p-5 rounded-2xl bg-background/60 border border-border hover:bg-background/80 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-foreground font-medium">{item.value}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
