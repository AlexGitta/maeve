import { Header } from "../components/header"
import { HeroWaitlist } from "../components/hero-waitlist"
import { Footer } from "../components/footer"
import { AuroraBackground } from "../components/ui/shadcn-io/aurora-background"

export default function Home() {
  return (
    <AuroraBackground>
      <Header />
      <HeroWaitlist />
      <Footer />
    </AuroraBackground>
  )
}
