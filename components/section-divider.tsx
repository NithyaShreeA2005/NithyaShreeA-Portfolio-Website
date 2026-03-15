"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function SectionDivider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="flex items-center justify-center py-3 sm:py-4">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mx-2 sm:mx-4 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary/60"
        style={{ boxShadow: "0 0 10px rgba(124, 58, 237, 0.5)" }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
    </div>
  )
}
