"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { BarChart, Bar, CartesianGrid, XAxis } from "recharts"

const earningsData = [
  { day: "01", views: 450, earnings: 890 },
  { day: "02", views: 380, earnings: 720 },
  { day: "03", views: 520, earnings: 980 },
  { day: "04", views: 680, earnings: 1240 },
  { day: "05", views: 750, earnings: 1380 },
  { day: "06", views: 620, earnings: 1150 },
  { day: "07", views: 580, earnings: 1080 },
  { day: "08", views: 720, earnings: 1320 },
  { day: "09", views: 840, earnings: 1520 },
  { day: "10", views: 920, earnings: 1680 },
  { day: "11", views: 780, earnings: 1420 },
  { day: "12", views: 650, earnings: 1200 },
  { day: "13", views: 890, earnings: 1620 },
  { day: "14", views: 950, earnings: 1750 },
  { day: "15", views: 820, earnings: 1480 },
  { day: "16", views: 810, earnings: 1450 },
  { day: "17", views: 780, earnings: 1380 },
  { day: "18", views: 820, earnings: 1480 },
  { day: "19", views: 840, earnings: 1500 },
  { day: "20", views: 860, earnings: 1550 },
  { day: "21", views: 870, earnings: 1570 },
  { day: "22", views: 880, earnings: 1600 },
  { day: "23", views: 890, earnings: 1620 },
  { day: "24", views: 900, earnings: 1650 },
  { day: "25", views: 910, earnings: 1680 },
  { day: "26", views: 920, earnings: 1700 },
  { day: "27", views: 930, earnings: 1720 },
  { day: "28", views: 940, earnings: 1740 },
  { day: "29", views: 950, earnings: 1760 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  earnings: {
    label: "Earnings",
  },
} satisfies ChartConfig

// Pick which metric to display: "views" or "earnings"
const activeChart: keyof typeof chartConfig = "earnings"

export function AnalyticsCharts() {
  return (
    <div className="border rounded-md p-4">
        <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[300px] w-full"
    >
      <BarChart
        accessibilityLayer
        data={earningsData}
        margin={{ left: 12, right: 12 }}
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF8787" />   {/* Top */}
            <stop offset="100%" stopColor="#8578B4" /> {/* Bottom */}
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={16}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[150px]"
              nameKey={activeChart}
              labelFormatter={(value) => `Day ${value}`}
            />
          }
        />
        <Bar
          dataKey={activeChart}
          fill="url(#barGradient)"   // Apply gradient here
          radius={[6, 6, 0, 0]}     // Rounded top corners
          
        />
      </BarChart>
    </ChartContainer>
    </div>
  )
}
