"use client";

import { useMemo } from "react";
import { useGetDashboardAnalyticsQuery } from "@/redux/features/dashboard/dashboardApi";
import { Users, BookOpen, Inbox, DollarSign, Sparkles, FolderOpen, ArrowRight } from "lucide-react";
import { AdminCoursesTable } from "./admin-courses-table";
import { DashboardStatCard } from "./dashboard/stat-card";
import { StatCardSkeleton, TableSkeleton } from "./dashboard/skeletons";
import Link from "next/link";

export function InstructorDashboard() {
  const { data, isLoading } = useGetDashboardAnalyticsQuery();
  const statistics = useMemo(() => data?.data?.statistics || {}, [data]);

  if (isLoading) {
    return (
      <div className="space-y-16 animate-pulse">
        <div className="flex justify-between items-end gap-8">
           <div className="space-y-4 w-full">
              <div className="h-6 bg-muted rounded-full w-40"></div>
              <div className="h-24 bg-muted rounded-2xl w-3/4"></div>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <StatCardSkeleton />
           <StatCardSkeleton />
           <StatCardSkeleton />
           <StatCardSkeleton />
        </div>
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* ================= PREMIUM HEADER ================= */}
      <section className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Instructor Headquarters</span>
           </div>
           <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9]">
              Platform <br />
              <span className="text-primary italic font-serif">Performance.</span>
           </h1>
           <p className="text-muted-foreground text-lg font-medium max-w-xl leading-relaxed">
              Track your impact, manage your curriculum, and analyze your revenue across the global marketplace.
           </p>
        </div>

        <div className="flex gap-4">
           <Link href="/dashboard/instructor/manage-courses" className="h-14 px-8 bg-secondary border border-border text-foreground rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest hover:bg-background transition-all">
              Manage Content
              <FolderOpen className="w-4.5 h-4.5" />
           </Link>
        </div>
      </section>

      {/* ================= STATS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardStatCard 
           label="Active Courses" 
           value={statistics.totalCourses || 0} 
           icon={<BookOpen className="w-5 h-5" />} 
           trend="Knowledge assets"
           variant="primary"
        />
        <DashboardStatCard 
           label="Unique Students" 
           value={statistics.totalStudents || 0} 
           icon={<Users className="w-5 h-5" />} 
           trend="Global reach"
           variant="indigo"
        />
        <DashboardStatCard 
           label="Course Enrollments" 
           value={statistics.totalEnrollments || 0} 
           icon={<Inbox className="w-5 h-5" />} 
           trend="Student engagement"
           variant="emerald"
        />
        <DashboardStatCard 
           label="Est. Revenue" 
           value={`$${statistics.totalRevenue?.toLocaleString() || 0}`} 
           icon={<DollarSign className="w-5 h-5" />} 
           trend="Platform earnings"
           variant="amber"
        />
      </div>

      {/* ================= RECENT CONTENT ================= */}
      <div className="space-y-8 bg-card border border-border rounded-[3rem] p-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="flex justify-between items-center relative z-10">
          <div className="space-y-1">
             <h2 className="text-3xl font-black tracking-tight">Recent Content</h2>
             <p className="text-muted-foreground font-medium text-sm">Managing your latest curriculum updates.</p>
          </div>
          
          <Link href="/dashboard/instructor/manage-courses" className="text-primary flex items-center gap-2 text-xs font-black uppercase tracking-widest group/link">
             View Full Library
             <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>

        <div className="relative z-10">
          <AdminCoursesTable />
        </div>
      </div>

    </div>
  );
}
