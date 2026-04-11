"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link"; // Link import korun
import { FeaturedCourses } from "@/components/FeaturedCourses";
import { HeroAnimated } from "@/components/hero";
import { TrustBar } from "@/components/TrustBar";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { ArrowUpRight, CheckCircle2, Globe, ShieldCheck } from "lucide-react";
import { InstructorCTA } from "@/components/InstructorCta";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="bg-background overflow-x-hidden">
      <HeroAnimated />
      <TrustBar />
      <FeaturedCourses />

   <InstructorCTA/>

      <ContactSection />
      <Testimonials />
    </main>
  );
}