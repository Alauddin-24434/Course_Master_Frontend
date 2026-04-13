"use client";

import { Cookie, Info, Settings, ShieldCheck, ArrowDown, Fingerprint } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-background pb-32">
      
      {/* --- Page Header --- */}
      <section className="relative pt-32 pb-20 overflow-hidden text-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-emerald-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-background border border-border rounded-full shadow-sm text-primary">
              <Cookie className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Cookie Usage</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
              Managing Your <br />
              <span className="text-primary italic font-serif">Digital Crumbs</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-medium">
              We use cookies to enhance your journey through our academy. Learn how we use them and how you can control your preferences.
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
        <div className="max-w-4xl mx-auto space-y-24">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CookieCard 
               icon={<ShieldCheck />}
               title="Essential Cookies"
               desc="Required for core platform functionality like authentication, security, and session management. These cannot be disabled."
            />
            <CookieCard 
               icon={<Fingerprint />}
               title="Preference Cookies"
               desc="Allow us to remember your language choices, theme settings, and regional preferences for a consistent experience."
            />
            <CookieCard 
               icon={<Info />}
               title="Analytics Cookies"
               desc="Help us understand how you interact with our courses so we can improve content delivery and platform performance."
            />
            <CookieCard 
               icon={<Settings />}
               title="Marketing Cookies"
               desc="Used to track the effectiveness of our outreach campaigns and provide relevant news about upcoming course launches."
            />
          </div>

          <div className="p-12 bg-card border border-border rounded-[3rem] space-y-8">
             <h2 className="text-3xl font-black tracking-tight">How to Manage Cookies</h2>
             <p className="text-muted-foreground text-lg font-medium leading-relaxed">
               Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized.
             </p>
             <div className="flex flex-wrap gap-4 pt-4">
                <button className="h-12 px-8 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                  Accept All Cookies
                </button>
                <button className="h-12 px-8 border border-border bg-background text-foreground text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-secondary transition-all">
                  Reject Non-Essential
                </button>
             </div>
          </div>

        </div>
      </section>

    </main>
  );
}

function CookieCard({ icon, title, desc }: { icon: React.ReactNode; title: string, desc: string }) {
  return (
    <div className="p-8 bg-card border border-border rounded-[2rem] space-y-6 hover:shadow-xl hover:shadow-primary/5 transition-all group">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
         {icon}
      </div>
      <div className="space-y-2">
         <h4 className="text-xl font-black tracking-tight">{title}</h4>
         <p className="text-sm text-muted-foreground font-medium leading-relaxed">
           {desc}
         </p>
      </div>
    </div>
  );
}
