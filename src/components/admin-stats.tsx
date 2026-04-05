"use client"

import type React from "react"
import { Users, BookOpen, TrendingUp, DollarSign, Loader2 } from "lucide-react"
import { useGetDashboardAnalyticsQuery } from "@/redux/features/dashboard/dashboardApi"

interface AdminStatProps {
  label: string
  value: string | number
  icon: React.ReactNode
  subtitle: string
}

function AdminStatCard({ label, value, icon, subtitle }: AdminStatProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
        </div>
        <div className="text-primary/20">{icon}</div>
      </div>
    </div>
  )
}

export function AdminStats() {
  const { data, isLoading } = useGetDashboardAnalyticsQuery();
  const stats = data?.data?.statistics || {};

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(idx => (
          <div key={idx} className="bg-card rounded-lg border border-border p-6 flex items-center justify-center min-h-[140px]">
             <Loader2 className="w-8 h-8 animate-spin text-muted-foreground opacity-50" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AdminStatCard
        label="Total Users"
        value={stats.totalStudents || 0}
        icon={<Users className="w-8 h-8" />}
        subtitle="Registered students"
      />
      <AdminStatCard
        label="Total Courses"
        value={stats.totalCourses || 0}
        icon={<BookOpen className="w-8 h-8" />}
        subtitle="Available courses"
      />
      <AdminStatCard
        label="Total Revenue"
        value={`$${stats.totalRevenue?.toLocaleString() || 0}`}
        icon={<DollarSign className="w-8 h-8" />}
        subtitle="Overall platform revenue"
      />
      <AdminStatCard
        label="Engagement Rate"
        value={`${stats.engagementRate || 0}%`}
        icon={<TrendingUp className="w-8 h-8" />}
        subtitle="Student enrollment rate"
      />
    </div>
  )
}
