"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  type: "star" | "sparkle" | "petal"
}

interface Lantern {
  x: number
  y: number
  speed: number
  swing: number
  swingSpeed: number
}

export function GreetingCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [lanterns, setLanterns] = useState<Lantern[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isOpen, setIsOpen] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const animationFrameRef = useRef<number>()

  // Initialize particles and lanterns
  useEffect(() => {
    const newParticles: Particle[] = []
    const colors = ["#fbbf24", "#f59e0b", "#fb923c", "#ef4444", "#fef3c7"]

    // Create stars
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        color: "#fef3c7",
        type: "star",
      })
    }

    // Create floating petals
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: Math.random() * 0.5 + 0.2,
        size: Math.random() * 8 + 4,
        opacity: Math.random() * 0.4 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: "petal",
      })
    }

    setParticles(newParticles)

    // Create lanterns
    const newLanterns: Lantern[] = []
    for (let i = 0; i < 8; i++) {
      newLanterns.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight - window.innerHeight,
        speed: Math.random() * 0.3 + 0.2,
        swing: Math.random() * 30 + 10,
        swingSpeed: Math.random() * 0.02 + 0.01,
      })
    }
    setLanterns(newLanterns)
  }, [])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Draw and update particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw based on type
        ctx.save()
        ctx.globalAlpha = particle.opacity

        if (particle.type === "star") {
          // Twinkling stars
          const twinkle = Math.sin(time * 3 + index) * 0.3 + 0.7
          ctx.globalAlpha = particle.opacity * twinkle
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (particle.type === "petal") {
          // Rotating petals
          ctx.translate(particle.x, particle.y)
          ctx.rotate(time + index)
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.ellipse(0, 0, particle.size, particle.size * 0.6, 0, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      })

      // Draw and update lanterns
      lanterns.forEach((lantern, index) => {
        lantern.y += lantern.speed
        if (lantern.y > canvas.height + 100) {
          lantern.y = -100
          lantern.x = Math.random() * canvas.width
        }

        const swingOffset = Math.sin(time * lantern.swingSpeed + index) * lantern.swing

        // Draw lantern
        ctx.save()
        ctx.translate(lantern.x + swingOffset, lantern.y)

        // Lantern body
        const gradient = ctx.createLinearGradient(0, -30, 0, 30)
        gradient.addColorStop(0, "#ef4444")
        gradient.addColorStop(0.5, "#dc2626")
        gradient.addColorStop(1, "#b91c1c")

        ctx.fillStyle = gradient
        ctx.fillRect(-15, -30, 30, 60)

        // Lantern top
        ctx.fillStyle = "#fbbf24"
        ctx.fillRect(-18, -35, 36, 8)

        // Lantern bottom
        ctx.fillStyle = "#fbbf24"
        ctx.fillRect(-18, 30, 36, 8)

        // Lantern glow
        ctx.globalAlpha = 0.3
        ctx.fillStyle = "#fbbf24"
        ctx.beginPath()
        ctx.arc(0, 0, 25, 0, Math.PI * 2)
        ctx.fill()

        // Tassel
        ctx.globalAlpha = 1
        ctx.strokeStyle = "#fbbf24"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, 38)
        ctx.lineTo(0, 50)
        ctx.stroke()

        ctx.restore()
      })

      // Draw moon with glow
      const moonX = canvas.width * 0.75
      const moonY = canvas.height * 0.25
      const moonRadius = 80

      // Moon glow
      const moonGlow = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.5, moonX, moonY, moonRadius * 2)
      moonGlow.addColorStop(0, "rgba(251, 191, 36, 0.3)")
      moonGlow.addColorStop(0.5, "rgba(251, 191, 36, 0.1)")
      moonGlow.addColorStop(1, "rgba(251, 191, 36, 0)")
      ctx.fillStyle = moonGlow
      ctx.beginPath()
      ctx.arc(moonX, moonY, moonRadius * 2, 0, Math.PI * 2)
      ctx.fill()

      // Moon body
      const moonGradient = ctx.createRadialGradient(moonX - 20, moonY - 20, 10, moonX, moonY, moonRadius)
      moonGradient.addColorStop(0, "#fef3c7")
      moonGradient.addColorStop(0.5, "#fde68a")
      moonGradient.addColorStop(1, "#fbbf24")
      ctx.fillStyle = moonGradient
      ctx.beginPath()
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2)
      ctx.fill()

      // Moon craters
      ctx.fillStyle = "rgba(251, 191, 36, 0.2)"
      ctx.beginPath()
      ctx.arc(moonX - 20, moonY - 10, 15, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(moonX + 15, moonY + 20, 20, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(moonX + 10, moonY - 25, 10, 0, Math.PI * 2)
      ctx.fill()

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [particles, lanterns])

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      // Create sparkles on mouse move
      if (Math.random() > 0.7) {
        setParticles((prev) => [
          ...prev,
          {
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            opacity: 1,
            color: "#fbbf24",
            type: "sparkle",
          },
        ])
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Clean up old sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .filter((p) => p.type !== "sparkle" || p.opacity > 0.1)
          .map((p) => {
            if (p.type === "sparkle") {
              return { ...p, opacity: p.opacity * 0.95 }
            }
            return p
          }),
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const handleOpenCard = () => {
    setIsOpen(true)
    setTimeout(() => setShowMessage(true), 600)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-950 via-red-950 to-amber-950">
      {/* Canvas for animations */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {!isOpen ? (
            // Closed card
            <div
              className="cursor-pointer transform transition-all duration-500 hover:scale-105"
              onClick={handleOpenCard}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 border-4 border-amber-400 shadow-2xl">
                <div className="absolute inset-0 bg-[url('/chinese-pattern.jpg')] opacity-10" />
                <div className="relative p-12 md:p-20 text-center space-y-8">
                  <div className="text-8xl md:text-9xl animate-bounce">🌕</div>
                  <h1 className="font-serif text-5xl md:text-7xl font-bold text-amber-100 text-balance">中秋快樂</h1>
                  <p className="text-2xl md:text-3xl text-amber-200 font-light">Happy Mid-Autumn Festival</p>
                  <div className="flex justify-center gap-6 text-5xl">
                    <span className="animate-pulse">🏮</span>
                    <span className="animate-pulse delay-100">🥮</span>
                    <span className="animate-pulse delay-200">🐰</span>
                  </div>
                  <p className="text-amber-300 text-lg animate-pulse mt-8">Click to open your card ✨</p>
                </div>
              </Card>
            </div>
          ) : (
            // Opened card
            <div className="animate-in fade-in zoom-in duration-700">
              <Card className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border-4 border-amber-400 shadow-2xl">
                <div className="absolute inset-0 bg-[url('/elegant-chinese-floral-pattern.jpg')] opacity-5" />

                <div className="relative p-8 md:p-12 space-y-8">
                  {/* Header */}
                  <div className="text-center space-y-4">
                    <div className="flex justify-center gap-4 text-6xl">
                      <span className="animate-bounce">🏮</span>
                      <span className="animate-bounce delay-100">🌕</span>
                      <span className="animate-bounce delay-200">🏮</span>
                    </div>
                    <h2 className="font-serif text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                      To My Beloved
                    </h2>
                  </div>

                  {/* Message */}
                  {showMessage && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-1000">
                      {/* Couple photos section with romantic layout */}
                      <div className="grid md:grid-cols-2 gap-6 my-8">
                        {/* First photo with decorative frame */}
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                          <div className="relative">
                            <div className="absolute -top-4 -left-4 text-6xl z-10 animate-spin-slow">🏮</div>
                            <div className="absolute -bottom-4 -right-4 text-6xl z-10 animate-bounce">🌕</div>
                            <div className="relative overflow-hidden rounded-xl border-4 border-amber-400 bg-white p-2 shadow-2xl">
                              <Image
                                src="/romantic-couple-enjoying-mid-autumn-festival-toget.jpg"
                                alt="Our beautiful moment together"
                                width={400}
                                height={400}
                                className="w-full h-auto rounded-lg object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent"></div>
                            </div>
                            <p className="text-center mt-3 text-sm font-serif text-amber-800 italic">
                              Our magical moments together ✨
                            </p>
                          </div>
                        </div>

                        {/* Second photo with decorative frame */}
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse delay-300"></div>
                          <div className="relative">
                            <div className="absolute -top-4 -right-4 text-6xl z-10 animate-bounce delay-150">🥮</div>
                            <div className="absolute -bottom-4 -left-4 text-6xl z-10 animate-pulse">💕</div>
                            <div className="relative overflow-hidden rounded-xl border-4 border-amber-400 bg-white p-2 shadow-2xl">
                              <Image
                                src="/happy-couple-celebrating-with-lanterns-and-mooncak.jpg"
                                alt="Forever in my heart"
                                width={400}
                                height={400}
                                className="w-full h-auto rounded-lg object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent"></div>
                            </div>
                            <p className="text-center mt-3 text-sm font-serif text-amber-800 italic">
                              Forever in my heart 💖
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-8 top-0 text-4xl opacity-30 animate-pulse">💕</div>
                        <div className="absolute -right-8 top-20 text-4xl opacity-30 animate-pulse delay-300">💕</div>
                        <div className="prose prose-lg max-w-none space-y-6">
                          <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-300 shadow-lg">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl">🌸</div>
                            <p className="text-lg md:text-xl leading-relaxed text-gray-800 text-pretty">
                              As the full moon rises tonight, painting the sky with its gentle glow, my heart is filled
                              with thoughts of you. Just like the moon that shines brightest during this festival, you
                              illuminate my life with your warmth, love, and endless beauty.
                            </p>
                          </div>

                          <div className="relative bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-300 shadow-lg">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl">🏮</div>
                            <p className="text-lg md:text-xl leading-relaxed text-gray-800 text-pretty">
                              The Mid-Autumn Festival celebrates reunion, togetherness, and the bonds that connect us.
                              Looking at these precious photos of us, I'm reminded of how blessed I am to have you by my
                              side. Every moment with you is a treasure I hold dear in my heart.
                            </p>
                          </div>

                          <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-300 shadow-lg">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl">🥮</div>
                            <p className="text-lg md:text-xl leading-relaxed text-gray-800 text-pretty">
                              Like the sweetest mooncake, you bring joy and sweetness to every moment we share. Like the
                              brightest lantern, you guide me through life's journey. Like the harvest moon, you are
                              full, complete, and absolutely perfect in every way.
                            </p>
                          </div>

                          <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-yellow-400 shadow-lg">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl">🌕</div>
                            <p className="text-lg md:text-xl leading-relaxed text-gray-800 text-pretty">
                              May this festival bring you happiness, prosperity, and all the blessings you deserve. May
                              our love continue to grow stronger with each passing moon, and may we create countless
                              more beautiful memories together under the autumn sky.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Decorative elements */}
                      <div className="flex justify-center gap-8 text-5xl my-8">
                        <span className="animate-spin-slow">🥮</span>
                        <span className="animate-pulse">❤️</span>
                        <span className="animate-spin-slow">🥮</span>
                      </div>

                      {/* Signature */}
                      <div className="text-center space-y-4 pt-6 border-t-2 border-amber-300">
                        <p className="text-2xl md:text-3xl font-serif bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent font-bold">
                          Forever Yours
                        </p>
                        <p className="text-xl text-gray-600">Under the same moon, always together 🌕</p>
                        <div className="text-4xl animate-pulse">💕</div>
                      </div>

                      {/* Footer decoration */}
                      <div className="flex justify-center gap-4 text-3xl pt-6">
                        <span className="animate-bounce">🏮</span>
                        <span className="animate-bounce delay-75">🐰</span>
                        <span className="animate-bounce delay-150">🌸</span>
                        <span className="animate-bounce delay-225">🥮</span>
                        <span className="animate-bounce delay-300">🌕</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Floating cursor effect */}
      <div
        className="fixed w-4 h-4 bg-amber-400 rounded-full pointer-events-none mix-blend-screen blur-sm"
        style={{
          left: mousePos.x - 8,
          top: mousePos.y - 8,
          transition: "all 0.1s ease-out",
        }}
      />
    </div>
  )
}
