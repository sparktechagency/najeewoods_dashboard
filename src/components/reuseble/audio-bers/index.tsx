"use client";
import { useEffect, useRef, useState } from "react";

interface AudioBersProps {
  audioSource: any;
  uniqueId?: string; // unique ID per card
  children?: (params: {
    isPlaying: boolean;
    duration: string;
    progress: number;
    togglePlay: (e: any) => void;
    handleProgressBarClick: (e: React.MouseEvent) => void;
  }) => React.ReactNode;
}

export default function AudioBers({
  audioSource,
  uniqueId,
  children,
}: AudioBersProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");
  const [progress, setProgress] = useState(0);

  const audioLink = process.env.NEXT_PUBLIC_IMG_URL + audioSource;

  // 🔊 Toggle play/pause
  const togglePlay = (e: any) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // 🔈 Pause all other audios
      window.dispatchEvent(
        new CustomEvent("pauseAllAudios", { detail: uniqueId })
      );
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Format seconds to mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Update progress & duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration)
        setProgress((audio.currentTime / audio.duration) * 100);
    };
    const handleLoadedMetadata = () => setDuration(formatTime(audio.duration));
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    // 🧠 Listen for global pauseAllAudios event
    const handlePauseAll = (event: CustomEvent) => {
      if (event.detail !== uniqueId && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener("pauseAllAudios", handlePauseAll as EventListener);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      window.removeEventListener(
        "pauseAllAudios",
        handlePauseAll as EventListener
      );
    };
  }, [uniqueId]);

  // Click to seek
  const handleProgressBarClick = (e: React.MouseEvent) => {
    if (isPlaying) {
      const bar = e.currentTarget as HTMLElement;
      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * (audioRef.current?.duration || 0);
      if (audioRef.current) audioRef.current.currentTime = newTime;
    }
  };

  return (
    <>
      {children?.({
        isPlaying,
        duration,
        progress,
        togglePlay,
        handleProgressBarClick,
      })}
      <audio ref={audioRef}>
        <source src={audioLink} type="audio/mpeg" />
        <source src={audioLink} type="audio/ogg" />
      </audio>
    </>
  );
}
