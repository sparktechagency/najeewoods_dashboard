"use client"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const chartData = [
  { day: "Sat", vibe: 56, music: 27, podcast: 72 },
  { day: "Sun", vibe: 78, music: 42, podcast: 30 },
  { day: "Mon", vibe: 79, music: 79, podcast: 68 },
  { day: "Tue", vibe: 52, music: 8, podcast: 50 },
  { day: "Wed", vibe: 44, music: 92, podcast: 50 },
  { day: "Thu", vibe: 70, music: 76, podcast: 93 },
  { day: "Fri", vibe: 95, music: 30, podcast: 67 },
]

const chartConfig = {
  vibe: {
    label: "Vibe",
    color: "#6A5ACD", // soft purple
  },
  music: {
    label: "Music",
    color: "#FF6B6B", // coral red
  },
  podcast: {
    label: "Podcast",
    color: "#4FC3F7", // sky blue
  },
} satisfies ChartConfig

export default function PostingCart() {
  return (
    <div className="border rounded-md p-4">
      <ChartContainer className="aspect-auto h-[280px] w-full" config={chartConfig}>
        <AreaChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} stroke="#333" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />

          {/* Music */}
          <Area dataKey="music" type="monotone" fill="url(#musicGradient)" stroke={chartConfig.music.color} />
          {/* Podcast */}
          <Area dataKey="podcast" type="monotone" fill="url(#podcastGradient)" stroke={chartConfig.podcast.color} />
          {/* Vibe */}
          <Area dataKey="vibe" type="monotone" fill="url(#vibeGradient)" stroke={chartConfig.vibe.color} />

          {/* Gradient defs */}
          <defs>
            <linearGradient id="vibeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartConfig.vibe.color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={chartConfig.vibe.color} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="musicGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartConfig.music.color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={chartConfig.music.color} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="podcastGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartConfig.podcast.color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={chartConfig.podcast.color} stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ChartContainer>

      <div className="flex items-center justify-center gap-8">
        {/* Vibe */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartConfig.vibe.color }} />
          <span className="text-white text-sm font-medium">Vibe</span>
        </div>

        {/* Music */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartConfig.music.color }} />
          <span className="text-white text-sm font-medium">Music</span>
        </div>

        {/* Podcast */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartConfig.podcast.color }} />
          <span className="text-white text-sm font-medium">Podcast</span>
        </div>
      </div>
    </div>
  )
}
