"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Search, Sparkles, Loader2, ArrowRight, BookOpen, Star, Users } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

const AiSearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ answer: string; relevantCourses: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResult(null);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai/search?query=${query}`
      );
      setResult(response.data.data);
    } catch (error) {
      console.error("AI Search Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[850px] bg-card rounded-[3rem] overflow-hidden p-0 border-none shadow-2xl">
        <div className="max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="p-10 space-y-8">
            <DialogHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary p-3 rounded-2xl text-primary-foreground shadow-lg shadow-primary/20 animate-pulse">
                  <Sparkles size={28} />
                </div>
                <div className="text-left">
                  <DialogTitle className="text-3xl font-black tracking-tight text-foreground uppercase">
                    {t("ai_search.title")}
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground text-sm font-bold uppercase tracking-widest opacity-70">
                    {t("ai_search.subtitle")}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Search Input Area */}
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-all duration-300" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder={t("ai_search.placeholder")}
                className="w-full h-20 pl-16 pr-40 bg-secondary/50 backdrop-blur-md border-2 border-border/50 rounded-[2rem] text-lg font-bold text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-500"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 px-8 py-3.5 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-3 shadow-xl shadow-primary/20"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles size={18} />}
                {t("ai_search.button")}
              </button>
            </div>

            {/* Results Area */}
            {result && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* AI Text Response */}
                <div className="relative p-8 bg-gradient-to-br from-secondary/80 to-secondary/30 rounded-[2.5rem] border border-border/50 shadow-inner group">
                  <div className="absolute -top-4 left-8 px-4 py-1.5 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  {t("ai_search.insights_badge")}
                </div>
                  <div className="prose prose-invert max-w-none prose-p:text-foreground/90 prose-p:leading-relaxed prose-strong:text-primary prose-headings:text-foreground">
                    <div className="text-sm font-medium space-y-4">
                      <ReactMarkdown>
                        {result.answer}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>

                {/* Course Cards Grid */}
                {result.relevantCourses.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 px-2">
                      <div className="h-px flex-1 bg-border/50"></div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{t("ai_search.matching_programs")}</h3>
                      <div className="h-px flex-1 bg-border/50"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {result.relevantCourses.map((course: any) => (
                        <Link
                          key={course.id}
                          href={`/courses/${course.id}`}
                          onClick={onClose}
                          className="group relative flex flex-col bg-card border border-border rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
                        >
                          <div className="aspect-[16/9] w-full relative overflow-hidden bg-secondary">
                            <img
                              src={course.thumbnail || "/placeholder.png"}
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                            <div className="absolute bottom-4 left-4">
                              <span className="px-3 py-1 bg-primary/20 backdrop-blur-md text-primary text-[10px] font-black uppercase rounded-lg border border-primary/30">
                                {course.category?.name || "Program"}
                              </span>
                            </div>
                          </div>

                          <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start gap-4">
                              <h4 className="font-black text-foreground group-hover:text-primary transition-colors text-lg leading-tight line-clamp-2">
                                {course.title}
                              </h4>
                              <div className="bg-secondary p-2 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                                <ArrowRight size={18} />
                              </div>
                            </div>

                            <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                              {course.description}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                                  <Users size={12} className="text-primary" />
                                  <span>{t("ai_search.students_count", { count: "2.4k" })}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                                  <Star size={12} className="text-primary fill-primary" />
                                  <span>{t("ai_search.rating_count", { rating: "4.9" })}</span>
                                </div>
                              </div>
                              <span className="text-xs font-black text-primary">$49.00</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!result && !isLoading && (
              <div className="py-20 text-center space-y-6">
                <div className="w-24 h-24 bg-secondary/50 rounded-[2.5rem] flex items-center justify-center mx-auto text-primary border border-border/50 relative group">
                  <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] animate-ping opacity-20"></div>
                  <BookOpen size={40} className="relative z-10" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-black uppercase tracking-widest text-foreground">{t("ai_search.awaiting_title")}</h4>
                  <p className="text-xs font-medium text-muted-foreground max-w-xs mx-auto leading-relaxed">
                    {t("ai_search.awaiting_desc")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AiSearchModal;
