"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function PageBreadcrumb() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  // If we are on the home page, don't show the breadcrumb
  if (pathname === "/") return null;

  const paths = pathname.split("/").filter((path) => path);

  return (
    <div className="w-full border-b border-border bg-background/50 backdrop-blur-md z-40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center h-12 md:h-14 gap-3 md:gap-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-all shrink-0"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <div className="h-4 w-px bg-border shrink-0 hidden md:block" />

          <nav className="flex items-center overflow-x-auto no-scrollbar mask-linear-fade">
            <ol className="flex items-center gap-2 text-xs md:text-sm font-medium whitespace-nowrap">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{t("nav.home") || "Home"}</span>
                </Link>
              </li>
              
              {paths.map((path, index) => {
                const href = `/${paths.slice(0, index + 1).join("/")}`;
                const isLast = index === paths.length - 1;
                // Format path: remove hyphens and capitalize
                const formattedPath = path
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

                return (
                  <li key={path} className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
                    {isLast ? (
                      <span className="text-foreground font-bold truncate max-w-[150px] md:max-w-[300px]">
                        {formattedPath}
                      </span>
                    ) : (
                      <Link href={href} className="text-muted-foreground hover:text-primary transition-colors truncate max-w-[100px] md:max-w-[200px]">
                        {formattedPath}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
