"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Search,
  BookOpen,
  Lightbulb,
  Wrench,
  Rocket,
} from "lucide-react"

const stages = [
  {
    icon: Search,
    title: "Problem",
    description: "Identify meaningful real-world challenges.",
    color: "#7c3aed",
  },
  {
    icon: BookOpen,
    title: "Research",
    description: "Understand technology, constraints, and user needs.",
    color: "#3b82f6",
  },
  {
    icon: Lightbulb,
    title: "Design Thinking",
    description: "Break problems into structured solutions.",
    color: "#06b6d4",
  },
  {
    icon: Wrench,
    title: "Implementation",
    description: "Build scalable and functional systems.",
    color: "#a855f7",
  },
  {
    icon: Rocket,
    title: "Impact",
    description: "Deliver solutions that solve real problems.",
    color: "#ec4899",
  },
]

export function CaseStudy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="approach" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-glow">
            Problem Solving Approach
          </h2>
          <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base md:text-lg">
            A structured methodology for creating impact
          </p>
        </motion.div>

        {/* Neural network diagram */}
        <div className="relative">
          {/* Connection lines (visible on md+) */}
          <svg
            className="absolute inset-0 w-full h-full hidden md:block pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden="true"
          >
            {stages.slice(0, -1).map((stage, i) => {
              const x1 = ((i + 0.5) / stages.length) * 100 + "%"
              const x2 = ((i + 1.5) / stages.length) * 100 + "%"
              return (
                <motion.line
                  key={stage.title}
                  x1={x1}
                  y1="50%"
                  x2={x2}
                  y2="50%"
                  stroke={stage.color}
                  strokeWidth="2"
                  strokeOpacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.3 + 0.5 }}
                />
              )
            })}
          </svg>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 md:gap-4">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Node */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-all duration-500"
                  style={{
                    background: `radial-gradient(circle, ${stage.color}30 0%, ${stage.color}10 70%)`,
                    border: `2px solid ${stage.color}50`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px ${stage.color}50, 0 0 60px ${stage.color}20`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  <stage.icon className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8" style={{ color: stage.color }} />
                  
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1px solid ${stage.color}30` }}
                    animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                  />
                </motion.div>

                <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
                  {stage.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-[180px] sm:max-w-[200px]">
                  {stage.description}
                </p>

                {/* Mobile connection line */}
                {index < stages.length - 1 && (
                  <div
                    className="md:hidden w-0.5 h-8 mt-4"
                    style={{ background: `linear-gradient(to bottom, ${stage.color}50, ${stages[index + 1].color}50)` }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
