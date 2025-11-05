import { Header } from "../components/header"
import { HeroWaitlist } from "../components/hero-waitlist"
import { Footer } from "../components/footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <HeroWaitlist />
      <Footer />
    </main>
  )
}
