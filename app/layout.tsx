import type React from "react"
import type { Metadata } from "next"
import { Raleway } from "next/font/google"
import "./globals.css"

const raleway = Raleway({ subsets: ["latin"], weight: ["400", "600", "700", "900"] })

export const metadata: Metadata = {
  title: "Maeve",
  description: "",
  generator: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
