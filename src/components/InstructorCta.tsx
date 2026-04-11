"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { ArrowRight, Wallet, Users, Zap, Globe } from "lucide-react";

export function InstructorCTA() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Main Boxed Container - Using OKLCH based colors */}
        <div className="relative overflow-hidden bg-card rounded-[3rem] border border-border/50 p-8 md:p-20 shadow-2xl">
          
      
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Left Content */}
            <div className="max-w-xl space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                <Zap className="w-3.5 h-3.5 text-primary fill-primary animate-pulse" />
                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.2em]">
                  {t("extra.for_instructors") || "Instructor Hub"}
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[1.1]">
                {t("extra.instructor_cta_title") || "Share Your Knowledge,"} <br/>
                <span className="text-muted-foreground font-serif italic">{t("extra.instructor_cta_millions") || "Empower Millions"}</span>
              </h2>

              <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                {t("extra.instructor_cta_desc") || "Turn your expertise into a global brand. Our platform gives you the infrastructure to teach, scale, and earn seamlessly."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 pt-4 justify-center lg:justify-start">
                <Link 
                  href="/signup" 
                  className="h-16 px-10 bg-primary text-primary-foreground rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-xl shadow-primary/20"
                >
                  {t("extra.become_instructor") || "Become an Instructor"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  href="/how-it-works" 
                  className="h-16 px-10 bg-secondary border border-border text-foreground rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-accent transition-all flex items-center justify-center"
                >
                  {t("extra.learn_how_works") || "Platform Guide"}
                </Link>
              </div>
            </div>

            {/* Right Side: Stats Cards - Using Theme Variables */}
            <div className="grid grid-cols-2 gap-5 w-full lg:w-auto">
              
              {/* Earnings Card */}
              <div className="p-8 bg-background/50 border border-border rounded-[2.5rem] flex flex-col gap-4 hover:border-primary/40 transition-colors group">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-foreground text-3xl font-black italic tracking-tighter">$9.9k</p>
                  <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-1">Avg. Monthly</p>
                </div>
              </div>

              {/* Students Card */}
              <div className="p-8 bg-background/50 border border-border rounded-[2.5rem] flex flex-col gap-4 hover:border-primary/40 transition-colors group">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-foreground text-3xl font-black italic tracking-tighter">50k+</p>
                  <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-1">Students</p>
                </div>
              </div>

              {/* Reach Card */}
              <div className="col-span-2 p-8 bg-background/50 border border-border rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-primary/40 transition-colors group">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground text-lg font-bold italic tracking-tight">Global Reach</p>
                      <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">190+ Countries</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-6">
                    <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-9 h-9 rounded-full border-2 border-card bg-muted overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?img=${i+40}`} alt="user" />
                          </div>
                        ))}
                    </div>
                    <p className="text-muted-foreground text-[11px] font-bold leading-tight">Join 400+<br/>Educators</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}