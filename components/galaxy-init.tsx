"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const initLines = [
  "Initializing Neural Interface...",
  "Loading Stellar Network...",
  "Connecting Ideas...",
  "Launching Portfolio...",
]

export function GalaxyInit({ onComplete }: { onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (currentLine < initLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      // All lines shown, wait a moment then exit
      const exitTimer = setTimeout(() => {
        setIsExiting(true)
      }, 600)
      return () => clearTimeout(exitTimer)
    }
  }, [currentLine])

  useEffect(() => {
    if (isExiting) {
      const completeTimer = setTimeout(() => {
        onComplete()
      }, 800)
      return () => clearTimeout(completeTimer)
    }
  }, [isExiting, onComplete])

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="galaxy-init"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "#050510" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Subtle ambient particles */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: i % 3 === 0 ? 3 : 2,
                  height: i % 3 === 0 ? 3 : 2,
                  left: `${(i * 2.5) % 100}%`,
                  top: `${(i * 3.7 + 10) % 100}%`,
                  background: i % 2 === 0
                    ? "rgba(124, 58, 237, 0.6)"
                    : "rgba(59, 130, 246, 0.5)",
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + (i % 3),
                  repeat: Infinity,
                  delay: (i * 0.15) % 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Central content */}
          <div className="relative flex flex-col items-center gap-5">
            {/* Pulsing core orb */}
            <motion.div
              className="mb-6 rounded-full"
              style={{
                width: 12,
                height: 12,
                background: "radial-gradient(circle, #7c3aed 0%, #3b82f6 100%)",
                boxShadow: "0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)",
              }}
              animate={{
                scale: [1, 1.5, 1],
                boxShadow: [
                  "0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)",
                  "0 0 50px rgba(124, 58, 237, 0.8), 0 0 100px rgba(59, 130, 246, 0.5)",
                  "0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Init text lines */}
            {initLines.map((line, index) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={
                  index < currentLine
                    ? { opacity: 0.35, y: 0, filter: "blur(0px)" }
                    : index === currentLine
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 10, filter: "blur(4px)" }
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="font-mono text-sm md:text-base tracking-wider"
                style={{
                  color: index === currentLine ? "#c4b5fd" : "#64748b",
                  textShadow:
                    index === currentLine
                      ? "0 0 15px rgba(124, 58, 237, 0.5)"
                      : "none",
                }}
              >
                {line}
              </motion.div>
            ))}

            {/* Loading bar */}
            <div className="mt-4 w-48 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(124, 58, 237, 0.15)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #7c3aed, #3b82f6)",
                  boxShadow: "0 0 10px rgba(124, 58, 237, 0.5)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(((currentLine) / initLines.length) * 100, 100)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="galaxy-init-exit"
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{ background: "#050510" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  )
}
