"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const initLines = [
  { text: "Initializing Neural Interface", icon: "01" },
  { text: "Loading Stellar Network", icon: "02" },
  { text: "Mapping Constellations", icon: "03" },
  { text: "Launching Portfolio", icon: "04" },
]

export function GalaxyInit({ onComplete }: { onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (currentLine < initLines.length) {
      const timer = setTimeout(
        () => setCurrentLine((prev) => prev + 1),
        420
      )
      return () => clearTimeout(timer)
    } else {
      const exitTimer = setTimeout(() => setIsExiting(true), 400)
      return () => clearTimeout(exitTimer)
    }
  }, [currentLine])

  useEffect(() => {
    if (isExiting) {
      const t = setTimeout(() => onComplete(), 900)
      return () => clearTimeout(t)
    }
  }, [isExiting, onComplete])

  const progress = Math.min(currentLine / initLines.length, 1)

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="init"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "#050510" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Ambient particles */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
                  height: i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
                  left: `${(i * 2.1 + 5) % 100}%`,
                  top: `${(i * 3.3 + 8) % 100}%`,
                  background:
                    i % 3 === 0
                      ? "rgba(124, 58, 237, 0.5)"
                      : i % 3 === 1
                        ? "rgba(59, 130, 246, 0.4)"
                        : "rgba(200, 210, 255, 0.3)",
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  scale: [0.3, 1, 0.3],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 2.5 + (i % 3),
                  repeat: Infinity,
                  delay: (i * 0.12) % 2.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Radiating rings */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            {[0, 1, 2].map((r) => (
              <motion.div
                key={r}
                className="absolute rounded-full"
                style={{
                  width: 60 + r * 80,
                  height: 60 + r * 80,
                  border: `1px solid rgba(124, 58, 237, ${0.15 - r * 0.04})`,
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: r * 0.4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Central content */}
          <div className="relative flex flex-col items-center gap-4">
            {/* Core orb */}
            <motion.div
              className="mb-8 relative"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, #c4b5fd 0%, #7c3aed 50%, #3b82f6 100%)",
                  boxShadow:
                    "0 0 40px rgba(124,58,237,0.6), 0 0 80px rgba(59,130,246,0.3), 0 0 120px rgba(124,58,237,0.15)",
                }}
              />
            </motion.div>

            {/* Init lines */}
            <div className="flex flex-col items-center gap-3">
              {initLines.map((line, index) => {
                const isActive = index === currentLine
                const isDone = index < currentLine
                return (
                  <motion.div
                    key={line.text}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={
                      isDone
                        ? { opacity: 0.3, y: 0, filter: "blur(0px)" }
                        : isActive
                          ? { opacity: 1, y: 0, filter: "blur(0px)" }
                          : { opacity: 0, y: 8, filter: "blur(4px)" }
                    }
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <span
                      className="font-mono text-[10px] tracking-widest"
                      style={{
                        color: isActive ? "#7c3aed" : "#475569",
                      }}
                    >
                      {line.icon}
                    </span>
                    <span
                      className="font-mono text-xs sm:text-sm tracking-wider"
                      style={{
                        color: isActive ? "#e2e8f0" : "#475569",
                        textShadow: isActive
                          ? "0 0 20px rgba(124,58,237,0.4)"
                          : "none",
                      }}
                    >
                      {line.text}
                    </span>
                    {isActive && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                        }}
                        className="font-mono text-xs"
                        style={{ color: "#7c3aed" }}
                      >
                        _
                      </motion.span>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Progress bar */}
            <div
              className="mt-6 w-52 h-[2px] rounded-full overflow-hidden"
              style={{ background: "rgba(124, 58, 237, 0.1)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #7c3aed, #3b82f6)",
                  boxShadow: "0 0 12px rgba(124,58,237,0.5)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            {/* Percentage */}
            <motion.span
              className="font-mono text-[10px] tracking-widest mt-1"
              style={{ color: "#64748b" }}
              key={currentLine}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {`${Math.round(progress * 100)}%`}
            </motion.span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="exit"
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{ background: "#050510" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      )}
    </AnimatePresence>
  )
}
