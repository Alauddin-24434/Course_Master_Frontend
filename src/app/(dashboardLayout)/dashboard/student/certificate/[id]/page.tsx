"use client";

import React, { useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetMyCoursesQuery } from "@/redux/features/course/courseAPi";

import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Loader2, Download, ChevronLeft, Award } from "lucide-react";
import { useSelector } from "react-redux";

export default function CertificatePage() {
   const params = useParams();
   const router = useRouter();
   const courseId = params.id as string;

   const { data, isLoading } = useGetMyCoursesQuery();
   const user = useSelector(selectCurrentUser);

   const course = data?.data?.find((c: any) => c.id === courseId);
   const certificateRef = useRef<HTMLDivElement>(null);

   if (isLoading) {
      return (
         <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="mt-4 text-sm font-black uppercase tracking-widest text-muted-foreground animate-pulse">Verifying Credentials...</p>
         </div>
      );
   }

   // Double check if course is actually completed
   if (!course || course.progressPercentage < 100) {
      return (
         <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
            <h2 className="text-3xl font-black italic">Certificate Unavailable</h2>
            <p className="text-muted-foreground max-w-md">You either haven't enrolled in this course or haven't completed it yet. Complete 100% of the lessons to earn your certificate.</p>
            <button onClick={() => router.push("/dashboard/student/my-courses")} className="h-10 px-6 bg-primary text-white font-bold rounded-lg text-sm">Back to My Courses</button>
         </div>
      );
   }

   const currentDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

   const handlePrint = () => {
      window.print();
   };

   return (
      <div className="min-h-screen pb-20">

         {/* Actions Bar (Hidden on Print) */}
         <div className="print:hidden flex items-center justify-between mb-8 pb-4 border-b border-border/50">
            <button onClick={() => router.push("/dashboard/student/my-courses")} className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
               <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
               onClick={handlePrint}
               className="flex items-center gap-2 h-10 px-6 bg-primary text-white rounded-lg text-sm font-black uppercase tracking-widest shadow-md hover:scale-105 transition-transform"
            >
               <Download className="w-4 h-4" /> Download PDF
            </button>
         </div>

         {/* Certificate Container */}
         <div className="flex justify-center overflow-x-auto pb-10 print:pb-0 print:overflow-visible">
            <div
               ref={certificateRef}
               className="relative w-[1000px] h-[700px] bg-white text-zinc-900 shadow-2xl flex-shrink-0 print:shadow-none print:w-[297mm] print:h-[210mm]"
               style={{ pageBreakAfter: "always" }}
            >
               {/* Decorative Borders */}
               <div className="absolute inset-x-8 inset-y-8 border-4 border-double border-amber-600/30"></div>
               <div className="absolute inset-x-10 inset-y-10 border border-amber-600/20"></div>

               {/* Corner Ribbons */}
               <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-br-full"></div>
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-600/5 rounded-tl-full"></div>

               {/* Inner Content */}
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-20 z-10">

                  <div className="mb-8 flex items-center justify-center gap-3">
                     <div className="w-12 h-12 bg-primary rounded flex items-center justify-center transform rotate-12">
                        <Award className="w-6 h-6 text-white" />
                     </div>
                     <h1 className="text-2xl font-black uppercase tracking-[0.3em] text-primary">CourseMaster</h1>
                  </div>

                  <p className="text-sm font-bold uppercase tracking-[0.4em] text-zinc-500 mb-6">Certificate of Completion</p>
                  <h2 className="text-6xl font-serif text-amber-600 mb-10" style={{ fontFamily: "Georgia, serif" }}>
                     Certificate of Excellence
                  </h2>

                  <p className="text-lg text-zinc-600 mb-6 font-medium">This is proudly presented to</p>

                  <div className="relative mb-10 w-full max-w-2xl">
                     <h3 className="text-5xl font-black italic text-zinc-800 pb-4 border-b-2 border-zinc-200">
                        {user?.name || "Student Name"}
                     </h3>
                  </div>

                  <p className="text-lg text-zinc-600 mb-4 max-w-3xl">
                     in recognition of successfully completing all the requirements and mastering the curriculum for the online course:
                  </p>

                  <h4 className="text-3xl font-black text-primary mb-16 px-8 leading-tight">
                     {course.title}
                  </h4>

                  {/* Signatures & Dates */}
                  <div className="w-full max-w-3xl flex justify-between items-end mt-auto px-12">
                     <div className="flex flex-col items-center">
                        <div className="w-48 border-b-2 border-zinc-400 pb-2 mb-2 text-center">
                           <span className="font-serif italic text-2xl text-zinc-800">{course.instructor || "Platform Instructor"}</span>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Instructor</span>
                     </div>

                     <div className="w-32 h-32 bg-amber-500/10 rounded-full border border-amber-500/30 flex items-center justify-center mb-4">
                        {/* Seal Decoration */}
                        <div className="w-28 h-28 bg-amber-500/20 rounded-full border border-dashed border-amber-600/50 flex flex-col items-center justify-center">
                           <Award className="w-8 h-8 text-amber-600 mb-1" />
                           <span className="text-[8px] font-black uppercase text-amber-700 tracking-widest">Verified</span>
                        </div>
                     </div>

                     <div className="flex flex-col items-center">
                        <div className="w-48 border-b-2 border-zinc-400 pb-2 mb-2 text-center text-zinc-800 font-bold">
                           {currentDate}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Date Completed</span>
                     </div>
                  </div>

               </div>
            </div>
         </div>

         {/* Print Styles */}
         <style dangerouslySetInnerHTML={{
            __html: `
         @media print {
            body * {
               visibility: hidden;
            }
            main, main *, .container, .container * {
               visibility: visible !important;
            }
            .sidebar-container {
               display: none !important;
            }
            .certificate-container {
               position: absolute;
               left: 0;
               top: 0;
            }
            /* Make sure to print backgrounds */
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            @page {
               size: A4 landscape;
               margin: 0;
            }
         }
       `}} />
      </div>
   );
}
