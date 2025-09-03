import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export function AuthHeader() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-xl text-gray-900">ExamPrep+</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Sign Up
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
