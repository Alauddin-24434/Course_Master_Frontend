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
  BookOpen,
  Filter,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

import { useGetAllCoursesQuery } from "@/redux/features/course/courseAPi";
import { useGetCategoriesQuery } from "@/redux/features/category/categoriesApi";

export default function CoursesPage() {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price:asc" | "price:desc">("newest");
  const [category, setCategory] = useState("");
  const [debouncedSearch] = useDebounce(search, 800);

  // --- API Fetching ---
  const { data, isLoading } = useGetAllCoursesQuery({
    page,
    limit: 12,
    search: debouncedSearch,
    category,
    sort: sortBy,
  });

  const courses: any = data?.data?.courses || [];
  const totalCount = data?.data?.total || 0;
  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.data || [];
  const totalPages = Math.ceil(totalCount / 12) || 1;

  return (
    <main className="min-h-screen bg-background pb-32">
      
      {/* --- Page Header --- */}
     

      {/* --- Filter & Content Section --- */}
      <div className="container mx-auto px-4 pt-32  -mt-10 relative z-20">
        
        {/* ================= PREMIUM FILTER BAR ================= */}
        <div className="bg-card/50 backdrop-blur-2xl border border-primary/10 rounded-[2.5rem] p-4 lg:p-6 shadow-2xl shadow-primary/5 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* 1. Search (Span 5) */}
            <div className="lg:col-span-5 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder={t("courses.search_placeholder") || "What do you want to learn today?"}
                className="w-full h-14 pl-14 pr-6 bg-background/50 border border-primary/5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary/30 outline-none transition-all"
              />
            </div>

            {/* 2. Category Select (Span 3) */}
            <div className="lg:col-span-3 relative group">
              <Filter className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="w-full h-14 pl-14 pr-6 bg-background/50 border border-primary/5 rounded-2xl text-sm font-black uppercase tracking-widest appearance-none outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option value="">{t("courses.category.all") || "All Subjects"}</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronRight className="w-4 h-4 text-muted-foreground rotate-90" />
              </div>
            </div>

            {/* 3. Sort Select (Span 3) */}
            <div className="lg:col-span-3 relative group">
              <SlidersHorizontal className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  setPage(1);
                }}
                className="w-full h-14 pl-14 pr-6 bg-background/50 border border-primary/5 rounded-2xl text-sm font-black uppercase tracking-widest appearance-none outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option value="newest">New Arrivals</option>
                <option value="price:asc">Price: Low to High</option>
                <option value="price:desc">Price: High to Low</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronRight className="w-4 h-4 text-muted-foreground rotate-90" />
              </div>
            </div>

            {/* 4. Results Info (Span 1) */}
            <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center border-l border-primary/10">
               <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Results</span>
               <span className="text-xl font-black text-primary leading-none">{totalCount}</span>
            </div>

          </div>
        </div>

        {/* ================= CONTENT GRID ================= */}
        <div className="min-h-[600px] relative">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/50 backdrop-blur-sm z-30">
              <div className="relative w-16 h-16">
                 <div className="absolute inset-0 rounded-2xl border-4 border-primary/20 animate-pulse"></div>
                 <div className="absolute inset-0 rounded-2xl border-4 border-t-primary animate-spin"></div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Discovering Excellence...</p>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
              {courses.map((course: any, idx: number) => (
                <div 
                  key={course.id} 
                  className="animate-in fade-in slide-in-from-bottom-10 duration-700 fill-mode-both"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 space-y-6 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-primary/40" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight">{t("courses.no_results") || "End of Search"}</h3>
                <p className="text-muted-foreground font-medium">Try adjusting your filters or search terms.</p>
              </div>
              <button 
                onClick={() => { setSearch(""); setCategory(""); setSortBy("newest"); }}
                className="px-8 py-3 bg-secondary border border-border rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
              >
                Clear All Filter
              </button>
            </div>
          )}
        </div>

        {/* ================= PREMIUM PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-24">
            <button
              disabled={page === 1}
              onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="w-14 h-14 border border-border rounded-2xl flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-20 active:scale-95 bg-card"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-2xl border border-border/50">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                // Show only current, first, last and nearby pages if too many
                const isFar = totalPages > 5 && Math.abs(p - page) > 1 && p !== 1 && p !== totalPages;
                if (isFar && p === 2) return <span key="dot1" className="px-2">...</span>;
                if (isFar && p === totalPages - 1) return <span key="dot2" className="px-2">...</span>;
                if (isFar) return null;

                return (
                  <button
                    key={p}
                    onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                      page === p 
                        ? "bg-primary text-white shadow-xl shadow-primary/20 scale-110" 
                        : "text-muted-foreground hover:bg-background"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="w-14 h-14 border border-border rounded-2xl flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-20 active:scale-95 bg-card"
            >
              <ChevronRight className="w-5 h-5" />
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
      className="group relative flex flex-col h-full bg-card rounded-[2.5rem] overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(var(--primary),0.15)]"
    >
      {/* --- THUMBNAIL AREA --- */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Category Badge */}
        <div className="absolute top-6 left-6 z-10 px-4 py-1.5 bg-background/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-primary shadow-xl border border-primary/10">
          {course.category?.name || "Uncategorized"}
        </div>

        {/* Floating Play Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
           <div className="w-16 h-16 bg-primary/90 text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <ArrowRight className="w-6 h-6" />
           </div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="p-8 flex flex-col flex-grow relative">
        <div className="flex-grow space-y-6">
          
          <h3 className="text-2xl font-black leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {course.title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-secondary border border-border flex items-center justify-center overflow-hidden">
                {course.instructor?.avatar ? (
                  <img src={course.instructor.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-black text-primary uppercase">{course.instructor?.name?.charAt(0) || "I"}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">Instructor</span>
                <span className="text-xs font-bold text-foreground mt-1">{course.instructor?.name || "Academy Expert"}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary rounded-lg border border-border">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[10px] font-black tabular-nums">{course._count?.enrolledUsers || 0}</span>
            </div>
          </div>
        </div>

        {/* --- PRICING SECTION --- */}
        <div className="mt-8 pt-6 border-t border-primary/5 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">Investment</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-foreground tabular-nums leading-none">
                ${course.price || 0}
              </span>
              <span className="text-[10px] font-black text-muted-foreground uppercase">USD</span>
            </div>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 group-hover:scale-110 transition-all duration-500">
             <BookOpen className="w-6 h-6" />
          </div>
        </div>

      </div>
    </Link>
  );
}