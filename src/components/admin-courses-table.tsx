"use client"

import { useMemo } from "react"
import { Eye, Edit, Trash2 } from "lucide-react"
import { useGetAllCoursesQuery } from "@/redux/features/course/courseAPi";
import { TableSkeleton } from "./dashboard/skeletons";

export function AdminCoursesTable() {
  const { data, isLoading } = useGetAllCoursesQuery({ limit: 5 });
  const fetchedCourses = useMemo(() => data?.data?.courses || [], [data]);

  const courses = useMemo(() => fetchedCourses.map((c: any) => ({
    id: c.id,
    title: c.title,
    instructor: c.instructor?.name || "Unknown",
    students: c._count?.enrolledUsers || 0,
    revenue: `$${(c.price * (c._count?.enrolledUsers || 0)).toLocaleString()}`,
    status: c.isPublished ? "published" : "draft",
  })), [fetchedCourses]);

  if (isLoading) {
    return <TableSkeleton rows={5} />;
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Course</th>
              <th className="px-4 py-3 text-left font-semibold">Instructor</th>
              <th className="px-4 py-3 text-center font-semibold">Students</th>
              <th className="px-4 py-3 text-right font-semibold">Revenue</th>
              <th className="px-4 py-3 text-center font-semibold">Status</th>
              <th className="px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? courses.map((course, idx) => (
              <tr
                key={course.id}
                className={`border-b border-border last:border-0 ${idx % 2 === 0 ? "bg-transparent" : "bg-muted/30"}`}
              >
                <td className="px-4 py-3 font-medium">{course.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{course.instructor}</td>
                <td className="px-4 py-3 text-center">{course.students}</td>
                <td className="px-4 py-3 text-right font-semibold">{course.revenue}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${course.status === "published" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"}`}>
                    {course.status === "published" ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-1.5 hover:bg-primary/10 hover:text-primary rounded-lg transition" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-primary/10 hover:text-primary rounded-lg transition" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-lg transition" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

