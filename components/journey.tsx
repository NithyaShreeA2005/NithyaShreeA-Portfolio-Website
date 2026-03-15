"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const milestones = [
  {
    year: "2023",
    title: "The Beginning",
    description: "Started learning electronics and building foundational engineering knowledge.",
    color: "#7c3aed",
  },
  {
    year: "2024",
    title: "Exploration",
    description: "Developed curiosity across multiple technology domains and explored different areas.",
    color: "#3b82f6",
  },
  {
    year: "2025",
    title: "Focus & Impact",
    description: "Chose focused paths and began solving problems while contributing to projects.",
    color: "#a855f7",
  },
]

export function Journey() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="journey" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-glow">
            Journey Through Exploration
          </h2>
          <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base md:text-lg">
            Key milestones in my path
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <motion.div
            className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #7c3aed, #3b82f6, #a855f7)" }}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.3 + 0.5 }}
                className={`relative flex items-center mb-12 sm:mb-16 md:mb-20 last:mb-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Content card */}
                <div className={`flex-1 ${isLeft ? "md:pr-16" : "md:pl-16"} pl-16 sm:pl-20 md:pl-0`}>
                  <div
                    className={`glass rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-500 hover:glow-purple ${
                      isLeft ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <span
                      className="inline-block font-serif text-sm font-bold px-3 py-1 rounded-full mb-3"
                      style={{
                        color: milestone.color,
                        backgroundColor: `${milestone.color}15`,
                        border: `1px solid ${milestone.color}30`,
                      }}
                    >
                      {milestone.year}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Timeline node */}
                <div className="absolute left-6 sm:left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="relative w-5 h-5 rounded-full"
                    style={{
                      backgroundColor: milestone.color,
                      boxShadow: `0 0 20px ${milestone.color}60`,
                    }}
                    whileHover={{ scale: 1.5 }}
                  >
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: `2px solid ${milestone.color}40` }}
                      animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </motion.div>
                </div>

                {/* Spacer for opposite side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
