"use client";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ProgressBar } from "./progress-bar";
import { ArrowRight, BookOpen, Award, Loader2, PlayCircle, Clock } from "lucide-react";

import { RootState } from "@/redux/store";
import { useGetMyEnrollmentsQuery, useBecomeInstructorMutation } from "@/redux/features/enroll/enrollApi";
import { toast } from "react-hot-toast";

export function StudentDashboard() {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.cmAuth);
  
  // Real data fetching
  const { data: myEnrollmentsData, isLoading } = useGetMyEnrollmentsQuery();
  const [becomeInstructor, { isLoading: isUpgrading }] = useBecomeInstructorMutation();
  const myCourses = myEnrollmentsData?.data?.map(e => e.course) || [];

  const handleBecomeInstructor = async () => {
    if (!confirm("Are you sure you want to become an instructor? You will be able to create and sell your own courses!")) return;
    
    try {
      await becomeInstructor().unwrap();
      toast.success("Congratulations! You are now an instructor. Please log in again to refresh your permissions.");
      // Ideally logout or refresh token here
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to upgrade account");
    }
  };


  if (isLoading) {

    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const completedCourses = myCourses.filter(c => c.progressPercentage === 100).length;
  const inProgressCourses = myCourses.filter(c => c.progressPercentage < 100).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-10">
        {/* Welcome Section */}
        <div className="bg-primary/10 dark:bg-primary/20 rounded-[2.5rem] p-12 text-foreground shadow-2xl relative overflow-hidden border border-primary/20">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="space-y-6 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-background/50 rounded-full border border-border backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                < Award className="w-4 h-4 text-primary" />
                {t("dashboard.portal") || "Student Portal"}
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tight">
                {t("dashboard.welcome")}, {user?.name.split(' ')[0]}!
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl opacity-90 font-medium">
                {t("dashboard.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                  <Link href="/courses" className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black transition-all shadow-xl hover:scale-105 active:scale-95">
                      {t("home.cta")}
                  </Link>
                  {user?.role === 'student' && (
                    <button 
                      onClick={handleBecomeInstructor}
                      disabled={isUpgrading}
                      className="px-8 py-4 bg-secondary text-secondary-foreground border border-border rounded-2xl font-black hover:bg-muted transition-all backdrop-blur-sm disabled:opacity-50"
                    >
                      {isUpgrading ? t("dashboard.processing") : t("extra.become_instructor")}
                    </button>
                  )}
              </div>
            </div>
            
            {/* Quick Progress Badge */}
            <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-primary/10 rounded-full scale-110"></div>
                <div className="w-40 h-40 rounded-full bg-primary shadow-3xl shadow-primary/50 flex flex-col items-center justify-center text-primary-foreground border-4 border-background">
                    <span className="text-4xl font-black">{Math.round(myCourses.reduce((acc, c) => acc + (c.progressPercentage || 0), 0) / (myCourses.length || 1))}%</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">{t("dashboard.progress")}</span>
                </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        {user?.role === 'student' && (
          <div className="bg-secondary/50 border border-border rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 justify-between shadow-sm">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-background rounded-xl shadow-sm border border-border">
                <PlayCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">{t("extra.become_instructor")}</h4>
                <p className="text-sm text-muted-foreground">{t("extra.become_instructor_desc")}</p>
              </div>
            </div>
            <button 
              onClick={handleBecomeInstructor}
              disabled={isUpgrading}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:opacity-90 transition shadow-lg disabled:opacity-50"
            >
                {t("extra.start_teaching")}
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard 
            label={t("dashboard.enrolled")} 
            value={myCourses.length} 
            icon={<BookOpen className="w-7 h-7 text-primary" />} 
          />
          <StatCard 
            label={t("dashboard.hours_learned")} 
            value="34.5h" 
            icon={<Clock className="w-7 h-7 text-primary" />} 
          />
          <StatCard 
            label={t("dashboard.certificates")} 
            value={completedCourses} 
            icon={<Award className="w-7 h-7 text-primary" />} 
          />
        </div>

        {/* Enrolled Courses Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
                {t("dashboard.continue")}
            </h2>
            <Link href="/courses" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 transition-colors">
              {t("home.view_all")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {myCourses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myCourses.slice(0, 4).map((course) => (
                <Link
                  key={course.id}
                  href={`/course/${course.id}/player`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-5 p-5">
                    <div className="relative w-full sm:w-40 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                      <img
                        src={course.thumbnail || "/placeholder.png"}
                        alt={course.title}
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <PlayCircle className="w-10 h-10 text-white fill-white/20" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg leading-snug truncate group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {course.instructor || "Expert Instructor"}
                        </p>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between items-end text-[10px] font-black text-muted-foreground uppercase">
                          <span>{course.progressPercentage}% {t("dashboard.progress")}</span>
                          <span>{course.completedLessonsCount}/{course.totalLessons} {t("nav.courses")}</span>
                        </div>
                        <ProgressBar progress={course.progressPercentage} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/50 rounded-3xl border-2 border-dashed border-border">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-muted-foreground opacity-30" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{t("courses.no_results")}</h3>
              <p className="text-muted-foreground max-w-xs mx-auto mb-8">{t("courses.description")}</p>
              <Link href="/courses" className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition shadow-lg inline-block">
                {t("home.cta")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0">
            {icon}
        </div>
        <div>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">{label}</p>
          <p className="text-2xl font-black mt-2 text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}

