"use client"

import type React from "react"
import { useCallback } from "react"
import { debounce } from "lodash"
import LanguageFilter from "./language-filter"
import { Search } from "lucide-react"
import { Input } from "./ui/input"

export interface SearchInputI {
    onLanguageChange: (language: string) => void
    onSearchStringChange: (searchString: string) => void
}

export default function SearchInput(props: SearchInputI) {
    const debouncedOnSearchStringChange = useCallback(
        debounce((value: string) => {
            props.onSearchStringChange(value)
        }, 500),
        [],
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedOnSearchStringChange(e.target.value)
    }

    return (
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between ">


            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b949e]" />
                <Input
                    type="text"
                    id="filter-input"
                    placeholder="Search for good first issues..."
                    onChange={handleInputChange}
                    className="border-[#30363d] bg-[#0d1117] pl-10 text-[#c9d1d9] placeholder:text-[#8b949e] focus-visible:ring-[#58a6ff]"
                />
            </div>
            <LanguageFilter onLanguageChange={debouncedOnSearchStringChange} />
        </div>
    )
}

