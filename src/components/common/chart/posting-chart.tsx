"use client"
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const postingData = [
  { day: "Mon", video: 65, music: 28, podcast: 45 },
  { day: "Tue", video: 45, music: 38, podcast: 52 },
  { day: "Wed", video: 78, music: 45, podcast: 61 },
  { day: "Thu", video: 52, music: 65, podcast: 48 },
  { day: "Fri", video: 61, music: 55, podcast: 67 },
  { day: "Sat", video: 85, music: 72, podcast: 78 },
  { day: "Sun", video: 72, music: 48, podcast: 65 },
];

export default function PostingCart() {
  return (
    <div className="border rounded-xl">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={postingData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
          <XAxis
            dataKey="day"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="video"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ fill: "#2563eb", strokeWidth: 2, r: 5 }}
            activeDot={{
              r: 7,
              stroke: "#2563eb",
              strokeWidth: 2,
              fill: "#ffffff",
            }}
            name="Video"
          />
          <Line
            type="monotone"
            dataKey="music"
            stroke="#059669"
            strokeWidth={3}
            dot={{ fill: "#059669", strokeWidth: 2, r: 5 }}
            activeDot={{
              r: 7,
              stroke: "#059669",
              strokeWidth: 2,
              fill: "#ffffff",
            }}
            name="Music"
          />
          <Line
            type="monotone"
            dataKey="podcast"
            stroke="#d97706"
            strokeWidth={3}
            dot={{ fill: "#d97706", strokeWidth: 2, r: 5 }}
            activeDot={{
              r: 7,
              stroke: "#d97706",
              strokeWidth: 2,
              fill: "#ffffff",
            }}
            name="Podcast"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
