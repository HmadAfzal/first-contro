import {  GitBranch } from "lucide-react"
import { AuthButton } from "./auth-button"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-[#0d1117] text-[#c9d1d9] py-3 px-4 fixed w-full border-b border-[#30363d] z-10 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:text-[#58a6ff] transition-colors">
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-[#238636] text-white">
            <GitBranch className="h-5 w-5" />
          </div>
          <div className="font-bold text-lg hidden sm:block">FirstContro</div>
        </Link>

        <div className="flex items-center gap-2">
          <AuthButton />
        </div>
      </div>
    </nav>
  )
}

