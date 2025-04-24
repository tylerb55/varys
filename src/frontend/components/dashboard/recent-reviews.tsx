"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, ThumbsUp, Minus, ThumbsDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Review {
  id: string
  author: string
  date: string
  rating: number
  text: string
  source: "google" | "yelp" | "facebook" | "tripadvisor"
  sentiment: "positive" | "neutral" | "negative"
  keywords: string[]
}

const recentReviews: Review[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    date: "2023-04-01",
    rating: 5,
    text: "Absolutely amazing service! The staff was incredibly helpful and the quality of the product exceeded my expectations. Will definitely be coming back and recommending to friends.",
    source: "google",
    sentiment: "positive",
    keywords: ["service", "staff", "quality"],
  },
  {
    id: "2",
    author: "Michael Chen",
    date: "2023-03-28",
    rating: 3,
    text: "The product was okay, but the price seemed a bit high for what you get. Delivery was on time though, which was nice.",
    source: "yelp",
    sentiment: "neutral",
    keywords: ["price", "delivery"],
  },
  {
    id: "3",
    author: "Jessica Williams",
    date: "2023-03-25",
    rating: 1,
    text: "Very disappointed with my purchase. The item arrived damaged and customer service was slow to respond to my complaint. Would not recommend.",
    source: "facebook",
    sentiment: "negative",
    keywords: ["customer service", "shipping"],
  },
  {
    id: "4",
    author: "Robert Garcia",
    date: "2023-03-22",
    rating: 4,
    text: "Great experience overall. The product works as advertised and the value for money is excellent. Only giving 4 stars because shipping took longer than expected.",
    source: "tripadvisor",
    sentiment: "positive",
    keywords: ["experience", "value", "shipping"],
  },
]

export function RecentReviews() {
  const [expandedReview, setExpandedReview] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedReview(expandedReview === id ? null : id)
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "google":
        return "G"
      case "yelp":
        return "Y"
      case "facebook":
        return "F"
      case "tripadvisor":
        return "T"
      default:
        return "?"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="h-4 w-4 text-green-500" />
      case "negative":
        return <ThumbsDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-amber-500" />
    }
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
      ))
  }

  return (
    <div className="space-y-4">
      {recentReviews.map((review) => (
        <div key={review.id} className="rounded-lg border p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
                {getSourceIcon(review.source)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{review.author}</span>
                  <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                  {getSentimentIcon(review.sentiment)}
                </div>
                <div className="mt-1 flex">{renderStars(review.rating)}</div>
                <p className={`mt-2 text-sm ${expandedReview === review.id ? "" : "line-clamp-2"}`}>{review.text}</p>
                {review.text.length > 120 && (
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-1 h-auto p-0 text-xs"
                    onClick={() => toggleExpand(review.id)}
                  >
                    {expandedReview === review.id ? "Show less" : "Read more"}
                  </Button>
                )}
                <div className="mt-2 flex flex-wrap gap-1">
                  {review.keywords.map((keyword) => (
                    <Badge key={keyword} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Link href={`/reviews/${review.id}`} className="text-sm text-primary hover:underline">
              View
            </Link>
          </div>
        </div>
      ))}
      <div className="flex justify-center pt-2">
        <Button variant="outline" asChild>
          <Link href="/reviews">View All Reviews</Link>
        </Button>
      </div>
    </div>
  )
}

