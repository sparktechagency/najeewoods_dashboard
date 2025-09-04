"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

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
];

export function AnalyticsCharts() {
  return (
    <>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={earningsData}
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
          <Bar
            dataKey="views"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            name="Views"
          />
          <Bar
            dataKey="earnings"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            name="Earnings ($)"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
