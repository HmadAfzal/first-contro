"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import IssueList from "@/components/issue-list"
import type { GitHubIssue } from "@/types/github"
import SearchInput from "@/components/search-input"
import RefreshButton from "@/components/refresh-button"
import apiService from "@/lib/api-service"
import { useSession } from "next-auth/react"
import { GitBranch, Filter, X, Loader2 } from "lucide-react"

type GetDataFunction = (language: string | null, searchString: string | null, page: number | null) => Promise<void>

function App() {
  const [issues, setIssues] = useState<GitHubIssue[] | null>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [language, setLanguage] = useState<string | null>(null)
  const [searchString, setSearchString] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [isLoadingFullPage, setIsLoadingFullPage] = useState(true)
  const {  status } = useSession()

  const getData: GetDataFunction = async (language = null, searchString = null, page = 1) => {
    setIsLoading(true)
    try {
      const newData = await apiService.searchIssues(language, searchString, page)

      if (newData.error) {
        setError(newData.error)
      } else {
        setError("")

        if (page === 1) {
          setIssues(newData.items || [])
        } else {
          setIssues((prevIssues) => [...(prevIssues || []), ...(newData.items || [])])
        }

        setTotalPages(Math.ceil((newData.total_count || 0) / 30))
      }
    } catch (err) {
      setError("Failed to fetch issues. Please try again.")
    } finally {
      setIsLoading(false)
      setIsLoadingFullPage(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      getData(null, null, 1)
    } else if (status === "unauthenticated") {
      setIsLoadingFullPage(false)
    }
  }, [status])

  const onLanguageChange = (language: string) => {
    setLanguage(language)
    setCurrentPage(1) 
    getData(language, searchString, 1)
  }

  const onSearchInputChange = (searchString: string) => {
    setSearchString(searchString)
    setCurrentPage(1) 
    getData(language, searchString, 1)
  }

  const onRefreshButtonClick = () => {
    setCurrentPage(1) 
    getData(language, searchString, 1)
  }

  const loadNewData = () => {
    if (isLoading || currentPage >= totalPages) return
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    getData(language, searchString, nextPage)
  }

  const retry = () => {
    if (isLoading) return
    getData(language, searchString, currentPage)
  }

  const clearFilter = (type: "language" | "search") => {
    if (type === "language") {
      setLanguage(null)
      getData(null, searchString, 1)
    } else {
      setSearchString(null)
      getData(language, null, 1)
    }
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <Navbar />

      <main className="container mx-auto px-4 py-6 pt-24">
        {status === "loading" ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-[#58a6ff]" />
            <p className="mt-4 text-[#8b949e]">Loading...</p>
          </div>
        ) : status === "authenticated" ? (
          <>
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#c9d1d9] flex items-center">
                    <GitBranch className="h-5 w-5 mr-2 text-[#238636]" />
                    Good First Issues Explorer
                  </h1>
                  <p className="text-[#8b949e] mt-1">Find beginner-friendly issues across GitHub repositories</p>
                </div>

                <div className="flex items-center gap-2">
                  <RefreshButton onClick={onRefreshButtonClick} isLoading={isLoading} />
                  <span className="text-sm text-[#8b949e]">
                    {issues?.length ? `Showing ${issues.length} issues` : ""}
                  </span>
                </div>
              </div>

              <SearchInput
                onLanguageChange={onLanguageChange}
                onSearchStringChange={onSearchInputChange}
              />

              {(language || searchString) && (
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <span className="text-sm text-[#8b949e] flex items-center">
                    <Filter className="h-3.5 w-3.5 mr-1" />
                    Active filters:
                  </span>

                  {language && (
                    <div className="flex items-center bg-[#21262d] text-[#c9d1d9] text-sm rounded-full px-3 py-1">
                      <span>Language: {language}</span>
                      <button
                        onClick={() => clearFilter("language")}
                        className="ml-2 text-[#8b949e] hover:text-[#c9d1d9]"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  {searchString && (
                    <div className="flex items-center bg-[#21262d] text-[#c9d1d9] text-sm rounded-full px-3 py-1">
                      <span>Search: {searchString}</span>
                      <button
                        onClick={() => clearFilter("search")}
                        className="ml-2 text-[#8b949e] hover:text-[#c9d1d9]"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <IssueList
              isLoadingFullPage={isLoadingFullPage}
              isLoading={isLoading}
              error={error}
              issues={issues}
              totalPages={totalPages}
              onReachedBottom={loadNewData}
              currentPage={currentPage}
              onRetry={retry}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#161b22] mb-4">
              <GitBranch className="h-8 w-8 text-[#58a6ff]" />
            </div>
            <h2 className="text-xl font-bold text-[#c9d1d9] mb-2">Sign in to explore GitHub issues</h2>
            <p className="text-[#8b949e] mb-6">
              Connect with your GitHub account to discover good first issues and start contributing to open source
              projects.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

