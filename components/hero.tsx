"use client"

import { motion } from "framer-motion"
import { Github, Download } from "lucide-react"
import { HeroConstellation } from "./hero-constellation"
import { MagneticButton } from "./magnetic-button"

export function Hero({ isReady }: { isReady: boolean }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Constellation canvas behind everything */}
      <HeroConstellation isReady={isReady} />

      {/* Radial gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(5, 5, 16, 0.4) 50%, #050510 85%)",
          zIndex: 2,
        }}
        aria-hidden="true"
      />

      {/* Ambient glow behind name */}
      {isReady && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: "600px",
            height: "300px",
            background:
              "radial-gradient(ellipse, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
            zIndex: 2,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
      >
        {/* Status badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Available for opportunities
          </div>
        </motion.div>

        {/* Name with constellation glow */}
        <motion.div variants={itemVariants} className="relative">
          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight text-balance"
            style={{
              textShadow:
                "0 0 40px rgba(124, 58, 237, 0.4), 0 0 80px rgba(124, 58, 237, 0.15), 0 0 120px rgba(59, 130, 246, 0.08)",
            }}
          >
            Nithya Shree A
          </motion.h1>

          {/* Underline glow sweep */}
          <motion.div
            className="absolute -bottom-2 left-0 h-[2px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #7c3aed, #3b82f6, transparent)",
            }}
            initial={{ width: "0%", opacity: 0 }}
            animate={isReady ? { width: "100%", opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-lg md:text-xl font-medium tracking-wide"
          style={{ color: "#c4b5fd" }}
        >
          {"ECE Engineer \u2022 Open Source Contributor \u2022 Problem Solver"}
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed text-pretty"
        >
          Exploring ideas, connecting technologies, and building solutions that
          make an impact.
        </motion.p>

        {/* CTA Buttons with magnetic hover */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col sm:flex-row gap-5"
        >
          <MagneticButton
            href="https://github.com/NithyaShreeA2005"
            target="_blank"
            rel="noopener noreferrer"
            strength={0.25}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 overflow-hidden"
          >
            {/* Button bg */}
            <span
              className="absolute inset-0 rounded-xl transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                boxShadow:
                  "0 0 25px rgba(124, 58, 237, 0.4), 0 0 50px rgba(124, 58, 237, 0.15)",
              }}
            />
            {/* Hover shimmer */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed, #6366f1)" }} />
            <Github className="relative w-5 h-5 text-primary-foreground" />
            <span className="relative text-primary-foreground">View GitHub</span>
          </MagneticButton>

          <MagneticButton
            href="/NithyaShreeA_Resume.pdf"
            download
            strength={0.25}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 overflow-hidden"
          >
            {/* Glassmorphism bg */}
            <span
              className="absolute inset-0 rounded-xl glass transition-all duration-500"
              style={{
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.1)",
              }}
            />
            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.3)", boxShadow: "0 0 25px rgba(59, 130, 246, 0.2)" }} />
            <Download className="relative w-5 h-5 text-foreground" />
            <span className="relative text-foreground">Download Resume</span>
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : {}}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full flex justify-center pt-2"
            style={{ border: "2px solid rgba(124, 58, 237, 0.3)" }}
          >
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2], y: [0, 12, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
