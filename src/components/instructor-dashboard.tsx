"use client";

import { useGetDashboardAnalyticsQuery } from "@/redux/features/dashboard/dashboardApi";
import { Users, BookOpen, Inbox, DollarSign } from "lucide-react";
import { AdminCoursesTable } from "./admin-courses-table";

function InstructorStatCard({ label, value, icon }: { label: string; value: string | number; icon: any }) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-xl text-primary">{icon}</div>
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
          <p className="text-2xl font-black mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}

export function InstructorDashboard() {
  const { data, isLoading } = useGetDashboardAnalyticsQuery();
  const statistics = data?.data?.statistics || {};

  if (isLoading) {
    return <div className="animate-pulse space-y-8">
      <div className="h-8 bg-muted rounded w-1/4"></div>
      <div className="grid grid-cols-4 gap-6"><div className="h-24 bg-muted rounded-xl"></div><div className="h-24 bg-muted rounded-xl"></div><div className="h-24 bg-muted rounded-xl"></div><div className="h-24 bg-muted rounded-xl"></div></div>
    </div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-foreground">Instructor Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            A comprehensive look into your courses and student enrollment.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InstructorStatCard label="My Courses" value={statistics.totalCourses || 0} icon={<BookOpen className="w-5 h-5" />} />
          <InstructorStatCard label="Unique Students" value={statistics.totalStudents || 0} icon={<Users className="w-5 h-5" />} />
          <InstructorStatCard label="Enrollments" value={statistics.totalEnrollments || 0} icon={<Inbox className="w-5 h-5" />} />
          <InstructorStatCard label="Total Earnings" value={`$${statistics.totalRevenue?.toLocaleString() || 0}`} icon={<DollarSign className="w-5 h-5" />} />
        </div>

        {/* Recent Courses */}
        <div>
          <h2 className="text-2xl font-black mb-6">Manage Your Content</h2>
          <AdminCoursesTable />
        </div>
      </div>
    </div>
  );
}
