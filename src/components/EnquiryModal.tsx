import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Home, ShieldCheck, Building2, HelpCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { submitLead } from "@/lib/mock-api";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName: string;
  defaultIntent?: "Buy" | "Invest" | "Commercial" | "Advisory";
  customSuccessMessage?: string;
  customSuccessDescription?: string;
}

const intents = [
  { id: "Buy", icon: Home, label: "Buy" },
  { id: "Invest", icon: ShieldCheck, label: "Invest" },
  { id: "Commercial", icon: Building2, label: "Commercial" },
  { id: "Advisory", icon: HelpCircle, label: "Advisory" },
] as const;

export default function EnquiryModal({ 
  isOpen, 
  onClose, 
  propertyName,
  defaultIntent = "Buy",
  customSuccessMessage = "Enquiry Received",
  customSuccessDescription = "An advisor will contact you shortly."
}: EnquiryModalProps) {
  const [selectedIntent, setSelectedIntent] = useState<string>(defaultIntent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error("Name, email, and phone number are required.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 1. Post to Express Backend for Nodemailer Dual-Side Emails
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          type: selectedIntent,
          propertyName: propertyName,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to dispatch property inquiry.");
      }

      // 2. Submit to existing local mock CRM database
      await submitLead({
        customerName: formData.name,
        mobile: formData.phone,
        email: formData.email,
        requirement: selectedIntent,
        budget: "Not Specified",
        buyingTimeline: "Immediate",
        source: "Direct Website Lead",
        city: "Kolkata",
        notes: `Property: ${propertyName}.${formData.message ? ` Message: ${formData.message}` : ""}`,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Toast notification as requested
      toast.success(customSuccessMessage, { description: customSuccessDescription });

      // Close modal after showing success state
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        // Reset form
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 2000);
    } catch (error: any) {
      setIsSubmitting(false);
      toast.error(error.message || "Failed to submit enquiry.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-navy-deep/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[210] overflow-y-auto pointer-events-none flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg glass-strong rounded-[2rem] border border-gold/20 shadow-2xl overflow-hidden pointer-events-auto relative"
            >
              {/* Decorative top gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-soft via-gold to-gold-deep" />

              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-4 h-4 text-white/70 hover:text-white" />
              </button>

              <div className="p-8 md:p-10">
                {!isSuccess ? (
                  <>
                    {/* Header */}
                    <div className="mb-8">
                      <p className="text-[10px] tracking-[0.3em] uppercase text-gold font-bold mb-2">Connect with us</p>
                      <h3 className="text-3xl font-display text-white mb-4">Request Details</h3>
                      
                      {/* Property Context Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-elevated border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                        <span className="text-xs font-semibold text-white">Ref: {propertyName}</span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      {/* Intent Selection */}
                      <div>
                        <label className="block text-[10px] tracking-widest uppercase text-foreground/50 mb-3">I'm looking to</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {intents.map((intent) => {
                            const isSelected = selectedIntent === intent.id;
                            return (
                              <button
                                key={intent.id}
                                type="button"
                                onClick={() => setSelectedIntent(intent.id)}
                                className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all ${
                                  isSelected 
                                    ? "bg-gold/10 border-gold text-gold" 
                                    : "bg-navy-elevated border-white/5 text-foreground/50 hover:bg-white/5 hover:border-white/20"
                                }`}
                              >
                                <intent.icon className="w-4 h-4 mb-1" />
                                <span className="text-[9px] uppercase tracking-wider font-semibold">{intent.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Name & Email Row */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] tracking-widest uppercase text-foreground/50 mb-1.5">Full Name</label>
                            <input 
                              required
                              type="text"
                              value={formData.name}
                              onChange={e => setFormData({...formData, name: e.target.value})}
                              placeholder="Your name"
                              className="w-full bg-navy-elevated border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-foreground/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] tracking-widest uppercase text-foreground/50 mb-1.5">Email Address</label>
                            <input 
                              required
                              type="email"
                              value={formData.email}
                              onChange={e => setFormData({...formData, email: e.target.value})}
                              placeholder="your@email.com"
                              className="w-full bg-navy-elevated border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-foreground/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-[10px] tracking-widest uppercase text-foreground/50 mb-1.5">Phone (WhatsApp)</label>
                          <input 
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            placeholder="+91 98765 43210"
                            className="w-full bg-navy-elevated border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-foreground/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-[10px] tracking-widest uppercase text-foreground/50 mb-1.5">Message (Optional)</label>
                          <textarea 
                            value={formData.message}
                            onChange={e => setFormData({...formData, message: e.target.value})}
                            placeholder="Tell us what you're looking for..."
                            rows={3}
                            className="w-full bg-navy-elevated border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-foreground/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all resize-none"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-gold !py-4 flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <span className="text-sm font-bold tracking-widest">Submit Request</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  /* Success State */
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-6">
                      <ShieldCheck className="w-10 h-10 text-gold" />
                    </div>
                    <h3 className="text-3xl font-display text-white mb-2">Request Secured</h3>
                    <p className="text-foreground/50 font-light">
                      Your details have been registered. A private advisor will reach out to {formData.email} shortly.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}