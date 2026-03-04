"use client"

import { useEffect, useRef, useCallback } from "react"

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  connected: boolean
}

interface ShootingStarHero {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  angle: number
  life: number
  maxLife: number
  triggered: boolean
}

export function HeroConstellation({ isReady }: { isReady: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const nodesRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const shootingStarsRef = useRef<ShootingStarHero[]>([])
  const formationProgressRef = useRef(0)
  const isReadyRef = useRef(isReady)

  useEffect(() => {
    isReadyRef.current = isReady
  }, [isReady])

  const initNodes = useCallback((width: number, height: number) => {
    const nodes: Star[] = []
    // Create a dense cluster of nodes concentrated around center
    const count = Math.min(Math.floor((width * height) / 15000), 80)
    for (let i = 0; i < count; i++) {
      // Bias towards center with some spread
      const centerBias = Math.random() < 0.6
      const x = centerBias
        ? width * 0.5 + (Math.random() - 0.5) * width * 0.5
        : Math.random() * width
      const y = centerBias
        ? height * 0.5 + (Math.random() - 0.5) * height * 0.4
        : Math.random() * height

      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2.5 + 0.8,
        opacity: Math.random() * 0.6 + 0.3,
        connected: false,
      })
    }
    return nodes
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      nodesRef.current = initNodes(canvas.width, canvas.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    resize()
    window.addEventListener("resize", resize)
    canvas.addEventListener("mousemove", handleMouseMove)

    let time = 0

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time++

      const nodes = nodesRef.current
      const mouse = mouseRef.current

      // Gradually form the constellation
      if (isReadyRef.current && formationProgressRef.current < 1) {
        formationProgressRef.current = Math.min(formationProgressRef.current + 0.008, 1)
      }

      const progress = formationProgressRef.current
      const connectionDistance = 150 + progress * 50

      // Update node positions
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))

        // Mouse repulsion for interactivity
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200 && dist > 0) {
          node.vx += (dx / dist) * 0.015
          node.vy += (dy / dist) * 0.015
        }

        node.vx *= 0.995
        node.vy *= 0.995
      }

      // Draw connections between nearby nodes (constellation lines)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.18 * progress
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw mouse connection lines (electric blue)
      for (const node of nodes) {
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          const opacity = (1 - dist / 200) * 0.35
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(node.x, node.y)
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const twinkle = Math.sin(time * 0.02 + node.x * 0.01) * 0.3 + 0.7
        const nodeOpacity = node.opacity * twinkle * progress

        // Glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 5
        )
        gradient.addColorStop(0, `rgba(124, 58, 237, ${nodeOpacity * 0.5})`)
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${nodeOpacity * 0.15})`)
        gradient.addColorStop(1, "rgba(124, 58, 237, 0)")
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 5, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 210, 255, ${nodeOpacity})`
        ctx.fill()
      }

      // Spawn dramatic shooting stars
      if (isReadyRef.current && time % 120 === 0) {
        const side = Math.random()
        shootingStarsRef.current.push({
          x: side < 0.5 ? Math.random() * canvas.width * 0.3 : canvas.width * 0.7 + Math.random() * canvas.width * 0.3,
          y: Math.random() * canvas.height * 0.3,
          length: Math.random() * 120 + 80,
          speed: Math.random() * 8 + 6,
          opacity: 1,
          angle: side < 0.5 ? Math.PI / 5 + Math.random() * 0.3 : Math.PI / 2.5 + Math.random() * 0.3,
          life: 0,
          maxLife: Math.random() * 40 + 25,
          triggered: false,
        })
      }

      // Draw shooting stars
      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const ss = shootingStarsRef.current[i]
        ss.life++
        ss.x += Math.cos(ss.angle) * ss.speed
        ss.y += Math.sin(ss.angle) * ss.speed

        const lifeProgress = ss.life / ss.maxLife
        ss.opacity = lifeProgress < 0.2 ? lifeProgress / 0.2 : 1 - (lifeProgress - 0.2) / 0.8

        const tailX = ss.x - Math.cos(ss.angle) * ss.length
        const tailY = ss.y - Math.sin(ss.angle) * ss.length

        // Trail gradient
        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y)
        gradient.addColorStop(0, `rgba(200, 210, 255, 0)`)
        gradient.addColorStop(0.5, `rgba(124, 58, 237, ${ss.opacity * 0.3})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity * 0.9})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(ss.x, ss.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()

        // Bright head glow
        const headGradient = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 8)
        headGradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`)
        headGradient.addColorStop(0.5, `rgba(124, 58, 237, ${ss.opacity * 0.5})`)
        headGradient.addColorStop(1, `rgba(59, 130, 246, 0)`)
        ctx.beginPath()
        ctx.arc(ss.x, ss.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = headGradient
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
      canvas.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [initNodes])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  )
}
