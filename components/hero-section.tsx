"use client"

import { useEffect, useState } from "react"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-background">
      {/* Animated moon */}
      <div
        className="absolute top-20 right-1/4 w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 shadow-2xl shadow-amber-500/50 animate-pulse"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-100 to-orange-200 opacity-70" />
        <div className="absolute top-6 left-8 w-4 h-4 rounded-full bg-amber-300/40" />
        <div className="absolute bottom-10 right-10 w-6 h-6 rounded-full bg-amber-300/30" />
      </div>

      {/* Floating lanterns */}
      <div className="absolute top-40 left-10 w-12 h-16 animate-float">
        <div className="w-full h-full bg-gradient-to-b from-red-500 to-red-600 rounded-lg shadow-lg" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-amber-400 rounded-full" />
      </div>

      <div className="absolute top-60 right-20 w-10 h-14 animate-float-delayed">
        <div className="w-full h-full bg-gradient-to-b from-amber-500 to-amber-600 rounded-lg shadow-lg" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-3 bg-yellow-400 rounded-full" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary mb-6 text-balance">中秋快樂</h1>
        <p className="text-3xl md:text-5xl text-accent mb-8 font-light text-balance">Happy Mid-Autumn Festival</p>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
          Under the same bright moon, my heart is with you
        </p>

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center gap-8">
          <div className="text-4xl animate-bounce">🥮</div>
          <div className="text-4xl animate-bounce delay-100">🌕</div>
          <div className="text-4xl animate-bounce delay-200">🏮</div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
