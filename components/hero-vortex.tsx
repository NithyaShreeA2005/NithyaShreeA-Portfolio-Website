"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  radius: number
  opacity: number
  hue: number
  orbit: number
  orbitSpeed: number
  orbitAngle: number
  layer: number
}

export function HeroVortex({ isReady }: { isReady: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const isReadyRef = useRef(isReady)
  const warpRef = useRef(0)

  useEffect(() => {
    isReadyRef.current = isReady
  }, [isReady])

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = []
    const cx = w / 2
    const cy = h / 2
    // Reduce particle count on mobile for better performance
    const baseCount = w < 640 ? Math.floor((w * h) / 12000) : Math.floor((w * h) / 8000)
    const count = Math.min(baseCount, w < 640 ? 100 : 180)

    for (let i = 0; i < count; i++) {
      const layer = i < count * 0.25 ? 0 : i < count * 0.6 ? 1 : 2
      // Scale orbit radius based on viewport size
      const orbitScale = Math.min(w, h) * (w < 640 ? 0.35 : 0.48)
      const orbit = 60 + Math.random() * orbitScale
      const angle = Math.random() * Math.PI * 2

      particles.push({
        x: cx + Math.cos(angle) * orbit,
        y: cy + Math.sin(angle) * orbit,
        radius:
          layer === 0
            ? Math.random() * 2.8 + 1.2
            : layer === 1
              ? Math.random() * 1.8 + 0.6
              : Math.random() * 1 + 0.3,
        opacity: layer === 0 ? 0.9 : layer === 1 ? 0.5 : 0.25,
        hue: Math.random() < 0.55 ? 265 : 220,
        orbit,
        orbitSpeed:
          (0.0002 + Math.random() * 0.0006) *
          (layer === 0 ? 1 : layer === 1 ? 0.65 : 0.35),
        orbitAngle: angle,
        layer,
      })
    }
    return particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let dpr = window.devicePixelRatio || 1

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particlesRef.current = initParticles(rect.width, rect.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    resize()
    window.addEventListener("resize", resize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    let time = 0

    const animate = () => {
      if (!ctx || !canvas) return
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const cx = w / 2
      const cy = h / 2

      ctx.clearRect(0, 0, w, h)
      time++

      if (isReadyRef.current && warpRef.current < 1) {
        warpRef.current = Math.min(warpRef.current + 0.012, 1)
      }
      const warp = warpRef.current
      const mouse = mouseRef.current

      // Subtle orbital ring guides
      if (warp > 0.4) {
        const ringAlpha = (warp - 0.4) * 0.06
        for (let r = 0; r < 3; r++) {
          const ringR = 100 + r * 120
          ctx.beginPath()
          ctx.ellipse(cx, cy, ringR, ringR * 0.55, 0, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(124, 58, 237, ${ringAlpha * (1 - r * 0.3)})`
          ctx.lineWidth = 0.4
          ctx.setLineDash([3, 10])
          ctx.stroke()
          ctx.setLineDash([])
        }
      }

      const particles = particlesRef.current

      // Update & draw
      for (const p of particles) {
        p.orbitAngle += p.orbitSpeed
        const tx = cx + Math.cos(p.orbitAngle) * p.orbit
        const ty = cy + Math.sin(p.orbitAngle) * p.orbit * 0.55

        p.x += (tx - p.x) * 0.025
        p.y += (ty - p.y) * 0.025

        // Mouse gravity
        const mdx = mouse.x - p.x
        const mdy = mouse.y - p.y
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mDist < 220 && mDist > 0) {
          const force = (1 - mDist / 220) * 0.6
          p.x += (mdx / mDist) * force
          p.y += (mdy / mDist) * force
        }

        const drawX = warp < 1 ? cx + (p.x - cx) * warp : p.x
        const drawY = warp < 1 ? cy + (p.y - cy) * warp : p.y

        const twinkle = Math.sin(time * 0.025 + p.orbitAngle * 3) * 0.35 + 0.65
        const alpha = p.opacity * twinkle * Math.min(warp * 2, 1)

        // Glow halo
        const glowR = p.radius * (p.layer === 0 ? 7 : 4)
        const grd = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, glowR)
        const cr = p.hue === 265 ? 124 : 59
        const cg = p.hue === 265 ? 58 : 130
        const cb = p.hue === 265 ? 237 : 246
        grd.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha * 0.35})`)
        grd.addColorStop(0.5, `rgba(${cr},${cg},${cb},${alpha * 0.08})`)
        grd.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)
        ctx.beginPath()
        ctx.arc(drawX, drawY, glowR, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(210,215,255,${alpha})`
        ctx.fill()
      }

      // Constellation lines between nearby bright particles
      const bright = particles.filter((p) => p.layer === 0)
      for (let i = 0; i < bright.length; i++) {
        for (let j = i + 1; j < bright.length; j++) {
          const dx = bright[i].x - bright[j].x
          const dy = bright[i].y - bright[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            ctx.beginPath()
            ctx.moveTo(bright[i].x, bright[i].y)
            ctx.lineTo(bright[j].x, bright[j].y)
            ctx.strokeStyle = `rgba(124,58,237,${(1 - dist / 160) * 0.1 * warp})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Mouse → particle electric lines
      for (const p of bright) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(p.x, p.y)
          ctx.strokeStyle = `rgba(59,130,246,${(1 - dist / 180) * 0.2 * warp})`
          ctx.lineWidth = 0.4
          ctx.stroke()
        }
      }

      // Soft center nebula glow
      if (warp > 0) {
        const neb = ctx.createRadialGradient(cx, cy, 0, cx, cy, 250)
        neb.addColorStop(0, `rgba(124,58,237,${0.05 * warp})`)
        neb.addColorStop(0.4, `rgba(59,130,246,${0.02 * warp})`)
        neb.addColorStop(1, "rgba(0,0,0,0)")
        ctx.beginPath()
        ctx.arc(cx, cy, 250, 0, Math.PI * 2)
        ctx.fillStyle = neb
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationRef.current)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  )
}
