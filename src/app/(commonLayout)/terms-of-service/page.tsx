"use client";

import { Scale, Gavel, Book, FileCheck, ArrowDown, Zap } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background pb-32">
      
      {/* --- Page Header --- */}
      <section className="relative pt-32 pb-20 overflow-hidden text-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-background border border-border rounded-full shadow-sm text-primary">
              <Scale className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Legal Framework</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
              Platform <br />
              <span className="text-primary italic font-serif">Terms of Service</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-medium">
              Effective as of April 13, 2026. By accessing CourseMaster, you agree to these professional standards and legal obligations.
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
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-12">
          
          <TermsCard 
            icon={<Gavel />}
            title="1. Acceptance of Terms"
            content="By creating an account on CourseMaster, you enter into a legally binding agreement. You certify that you are at least 18 years of age (or have legal guardian consent) and will provide accurate registration information."
          />

          <TermsCard 
            icon={<Book />}
            title="2. User License"
            content="We grant you a limited, non-transferable, personal license to access and view course content for which you have paid all required fees. This license is for personal, non-commercial educational use only."
          />

          <TermsCard 
            icon={<Zap />}
            title="3. Intellectual Property"
            content="All content provided on the platform—including videos, transcripts, and downloadable assets—remains the exclusive property of CourseMaster or its instructors. Unauthorized reproduction or distribution is strictly prohibited."
          />

          <TermsCard 
            icon={<FileCheck />}
            title="4. Code of Conduct"
            content="Users must maintain a professional and respectful environment. Any form of harassment, hate speech, or attempt to compromise platform security will result in immediate termination of access without refund."
          />

        </div>
      </section>

    </main>
  );
}

function TermsCard({ icon, title, content }: { icon: React.ReactNode; title: string, content: string }) {
  return (
    <div className="group relative p-8 md:p-12 bg-card border border-border rounded-[2.5rem] hover:border-primary/30 transition-all duration-500 flex flex-col md:flex-row gap-8 items-start">
      <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
         {icon}
      </div>
      <div className="space-y-4">
         <h3 className="text-2xl font-black tracking-tight text-foreground">{title}</h3>
         <p className="text-muted-foreground font-medium leading-relaxed">
           {content}
         </p>
      </div>
    </div>
  );
}
