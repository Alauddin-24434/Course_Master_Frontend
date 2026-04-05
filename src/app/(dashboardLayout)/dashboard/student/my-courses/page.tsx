"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { ICourse } from "@/interfaces/course.interface";
import { PlayCircle, BookOpen } from "lucide-react";
import { useGetMyCoursesQuery } from "@/redux/features/course/courseAPi";

export default function MyCoursesPage() {
  const { data, isLoading, isError } = useGetMyCoursesQuery();
  const searchParams = useSearchParams();
  const courses: any= data?.data || [];

  useEffect(() => {
    if (searchParams.get("success")) {
       toast.success("Payment successful! Welcome to the course.");
    }
  }, [searchParams]);

  if (isLoading) return <p className="p-10 text-center">Loading your courses…</p>;
  if (isError) return <p className="p-10 text-center text-red-500">Failed to load courses.</p>;

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-4xl font-bold font-serif mb-6">My Courses</h1>

        {courses.length === 0 ? (
          <p className="text-center py-10 text-muted-foreground">
            You haven’t enrolled in any course yet.
          </p>
        ) : (
// src/app/(dashboardLayout)/dashboard/student/my-courses/page.tsx
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any) => (
              <div
                key={course.id}
                className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary hover:shadow-lg transition duration-300"
              >
                {/* Thumbnail */}
                <div className="overflow-hidden h-40 bg-muted">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="font-serif font-bold text-lg line-clamp-2 group-hover:text-primary transition">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 h-2 rounded mt-2">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: `${course.progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-sm mt-1">
                    {course.completedLessonsCount}/{course.totalLessons} lessons completed (
                    {course.progressPercentage}%)
                  </p>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                        <Link
                          href={`/course/${course.id}/player`}
                          className="flex items-center gap-2 text-primary font-medium hover:underline text-sm"
                        >
                          <PlayCircle className="w-4 h-4" />
                          Continue
                        </Link>

                        <Link
                          href={`/courses/${course.id}`}
                          className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm"
                        >
                          <BookOpen className="w-4 h-4" />
                          Details
                        </Link>
                    </div>

                    {/* Certificate Button if complete */}
                    {course.progressPercentage === 100 && course.totalLessons > 0 && (
                        <Link
                           href={`/dashboard/student/certificate/${course.id}`}
                           className="w-full flex items-center justify-center gap-2 py-2 mt-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all"
                        >
                           🎓 View Certificate
                        </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
