"use client"

import { useEffect, useRef } from "react"
import type { GitHubIssue } from "@/types/github"
import { strings } from "@/constants/strings"
import { GitBranch, Loader2, StarIcon, MessageSquare, AlertCircle } from "lucide-react"
import Popover from "./popover/popover"
import UserProfilePopoverContent from "./popover/UserProfilePopoverContent"
import { formatDistanceToNow } from "date-fns"

interface IssueListI {
  issues: GitHubIssue[] | null
  isLoading: boolean
  isLoadingFullPage: boolean
  error: string
  totalPages: number
  onReachedBottom: () => void
  currentPage: number
  onRetry: () => void
}

export default function IssueList(props: IssueListI) {
  const { issues, isLoading, isLoadingFullPage, error, onReachedBottom, currentPage, onRetry } = props
  const loaderRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]
      if (target.isIntersecting) {
        onReachedBottom()
      }
    })

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [onReachedBottom])

  const onRetryButtonClick = () => {
    onRetry()
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (e) {
      return "recently"
    }
  }

  // Language color mapping
  const languageColors: Record<string, string> = {
    JavaScript: "bg-[#f1e05a]",
    TypeScript: "bg-[#3178c6]",
    Python: "bg-[#3572A5]",
    Java: "bg-[#b07219]",
    "C#": "bg-[#178600]",
    PHP: "bg-[#4F5D95]",
    "C++": "bg-[#f34b7d]",
    Ruby: "bg-[#701516]",
    Go: "bg-[#00ADD8]",
    Swift: "bg-[#F05138]",
    Kotlin: "bg-[#A97BFF]",
    Rust: "bg-[#DEA584]",
    HTML: "bg-[#e34c26]",
    CSS: "bg-[#563d7c]",
    Shell: "bg-[#89e051]",
    Dart: "bg-[#00B4AB]",
  }

  return (
    <div className="w-full mx-auto">
      {isLoadingFullPage ? (
        <div className="flex flex-col justify-center items-center p-8 h-64 border border-[#30363d] rounded-md bg-[#0d1117]">
          <div className="relative">
            <Loader2 className="h-8 w-8 animate-spin text-[#58a6ff]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <GitBranch className="h-4 w-4 text-[#0d1117]" />
            </div>
          </div>
          <p className="mt-4 text-[#8b949e]">Fetching good first issues...</p>
        </div>
      ) : error && currentPage === 1 ? (
        <div className="rounded-md border border-[#30363d] bg-[#0d1117] p-6 text-center">
          <AlertCircle className="h-10 w-10 text-[#f85149] mx-auto mb-3" />
          <div className="text-[#f85149] mb-2 text-lg font-medium">Something went wrong</div>
          <p className="text-[#8b949e] max-w-md mx-auto">{error}</p>
          <button
            onClick={onRetryButtonClick}
            className="mt-4 bg-[#238636] rounded-md py-1.5 px-4 text-white text-sm hover:bg-[#2ea043] transition-colors focus:outline-none focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#0d1117]"
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Retrying...
              </span>
            ) : (
              "Try again"
            )}
          </button>
        </div>
      ) : issues?.length === 0 ? (
        <div className="rounded-md border border-[#30363d] bg-[#0d1117] p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#161b22] mb-4">
            <GitBranch className="h-8 w-8 text-[#8b949e]" />
          </div>
          <div className="text-[#c9d1d9] mb-2 text-lg font-medium">No issues found</div>
          <p className="text-[#8b949e] max-w-md mx-auto">{strings.noIssuesFound}</p>
        </div>
      ) : (
        <div className="pb-6">
          <div className="rounded-t-md border border-[#30363d] bg-[#161b22] px-4 py-3">
            <h2 className="text-[#c9d1d9] font-medium flex items-center">
              <GitBranch className="h-4 w-4 mr-2 text-[#238636]" />
              Good First Issues
            </h2>
          </div>

          <ul className="divide-y divide-[#30363d] border-l border-r border-[#30363d] bg-[#0d1117]">
            {issues?.length &&
              issues?.map((issue, key: number) => {
                const profile = `${issue.html_url.split("/")[3]}`
                const repo = `${issue.html_url.split("/")[4]}`
                const issueNumber = issue.number || issue.html_url.split("/").pop() || ""

                // Label colors - these would ideally come from the API
                const labelColors: Record<string, string> = {
                  "good first issue": "bg-[#7057ff]",
                  documentation: "bg-[#0075ca]",
                  enhancement: "bg-[#a2eeef]",
                  bug: "bg-[#d73a4a]",
                  "help wanted": "bg-[#008672]",
                  question: "bg-[#d876e3]",
                }

                return (
                  <li key={key} className="hover:bg-[#161b22] transition-colors">
                    <div className="p-4">
                      {/* Repository info */}
                      <div className="flex flex-row items-center gap-1 mb-2 text-sm">
                        <Popover trigger={"hover"} content={UserProfilePopoverContent(issue)}>
                          <a
                            target={"_blank"}
                            rel="noreferrer"
                            href={`https://github.com/${profile}`}
                            className="text-[#58a6ff] hover:underline"
                          >
                            {profile}
                          </a>
                        </Popover>

                        <span className="text-[#8b949e]">/</span>
                        <a
                          target={"_blank"}
                          rel="noreferrer"
                          href={`https://github.com/${profile}/${repo}`}
                          className="text-[#58a6ff] hover:underline font-medium"
                        >
                          {repo}
                        </a>

                        <div className="ml-2 flex items-center text-[#8b949e] bg-[#21262d] rounded-full px-2 py-0.5">
                          <StarIcon className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">{issue.repository_stars}</span>
                        </div>

                        {/* Repository language */}
                        {issue.repository_language && (
                          <div className="ml-2 flex items-center">
                            <span
                              className={`h-3 w-3 rounded-full mr-1 ${
                                languageColors[issue.repository_language] || "bg-[#8b949e]"
                              }`}
                            ></span>
                            <span className="text-xs text-[#8b949e]">{issue.repository_language}</span>
                          </div>
                        )}
                      </div>

                      {/* Issue title and body */}
                      <div className="mb-3">
                        <a
                          target={"_blank"}
                          rel="noreferrer"
                          href={issue.html_url}
                          className="text-[#c9d1d9] font-medium hover:text-[#58a6ff] transition-colors"
                        >
                          {issue.title}
                        </a>

                        {issue.body && <p className="mt-1 text-sm text-[#8b949e] line-clamp-2">{issue.body}</p>}
                      </div>

                      {/* Labels */}
                      {issue.labels && issue.labels.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          
                          {issue.labels.map((label:{name:string}, labelIndex: number) => (
                            <span
                              key={labelIndex}
                              className={`inline-block ${labelColors[label.name] || "bg-[#777777]"} text-white text-xs px-2 py-0.5 rounded-full`}
                            >
                              {label.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Issue metadata */}
                      <div className="flex items-center text-xs text-[#8b949e]">
                        <span className="flex items-center">
                          <MessageSquare className="h-3.5 w-3.5 mr-1" />
                          {issue.comments || 0}
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          #{issueNumber} opened {formatDate(issue.created_at || "")}
                        </span>
                      </div>
                    </div>
                  </li>
                )
              })}
          </ul>

          {error && currentPage > 1 ? (
            <div className="border-l border-r border-b border-[#30363d] bg-[#0d1117] rounded-b-md p-4 text-center">
              <p className="text-[#c9d1d9] mb-3">{strings.listItemError}</p>
              <button
                onClick={onRetryButtonClick}
                className="bg-[#238636] rounded-md py-1.5 px-3 text-white text-sm hover:bg-[#2ea043] transition-colors focus:outline-none focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#0d1117]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Retrying...
                  </span>
                ) : (
                  strings.listItemReloadButtonLabel
                )}
              </button>
            </div>
          ) : (
            <div
              ref={loaderRef}
              className="flex justify-center items-center h-16 border-l border-r border-b border-[#30363d] bg-[#0d1117] rounded-b-md"
            >
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="h-5 w-5 animate-spin text-[#8b949e]" />
                  <span className="text-xs text-[#8b949e] mt-2">Loading more issues...</span>
                </div>
              ) : (
                <div className="text-xs text-[#8b949e]">Scroll to load more</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

