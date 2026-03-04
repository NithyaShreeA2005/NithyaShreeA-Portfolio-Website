"use client"

import { useEffect, useRef, useCallback } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  twinkleSpeed: number
  twinkleOffset: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  angle: number
  life: number
  maxLife: number
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const animationRef = useRef<number>(0)

  const createStars = useCallback((width: number, height: number) => {
    const stars: Star[] = []
    const count = Math.floor((width * height) / 6000)
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      })
    }
    return stars
  }, [])

  const createShootingStar = useCallback((width: number, height: number): ShootingStar => {
    return {
      x: Math.random() * width * 0.8,
      y: Math.random() * height * 0.4,
      length: Math.random() * 80 + 40,
      speed: Math.random() * 6 + 4,
      opacity: 1,
      angle: (Math.PI / 4) + (Math.random() * 0.3 - 0.15),
      life: 0,
      maxLife: Math.random() * 60 + 30,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
      starsRef.current = createStars(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener("resize", resize)

    let time = 0
    let lastShootingStar = 0

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time++

      // Draw stars
      for (const star of starsRef.current) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset)
        const currentOpacity = star.opacity * (0.5 + twinkle * 0.5)
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 210, 255, ${currentOpacity})`
        ctx.fill()

        // Add subtle glow to larger stars
        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 3
          )
          gradient.addColorStop(0, `rgba(124, 58, 237, ${currentOpacity * 0.3})`)
          gradient.addColorStop(1, "rgba(124, 58, 237, 0)")
          ctx.fillStyle = gradient
          ctx.fill()
        }
      }

      // Spawn shooting stars
      if (time - lastShootingStar > 180 + Math.random() * 240) {
        shootingStarsRef.current.push(createShootingStar(canvas.width, canvas.height))
        lastShootingStar = time
      }

      // Draw shooting stars
      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const ss = shootingStarsRef.current[i]
        ss.life++
        ss.x += Math.cos(ss.angle) * ss.speed
        ss.y += Math.sin(ss.angle) * ss.speed

        const progress = ss.life / ss.maxLife
        ss.opacity = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7

        const tailX = ss.x - Math.cos(ss.angle) * ss.length
        const tailY = ss.y - Math.sin(ss.angle) * ss.length

        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y)
        gradient.addColorStop(0, `rgba(200, 210, 255, 0)`)
        gradient.addColorStop(1, `rgba(200, 210, 255, ${ss.opacity})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(ss.x, ss.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()

        // Bright head
        ctx.beginPath()
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity})`
        ctx.fill()

        if (ss.life >= ss.maxLife) {
          shootingStarsRef.current.splice(i, 1)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [createStars, createShootingStar])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
