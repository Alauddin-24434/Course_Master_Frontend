"use client";

import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  variant?: "primary" | "indigo" | "emerald" | "amber";
}

export function DashboardStatCard({
  label,
  value,
  icon,
  trend,
  variant = "primary",
}: StatCardProps) {
  
  const variantClasses = {
    primary: "bg-primary/5 border-primary/10 text-primary",
    indigo: "bg-indigo-500/5 border-indigo-500/10 text-indigo-500",
    emerald: "bg-emerald-500/5 border-emerald-500/10 text-emerald-500",
    amber: "bg-amber-500/5 border-amber-500/10 text-amber-500",
  }[variant];

  const hoverIconClasses = {
    primary: "group-hover:bg-primary group-hover:text-white",
    indigo: "group-hover:bg-indigo-500 group-hover:text-white",
    emerald: "group-hover:bg-emerald-500 group-hover:text-white",
    amber: "group-hover:bg-amber-500 group-hover:text-white",
  }[variant];

  return (
    <div className="group relative p-8 bg-card border border-border rounded-[2.5rem] transition-all duration-500 hover:border-primary/40 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
      <div className="space-y-6">
        <div className={`w-12 h-12 flex items-center justify-center rounded-2xl border transition-all duration-500 ${variantClasses} ${hoverIconClasses} group-hover:scale-110`}>
          {icon}
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-none">
            {label}
          </p>
          <p className="text-4xl font-black text-foreground tracking-tighter leading-none">{value}</p>
        </div>

        {trend && (
            <div className="pt-4 border-t border-border/50 flex items-center gap-2">
               <div className={`w-1.5 h-1.5 rounded-full ${variant === "primary" ? "bg-primary" : "bg-muted-foreground/30"}`} />
               <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">{trend}</p>
            </div>
        )}
      </div>
    </div>
  );
}
