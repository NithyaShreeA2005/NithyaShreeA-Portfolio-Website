"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useMemo, useEffect } from "react"
import { Github, Clock, ExternalLink } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  link?: string
  isComingSoon?: boolean
  x: number
  y: number
  size: number
  color: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "Coming Soon",
    description: "Exciting project in development. Stay tuned for updates.",
    isComingSoon: true,
    x: 25,
    y: 30,
    size: 16,
    color: "#7c3aed",
  },
  {
    id: "2",
    title: "Coming Soon",
    description: "Another innovative project brewing. Check back soon.",
    isComingSoon: true,
    x: 70,
    y: 25,
    size: 14,
    color: "#3b82f6",
  },
  {
    id: "3",
    title: "Open Source Contributions",
    description: "Active contributions on GitHub. Exploring open source projects and building tools for the community.",
    link: "https://github.com/NithyaShreeA2005",
    x: 50,
    y: 60,
    size: 22,
    color: "#a855f7",
  },
]

// Connection lines between constellation nodes
const connections: [number, number][] = [
  [0, 2],
  [1, 2],
  [0, 1],
]

export function ProjectsConstellation() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate stable random values for background stars only on the client
  const bgStars = useMemo(() => {
    if (!mounted) return []
    return Array.from({ length: 20 }).map((_, i) => ({
      left: `${((i * 37 + 13) % 100)}%`,
      top: `${((i * 53 + 7) % 100)}%`,
      width: `${(i % 3) + 1}px`,
      height: `${(i % 3) + 1}px`,
      duration: 2 + (i % 3),
      delay: (i * 0.2) % 2,
    }))
  }, [mounted])

  return (
    <section id="projects" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-glow">
            Projects Constellation
          </h2>
          <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base md:text-lg">
            Hover over the stars to explore
          </p>
        </motion.div>

        {/* Constellation display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-full aspect-[16/9] max-h-[300px] sm:max-h-[400px] md:max-h-[500px]"
        >
          {/* SVG connection lines */}
          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
            {connections.map(([from, to], i) => (
              <motion.line
                key={`${from}-${to}`}
                x1={`${projects[from].x}%`}
                y1={`${projects[from].y}%`}
                x2={`${projects[to].x}%`}
                y2={`${projects[to].y}%`}
                stroke="rgba(124, 58, 237, 0.2)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: i * 0.3 + 0.5 }}
              />
            ))}

            {/* Animated glow lines */}
            {connections.map(([from, to]) => {
              const isHovered = hoveredProject === projects[from].id || hoveredProject === projects[to].id
              return (
                <motion.line
                  key={`glow-${from}-${to}`}
                  x1={`${projects[from].x}%`}
                  y1={`${projects[from].y}%`}
                  x2={`${projects[to].x}%`}
                  y2={`${projects[to].y}%`}
                  stroke={isHovered ? "rgba(124, 58, 237, 0.6)" : "rgba(124, 58, 237, 0.1)"}
                  strokeWidth={isHovered ? "2" : "1"}
                  style={{ transition: "all 0.5s ease" }}
                />
              )
            })}
          </svg>

          {/* Scattered background stars */}
          {bgStars.map((star, i) => (
            <motion.div
              key={`bg-star-${i}`}
              className="absolute rounded-full"
              style={{
                left: star.left,
                top: star.top,
                width: star.width,
                height: star.height,
                backgroundColor: "rgba(200, 210, 255, 0.3)",
              }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
              }}
            />
          ))}

          {/* Project nodes */}
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${project.x}%`, top: `${project.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.3 + 0.8, type: "spring" }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute rounded-full -inset-4"
                style={{
                  background: `radial-gradient(circle, ${project.color}20 0%, transparent 70%)`,
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              />

              {/* Star node */}
              <motion.div
                className="relative cursor-pointer rounded-full flex items-center justify-center"
                style={{
                  width: `${project.size * 3}px`,
                  height: `${project.size * 3}px`,
                  background: `radial-gradient(circle, ${project.color}60 0%, ${project.color}20 70%)`,
                  border: `2px solid ${project.color}60`,
                  boxShadow: hoveredProject === project.id
                    ? `0 0 30px ${project.color}80, 0 0 60px ${project.color}40`
                    : `0 0 10px ${project.color}30`,
                  transition: "box-shadow 0.5s ease",
                }}
                whileHover={{ scale: 1.3 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                {project.isComingSoon ? (
                  <Clock className="w-5 h-5 text-foreground/80" />
                ) : (
                  <Github className="w-6 h-6 text-foreground/90" />
                )}
              </motion.div>

              {/* Tooltip card */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={
                  hoveredProject === project.id
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 10, scale: 0.9 }
                }
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-4 z-50 pointer-events-none"
              >
                <div className="glass-strong rounded-xl p-4 w-60 glow-purple">
                  <h4 className="font-serif font-semibold text-foreground text-sm mb-1">
                    {project.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  {project.link && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-primary">
                      <ExternalLink className="w-3 h-3" />
                      Visit on GitHub
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Label */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 whitespace-nowrap">
                <span className="text-xs text-muted-foreground font-medium">
                  {project.title}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Clickable overlay for GitHub node */}
          {projects.map((project) =>
            project.link ? (
              <a
                key={`link-${project.id}`}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                style={{
                  left: `${project.x}%`,
                  top: `${project.y}%`,
                  width: `${project.size * 4}px`,
                  height: `${project.size * 4}px`,
                }}
                aria-label={`View ${project.title} on GitHub`}
              />
            ) : null
          )}
        </motion.div>
      </div>
    </section>
  )
}
