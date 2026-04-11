"use client";
import { useDebounce } from 'use-debounce';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Users,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { useGetAllCoursesQuery } from "@/redux/features/course/courseAPi";
import { useGetCategoriesQuery } from "@/redux/features/category/categoriesApi";

export default function CoursesPage() {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // ✅ FIXED SORT FORMAT (backend compatible)
  const [sortBy, setSortBy] = useState<
    "newest" | "price:asc" | "price:desc"
  >("newest");

  const [category, setCategory] = useState("");
   const [value] = useDebounce(search, 1000);

  // 🔥 API CALL
  const { data, isLoading } = useGetAllCoursesQuery({
    page,
    limit: 12,
    search: value,
    category,
    sort: sortBy,
  });

  const courses: any = data?.data?.courses || [];
  const totalCount = data?.data?.total || 0;

  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.data || [];

  const totalPages = Math.ceil(totalCount / 12) || 1;

  return (
    <main className="min-h-screen py-24">
      <div className="container mx-auto px-4 flex flex-col gap-10">

        {/* ================= FILTER BAR ================= */}
        <div className="flex flex-col lg:flex-row gap-4 items-center border p-4 rounded-2xl">

          {/* SEARCH */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={t("courses.search_placeholder") || "Search courses..."}
              className="w-full h-12 pl-10 border rounded-xl"
            />
          </div>

          {/* SORT */}
          <div className="relative w-full lg:w-60">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setPage(1);
              }}
              className="w-full h-12 border rounded-xl px-3"
            >
              <option value="newest">Newest</option>
              <option value="price:asc">Price: Low → High</option>
              <option value="price:desc">Price: High → Low</option>
            </select>

            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* CATEGORY */}
          <div className="w-full lg:w-60">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="w-full h-12 border rounded-xl px-3"
            >
              <option value="">All Categories</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ================= COURSES ================= */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin w-8 h-8" />
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course: any) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No courses found
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-2 border rounded ${
                    page === p ? "bg-black text-white" : ""
                  }`}
                >
                  {p}
                </button>
              )
            )}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function CourseCard({ course }: { course: any }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group relative flex flex-col bg-background rounded-sm overflow-hidden border border-border/60 hover:border-primary hover:shadow-[0_30px_70px_rgba(var(--primary),0.12)] transition-all duration-700 hover:-translate-y-3"
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-1000 ease-in-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <div className="absolute top-6 left-6 z-10 px-4 py-1.5 bg-background/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-primary shadow-xl border border-primary/10">
          {course.category?.name || "Premium"}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-8 flex flex-col flex-grow space-y-6">

        <div className="flex-grow space-y-4">
          <h3 className="font-black text-2xl leading-[1.1] tracking-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300">
            {course.title}
          </h3>

          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center text-xs font-black text-primary border border-primary/10">
              {course.instructor?.name?.charAt(0) || "I"}
            </div>

            <p className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">
              {course.instructor?.name || "Expert Instructor"}
            </p>
          </div>
        </div>

        {/* PRICE + ACTION */}
        <div className="pt-6 border-t border-border/40 flex items-center justify-between">

          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
              Investment
            </span>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-foreground tabular-nums">
                ${course.price || 0}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground">
                USD
              </span>
            </div>
          </div>

          {/* ICON ANIMATION */}
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary transition-all duration-500 overflow-hidden relative">

            <div className="flex flex-col items-center justify-center transition-transform duration-500 group-hover:-translate-y-full">
              <Users className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="absolute top-full flex flex-col items-center justify-center transition-transform duration-500 group-hover:-translate-y-full">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>

          </div>
        </div>

      </div>
    </Link>
  );
}