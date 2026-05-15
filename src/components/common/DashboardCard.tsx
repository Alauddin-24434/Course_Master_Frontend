"use client";

import { ReactNode } from "react";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

export default function DashboardCard({
  children,
  className = "",
  header,
  footer,
}: DashboardCardProps) {
  return (
    <div className={`bg-card border border-border/60 rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden ${className}`}>
      {header && (
        <div className="p-8 border-b border-border/50">
          {header}
        </div>
      )}
      <div>
        {children}
      </div>
      {footer && (
        <div className="border-t border-border/50 bg-muted/5">
          {footer}
        </div>
      )}
    </div>
  );
}
