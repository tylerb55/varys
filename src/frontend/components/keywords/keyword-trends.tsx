"use client"

import { useEffect, useRef, useState } from "react"
import { Chart, registerables } from "chart.js"
import { Button } from "@/components/ui/button"

Chart.register(...registerables)

const keywords = ["service", "quality", "price", "delivery", "staff"]

export function KeywordTrends() {
  const [selectedKeyword, setSelectedKeyword] = useState("service")
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Generate some random data for the selected keyword
    const dates = Array.from({ length: 12 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - 11 + i)
      return date.toLocaleDateString("en-US", { month: "short" })
    })

    // Generate random data based on the selected keyword
    // This is just for demonstration - in a real app, this would be actual data
    const generateData = () => {
      const seed = keywords.indexOf(selectedKeyword) + 1
      return Array.from({ length: 12 }, () => Math.floor(Math.random() * 30 * seed) + 5)
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: selectedKeyword,
            data: generateData(),
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Mentions",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [selectedKeyword])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <Button
            key={keyword}
            variant={selectedKeyword === keyword ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedKeyword(keyword)}
          >
            {keyword}
          </Button>
        ))}
      </div>
      <div className="h-[250px]">
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}

