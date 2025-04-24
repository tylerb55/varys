"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DateRangePicker } from "@/components/dashboard/date-range-picker"
import { Badge } from "@/components/ui/badge"

export function ReviewFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>(["Google", "5★", "Positive"])

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search reviews..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="newest">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="highest">Highest rating</SelectItem>
              <SelectItem value="lowest">Lowest rating</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Reviews</SheetTitle>
                <SheetDescription>Refine the reviews based on your criteria</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Sources</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Google", "Yelp", "Facebook", "TripAdvisor"].map((source) => (
                      <Button
                        key={source}
                        variant={activeFilters.includes(source) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          if (activeFilters.includes(source)) {
                            removeFilter(source)
                          } else {
                            setActiveFilters([...activeFilters, source])
                          }
                        }}
                      >
                        {source}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Rating</h3>
                  <div className="flex flex-wrap gap-2">
                    {["5★", "4★", "3★", "2★", "1★"].map((rating) => (
                      <Button
                        key={rating}
                        variant={activeFilters.includes(rating) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          if (activeFilters.includes(rating)) {
                            removeFilter(rating)
                          } else {
                            setActiveFilters([...activeFilters, rating])
                          }
                        }}
                      >
                        {rating}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Sentiment</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Positive", "Neutral", "Negative"].map((sentiment) => (
                      <Button
                        key={sentiment}
                        variant={activeFilters.includes(sentiment) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          if (activeFilters.includes(sentiment)) {
                            removeFilter(sentiment)
                          } else {
                            setActiveFilters([...activeFilters, sentiment])
                          }
                        }}
                      >
                        {sentiment}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Date Range</h3>
                  <DateRangePicker />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {filter}
              <button onClick={() => removeFilter(filter)} className="ml-1 rounded-full hover:bg-muted">
                <span className="sr-only">Remove {filter} filter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => setActiveFilters([])}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}

