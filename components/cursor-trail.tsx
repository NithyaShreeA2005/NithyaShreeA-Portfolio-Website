"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  size: number
  life: number
  maxLife: number
  vx: number
  vy: number
  hue: number
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)

  const addParticles = useCallback((x: number, y: number) => {
    const count = 2
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x,
        y,
        size: Math.random() * 3 + 1,
        life: 0,
        maxLife: Math.random() * 30 + 20,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        hue: Math.random() > 0.5 ? 265 : 220, // Purple or blue
      })
    }
    // Limit particle count
    if (particlesRef.current.length > 100) {
      particlesRef.current = particlesRef.current.slice(-100)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    let lastX = 0
    let lastY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist > 5) {
        mouseRef.current = { x: e.clientX, y: e.clientY }
        addParticles(e.clientX, e.clientY)
        lastX = e.clientX
        lastY = e.clientY
      }
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98

        const progress = p.life / p.maxLife
        const opacity = 1 - progress
        const currentSize = p.size * (1 - progress * 0.5)

        ctx.beginPath()
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${opacity * 0.6})`
        ctx.fill()

        // Glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 3)
        gradient.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${opacity * 0.3})`)
        gradient.addColorStop(1, `hsla(${p.hue}, 80%, 70%, 0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentSize * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [addParticles])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    />
  )
}
