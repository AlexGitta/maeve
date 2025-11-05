import Link from "next/link"

export function Header() {
  return (
    <header className="bg-background border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-xl font-black tracking-wider text-primary">maeve</div>
          </Link>

          <div />
        </div>
      </div>
    </header>
  )
}
