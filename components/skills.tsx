"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  Palette,
  Code,
  Server,
  Coffee,
  Terminal,
  Brain,
  Cpu,
  Shield,
} from "lucide-react"

const skills = [
  { name: "UI/UX", icon: Palette, color: "#a855f7" },
  { name: "Frontend Development", icon: Code, color: "#3b82f6" },
  { name: "Backend Development", icon: Server, color: "#06b6d4" },
  { name: "Java", icon: Coffee, color: "#f97316" },
  { name: "Python", icon: Terminal, color: "#22c55e" },
  { name: "Artificial Intelligence", icon: Brain, color: "#7c3aed" },
  { name: "Machine Learning", icon: Cpu, color: "#ec4899" },
  { name: "Cybersecurity", icon: Shield, color: "#3b82f6" },
]

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-glow">
            Skills & Expertise
          </h2>
          <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base md:text-lg">
            Technologies and domains I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div
                className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-4 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 cursor-default"
                style={{
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 30px ${skill.color}40, 0 0 60px ${skill.color}20`
                  e.currentTarget.style.borderColor = `${skill.color}50`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)"
                  e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.15)"
                }}
              >
                <div
                  className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-500"
                  style={{ backgroundColor: `${skill.color}15` }}
                >
                  <skill.icon
                    className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 transition-all duration-500 group-hover:scale-110"
                    style={{ color: skill.color }}
                  />
                </div>
                <span className="text-xs sm:text-sm md:text-base font-medium text-foreground text-center">
                  {skill.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
