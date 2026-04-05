"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Star, Users, Clock, ArrowLeft, Check, PlayCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RootState } from "@/redux/store";
import { useEnrollCourseMutation } from "@/redux/features/course/courseAPi";
import { ICourse, IModule, ILesson } from "@/interfaces/course.interface";
import { toast } from "react-hot-toast";

export function CourseDetailView({ course }: { course: ICourse & { isEnrolled?: boolean } }) {
  const { isAuthenticated } = useSelector((state: RootState) => state.cmAuth);
  const [enrollCourse, { isLoading: enrollLoading }] = useEnrollCourseMutation();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("canceled")) {
      toast.error("Payment was canceled.");
    }
  }, [searchParams]);

  const isEnrolled = course?.isEnrolled;

  const handleEnroll = async () => {
    try {
      const res = await enrollCourse(course.id).unwrap();
      if (res.data?.paymentUrl) {
         window.location.href = res.data.paymentUrl;
      } else {
         toast.success(res.message || "Enrolled successfully!");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || err?.message || "Enrollment failed");
    }
  };

  return (
    <div className="container py-12 mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Explore
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
              {course.previewVideo ? (
                <iframe
                  src={course.previewVideo}
                  title={course.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              ) : (
                <img
                  src={course.thumbnail || "/placeholder.jpg"}
                  alt={course.title}
                  className="w-full h-full object-cover opacity-80"
                />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
                  {course.category?.name || "General"}
                </span>
                {course.isPublished && (
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider">
                    Published
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                {course.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                {course.description}
              </p>
            </div>
          </div>

          {/* Info Summary Bar */}
          <div className="flex flex-wrap gap-8 py-6 border-y border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-900 dark:text-white">4.8</span>
              <span className="text-sm text-gray-500">(2.4k reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="font-bold text-gray-900 dark:text-white">
                {course._count?.enrolledUsers || 0} students
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="font-bold text-gray-900 dark:text-white">
                {course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0)} Lessons
              </span>
            </div>
          </div>

          {/* Syllabus Section */}
          {course.modules && course.modules.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Syllabus</h2>
              <div className="space-y-4">
                {course.modules.map((module: IModule, idx: number) => (
                  <div
                    key={module.id}
                    className="bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 overflow-hidden"
                  >
                    <div className="p-4 flex items-center justify-between bg-white dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800">
                      <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white text-xs rounded-lg font-bold">
                          {idx + 1}
                        </span>
                        {module.title}
                      </h4>
                      <span className="text-xs font-bold text-gray-400">
                        {module.lessons?.length || 0} LESSONS
                      </span>
                    </div>
                    {module.lessons && (
                      <div className="p-4 space-y-3">
                        {module.lessons.map((lesson: ILesson) => (
                          <div key={lesson.id} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <PlayCircle className="w-4 h-4 text-gray-300" />
                            <span>{lesson.title}</span>
                            <span className="ml-auto text-xs text-gray-400">{lesson.duration}m</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Instructor Info */}
          <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/20 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-black">
              {course.instructor?.[0] || "I"}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Instruction by {course.instructor || "Expert Trainer"}
              </h3>
              <p className="text-blue-700 dark:text-blue-400 font-medium text-sm mb-2">Senior Industry Specialist</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                "Committed to delivering practical, project-based learning to help students master real-world skills."
              </p>
            </div>
          </div>
        </div>

        {/* Purchase/Enroll Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-xl overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="space-y-1">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Price</span>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-blue-600">${course.price}</span>
                  {course.price > 0 && (
                    <span className="text-lg text-gray-400 line-through">${(course.price * 1.5).toFixed(0)}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {isAuthenticated ? (
                  isEnrolled ? (
                    <Link
                      href={`/course/${course.id}/player`}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                    >

                      <PlayCircle className="w-5 h-5" />
                      Continue Learning
                    </Link>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      disabled={enrollLoading}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 transition-all shadow-lg shadow-blue-600/20"
                    >
                      {enrollLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Enroll Now"
                      )}
                    </button>
                  )
                ) : (
                  <Link
                    href="/login"
                    className="w-full block text-center py-4 rounded-xl font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-all"
                  >
                    Sign In to Enroll
                  </Link>
                )}
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-zinc-800 space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">This course includes:</p>
                <div className="space-y-3">
                  <FeatureItem icon={<Clock className="w-4 h-4" />} text="Full lifetime access" />
                  <FeatureItem icon={<Users className="w-4 h-4" />} text="Access on mobile and TV" />
                  <FeatureItem icon={<Check className="w-4 h-4" />} text="Certificate of completion" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-400">
      <div className="text-blue-600">{icon}</div>
      <span>{text}</span>
    </div>
  );
}

