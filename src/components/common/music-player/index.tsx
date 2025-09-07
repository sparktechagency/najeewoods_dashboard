"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import FavIcon from "@/icon/favIcon"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const waveformData = Array.from({ length: 25 }, (_, i) => Math.random() * 0.8 + 0.2)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="w-full mx-auto">
      <div
        className={`flex items-center rounded-full border px-2 py-[6px] bg-[#2B2D31] shadow-lg transition-all duration-300 ${
          isPlaying ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gray-800"
        }`}
      >
        {/* Play/Pause Button */}
        <Button
          onClick={togglePlay}
          variant="ghost"
          size="sm"
          type="button"
          className="h-8 w-8 p-0 cursor-pointer text-white hover:bg-white/20 rounded-full mr-4"
        >
          {isPlaying ? <FavIcon name="pluse" className="size-9" /> : <FavIcon className="size-9" name="play" />}
        </Button>

        {/* Waveform Visualization */}
        {/* <div className="flex items-center justify-center gap-1 px-4">
          {waveformData.map((height, index) => (
            <div
              key={index}
              className={`w-1 bg-white rounded-full transition-all duration-300 ${isPlaying ? "animate-pulse" : ""}`}
              style={{
                height: `${height * 20 + 8}px`,
                opacity: isPlaying && index < 15 ? 1 : 0.7,
                animationDelay: `${index * 50}ms`,
              }}
            />
          ))}
        </div> */}

        {/* Volume/Mute Button */}
        <Button
          onClick={toggleMute}
          variant="ghost"
          size="sm"
          type="button"
          className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full ml-4"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
