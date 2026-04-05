"use client";

import { Edit2, Plus, Loader2, BookOpen } from "lucide-react";

export default function CourseList({ courses, isLoading, onEdit, onAddLesson }: any) {
  
  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary/30" />
            <p className="text-sm font-black uppercase tracking-widest text-muted-foreground animate-pulse">Loading Catalog...</p>
        </div>
    );
  }

  const courseData = courses?.data?.courses || [];

  if (courseData.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center py-40 text-center space-y-6">
            <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center text-muted-foreground/20">
                <BookOpen className="w-12 h-12" />
            </div>
            <div className="space-y-1">
                <h4 className="text-xl font-black italic">No Courses Found.</h4>
                <p className="text-sm font-medium text-muted-foreground">Start by creating your first course.</p>
            </div>
        </div>
      )
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/30">
            <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border/50">Course Details</th>
            <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border/50">Instructor</th>
            <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border/50">Price</th>
            <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border/50">Enrolled</th>
            <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border/50">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border/50">
          {courseData.map((course: any) => (
            <tr key={course.id} className="group hover:bg-muted/20 transition-colors">
              <td className="px-8 py-6">
                  <p className="font-bold text-foreground text-sm line-clamp-1">{course.title}</p>
              </td>

              <td className="px-8 py-6">
                 <p className="text-xs font-bold text-muted-foreground">{(course.instructor as any)?.name || "N/A"}</p>
              </td>

              <td className="px-8 py-6 text-right">
                 <p className="font-black text-foreground">${course.price || 0}</p>
              </td>

              <td className="px-8 py-6 text-center">
                 <div className="inline-flex items-center justify-center px-3 py-1 bg-secondary rounded-full text-xs font-bold text-muted-foreground">
                    {course.enrolledUsers?.length || course._count?.enrolledUsers || 0}
                 </div>
              </td>

              <td className="px-8 py-6 text-right">
                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(course)}
                    className="h-9 px-4 bg-background border border-border/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-2 shadow-sm"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                
                  <button
                    onClick={() => onAddLesson(course)}
                    className="h-9 px-4 bg-background border border-border/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Lesson
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}