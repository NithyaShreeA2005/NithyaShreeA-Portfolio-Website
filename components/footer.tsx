"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="relative py-8 sm:py-10 md:py-12 px-4 sm:px-6 border-t border-border">
      {/* Small floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`footer-star-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-3 sm:gap-4">
        <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground" aria-label="Footer navigation">
          <a href="#hero" className="transition-colors hover:text-primary">Home</a>
          <a href="#skills" className="transition-colors hover:text-primary">Skills</a>
          <a href="#projects" className="transition-colors hover:text-primary">Projects</a>
          <a href="#journey" className="transition-colors hover:text-primary">Journey</a>
          <a href="#contact" className="transition-colors hover:text-primary">Contact</a>
        </nav>
        <p className="text-xs sm:text-sm text-muted-foreground/60">
          {'\u00A9 2026 Nithya Shree A'}
        </p>
      </div>
    </footer>
  )
}
