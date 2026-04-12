"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { Loader2, BookOpen, Award, Clock, PlayCircle, ArrowRight } from "lucide-react";

import { RootState } from "@/redux/store";
import { useGetMyCoursesQuery } from "@/redux/features/course/courseAPi";
import { ProgressBar } from "./progress-bar";

export function StudentDashboard() {
  const { user } = useSelector((state: RootState) => state.cmAuth);

  const { data, isLoading, isError } = useGetMyCoursesQuery();

  console.log("📦 My Courses:", data);

  // ✅ NOW DATA IS FLAT ARRAY
  const myCourses = Array.isArray(data?.data) ? data.data : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">Failed to load courses</p>;
  }

  // ================= STATS =================
  const totalEnrolled = myCourses.length;

  const completed = myCourses.filter(
    (c) => c.progressPercentage === 100
  ).length;

  const inProgress = myCourses.filter(
    (c) => c.progressPercentage < 100
  ).length;

  const overallProgress =
    myCourses.reduce((acc, c) => acc + (c.progressPercentage || 0), 0) /
    (myCourses.length || 1);

  // ================= CONTINUE LEARNING =================
  const continueCourses = [...myCourses]
    .sort(
      (a, b) =>
        new Date(b.lastActivity).getTime() -
        new Date(a.lastActivity).getTime()
    )
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

      {/* ================= WELCOME ================= */}
      <div className="bg-primary/10 rounded-3xl p-10 border border-primary/20">
        <h1 className="text-4xl font-black">
          Welcome, {user?.name?.split(" ")[0]} 👋
        </h1>

        <div className="mt-6">
          <Link
            href="/courses"
            className="px-6 py-3 bg-primary text-white rounded-xl font-bold"
          >
            Browse Courses
          </Link>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard
          label="Enrolled"
          value={totalEnrolled}
          icon={<BookOpen className="w-6 h-6 text-primary" />}
        />

        <StatCard
          label="Completed"
          value={completed}
          icon={<Award className="w-6 h-6 text-primary" />}
        />

        <StatCard
          label="In Progress"
          value={inProgress}
          icon={<Clock className="w-6 h-6 text-primary" />}
        />
      </div>

      {/* ================= PROGRESS ================= */}
      <div className="bg-card border rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Overall Progress</h2>

        <div className="flex items-center gap-4">
          <div className="text-3xl font-black text-primary">
            {Math.round(overallProgress)}%
          </div>

          <div className="flex-1">
            <ProgressBar progress={overallProgress} />
          </div>
        </div>
      </div>

      {/* ================= CONTINUE LEARNING ================= */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Continue Learning</h2>

          <Link
            href="/dashboard/student/my-courses"
            className="text-primary flex items-center gap-1 text-sm font-semibold"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {myCourses.length === 0 ? (
          <p className="text-muted-foreground">No courses found</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {continueCourses.map((course) => (
              <Link
                key={course.id}
                href={`/dashboard/student/my-courses/${course.id}`}
                className="border rounded-2xl p-4 hover:shadow-lg transition"
              >
                <div className="flex gap-4">

                  <img
                    src={course.thumbnail || "/placeholder.png"}
                    className="w-32 h-24 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold">{course.title}</h3>

                  

                    <div className="mt-3">
                      <ProgressBar progress={course.progressPercentage || 0} />
                      <p className="text-xs mt-1 text-muted-foreground">
                        {course.progressPercentage || 0}% completed
                      </p>
                    </div>
                  </div>

                  <PlayCircle className="w-6 h-6 text-primary" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STATS CARD ================= */
function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="border rounded-2xl p-5 bg-card">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-xl">
          {icon}
        </div>

        <div>
          <p className="text-xs text-muted-foreground font-bold uppercase">
            {label}
          </p>
          <p className="text-xl font-black">{value}</p>
        </div>
      </div>
    </div>
  );
}