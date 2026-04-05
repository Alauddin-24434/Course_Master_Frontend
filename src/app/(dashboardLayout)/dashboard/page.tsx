"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AdminDashboard } from "@/components/admin-dashboard";
import { InstructorDashboard } from "@/components/instructor-dashboard";
import { StudentDashboard } from "@/components/student-dashboard";
import { Card } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useSelector((state: RootState) => state.cmAuth);
  const role = user?.role || "student";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8">
        <Card className="bg-red-50 border-red-200 p-6 flex items-center gap-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
          <div>
            <h2 className="text-lg font-bold text-red-900">Authentication Required</h2>
            <p className="text-red-700">Please log in to access your dashboard.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dynamic Dashboard based on Role */}
      {role === "admin" ? (
        <AdminDashboard />
      ) : role === "instructor" ? (
        <InstructorDashboard />
      ) : (
        <StudentDashboard />
      )}
    </div>
  );
}
