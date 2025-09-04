import { AnalyticsCharts } from "@/components/common/chart/earning-chart";
import PostingCart from "@/components/common/chart/posting-chart";
import ShadowBox from "@/components/common/shadow-box";
import FavIcon from "@/icon/favIcon";
import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";

const data = [
  {
    title: "Total earnings",
    value: "$1600",
    percentage: "+20%",
    icon: "earningsIcon", // This can be replaced with the actual icon class or image path
    trend: "up",
  },
  {
    title: "Total vibes",
    value: "500",
    percentage: "-20%",
    icon: "videIcon",
    trend: "down",
  },
  {
    title: "Total music's",
    value: "720",
    percentage: "+20%",
    icon: "musicIcon",
    trend: "up",
  },
  {
    title: "Total podcasts",
    value: "50",
    percentage: "+20%",
    icon: "podcastsIcon",
    trend: "up",
  },
];

export default function RootHome() {
  return (
    <div>
      <ShadowBox className="md:-top-26">
        <div>
          <h1 className="text-2xl 2xl:text-3xl font-semibold">
            Dashboard Overview
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-7">
            {data.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 space-y-2 border text-white relative overflow-hidden"
              >
                {/* Music Icon */}
                <div className="size-12 grid place-items-center rounded-xl bgOne">
                  <FavIcon className="size-6" name={item.icon as any} />
                </div>
                <p className="font-medium text-xl">{item.title}</p>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-semibold">{item.value}</span>
                  <div>
                    {item.trend === "up" ? (
                      <span className="*:text-green-figma flex items-center space-x-1">
                        <ArrowUp className="size-[17px]" />
                        <span className="font-medium">{item.percentage}</span>
                      </span>
                    ) : (
                      <span className="*:text-reds-figma  flex items-center space-x-1">
                        <ArrowDown className="size-[17px]" />
                        <span className="font-medium">{item.percentage}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShadowBox>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h1 className="text-2xl font-semibold mb-10">Posting preference</h1>
          <PostingCart />
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-10">Posting preference</h1>
          <AnalyticsCharts />
        </div>
      </div>
    </div>
  );
}
