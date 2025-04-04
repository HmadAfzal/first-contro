"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Loader2 } from "lucide-react"

export function AuthButton() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  if (isLoading) {
    return (
      <div className="h-9 flex items-center justify-center px-3 text-sm text-[#8b949e]">
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        <span className="hidden sm:inline">Loading...</span>
      </div>
    )
  }

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 h-9 px-2 rounded-md hover:bg-[#21262d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:ring-offset-2 focus:ring-offset-[#0d1117]">
            <Avatar className="h-6 w-6 border border-[#30363d]">
              <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
              <AvatarFallback className="bg-[#21262d] text-[#c9d1d9]">
                {session.user?.name?.charAt(0) || <User className="h-3 w-3" />}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline text-sm text-[#c9d1d9]">
              {session.user?.name?.split(" ")[0] || "User"}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 bg-[#161b22] border border-[#30363d] text-[#c9d1d9] p-0 rounded-md shadow-lg"
        >
          <div className="px-4 py-3 border-b border-[#30363d]">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-[#30363d]">
                <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                <AvatarFallback className="bg-[#21262d] text-[#c9d1d9]">
                  {session.user?.name?.charAt(0) || <User className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{session.user?.name || "User"}</div>
                <div className="text-xs text-[#8b949e]">{session.user?.email || ""}</div>
              </div>
            </div>
          </div>
          <div className="py-1">
            <DropdownMenuItem
              onClick={() => signOut()}
              className="px-4 py-2 hover:bg-[#21262d] text-[#c9d1d9] cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4 text-[#8b949e]" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <button
      onClick={() => signIn("github")}
      className="flex items-center gap-2 h-9 px-3 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#0d1117]"
    >
      Sign in
    </button>
  )
}

