"use client";

import Link from "next/link"
import { useTranslation } from "react-i18next"
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-white/5 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
                <span className="text-xl font-black text-white italic">C</span>
              </div>
              <span className="text-xl font-black tracking-tight text-white sm:inline-block">
                Course<span className="text-primary italic">Master</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed">
              {t("auth.create_account_desc")}
            </p>
            <div className="flex gap-3">
              <SocialIcon icon={<Facebook className="w-4 h-4" />} />
              <SocialIcon icon={<Twitter className="w-4 h-4" />} />
              <SocialIcon icon={<Linkedin className="w-4 h-4" />} />
              <SocialIcon icon={<Youtube className="w-4 h-4" />} />
            </div>
          </div>

          {/* Links Columns */}
          <FooterColumn title={t("footer.links")}>
            <li><Link href="/courses" className="hover:text-white transition">{t("footer.explore")}</Link></li>
            <li><Link href="#" className="hover:text-white transition">{t("footer.upcoming")}</Link></li>
            <li><Link href="#" className="hover:text-white transition">{t("footer.bundles")}</Link></li>
            <li><Link href="#" className="hover:text-white transition">{t("footer.learning_path")}</Link></li>
          </FooterColumn>

          <FooterColumn title={t("extra.become_instructor")}>
            <li><Link href="#" className="hover:text-white transition">{t("footer.teach")}</Link></li>
            <li><Link href="#" className="hover:text-white transition">{t("footer.instructor_dash")}</Link></li>
            <li><Link href="#" className="hover:text-white transition">{t("footer.revenue")}</Link></li>
            <li><Link href="#" className="hover:text-white transition">{t("footer.help")}</Link></li>
          </FooterColumn>

          <FooterColumn title={t("footer.legal")}>
            <li><Link href="#" className="hover:text-white transition">{t("footer.privacy")}</Link></li>
            <li><Link href="#" className="hover:text-white transition">{t("footer.terms")}</Link></li>
            <li><Link href="#" className="hover:text-white transition">{t("footer.cookie")}</Link></li>
            <li><Link href="#" className="hover:text-white transition">{t("footer.ip_policy")}</Link></li>
          </FooterColumn>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium tracking-wider uppercase opacity-50">
            © 2026 CourseMaster. {t("hero.quote")}
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-white/40">
             <Link href="#" className="hover:text-white transition">{t("footer.status")}</Link>
             <Link href="#" className="hover:text-white transition">API</Link>
             <Link href="/#contact" className="hover:text-white transition">{t("footer.support")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <a href="#" className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white transition-all hover:bg-primary hover:border-primary hover:-translate-y-1">
            {icon}
        </a>
    )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">{title}</h4>
            <ul className="space-y-4 text-sm font-medium">
                {children}
            </ul>
        </div>
    )
}

