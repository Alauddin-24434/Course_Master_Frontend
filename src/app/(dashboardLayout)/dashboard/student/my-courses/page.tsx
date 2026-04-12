"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { PlayCircle, BookOpen, GraduationCap } from "lucide-react";
import { useGetMyCoursesQuery } from "@/redux/features/course/courseAPi";

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  progressPercentage?: number;
  completedLessonsCount?: number;
  totalLessons?: number;
  instructor?: {
    name?: string;
  };
}

export default function MyCoursesPage() {
  const { data, isLoading, isError } = useGetMyCoursesQuery();
  const searchParams = useSearchParams();

  const success = searchParams.get("success");

  useEffect(() => {
    if (success) {
      toast.success("Payment successful! Welcome to your course.");
    }
  }, [success]);

  const courses: any[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="p-10 grid gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 bg-muted animate-pulse rounded-2xl"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="p-10 text-center text-red-500">
        Failed to load courses.
      </p>
    );
  }

  return (
    <main className="min-h-screen py-10 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-3xl sm:text-4xl font-black mb-8">
          My Courses
        </h1>

        {courses.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            You haven’t enrolled in any course yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group bg-card border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >

                {/* Thumbnail */}
                <div className="relative h-44 w-full">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-110 transition"
                  />

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-white opacity-80" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">

                  <h3 className="font-bold text-lg line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Instructor: {course.instructor?.name || "Unknown"}
                  </p>

                  {/* Progress */}
                  <div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{
                          width: `${course.progressPercentage || 0}%`,
                        }}
                      />
                    </div>

                    <p className="text-xs mt-1 text-muted-foreground">
                      {course.completedLessonsCount || 0}/
                      {course.totalLessons || 0} lessons •{" "}
                      {course.progressPercentage || 0}%
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-3 border-t">

                    <Link
                      href={`/dashboard/student/my-courses/${course.id}`}
                      className="flex items-center gap-1 text-sm font-semibold text-primary"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Continue
                    </Link>

                    <Link
                      href={`/courses/${course.id}`}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                    >
                      <BookOpen className="w-4 h-4" />
                      Details
                    </Link>
                  </div>

                  {/* Certificate */}
                  {course.progressPercentage === 100 && (
                    <Link
                      href={`/dashboard/student/certificate/${course.id}`}
                      className="mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-bold py-2 rounded-xl"
                    >
                      <GraduationCap className="w-4 h-4" />
                      Certificate
                    </Link>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}