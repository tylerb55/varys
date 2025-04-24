"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function KeywordAnalysis() {
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

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "service",
          "quality",
          "price",
          "delivery",
          "staff",
          "experience",
          "product",
          "value",
          "shipping",
          "support",
        ],
        datasets: [
          {
            label: "Positive",
            data: [42, 38, 12, 8, 28, 22, 10, 18, 5, 12],
            backgroundColor: "rgba(16, 185, 129, 0.7)",
            borderWidth: 0,
          },
          {
            label: "Neutral",
            data: [15, 12, 20, 10, 4, 6, 15, 4, 3, 3],
            backgroundColor: "rgba(245, 158, 11, 0.7)",
            borderWidth: 0,
          },
          {
            label: "Negative",
            data: [7, 8, 10, 18, 0, 0, 0, 0, 10, 0],
            backgroundColor: "rgba(239, 68, 68, 0.7)",
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="h-[300px]">
      <canvas ref={chartRef} />
    </div>
  )
}

