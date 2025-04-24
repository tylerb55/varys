"use client"

import { useState } from "react"
import { PanelLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SentimentChart } from "@/components/dashboard/sentiment-chart"
import { KeywordCloud } from "@/components/dashboard/keyword-cloud"
import { SourceBreakdown } from "@/components/dashboard/source-breakdown"
import { RecentReviews } from "@/components/dashboard/recent-reviews"
import { DateRangePicker } from "@/components/dashboard/date-range-picker"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main
        className={cn(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out",
          isSidebarOpen ? "md:pl-64" : "md:pl-16"
        )}
      >
        <div className="container mx-auto p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="h-9 w-9"
                  title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                >
                  <PanelLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              </div>
              <DateRangePicker />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle>Overall Sentiment</CardTitle>
                  <CardDescription>Based on 1,248 total reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-5xl font-bold text-green-500">82%</div>
                    <p className="text-sm text-muted-foreground">Positive Sentiment</p>
                    <div className="text-sm text-green-500 flex items-center">
                      <span className="mr-1">↑</span> 3% from last month
                    </div>
                  </div>
                  <div className="mt-6">
                    <SentimentChart />
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle>Top Keywords</CardTitle>
                  <CardDescription>Most mentioned terms in reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <KeywordCloud />
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle>Reviews by Source</CardTitle>
                  <CardDescription>Distribution across platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <SourceBreakdown />
                </CardContent>
              </Card>
            </div>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>Latest customer feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentReviews />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

