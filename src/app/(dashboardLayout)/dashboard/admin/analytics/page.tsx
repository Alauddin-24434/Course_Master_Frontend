"use client"

import { useGetDashboardAnalyticsQuery } from "@/redux/features/dashboard/dashboardApi"
import { Users, BookOpen, DollarSign, Loader2, TrendingUp, Inbox, ShieldCheck, UserCheck } from "lucide-react"

export default function AdminAnalyticsPage() {
  const { data, isLoading } = useGetDashboardAnalyticsQuery()
  const stats = data?.data?.statistics || {}

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header with platform status */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-border relative overflow-hidden group">
        <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-blue-600/10 text-blue-600 rounded-full border border-blue-600/20 text-xs font-black uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" /> High Precision Platform Analytics
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-foreground leading-tight">
                Global Command Center
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl font-serif">
                Comprehensive data aggregation across <span className="text-primary font-bold">{stats.totalStudents || 0} users</span> and <span className="text-primary font-bold">{stats.totalCourses || 0} courses</span>.
            </p>
        </div>
        
        <div className="flex flex-wrap gap-4 relative z-10">
            <div className="px-8 py-5 bg-primary text-primary-foreground rounded-[2rem] shadow-xl shadow-primary/30 flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer">
                <span className="text-3xl font-black tabular-nums">{stats.engagementRate || 0}%</span>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Platform Engagement</span>
            </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <AdminMiniStats label="Students" value={stats.totalStudents || 0} icon={<Users />} color="text-blue-500" bg="bg-blue-500/5" />
        <AdminMiniStats label="Instructors" value={stats.totalInstructors || 0} icon={<UserCheck />} color="text-purple-500" bg="bg-purple-500/5" />
        <AdminMiniStats label="Courses" value={stats.totalCourses || 0} icon={<BookOpen />} color="text-green-500" bg="bg-green-500/5" />
        <AdminMiniStats label="Enrollments" value={stats.totalEnrollments || 0} icon={<Inbox />} color="text-orange-500" bg="bg-orange-500/5" />
        <AdminMiniStats label="Revenue" value={`$${(stats.totalRevenue || 0).toLocaleString()}`} icon={<DollarSign />} color="text-emerald-500" bg="bg-emerald-500/5" />
        <AdminMiniStats label="Active Growth" value="+12%" icon={<TrendingUp />} color="text-rose-500" bg="bg-rose-500/5" />
      </div>

      {/* Revenue & Distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Revenue Visualization */}
        <div className="bg-card border border-border rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-black mb-12 flex items-center gap-4">
                <DollarSign className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl w-10 h-10" /> Global Revenue Stream
            </h3>
            <div className="h-48 flex items-end justify-between gap-6 relative">
                 {[45, 60, 55, 80, 70, 95, 85, 100, 90, 110, 105, 120].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-full transition-all group hover:scale-110" style={{ height: `${h/1.5}%` }}>
                         <div className="absolute top-[-40px] opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] font-black px-2 py-1 rounded">
                            ${(h*1240).toLocaleString()}
                         </div>
                    </div>
                 ))}
                 <div className="absolute inset-0 border-b-2 border-dashed border-border pointer-events-none opacity-50"></div>
            </div>
            <div className="flex justify-between mt-8 text-[11px] font-black text-muted-foreground uppercase tracking-widest px-2">
                <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
            </div>
        </div>

        {/* Platform Composition */}
        <div className="bg-zinc-950 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-black mb-12">Platform Composition</h3>
            <div className="space-y-8">
                <ProgressItem label="Student Satisfaction" value={92} color="bg-blue-500" />
                <ProgressItem label="Instructor Retention" value={78} color="bg-purple-500" />
                <ProgressItem label="Course Quality Score" value={85} color="bg-green-500" />
                <ProgressItem label="Support Efficiency" value={95} color="bg-orange-500" />
            </div>
            <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-primary/20 blur-[120px] rounded-full"></div>
        </div>
      </div>
    
    </div>
  )
}

function AdminMiniStats({ label, value, icon, color, bg }: any) {
    return (
        <div className={`p-8 rounded-[2rem] border border-border bg-card shadow-sm hover:translate-y-[-5px] transition-all duration-300 group`}>
            <div className={`${bg} ${color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">{label}</p>
            <p className="text-2xl font-black text-foreground tabular-nums tracking-tighter">{value}</p>
        </div>
    )
}

function ProgressItem({ label, value, color }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs font-black uppercase tracking-widest opacity-60">
                <span>{label}</span>
                <span>{value}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`} 
                  style={{ width: `${value}%` }}
                ></div>
            </div>
        </div>
    )
}
