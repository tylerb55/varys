"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, ThumbsUp, Minus, ThumbsDown, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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

const reviews: Review[] = [
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
  {
    id: "5",
    author: "Emily Thompson",
    date: "2023-03-20",
    rating: 5,
    text: "I've been using this product for a month now and I'm very impressed. The quality is outstanding and customer service has been excellent whenever I've had questions.",
    source: "google",
    sentiment: "positive",
    keywords: ["quality", "customer service"],
  },
  {
    id: "6",
    author: "David Wilson",
    date: "2023-03-18",
    rating: 2,
    text: "Delivery was quick but the product didn't meet my expectations. The description online was misleading and the quality isn't what I expected for the price.",
    source: "yelp",
    sentiment: "negative",
    keywords: ["delivery", "quality", "price"],
  },
  {
    id: "7",
    author: "Amanda Lee",
    date: "2023-03-15",
    rating: 4,
    text: "Good product overall. The staff was friendly and helpful. Would have given 5 stars but the checkout process was a bit confusing.",
    source: "facebook",
    sentiment: "positive",
    keywords: ["staff", "service"],
  },
  {
    id: "8",
    author: "James Brown",
    date: "2023-03-12",
    rating: 3,
    text: "Average experience. Nothing particularly bad but nothing outstanding either. Price is reasonable for what you get.",
    source: "tripadvisor",
    sentiment: "neutral",
    keywords: ["price", "experience"],
  },
]

export function ReviewList() {
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
    <div className="mt-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Source</TableHead>
              <TableHead>Review</TableHead>
              <TableHead className="w-[100px]">Rating</TableHead>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
                    {getSourceIcon(review.source)}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.author}</span>
                      {getSentimentIcon(review.sentiment)}
                    </div>
                    <p className={`mt-1 text-sm ${expandedReview === review.id ? "" : "line-clamp-2"}`}>
                      {review.text}
                    </p>
                    {review.text.length > 100 && (
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
                </TableCell>
                <TableCell>
                  <div className="flex">{renderStars(review.rating)}</div>
                </TableCell>
                <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/reviews/${review.id}`}>View details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Mark as read</DropdownMenuItem>
                      <DropdownMenuItem>Flag for follow-up</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

