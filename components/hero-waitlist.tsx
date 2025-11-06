"use client"

import type React from "react"

import { useState, useRef } from "react"

export function HeroWaitlist() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const buttonCenterX = rect.left + rect.width / 2
    const buttonCenterY = rect.top + rect.height / 2

    // Calculate distance from center
    const deltaX = e.clientX - buttonCenterX
    const deltaY = e.clientY - buttonCenterY

    // Limit the magnetic effect to 15px max distance
    const maxDistance = 15
    const limitedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX * 0.3))
    const limitedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY * 0.3))

    setButtonPosition({ x: limitedX, y: limitedY })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setButtonPosition({ x: 0, y: 0 })
  }

  return (
    <section className="flex-1 flex items-center justify-center px-4 py-4 md:py-20 relative">
      <div className="w-full max-w-2xl space-y-8">
        {/* Brand Logo/Image - Behind aurora */}
        <div className="flex justify-center mb-6 md:mb-14 relative z-0">
          <div className="w-80 h-40">
            <img
              src="/maeve/circlelogo.png"
              alt="Maeve"
              className="w-full h-full object-contain rounded-4xl"
            />
          </div>
        </div>

        {/* Main Message - In front of aurora */}
        <div className="space-y-4 text-center relative z-20">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground">look after yourself.</h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed relative z-0">
            something is coming. be the first to know.
          </p>
        </div>

        {/* Email Signup - In front of aurora */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto pt-8 relative z-20">
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 text-foreground placeholder-gray-400 focus:outline-none focus:border-primary transition rounded"
            />
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative"
              style={{ padding: "60px", margin: "-60px" }}
            >
              <button
                ref={buttonRef}
                type="submit"
                style={{
                  transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
                  transition: "transform 0.2s ease-out",
                }}
                className="w-full px-4 py-3 bg-primary text-primary-foreground font-bold tracking-wide hover:opacity-90 transition rounded"
              >
                {submitted ? "thanks for joining" : "join the waitlist"}
              </button>
            </div>
          </div>
          {submitted && (
            <p className="text-center text-sm text-primary font-medium">Check your email for a special message.</p>
          )}
        </form>
      </div>
    </section>
  )
}
