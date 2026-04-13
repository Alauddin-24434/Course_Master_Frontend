"use client";

import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-muted/60 rounded-xl relative overflow-hidden",
        "after:content-[''] after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent",
        className
      )}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="p-8 bg-card border border-border rounded-[2.5rem] space-y-6">
      <Skeleton className="w-12 h-12 rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="w-20 h-3" />
        <Skeleton className="w-24 h-8" />
      </div>
      <div className="pt-4 border-t border-border/50">
        <Skeleton className="w-32 h-2.5" />
      </div>
    </div>
  );
}

export function WelcomeHeroSkeleton() {
  return (
    <div className="rounded-[3rem] bg-card border border-primary/10 p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="space-y-8 w-full max-w-2xl">
        <Skeleton className="w-40 h-6 rounded-full" />
        <div className="space-y-4">
           <Skeleton className="w-3/4 h-16 md:h-24" />
           <Skeleton className="w-1/2 h-16 md:h-24" />
        </div>
        <Skeleton className="w-full max-w-lg h-12" />
        <div className="flex gap-4">
           <Skeleton className="w-40 h-14 rounded-2xl" />
           <Skeleton className="w-40 h-14 rounded-2xl" />
        </div>
      </div>
      <Skeleton className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-2xl" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-card rounded-[2.5rem] border border-border overflow-hidden p-8 space-y-6">
      <div className="flex justify-between items-center mb-4">
         <div className="space-y-2">
            <Skeleton className="w-40 h-8" />
            <Skeleton className="w-60 h-4" />
         </div>
         <Skeleton className="w-32 h-10 rounded-xl" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="w-full h-16 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-[2.5rem] p-6 flex flex-col sm:flex-row gap-6">
       <Skeleton className="aspect-video w-full sm:w-56 rounded-2xl shrink-0" />
       <div className="flex-1 space-y-6 py-2">
          <div className="space-y-3">
             <Skeleton className="w-20 h-2.5" />
             <Skeleton className="w-3/4 h-8" />
          </div>
          <div className="space-y-2">
             <div className="flex justify-between">
                <Skeleton className="w-16 h-3" />
                <Skeleton className="w-10 h-3" />
             </div>
             <Skeleton className="w-full h-2 rounded-full" />
          </div>
       </div>
    </div>
  );
}
export function GridCourseCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden flex flex-col h-full">
       <Skeleton className="aspect-[16/10] rounded-none" />
       <div className="p-8 space-y-6">
          <Skeleton className="w-3/4 h-8" />
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-2xl" />
                <Skeleton className="w-24 h-4" />
             </div>
             <Skeleton className="w-12 h-6 rounded-lg" />
          </div>
          <div className="pt-6 border-t border-border flex items-center justify-between">
             <Skeleton className="w-20 h-10" />
             <Skeleton className="w-14 h-14 rounded-2xl" />
          </div>
       </div>
    </div>
  );
}
