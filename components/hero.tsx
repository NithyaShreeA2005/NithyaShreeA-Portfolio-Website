"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Github, Download, ArrowDown, Sparkles } from "lucide-react"
import { HeroVortex } from "./hero-vortex"
import { MagneticButton } from "./magnetic-button"

/* ── letter-by-letter stagger ── */
function AnimatedText({
  text,
  className,
  delay = 0,
  isReady,
}: {
  text: string
  className?: string
  delay?: number
  isReady: boolean
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -90, filter: "blur(8px)" }}
          animate={
            isReady
              ? {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  filter: "blur(0px)",
                }
              : {}
          }
          transition={{
            duration: 0.6,
            delay: delay + i * 0.04,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

/* ── orbiting tech labels ── */
const orbitItems = [
  { label: "Python", angle: 0, radius: 420, color: "#3b82f6" },
  { label: "C++", angle: 60, radius: 400, color: "#7c3aed" },
  { label: "React", angle: 120, radius: 430, color: "#06b6d4" },
  { label: "Linux", angle: 180, radius: 410, color: "#8b5cf6" },
  { label: "Git", angle: 240, radius: 425, color: "#3b82f6" },
  { label: "AI/ML", angle: 300, radius: 405, color: "#a855f7" },
]

function OrbitingLabels({ isReady }: { isReady: boolean }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 3 }}
      aria-hidden="true"
    >
      {orbitItems.map((item, i) => {
        const rad = ((item.angle + 15) * Math.PI) / 180
        // Position on an ellipse
        const x = Math.cos(rad) * item.radius
        const y = Math.sin(rad) * item.radius * 0.55

        return (
          <motion.div
            key={item.label}
            className="absolute left-1/2 top-1/2 hidden lg:block"
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isReady
                ? { opacity: 1, scale: 1, x: x - 30, y: y - 12 }
                : {}
            }
            transition={{
              delay: 1.8 + i * 0.12,
              duration: 0.8,
              type: "spring",
              bounce: 0.3,
            }}
          >
            <motion.div
              className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wider"
              style={{
                background: "rgba(15, 15, 40, 0.6)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${item.color}33`,
                color: item.color,
                boxShadow: `0 0 20px ${item.color}15`,
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            >
              {item.label}
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ── parallax wrapper ── */
function ParallaxLayer({
  children,
  depth = 0.5,
}: {
  children: React.ReactNode
  depth?: number
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 })
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 })
  const x = useTransform(springX, (v) => v * depth)
  const y = useTransform(springY, (v) => v * depth)

  useEffect(() => {
    const handle = (e: globalThis.MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mouseX.set((e.clientX - cx) / cx * 20)
      mouseY.set((e.clientY - cy) / cy * 20)
    }
    window.addEventListener("mousemove", handle)
    return () => window.removeEventListener("mousemove", handle)
  }, [mouseX, mouseY])

  return <motion.div style={{ x, y }}>{children}</motion.div>
}

/* ── main hero ── */
export function Hero({ isReady }: { isReady: boolean }) {
  const [showContent, setShowContent] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isReady) {
      const t = setTimeout(() => setShowContent(true), 200)
      return () => clearTimeout(t)
    }
  }, [isReady])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* ── Layer 0: Particle vortex ── */}
      <HeroVortex isReady={isReady} />

      {/* ── Layer 1: Radial depth vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, transparent 0%, rgba(5,5,16,0.3) 50%, #050510 90%)",
          zIndex: 2,
        }}
        aria-hidden="true"
      />

      {/* ── Layer 2: Ambient center nebula ── */}
      {showContent && (
        <motion.div
          className="absolute pointer-events-none"
          style={{ zIndex: 2 }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          aria-hidden="true"
        >
          <div
            className="w-[700px] h-[400px]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)",
            }}
          />
        </motion.div>
      )}

      {/* ── Layer 3: Orbiting tech labels ── */}
      <OrbitingLabels isReady={showContent} />

      {/* ── Layer 4: Main content ── */}
      <div
        className="relative flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
        style={{ zIndex: 10 }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={showContent ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium"
            style={{
              background: "rgba(15, 15, 40, 0.5)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(124, 58, 237, 0.2)",
              color: "#c4b5fd",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#22c55e" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#22c55e" }} />
            </span>
            <Sparkles className="w-3.5 h-3.5" style={{ color: "#7c3aed" }} />
            Available for Opportunities
          </div>
        </motion.div>

        {/* ── The name ── */}
        <ParallaxLayer depth={-0.15}>
          <div className="relative">
            <h1
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold leading-[1.05] tracking-tight whitespace-nowrap"
              style={{
                color: "#f1f5f9",
                textShadow:
                  "0 0 60px rgba(124,58,237,0.35), 0 0 120px rgba(124,58,237,0.12), 0 4px 30px rgba(0,0,0,0.5)",
              }}
            >
              <AnimatedText
                text="Nithya Shree A"
                isReady={showContent}
                delay={0.5}
              />
            </h1>

            {/* Animated gradient underline */}
            <motion.div
              className="absolute -bottom-3 left-1/2 h-[3px] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #7c3aed, #3b82f6, #7c3aed, transparent)",
                translateX: "-50%",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={
                showContent ? { width: "80%", opacity: 1 } : {}
              }
              transition={{ duration: 1.2, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Subtle flare behind name */}
            <motion.div
              className="absolute -inset-20 -z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : {}}
              transition={{ duration: 2, delay: 0.8 }}
              aria-hidden="true"
            >
              <div
                className="w-full h-full"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)",
                }}
              />
            </motion.div>
          </div>
        </ParallaxLayer>

        {/* ── Subtitle ── */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={
            showContent
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : {}
          }
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-7 text-base sm:text-lg md:text-xl font-medium tracking-wide"
          style={{ color: "#c4b5fd" }}
        >
          {"ECE Engineer \u2022 Open Source Contributor \u2022 Problem Solver"}
        </motion.p>

        {/* ── Tagline ── */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={
            showContent
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : {}
          }
          transition={{ duration: 0.8, delay: 1.7 }}
          className="mt-4 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed text-pretty"
          style={{ color: "#94a3b8" }}
        >
          Exploring ideas, connecting technologies, and building solutions
          that make an impact.
        </motion.p>

        {/* ── CTA buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 2 }}
          className="mt-10 flex flex-col sm:flex-row gap-5"
        >
          {/* Primary: GitHub */}
          <MagneticButton
            href="https://github.com/NithyaShreeA2005"
            target="_blank"
            rel="noopener noreferrer"
            strength={0.3}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 overflow-hidden"
          >
            <span
              className="absolute inset-0 rounded-2xl transition-all duration-500"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                boxShadow:
                  "0 0 30px rgba(124,58,237,0.35), 0 8px 32px rgba(124,58,237,0.2)",
              }}
            />
            <span
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6366f1 100%)",
                boxShadow:
                  "0 0 40px rgba(124,58,237,0.5), 0 8px 40px rgba(124,58,237,0.3)",
              }}
            />
            {/* Shimmer sweep */}
            <span className="absolute inset-0 overflow-hidden rounded-2xl">
              <motion.span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.18) 50%, transparent 55%)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              />
            </span>
            <Github className="relative w-5 h-5" style={{ color: "#fff" }} />
            <span className="relative" style={{ color: "#fff" }}>
              View GitHub
            </span>
          </MagneticButton>

          {/* Secondary: Resume */}
          <MagneticButton
            href="/NithyaShreeA_Resume.pdf"
            download
            strength={0.3}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 overflow-hidden"
          >
            <span
              className="absolute inset-0 rounded-2xl transition-all duration-500"
              style={{
                background: "rgba(15, 15, 40, 0.5)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(124, 58, 237, 0.2)",
                boxShadow: "0 0 20px rgba(59,130,246,0.08)",
              }}
            />
            <span
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "rgba(59, 130, 246, 0.08)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                boxShadow: "0 0 30px rgba(59,130,246,0.15)",
              }}
            />
            <Download className="relative w-5 h-5" style={{ color: "#e2e8f0" }} />
            <span className="relative" style={{ color: "#e2e8f0" }}>
              Download Resume
            </span>
          </MagneticButton>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 3, duration: 1.2 }}
          className="mt-12"
        >
          <motion.a
            href="#skills"
            className="flex flex-col items-center gap-2 group"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span
              className="text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-primary"
              style={{ color: "#64748b" }}
            >
              Explore
            </span>
            <div
              className="w-8 h-12 rounded-full flex justify-center pt-2 transition-all duration-300 group-hover:border-primary/40"
              style={{ border: "1.5px solid rgba(124, 58, 237, 0.25)" }}
            >
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3], y: [0, 14, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-1 rounded-full"
                style={{ background: "#7c3aed" }}
              />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
