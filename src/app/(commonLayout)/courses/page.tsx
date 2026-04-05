"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseAPi";
import Link from "next/link";
import { Search, SlidersHorizontal, BookOpen, Clock, Users, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useGetCategoriesQuery } from "@/redux/features/category/categoriesApi";

export default function CoursesPage() {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">("newest");
  const [category, setCategory] = useState("");

  const { data, isLoading } = useGetAllCoursesQuery({
    page,
    limit: 12,
    search,
    category,
    sortBy,
  });

  const courses: any = data?.data?.courses || [];
  const totalCount = data?.data?.total || 0;
  
  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.data || [];

  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

  return (
    <main className="min-h-screen bg-slate-50/30 dark:bg-zinc-950/30 py-24 relative overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute top-1/2 left-0 w-[40rem] h-[40rem] bg-purple-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-primary/20">
             <Sparkles className="w-3.5 h-3.5" /> Curated Knowledge
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.8] italic">
             {t("courses.all") || "Master New Skills Today."}
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl font-serif text-balance">
            Explore {totalCount} professional-grade courses designed to take your skills to the next dimension.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-20 z-40 bg-background border border-border/50 p-3 rounded-[3rem] shadow-2xl shadow-black/5 flex flex-col lg:flex-row gap-3 items-center group/nav transition-all hover:border-primary/20">
          <div className="relative w-full lg:flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder={t("courses.search_placeholder") || "Search Title, Skills, or Instructors..."}
              value={search}
              onChange={(e) => {setSearch(e.target.value); setPage(1);}}
              className="h-14 w-full bg-secondary/30 border-none rounded-[2rem] pl-14 pr-8 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>

          <div className="flex w-full lg:w-auto gap-2">
             <FilterSelect 
                value={sortBy} 
                onChange={(e: any) => {setSortBy(e.target.value); setPage(1);}}
                options={[
                    { value: "newest", label: "Newest Arrivals" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" }
                ]}
             />

             <FilterSelect 
                value={category} 
                onChange={(e: any) => {setCategory(e.target.value); setPage(1);}}
                options={[
                    { value: "", label: "All Categories" },
                    ...categories.map((cat: any) => ({ value: cat.id, label: cat.name }))
                ]}
             />
          </div>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse bg-card rounded-[2.5rem] border border-border h-[28rem] shadow-sm"></div>
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {courses.map((course: any) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-center space-y-6">
             <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground/30">
                <Search className="w-10 h-10" />
             </div>
             <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight">No results found.</h3>
                <p className="text-muted-foreground font-medium">Try different keywords or check back later for new content.</p>
             </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-20">
            <PaginationButton 
                label="Previous" 
                onClick={() => setPage(page - 1)} 
                disabled={page === 1} 
            />
            
            <div className="flex gap-2 p-2 bg-background border border-border/50 rounded-2xl shadow-sm">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`h-10 w-10 rounded-xl text-xs font-black transition-all ${
                            page === p ? "bg-primary text-white shadow-xl shadow-primary/20 scale-110" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                    >
                        {p < 10 ? `0${p}` : p}
                    </button>
                ))}
            </div>

            <PaginationButton 
                label="Next" 
                onClick={() => setPage(page + 1)} 
                disabled={page === totalPages} 
            />
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
            className="group relative flex flex-col bg-background rounded-[3rem] overflow-hidden border border-border/60 hover:border-primary hover:shadow-[0_30px_70px_rgba(var(--primary),0.12)] transition-all duration-700 hover:-translate-y-3"
        >
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

            <div className="p-8 flex flex-col flex-grow space-y-6">
                <div className="flex-grow space-y-4">
                    <h3 className="font-black text-2xl leading-[1.1] tracking-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300">
                        {course.title}
                    </h3>
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center text-xs font-black text-primary border border-primary/10">
                            {course.instructor?.name?.charAt(0) || "I"}
                        </div>
                        <p className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">{course.instructor?.name || "Expert Instructor"}</p>
                    </div>
                </div>

                <div className="pt-6 border-t border-border/40 flex items-center justify-between">
                    <div className="space-y-0.5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Investment</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-foreground tabular-nums">${course.price || 0}</span>
                            <span className="text-[10px] font-bold text-muted-foreground">USD</span>
                        </div>
                    </div>
                    
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
    )
}

function FilterSelect({ value, onChange, options }: any) {
    return (
        <div className="relative group">
            <select
                value={value}
                onChange={onChange}
                className="h-14 w-full lg:w-56 bg-secondary/30 border border-transparent rounded-[2rem] px-8 text-xs font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background focus:border-border transition-all appearance-none cursor-pointer"
            >
                {options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <SlidersHorizontal className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none opacity-40" />
        </div>
    )
}

function PaginationButton({ label, onClick, disabled }: any) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="group flex items-center gap-3 h-14 px-8 rounded-2xl bg-secondary text-xs font-black uppercase tracking-widest text-foreground transition-all hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-secondary disabled:hover:text-foreground active:scale-95"
        >
            {label === "Previous" ? <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" /> : null}
            {label}
            {label === "Next" ? <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /> : null}
        </button>
    )
}

