"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Mail, Github, Linkedin, Download, ExternalLink } from "lucide-react"

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "nithyashreenitu10092005@gmail.com",
    href: "mailto:nithyashreenitu10092005@gmail.com",
    color: "#3b82f6",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "NithyaShreeA2005",
    href: "https://github.com/NithyaShreeA2005",
    color: "#a855f7",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "nithyashreea10092005",
    href: "https://www.linkedin.com/in/nithyashreea10092005",
    color: "#7c3aed",
  },
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="relative py-32 px-6">
      <div ref={ref} className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-glow">
            {"Let's Connect"}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {"Open to collaborations, opportunities, and conversations"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-strong rounded-3xl p-8 md:p-12 glow-purple"
        >
          {/* Name header */}
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Nithya Shree A
            </h3>
            <p className="text-primary mt-2 font-medium">
              {'ECE Engineer \u2022 Problem Solver'}
            </p>
          </div>

          {/* Contact links */}
          <div className="flex flex-col gap-4">
            {links.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
                className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(15, 15, 40, 0.4)",
                  border: "1px solid rgba(124, 58, 237, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${link.color}40`
                  e.currentTarget.style.boxShadow = `0 0 20px ${link.color}20`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.1)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ backgroundColor: `${link.color}15` }}
                >
                  <link.icon className="w-5 h-5" style={{ color: link.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                    {link.label}
                  </div>
                  <div className="text-foreground font-medium truncate">
                    {link.value}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </motion.a>
            ))}
          </div>

          {/* Resume download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 flex justify-center"
          >
            <a
              href="/NithyaShreeA_Resume.pdf"
              download
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium transition-all duration-300 hover:scale-105 glow-purple"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
