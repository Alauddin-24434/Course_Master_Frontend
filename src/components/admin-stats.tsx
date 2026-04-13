"use client"

import { useMemo } from "react"
import { Users, BookOpen, TrendingUp, DollarSign, Loader2, Sparkles } from "lucide-react"
import { useGetDashboardAnalyticsQuery } from "@/redux/features/dashboard/dashboardApi"
import { DashboardStatCard } from "./dashboard/stat-card"
import { StatCardSkeleton } from "./dashboard/skeletons"

export function AdminStats() {
  const { data, isLoading } = useGetDashboardAnalyticsQuery();
  const stats = useMemo(() => data?.data?.statistics || {}, [data]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(idx => (
          <StatCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardStatCard
        label="Total Students"
        value={stats.totalStudents || 0}
        icon={<Users className="w-5 h-5" />}
        trend="Registered users"
        variant="indigo"
      />
      <DashboardStatCard
        label="Active Courses"
        value={stats.totalCourses || 0}
        icon={<BookOpen className="w-5 h-5" />}
        trend="Learning assets"
        variant="primary"
      />
      <DashboardStatCard
        label="Platform Revenue"
        value={`$${stats.totalRevenue?.toLocaleString() || 0}`}
        icon={<DollarSign className="w-5 h-5" />}
        trend="Total earnings"
        variant="amber"
      />
      <DashboardStatCard
        label="Engagement"
        value={`${stats.engagementRate || 0}%`}
        icon={<TrendingUp className="w-5 h-5" />}
        trend="Enrollment rate"
        variant="emerald"
      />
    </div>
  )
}
