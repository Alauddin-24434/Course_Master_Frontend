import { Metadata } from "next";
import CoursesContent from "@/components/CoursesContent";

export const metadata: Metadata = {
  title: "All Courses | CourseMaster - Explore Our Expert-Led Programs",
  description: "Browse our wide range of professional courses in React, Next.js, Web Development, and AI. Start your learning journey with CourseMaster today.",
  keywords: ["online courses", "web development courses", "react training", "nextjs masterclass", "it skills"],
  openGraph: {
    title: "All Courses | CourseMaster",
    description: "Explore our wide range of professional courses in React, Next.js, Web Development, and AI. Start your learning journey with CourseMaster today.",
    type: "website",
  }
};

export default function CoursesPage() {
  return <CoursesContent />;
}