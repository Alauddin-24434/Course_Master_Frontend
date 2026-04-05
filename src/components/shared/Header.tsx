"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { Menu, X, Globe } from "lucide-react";
import { RootState, AppDispatch } from "@/redux/store";
import { logout } from "@/redux/features/auth/authSlice";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Header() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.cmAuth
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  console.log(i18n)
const toggleLanguage = () => {
  const newLang = i18n.language === 'en' ? 'bn' : 'en';
  i18n.changeLanguage(newLang); // updates i18n
  localStorage.setItem('i18nextLng', newLang); // persist
  document.documentElement.lang = newLang; // update html lang dynamically
};

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95 duration-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-indigo-400 shadow-lg shadow-primary/25">
                <span className="text-xl font-black text-white italic">C</span>
              </div>
              <span className="hidden text-xl font-black tracking-tight text-foreground sm:inline-block">
                Course<span className="text-primary italic">Master</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 xl:flex px-2 py-1 bg-secondary/50 rounded-2xl border border-border/50">
              <NavLink href="/" label={t("nav.home")} />
              <NavLink href="/courses" label={t("nav.courses")} />
              <NavLink href="/instructors" label={t("nav.instructors") || t("extra.instructors_title")} />
              <NavLink href="/about" label={t("nav.about") || t("extra.about_title")} />
              <NavLink href="/#contact" label={t("nav.contact") || t("extra.contact_title")} />
              {isAuthenticated && <NavLink href="/dashboard" label={t("nav.dashboard")} />}
              {isAuthenticated && user?.role === "admin" && <NavLink href="/admin" label={t("nav.admin")} />}
            </nav>
          </div>


          {/* Right Action Section */}
          <div className="flex items-center gap-3">
            
            {/* Theme and Language Actions */}
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-4 text-xs font-black transition-all hover:bg-secondary hover:border-primary/30 active:scale-95"
              >
                <Globe className="h-3.5 w-3.5 text-primary" />
                <span className="uppercase tracking-tighter">{i18n.language === "en" ? "BN" : "EN"}</span>
              </button>
            </div>

            <div className="h-6 w-[1px] bg-border mx-1 hidden sm:block" />

            {/* User Interaction Area */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="hidden flex-col items-end sm:flex">
                  <span className="text-xs font-black text-foreground leading-none">{user?.name}</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">{user?.role}</span>
                </div>
                <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground shadow-sm flex items-center justify-center font-black text-sm uppercase">
                  {user?.name?.charAt(0)}
                </div>
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex h-9 items-center justify-center rounded-xl bg-destructive/10 px-4 text-xs font-black text-destructive transition-all hover:bg-destructive hover:text-white active:scale-95"
                >
                  {t("nav.logout")}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-xl px-4 py-2 text-xs font-black text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  href="/signup"
                  className="hidden sm:flex h-9 items-center justify-center rounded-xl bg-primary px-5 text-xs font-black text-white shadow-lg shadow-primary/25 transition-all hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0"
                >
                  {t("nav.signup")}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-foreground lg:hidden transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden animate-in slide-in-from-top-4 duration-200 border-t bg-background p-4 grid gap-2">
          <MobileNavLink href="/" label={t("nav.home")} onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink href="/courses" label={t("nav.courses")} onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink href="/instructors" label={t("nav.instructors") || t("extra.instructors_title")} onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink href="/about" label={t("nav.about") || t("extra.about_title")} onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink href="/#contact" label={t("nav.contact") || t("extra.contact_title")} onClick={() => setIsMenuOpen(false)} />

          {isAuthenticated && (
            <>
              <MobileNavLink href="/dashboard" label={t("nav.dashboard")} onClick={() => setIsMenuOpen(false)} />
              {user?.role === "admin" && (
                <MobileNavLink href="/admin" label={t("nav.admin")} onClick={() => setIsMenuOpen(false)} />
              )}
              <div className="h-[1px] bg-border my-2" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center rounded-xl bg-destructive py-3 text-sm font-black text-white transition-opacity hover:opacity-90"
              >
                {t("nav.logout")}
              </button>
            </>
          )}
          {!isAuthenticated && (
             <div className="grid grid-cols-2 gap-3 pt-2">
               <Link
                 href="/login"
                 onClick={() => setIsMenuOpen(false)}
                 className="flex h-11 items-center justify-center rounded-xl bg-secondary text-sm font-black text-foreground"
               >
                 {t("nav.login")}
               </Link>
               <Link
                 href="/signup"
                 onClick={() => setIsMenuOpen(false)}
                 className="flex h-11 items-center justify-center rounded-xl bg-primary text-sm font-black text-white"
               >
                 {t("nav.signup")}
               </Link>
             </div>
          )}
        </div>
      )}
    </header>
  );
}

// Helper components for clean code
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl px-4 py-1.5 text-xs font-black tracking-tight text-foreground/70 transition-all hover:bg-background hover:text-primary hover:shadow-sm"
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex h-11 items-center rounded-xl bg-secondary/50 px-4 text-sm font-black text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
    >
      {label}
    </Link>
  );
}

