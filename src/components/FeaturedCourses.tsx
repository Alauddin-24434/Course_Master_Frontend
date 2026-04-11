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

  /* ================= GET CATEGORIES ================= */
  const { data: catData } = useGetCategoriesQuery();
  const categories = [
    "All",
    ...(catData?.data?.map((cat: any) => cat.name) || []),
  ];

  /* ================= CONVERT NAME → ID ================= */
  const selectedCategoryId =
    selectedCategory === "All"
      ? ""
      : catData?.data?.find((c: any) => c.name === selectedCategory)?.id;

  /* ================= API CALL ================= */
  const { data: courseData, isLoading } = useGetAllCoursesQuery({
    page: 1,
    limit,
    category: selectedCategoryId,
  });

  const courses: any[] = courseData?.data?.courses || [];

  /* ================= SKELETON ================= */
  const skeletons = Array.from({ length: limit });

  return (
    <section className="py-24 bg-background from-transparent to-secondary/20">
      <div className="container mx-auto space-y-12 px-4 sm:px-6 lg:px-8">

        {/* ================= TITLE ================= */}
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

          <Link
            href="/courses"
            className="hidden md:flex h-12 items-center gap-2 rounded-2xl bg-primary px-8 text-sm font-black text-white shadow-xl shadow-primary/20 hover:translate-y-[-2px]"
          >
            {t("home.view_all")}
          </Link>
        </div>

        {/* ================= CATEGORY FILTER ================= */}
        <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white border-primary scale-105"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= COURSES ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? skeletons.map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse bg-card rounded-3xl overflow-hidden border border-border h-96"
                >
                  <div className="bg-muted h-52 w-full" />
                  <div className="p-6 space-y-4">
                    <div className="h-3 bg-muted rounded-full w-1/3" />
                    <div className="h-6 bg-muted rounded-full w-full" />
                    <div className="h-4 bg-muted rounded-full w-3/4" />
                  </div>
                </div>
              ))
            : courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="group flex flex-col bg-card rounded-[2rem] overflow-hidden border hover:shadow-xl transition-all hover:-translate-y-2"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition"
                    />

                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 rounded text-xs font-black text-primary">
                      {course.category?.name || "General"}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-black text-lg line-clamp-2 group-hover:text-primary">
                      {course.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-2">
                      {course.instructor?.name || "Instructor"}
                    </p>

                    <div className="mt-auto pt-4 flex justify-between items-center">
                      <span className="font-black text-lg">
                        ${course.price}
                      </span>

                      <div className="flex items-center gap-1 text-xs">
                        <Users className="w-4 h-4" />
                        {course._count?.enrolledUsers || 0}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <div className="flex md:hidden justify-center pt-4">
          <Link
            href="/courses"
            className="w-full h-14 flex items-center justify-center rounded-2xl bg-secondary font-black"
          >
            {t("home.view_all") || "View All"}
          </Link>
        </div>
      </div>
    </section>
  );
}