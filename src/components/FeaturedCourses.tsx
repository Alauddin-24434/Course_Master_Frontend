"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Star, Users } from "lucide-react";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseAPi";
import { useGetCategoriesQuery } from "@/redux/features/category/categoriesApi";

export function FeaturedCourses() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const limit = 4;

  const { data: catData } = useGetCategoriesQuery();
  const categories: string[] = ["All", ...(catData?.data?.map((cat: any) => cat.name) || [])];

  const { data: courseData, isLoading } = useGetAllCoursesQuery({
    page: 1,
    limit,
  });

  const courses: any[] = courseData?.data?.courses || [];

  const filteredCourses = selectedCategory === "All"
    ? courses
    : courses.filter(course => {
        const category = catData?.data?.find((c: any) => c.id === course.category);
        return category?.name === selectedCategory;
      });

  // Skeleton Array for Loading State
  const skeletons = Array.from({ length: limit });

  return (
    <section className="py-24 bg-gradient-to-b from-transparent to-secondary/20">
      <div className="container mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-border pb-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-xs font-black uppercase text-primary tracking-widest">
              <Star className="w-3 h-3 fill-primary" />
              {t("extra.voices_success") || "Top Rated"}
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">
              {t("home.featured")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl font-medium">
              {t("home.featured_desc")}
            </p>
          </div>
          
          {/* View All Desktop */}
          <Link
            href="/courses"
            className="hidden md:flex h-12 items-center gap-2 rounded-2xl bg-primary px-8 text-sm font-black text-white shadow-xl shadow-primary/20 transition-all hover:translate-y-[-2px] hover:shadow-2xl active:translate-y-0"
          >
            {t("home.view_all")}
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? skeletons.map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse bg-card rounded-3xl overflow-hidden border border-border h-96 shadow-sm"
                >
                  <div className="bg-muted h-52 w-full" />
                  <div className="p-6 space-y-4">
                    <div className="h-3 bg-muted rounded-full w-1/3" />
                    <div className="h-6 bg-muted rounded-full w-full" />
                    <div className="h-4 bg-muted rounded-full w-3/4" />
                    <div className="flex justify-between items-center pt-4">
                      <div className="h-5 bg-muted rounded-full w-1/4" />
                      <div className="h-8 bg-muted rounded-xl w-1/3" />
                    </div>
                  </div>
                </div>
              ))
            : filteredCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="group relative flex flex-col bg-card rounded-[2rem] overflow-hidden border border-border/50 hover:border-primary hover:shadow-[0_20px_50px_rgba(var(--primary),0.1)] transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Thumbnail Wrapper */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-lg border border-white/20 text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                       {course.category?.name || "General"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <div className="space-y-2">
                       <h3 className="font-black text-xl leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2">
                         <div className="h-5 w-5 rounded-full bg-secondary flex items-center justify-center text-[10px] font-black uppercase text-secondary-foreground border border-black/5">
                            {course.instructor?.name?.charAt(0) || "I"}
                         </div>
                         <p className="text-xs font-bold text-muted-foreground truncate">{course.instructor?.name || "Expert Instructor"}</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Price</span>
                         <span className="text-xl font-black text-foreground">${course.price || 0}</span>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-secondary/50 rounded-xl text-xs font-bold text-foreground grayscale group-hover:grayscale-0 transition-all">
                        <Users className="w-3.5 h-3.5 text-primary" />
                        <span>{course._count?.enrolledUsers || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Decoration */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
        </div>

        {/* View All Mobile */}
        <div className="flex md:hidden justify-center pt-4">
          <Link
            href="/courses"
            className="w-full h-14 flex items-center justify-center rounded-2xl bg-secondary text-foreground font-black text-sm border border-border"
          >
            {t("home.view_all") || "View All Courses"}
          </Link>
        </div>
      </div>
    </section>
  );
}

