"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"

interface Keyword {
  text: string
  value: number
  sentiment: "positive" | "neutral" | "negative"
}

const keywords: Keyword[] = [
  { text: "service", value: 64, sentiment: "positive" },
  { text: "quality", value: 58, sentiment: "positive" },
  { text: "price", value: 42, sentiment: "neutral" },
  { text: "delivery", value: 36, sentiment: "negative" },
  { text: "staff", value: 32, sentiment: "positive" },
  { text: "experience", value: 28, sentiment: "positive" },
  { text: "product", value: 25, sentiment: "neutral" },
  { text: "value", value: 22, sentiment: "positive" },
  { text: "shipping", value: 18, sentiment: "negative" },
  { text: "customer support", value: 15, sentiment: "positive" },
]

export function KeywordCloud() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-500 border-green-200 bg-green-50 hover:bg-green-100"
      case "negative":
        return "text-red-500 border-red-200 bg-red-50 hover:bg-red-100"
      default:
        return "text-amber-500 border-amber-200 bg-amber-50 hover:bg-amber-100"
    }
  }

  const handleKeywordClick = (keyword: string) => {
    router.push(`/reviews?keyword=${encodeURIComponent(keyword)}`)
  }

  return (
    <div ref={containerRef} className="flex flex-wrap gap-2">
      {keywords.map((keyword) => {
        const fontSize = 12 + keyword.value / 10

        return (
          <button
            key={keyword.text}
            onClick={() => handleKeywordClick(keyword.text)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${getSentimentColor(keyword.sentiment)}`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {keyword.text}
          </button>
        )
      })}
    </div>
  )
}

