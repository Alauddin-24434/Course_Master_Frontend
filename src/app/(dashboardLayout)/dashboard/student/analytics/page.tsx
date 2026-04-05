"use client"

import { useGetDashboardAnalyticsQuery } from "@/redux/features/dashboard/dashboardApi"
import { BookOpen, Award, CheckCircle, Clock, Loader2, TrendingUp } from "lucide-react"

export default function StudentAnalyticsPage() {
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
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Learning Analytics
        </h1>
        <p className="text-muted-foreground text-lg">Track your progress and achievements across all courses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          label="Enrolled"
          value={stats.enrolledCourses || 0}
          icon={<BookOpen className="w-6 h-6 text-blue-500" />}
          description="Courses in your library"
          gradient="from-blue-500/10 to-blue-600/10"
        />
        <AnalyticsCard
          label="Completed"
          value={stats.completedCourses || 0}
          icon={<Award className="w-6 h-6 text-yellow-500" />}
          description="Certificates earned"
          gradient="from-yellow-500/10 to-yellow-600/10"
        />
        <AnalyticsCard
          label="Lessons Mastery"
          value={stats.lessonsCompleted || 0}
          icon={<CheckCircle className="w-6 h-6 text-green-500" />}
          description="Total lessons finished"
          gradient="from-green-500/10 to-green-600/10"
        />
        <AnalyticsCard
          label="Pending Tasks"
          value={stats.pendingTasks || 0}
          icon={<Clock className="w-6 h-6 text-red-500" />}
          description="Assignments & Quizzes"
          gradient="from-red-500/10 to-red-600/10"
        />
      </div>

      {/* Visual Analytics Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card border border-border rounded-[2rem] p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-primary" /> Weekly Learning Activity
            </h3>
            <div className="h-64 flex items-end justify-between gap-4 px-4 pb-4 border-b border-border">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-primary to-primary/60 rounded-t-lg transition-all hover:scale-105 hover:shadow-lg cursor-pointer" style={{ height: `${h}%` }}></div>
                ))}
            </div>
            <div className="flex justify-between mt-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-purple-700 rounded-[2rem] p-8 text-primary-foreground shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Keep it up!</h3>
                <p className="text-white/80 text-sm mb-8">You are in the top 15% of active learners this week.</p>
                <div className="text-5xl font-black mb-4">84%</div>
                <p className="text-xs uppercase font-black tracking-widest opacity-60">Avg. Engagement Score</p>
            </div>
            <TrendingUp className="absolute bottom-[-20px] right-[-20px] w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-700" />
        </div>
      </div>
    </div>
  )
}

function AnalyticsCard({ label, value, icon, description, gradient }: any) {
  return (
    <div className={`p-6 rounded-[2rem] border border-border bg-gradient-to-br ${gradient} backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative`}>
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm">
            {icon}
        </div>
        <div>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">{label}</p>
          <p className="text-3xl font-black mt-2 text-foreground">{value}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground font-medium">{description}</p>
    </div>
  )
}
