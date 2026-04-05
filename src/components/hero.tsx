"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroAnimated() {
  const { t } = useTranslation()

  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsInView(true),
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Masterclass Luxury Background */}
      <div className="absolute inset-0 pointer-events-none bg-background">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[150px]"></div>
      </div>






      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left content */}
          <div className="space-y-10">
            {/* Featured Badge */}
            <div className={`transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-primary">{t("hero.featured") || "The Future of Learning"}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className={`text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-foreground transition-all duration-1000 delay-200 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {t("extra.unlock_potential")}
            </h1>

            {/* Subtitle */}
            <p className={`text-lg sm:text-xl text-muted-foreground max-w-xl font-medium leading-relaxed transition-all duration-1000 delay-300 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-5 transition-all duration-1000 delay-400 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <Link href="/courses" className="h-16 px-10 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-[0_20px_50px_rgba(var(--primary),0.3)] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2 justify-center">
                {t("hero.cta")}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#" className="h-16 px-10 border-2 border-border bg-background/50 backdrop-blur-md text-foreground rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-secondary transition-all flex items-center justify-center">
                {t("hero.watch_demo")}
              </Link>
            </div>

            {/* Stats Section */}
            <div className={`grid grid-cols-3 gap-8 pt-8 border-t border-border/50 transition-all duration-1000 delay-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="space-y-1">
                <p className="text-4xl font-black text-foreground">10K+</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t("hero.stats.courses")}</p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-foreground">50K+</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t("hero.stats.students")}</p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-foreground">500+</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t("hero.stats.instructors")}</p>
              </div>
            </div>
          </div>

          {/* Right content: Refined Hero Image */}
          <div className="relative h-[500px] lg:h-full flex items-center justify-center">
            <div className={`relative w-[400px] h-[500px] transition-all duration-1000 delay-500 ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              {/* Main Image Frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[3rem] -rotate-6 scale-105 blur-2xl"></div>
              <div className="relative w-full h-full overflow-hidden rounded-[3rem] border border-white/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 group">
                <img src="/hero.jpg" alt="Hero" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <p className="text-white font-black text-xl italic leading-tight">{t("extra.quote")}</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-10 -right-10 h-24 w-24 bg-secondary rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

