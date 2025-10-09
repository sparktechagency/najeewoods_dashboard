import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PlaceholderImg = (
  width: number = 600,
  height: number = 400
): string => {
  return `https://placehold.co/${width}x${height}.png`;
};


// ==IsColor==
const IsColor = {
  one: "#7d3d0d",
  two: "#7d3d0d",
  three: "#0d6f69",
  four: "#8a3333",
  five: "#7d3d0d",
} as const;

export const getColor = (v: keyof typeof IsColor) => IsColor[v];
