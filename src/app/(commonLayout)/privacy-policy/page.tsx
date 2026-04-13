"use client";

import { Shield, Lock, Eye, FileText, Sparkles, ArrowDown } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background pb-32">
      
      {/* --- Page Header --- */}
      <section className="relative pt-32 pb-20 overflow-hidden text-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-background border border-border rounded-full shadow-sm text-primary">
              <Shield className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Privacy First</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
              Your Data. <br />
              <span className="text-primary italic font-serif">Your Sovereignty.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-medium">
              Last updated: April 13, 2026. We believe transparency is the foundation of trust. Here's how we protect your digital footprint.
            </p>

            <div className="flex justify-center pt-8">
               <div className="animate-bounce w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground">
                  <ArrowDown className="w-5 h-5" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Content Area --- */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-16">
          
          <PolicySection 
            icon={<Eye />}
            title="1. Information We Collect"
            content="We collect information that helps us provide a premium learning experience. This includes account details (name, email), profile information, and learning progress. We never collect sensitive personal data without your explicit consent."
          />

          <PolicySection 
            icon={<Lock />}
            title="2. How We Use Data"
            content="Your data is used to personalize your curriculum, process transactions securely via our payment partners, and send important platform updates. We analyze anonymous usage patterns to constantly refine our interface and content quality."
          />

          <PolicySection 
            icon={<Sparkles />}
            title="3. Data Security"
            content="CourseMaster employs industry-leading encryption and decentralized security protocols to ensure your data remains inaccessible to unauthorized parties. All payment processing is handled by Level 1 PCI-compliant service providers."
          />

          <PolicySection 
            icon={<FileText />}
            title="4. Your Rights"
            content="You retain full ownership of your data. At any time, you can request a full export of your personal information or ask for permanent account deletion. We honor all GDPR and CCPA requests with immediate priority."
          />

        </div>
      </section>

    </main>
  );
}

function PolicySection({ icon, title, content }: { icon: React.ReactNode; title: string, content: string }) {
  return (
    <div className="group relative p-8 md:p-12 bg-card border border-border rounded-[3rem] hover:border-primary/30 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-16 h-16 shrink-0 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
           {icon}
        </div>
        <div className="space-y-6">
           <h3 className="text-3xl font-black tracking-tight text-foreground">{title}</h3>
           <p className="text-muted-foreground text-lg font-medium leading-relaxed">
             {content}
           </p>
        </div>
      </div>
    </div>
  );
}
