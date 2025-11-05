"use client"

import type React from "react"

import { useState } from "react"

export function HeroWaitlist() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="flex-1 flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-2xl space-y-8">
        {/* Brand Logo/Image */}
        <div className="flex justify-center mb-14">
          <div className="w-64 h-32">
            <img
              src="/Maeve/circlelogo.png"
              alt="Maeve"
              className="w-full h-full object-contain rounded-4xl"
            />
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4 text-center">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground">look after yourself.</h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
            something is coming. be the first to know.
          </p>
        </div>

        {/* Email Signup */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto pt-8">
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
              type="submit"
              className="w-full px-4 py-3 bg-primary text-primary-foreground font-bold tracking-wide hover:opacity-90 transition rounded"
            >
              {submitted ? "thanks for joining" : "join the waitlist"}
            </button>
          </div>
          {submitted && (
            <p className="text-center text-sm text-primary font-medium">Check your email for a special message.</p>
          )}
        </form>
      </div>
    </section>
  )
}
