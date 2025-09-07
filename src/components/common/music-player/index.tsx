"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"
import FavIcon from "@/icon/favIcon"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Track time updates
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration || 0)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateTime)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateTime)
    }
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Calculate progress percentage
  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="w-full mx-auto">
      <div className="relative w-full rounded-full border px-2 py-[6px] bg-gray-800 shadow-lg overflow-hidden">
        {/* Progress background */}
        <div
          className="absolute top-0 left-0 h-full bgOne transition-all duration-300"
          style={{ width: `${progress}%` }}
        />

        <div className="relative flex items-center justify-between">
          {/* Play/Pause Button */}
          <Button
            onClick={togglePlay}
            variant="ghost"
            size="sm"
            type="button"
            className="h-8 w-8 p-0 cursor-pointer text-white hover:bg-white/20 rounded-full mr-4"
          >
            {isPlaying ? (
              <FavIcon name="pluse" className="size-9" />
            ) : (
              <FavIcon className="size-9" name="play" />
            )}
          </Button>

          {/* Waveform (static for now) */}
          <FavIcon name="musicBers1"/>

          {/* Time counter */}
          <span className="text-sm text-secondery-figma ml-3">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Volume/Mute Button */}
          <Button
            onClick={toggleMute}
            variant="ghost"
            size="sm"
            type="button"
            className="h-8 w-8 p-0 hover:bg-transparent hover:text-[#b7b8b9] text-[#b7b8b9] rounded-full ml-4"
          >
            {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          </Button>

          {/* Hidden Audio Element */}
          <audio ref={audioRef}>
            <source src="/original-song-239607.mp3" type="audio/mpeg" />
            <source src="/original-song-239607.mp3" type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  )
}
