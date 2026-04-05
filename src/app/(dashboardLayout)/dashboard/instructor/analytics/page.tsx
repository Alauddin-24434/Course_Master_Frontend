"use client"

import { useGetDashboardAnalyticsQuery } from "@/redux/features/dashboard/dashboardApi"
import { Users, BookOpen, DollarSign, Loader2, TrendingUp, Inbox } from "lucide-react"

export default function InstructorAnalyticsPage() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
        <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 rounded-full border border-primary/20 text-xs font-black uppercase tracking-[0.2em] text-primary">
                Instructor Console
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-foreground leading-[1.1]">
                Performance Insights
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl font-medium">Evaluate your course success, students recruitment, and revenue streams.</p>
        </div>
        
        <div className="flex gap-4">
             <div className="flex flex-col items-end px-6 py-4 bg-muted/50 rounded-3xl border border-border">
                <span className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground">Monthly Active Students</span>
                <span className="text-2xl font-black text-foreground">1,245 +</span>
             </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatsTile
          label="Total Courses"
          value={stats.totalCourses || 0}
          icon={<BookOpen className="w-6 h-6 text-emerald-500" />}
          gradient="from-emerald-500/10 to-emerald-600/10"
        />
        <StatsTile
          label="Total Students"
          value={stats.totalStudents || 0}
          icon={<Users className="w-6 h-6 text-purple-500" />}
          gradient="from-purple-500/10 to-purple-600/10"
        />
        <StatsTile
          label="Enrollments"
          value={stats.totalEnrollments || 0}
          icon={<Inbox className="w-6 h-6 text-orange-500" />}
          gradient="from-orange-500/10 to-orange-600/10"
        />
        <StatsTile
          label="Estimated Revenue"
          value={`$${stats.totalRevenue?.toLocaleString() || 0}`}
          icon={<DollarSign className="w-6 h-6 text-blue-500" />}
          gradient="from-blue-500/10 to-blue-600/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden text-white">
            <h3 className="text-2xl font-black mb-10 flex items-center gap-3">
                <TrendingUp className="text-emerald-400" /> Enrollment Trends
            </h3>
            <div className="h-64 flex items-end justify-between gap-5 relative z-10">
                {[12, 18, 15, 25, 22, 35, 45, 40, 55, 65, 80, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400/20 rounded-xl transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] cursor-pointer origin-bottom" style={{ height: `${h}%` }}></div>
                ))}
            </div>
            <div className="flex justify-between mt-8 text-[10px] font-black text-white/40 uppercase tracking-widest pl-2 pr-2">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="bg-white border border-border rounded-[3rem] p-10 flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
                <h4 className="text-sm font-black uppercase text-muted-foreground tracking-widest mb-10">Top Performing Course</h4>
                <div className="space-y-6">
                    <div className="p-1 bg-muted rounded-2xl overflow-hidden aspect-video relative group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                            <span className="text-white text-xs font-bold truncate">Web Development Masterclass</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-end border-b border-border pb-4">
                        <span className="text-sm font-bold text-muted-foreground">Revenue share</span>
                        <span className="text-xl font-black text-primary">64%</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

function StatsTile({ label, value, icon, gradient }: any) {
  return (
    <div className={`p-8 rounded-[2.5rem] border border-border bg-gradient-to-br ${gradient} hover:shadow-2xl transition-all duration-300 relative group overflow-hidden`}>
      <div className="flex flex-col gap-6">
        <div className="w-14 h-14 rounded-3xl bg-background flex items-center justify-center shadow-lg border border-border group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <div>
          <p className="text-xs font-black text-muted-foreground uppercase tracking-widest border-l-2 border-primary pl-3 mb-2">{label}</p>
          <p className="text-3xl font-black text-foreground tabular-nums tracking-tighter">{value}</p>
        </div>
      </div>
      <div className="absolute top-[-20%] right-[-10%] w-24 h-24 bg-white/20 blur-2xl rounded-full"></div>
    </div>
  )
}
