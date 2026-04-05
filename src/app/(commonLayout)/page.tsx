"use client";

import { useTranslation } from "react-i18next";
import { FeaturedCourses } from "@/components/FeaturedCourses";
import { HeroAnimated } from "@/components/hero";
import { TrustBar } from "@/components/TrustBar";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="bg-background overflow-x-hidden">
      <HeroAnimated />
      <TrustBar />
      <FeaturedCourses />

      {/* Dynamic Ad / CTA Section */}
      <section className="py-20 relative bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 blur-[150px] -mr-80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 justify-between">
            <div className="space-y-6 flex-1 text-center md:text-left">
              <span className="text-primary font-black uppercase tracking-widest text-xs">{t("extra.for_instructors")}</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                {t("extra.instructor_cta_title")} <span className="text-primary italic">{t("extra.instructor_cta_millions")}</span>.
              </h2>
              <p className="text-zinc-400 font-medium text-lg">{t("extra.instructor_cta_desc")}</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <button className="h-14 px-8 bg-primary rounded-2xl font-black text-white hover:scale-105 transition-transform shadow-xl shadow-primary/20">{t("extra.become_instructor")}</button>
                <button className="h-14 px-8 bg-white/5 border border-white/10 rounded-2xl font-black text-white hover:bg-white/10 transition-colors">{t("extra.learn_how_works")}</button>
              </div>
            </div>

            {/* Dynamic Badge/Ad */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary blur-[80px] opacity-30 animate-pulse"></div>
              <div className="w-52 h-52 bg-gradient-to-tr from-primary to-indigo-400 rounded-3xl rotate-12 shadow-2xl flex flex-col items-center justify-center text-center p-6 border-4 border-white/20">
                <span className="text-white text-5xl font-black italic">$9.9k</span>
                <span className="text-white/80 text-[10px] font-black uppercase tracking-widest mt-2 leading-tight">{t("extra.avg_earnings_label")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Testimonials />
    </main>
  );
}

