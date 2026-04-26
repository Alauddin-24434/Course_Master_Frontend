"use client";

import React, { useState } from "react";
import CourseCreateForm from "@/components/course-form/CourseCreateForm";
import { useGetAllCoursesQuery, useDeleteCourseMutation } from "@/redux/features/course/courseAPi";
import CourseList from "@/components/course-form/CourseList";
import { ICourse } from "@/interfaces/course.interface";
import { Plus, BookOpen, Layers } from "lucide-react";
import toast from "react-hot-toast";

export default function ManageCourses() {
  const { data: courses, refetch, isLoading } = useGetAllCoursesQuery();
  const [deleteCourse] = useDeleteCourseMutation();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id).unwrap();
        toast.success("Course deleted successfully!");
        refetch();
      } catch (err) {
        toast.error("Failed to delete course.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-10 max-w-7xl">
      
      {/* Header Branding */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                <BookOpen className="w-3.5 h-3.5" /> Course Catalog
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-tight italic">
                Manage Courses.
            </h1>
            <p className="text-muted-foreground font-medium max-w-xl">
                Create new learning paths, update pricing, and manage your course catalog to build your digital presence.
            </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="h-14 px-8 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Course
        </button>
      </div>

      <div className="bg-card border border-border/60 rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden">
        {/* Course List */}
        <CourseList
          courses={courses}
          isLoading={isLoading}
          onEdit={(course: ICourse) => {
            console.log("Edit course:", course);
          }}
          onDelete={(id: string) => handleDelete(id)}
          onAddLesson={(course: ICourse) => {
            console.log("Add Lesson:", course);
          }}
        />
      </div>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-card border border-border/60 rounded-[2.5rem] p-8 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-8 border-b border-border/50 pb-4">
              <div>
                <h3 className="text-2xl font-black italic tracking-tight">Draft New Course</h3>
                <p className="text-sm font-medium text-muted-foreground">Fill in the details to lay out your curriculum.</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="h-10 px-4 bg-secondary text-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:bg-muted transition-colors"
              >
                Close
              </button>
            </div>

            {/* Form */}
            <CourseCreateForm
              onCreated={() => {
                setShowCreateModal(false);
                refetch();
              }}
            />

          </div>
        </div>
      )}
    </div>
  );
}