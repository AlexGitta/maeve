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
      setTimeout(() => setSubmitted(false), 10000)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const buttonCenterX = rect.left + rect.width / 2
    const buttonCenterY = rect.top + rect.height / 2

    // Calculate distance from cursor to button center
    const deltaX = e.clientX - buttonCenterX
    const deltaY = e.clientY - buttonCenterY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    // Only apply magnetic effect if cursor is within range (e.g., 2000px)
    const magnetRange = 2000
    if (distance > magnetRange) {
      setButtonPosition({ x: 0, y: 0 })
      return
    }

    // Calculate normalized direction
    const directionX = deltaX / distance
    const directionY = deltaY / distance

    // Apply magnetic effect with falloff based on distance
    const maxDistance = 15
    const strength = Math.min(1, magnetRange / distance) * 0.3
    const moveX = directionX * distance * strength
    const moveY = directionY * distance * strength

    // Limit the movement to max distance
    const limitedX = Math.max(-maxDistance, Math.min(maxDistance, moveX))
    const limitedY = Math.max(-maxDistance, Math.min(maxDistance, moveY))

    setButtonPosition({ x: limitedX, y: limitedY })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setButtonPosition({ x: 0, y: 0 })
  }

  return (
    <section
      className="flex-1 flex items-center justify-center px-4 py-4 md:py-20 relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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
            <button
              ref={buttonRef}
              type="submit"
              style={{
                transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
                transition: "transform 1s ease-out",
              }}
              className="w-full px-4 py-3 bg-primary text-primary-foreground font-bold tracking-wide hover:opacity-90 transition rounded relative"
            >
              <span
                style={{
                  opacity: submitted ? 0 : 1,
                  transition: "opacity 0.5s ease-in-out",
                }}
              >
                join the waitlist
              </span>
              <span
                style={{
                  opacity: submitted ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  whiteSpace: "nowrap",
                }}
              >
                thanks for joining
              </span>
            </button>
          </div>
          <p
            style={{
              opacity: submitted ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
              height: submitted ? "auto" : 0,
              overflow: "hidden",
            }}
            className="text-center text-sm text-primary font-medium"
          >
            Check your email for a special message.
          </p>
        </form>
      </div>
    </section>
  )
}
