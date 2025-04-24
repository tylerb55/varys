"use client"

import { useState } from "react"
import { ArrowUpDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface Keyword {
  id: string
  text: string
  frequency: number
  sentiment: {
    positive: number
    neutral: number
    negative: number
  }
  trend: "up" | "down" | "stable"
}

const keywords: Keyword[] = [
  {
    id: "1",
    text: "service",
    frequency: 64,
    sentiment: { positive: 42, neutral: 15, negative: 7 },
    trend: "up",
  },
  {
    id: "2",
    text: "quality",
    frequency: 58,
    sentiment: { positive: 38, neutral: 12, negative: 8 },
    trend: "up",
  },
  {
    id: "3",
    text: "price",
    frequency: 42,
    sentiment: { positive: 12, neutral: 20, negative: 10 },
    trend: "down",
  },
  {
    id: "4",
    text: "delivery",
    frequency: 36,
    sentiment: { positive: 8, neutral: 10, negative: 18 },
    trend: "down",
  },
  {
    id: "5",
    text: "staff",
    frequency: 32,
    sentiment: { positive: 28, neutral: 4, negative: 0 },
    trend: "stable",
  },
  {
    id: "6",
    text: "experience",
    frequency: 28,
    sentiment: { positive: 22, neutral: 6, negative: 0 },
    trend: "up",
  },
  {
    id: "7",
    text: "product",
    frequency: 25,
    sentiment: { positive: 10, neutral: 15, negative: 0 },
    trend: "stable",
  },
  {
    id: "8",
    text: "value",
    frequency: 22,
    sentiment: { positive: 18, neutral: 4, negative: 0 },
    trend: "up",
  },
  {
    id: "9",
    text: "shipping",
    frequency: 18,
    sentiment: { positive: 5, neutral: 3, negative: 10 },
    trend: "down",
  },
  {
    id: "10",
    text: "customer support",
    frequency: 15,
    sentiment: { positive: 12, neutral: 3, negative: 0 },
    trend: "up",
  },
]

export function KeywordTable() {
  const [sortColumn, setSortColumn] = useState<string>("frequency")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const getSortedData = () => {
    const filteredData = keywords.filter((keyword) => keyword.text.toLowerCase().includes(searchTerm.toLowerCase()))

    return [...filteredData].sort((a, b) => {
      let comparison = 0

      if (sortColumn === "text") {
        comparison = a.text.localeCompare(b.text)
      } else if (sortColumn === "frequency") {
        comparison = a.frequency - b.frequency
      } else if (sortColumn === "sentiment") {
        const aPositiveRatio =
          a.sentiment.positive / (a.sentiment.positive + a.sentiment.neutral + a.sentiment.negative)
        const bPositiveRatio =
          b.sentiment.positive / (b.sentiment.positive + b.sentiment.neutral + b.sentiment.negative)
        comparison = aPositiveRatio - bPositiveRatio
      }

      return sortDirection === "asc" ? comparison : -comparison
    })
  }

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case "up":
        return <Badge className="bg-green-500">↑ Up</Badge>
      case "down":
        return <Badge className="bg-red-500">↓ Down</Badge>
      default:
        return <Badge variant="outline">→ Stable</Badge>
    }
  }

  const getSentimentBar = (positive: number, neutral: number, negative: number) => {
    const total = positive + neutral + negative
    const positivePercent = (positive / total) * 100
    const neutralPercent = (neutral / total) * 100
    const negativePercent = (negative / total) * 100

    return (
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div className="bg-green-500" style={{ width: `${positivePercent}%` }} />
        <div className="bg-amber-500" style={{ width: `${neutralPercent}%` }} />
        <div className="bg-red-500" style={{ width: `${negativePercent}%` }} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="Search keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("text")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Keyword
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("frequency")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Frequency
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("sentiment")}
                  className="flex items-center gap-1 p-0 font-medium"
                >
                  Sentiment
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Trend</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getSortedData().map((keyword) => (
              <TableRow key={keyword.id}>
                <TableCell className="font-medium">{keyword.text}</TableCell>
                <TableCell>{keyword.frequency}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {getSentimentBar(keyword.sentiment.positive, keyword.sentiment.neutral, keyword.sentiment.negative)}
                    <div className="flex justify-between text-xs">
                      <span className="text-green-500">{keyword.sentiment.positive}</span>
                      <span className="text-amber-500">{keyword.sentiment.neutral}</span>
                      <span className="text-red-500">{keyword.sentiment.negative}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getTrendBadge(keyword.trend)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
                    <a href={`/reviews?keyword=${encodeURIComponent(keyword.text)}`}>
                      View Reviews
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {getSortedData().length} of {keywords.length} keywords
        </div>
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
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

