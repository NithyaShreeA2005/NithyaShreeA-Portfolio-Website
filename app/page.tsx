"use client"

import { useState, useCallback } from "react"
import { GalaxyInit } from "@/components/galaxy-init"
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
  const [initComplete, setInitComplete] = useState(false)

  const handleInitComplete = useCallback(() => {
    setInitComplete(true)
  }, [])

  return (
    <main className="relative min-h-screen bg-background">
      {/* Galaxy initialization sequence */}
      {!initComplete && <GalaxyInit onComplete={handleInitComplete} />}

      {/* Background effects */}
      <Starfield />
      <CursorTrail />

      {/* Navigation - show after init */}
      {initComplete && <Navbar />}

      {/* Sections */}
      <Hero isReady={initComplete} />
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
