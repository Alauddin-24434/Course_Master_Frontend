import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Us | CourseMaster - Empowering Learners Worldwide",
  description: "Learn more about CourseMaster's mission to provide world-class education. Discover our values, our team, and how we're transforming online learning.",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
