"use client";

import Link from "next/link"
import { useTranslation } from "react-i18next"
import { Facebook, Twitter, Linkedin, Youtube, Send } from "lucide-react"

export function Footer() {
  const { t } = useTranslation();

  return (
    // Border remove kore Shadow-xl ebong ektu darker background add kora hoyeche
    <footer className="bg-background relative overflow-hidden pt-32 pb-16 ">
      
   
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
                <Link href="/" className="flex items-center gap-3 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <span className="text-2xl font-black text-primary-foreground italic">C</span>
                </div>
                <span className="text-2xl font-black tracking-tighter text-foreground">
                    Course<span className="text-primary italic">Master</span>
                </span>
                </Link>
                
                <p className="max-w-xs text-muted-foreground text-sm font-medium leading-relaxed opacity-80">
                {t("auth.create_account_desc") || "Empowering the next generation of world-class instructors and lifelong learners."}
                </p>
            </div>

            {/* Newsletter Input */}
            <div className="max-w-xs space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Newsletter</p>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full h-14 pl-6 pr-14 bg-card/30 border border-white/5 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-primary/20 focus:bg-card/50 outline-none transition-all shadow-inner"
                />
                <button className="absolute right-2 top-2 h-10 w-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-primary/40 transition-all active:scale-95">
                   <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <SocialIcon icon={<Facebook className="w-4 h-4" />} />
              <SocialIcon icon={<Twitter className="w-4 h-4" />} />
              <SocialIcon icon={<Linkedin className="w-4 h-4" />} />
              <SocialIcon icon={<Youtube className="w-4 h-4" />} />
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-8">
            <FooterColumn title={t("footer.links") || "Explore"}>
                <li><Link href="/courses" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{t("footer.explore")}</Link></li>
                <li><Link href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{t("footer.upcoming")}</Link></li>
                <li><Link href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{t("footer.bundles")}</Link></li>
                <li><Link href="/how-it-works" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{t("footer.learning_path") || "Methodology"}</Link></li>
            </FooterColumn>

            <FooterColumn title={t("extra.for_instructors") || "Teach"}>
                <li><Link href="/how-it-works" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{t("footer.teach")}</Link></li>
                <li><Link href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{t("footer.instructor_dash")}</Link></li>
                <li><Link href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{t("footer.revenue")}</Link></li>
                <li><Link href="/#contact" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{t("footer.help")}</Link></li>
            </FooterColumn>

            <FooterColumn title={t("footer.legal") || "Legal"}>
                <li><Link href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{t("footer.privacy")}</Link></li>
                <li><Link href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{t("footer.terms")}</Link></li>
                <li><Link href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">{t("footer.cookie")}</Link></li>
                <li><Link href="#" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Safety</Link></li>
            </FooterColumn>
          </div>
        </div>

   
       
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <a href="#" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card border border-white/5 text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1">
            {icon}
        </a>
    )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">{title}</h4>
            <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                {children}
            </ul>
        </div>
    )
}