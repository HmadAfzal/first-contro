"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export interface LanguageFilterI {
  onLanguageChange: (language: string) => void
  currentLanguage?: string | null
}

export default function LanguageFilter(props: LanguageFilterI) {
  const { onLanguageChange, currentLanguage } = props
  const [selectedLang, setSelectedLang] = useState<string | null>(currentLanguage || null)

  useEffect(() => {
    setSelectedLang(currentLanguage || null)
  }, [currentLanguage])

  // Language color mapping to match GitHub's colors
  const languageColors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    "C#": "#178600",
    PHP: "#4F5D95",
    "C++": "#f34b7d",
    C: "#555555",
    Ruby: "#701516",
    Go: "#00ADD8",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Rust: "#DEA584",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Dart: "#00B4AB",
    React: "#61dafb",
    Vue: "#41b883",
    Angular: "#dd0031",
    Laravel: "#ff2d20",
    Codeigniter: "#ee4323",
  }

  // Popular programming languages sorted alphabetically
  const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C#",
    "PHP",
    "C++",
    "C",
    "Ruby",
    "Go",
    "Swift",
    "Kotlin",
    "Rust",
    "HTML",
    "CSS",
    "React",
    "Vue",
    "Angular",
    "Laravel",
    "Codeigniter",
  ].sort()

  const handleLanguageSelect = (language: string) => {
    if (selectedLang === language) {
      setSelectedLang(null)
      onLanguageChange("")
    } else {
      setSelectedLang(language)
      onLanguageChange(language)
    }
  }

  const clearLanguage = () => {
    setSelectedLang(null)
    onLanguageChange("")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] focus:ring-[#58a6ff] h-9 px-3"
        >
          {selectedLang ? (
            <div className="flex items-center">
              <span className="mr-1">Language:</span>
              <div className="flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: languageColors[selectedLang] || "#8b949e" }}
                ></span>
                <span>{selectedLang}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    clearLanguage()
                  }}
                  className="ml-1 text-[#8b949e] hover:text-[#c9d1d9]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <span>Language</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border-[#30363d] bg-[#161b22] text-[#c9d1d9] max-h-[60vh] overflow-y-auto"
        align="start"
      >
        <DropdownMenuItem className="flex items-center justify-between focus:bg-[#30363d] py-2" onClick={clearLanguage}>
          <span className="font-medium">All languages</span>
          {!selectedLang && <Check className="h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-[#30363d]" />

        <DropdownMenuGroup>
          {languages.map((language) => (
            <DropdownMenuItem
              key={language}
              className="flex items-center justify-between focus:bg-[#30363d] py-2"
              onClick={() => handleLanguageSelect(language)}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: languageColors[language] || "#8b949e" }}
                ></span>
                {language}
              </div>
              {selectedLang === language && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

