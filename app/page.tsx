"use client"

import { Starfield } from "@/components/starfield"
import { CursorTrail } from "@/components/cursor-trail"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Skills } from "@/components/skills"
import { CaseStudy } from "@/components/case-study"
import { ProjectsConstellation } from "@/components/projects-constellation"
import { Journey } from "@/components/journey"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { SectionDivider } from "@/components/section-divider"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Background effects */}
      <Starfield />
      <CursorTrail />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <Hero />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <CaseStudy />
      <SectionDivider />
      <ProjectsConstellation />
      <SectionDivider />
      <Journey />
      <SectionDivider />
      <Contact />
      <Footer />
    </main>
  )
}
