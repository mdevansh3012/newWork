import React, { useRef, useState, useEffect } from "react";
import { Music, Heart, Play, Pause, Volume2, VolumeX } from "lucide-react";

const MusicSection = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Try to autoplay when component mounts
  useEffect(() => {
    const attemptAutoplay = async () => {
      if (audioRef.current) {
        try {
          // Try to play the audio
          const playPromise = audioRef.current.play();

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Autoplay started successfully
                setIsPlaying(true);
                console.log("Autoplay started successfully");
              })
              .catch((error) => {
                // Autoplay was prevented
                console.log("Autoplay prevented:", error);
                // We'll need user interaction to play
              });
          }
        } catch (error) {
          console.log("Autoplay error:", error);
        }
      }
    };

    // Try to autoplay
    attemptAutoplay();

    // Add event listener for the first user interaction with the page
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => console.log("Play after interaction error:", err));
      }

      // Remove the event listeners after first interaction
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };

    // Add listener for various user interactions
    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    // Clean up the event listeners
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      id="music"
      className="scroll-snap-section py-24 px-6 flex flex-col items-center text-center relative z-10"
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-1/4 opacity-20">
        <Music size={24} className="text-pink-300" />
      </div>
      <div className="absolute bottom-10 right-1/4 opacity-20">
        <Music size={32} className="text-pink-300" />
      </div>
      <div className="absolute top-1/2 left-10 opacity-20 hidden md:block">
        <Heart size={24} className="text-pink-400" fill="#f9a8d4" />
      </div>
      <div className="absolute top-1/3 right-10 opacity-20 hidden md:block">
        <Heart size={20} className="text-pink-400" fill="#f9a8d4" />
      </div>

      {/* Content */}
      <div className="relative">
        <h2 className="text-3xl md:text-4xl font-dancing text-pink-300 mb-4 drop-shadow-glow relative inline-block">
          Our Special Song
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></span>
        </h2>
      </div>

      <p className="text-base md:text-lg text-pink-100 italic mb-8 max-w-xl">
        Every time this melody plays, I'm transported back to all our special
        moments together. This is the soundtrack to our love story.
      </p>

      {/* Custom audio player */}
      <div className="w-full max-w-md bg-gradient-to-r from-pink-900/30 to-purple-900/30 p-6 rounded-xl backdrop-blur-md shadow-lg ring-1 ring-pink-400/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Music size={20} className="text-pink-300 mr-2" />
            <span className="text-pink-200 font-medium">Perfect</span>
          </div>
          <div className="text-pink-200/70 text-sm italic">
            For Your Birthday ♡
          </div>
        </div>

        {/* Audio controls */}
        <div className="flex items-center justify-center mb-4">
          <button
            onClick={togglePlay}
            className="w-12 h-12 bg-pink-500/80 hover:bg-pink-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
          >
            {isPlaying ? (
              <Pause size={24} className="text-white" />
            ) : (
              <Play size={24} className="text-white ml-1" />
            )}
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-pink-800/50 rounded-full mb-4 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-pink-500 to-pink-300 ${
              isPlaying ? "animate-pulse-slow" : "w-0"
            }`}
          ></div>
        </div>

        {/* Volume control */}
        <div className="flex items-center justify-between">
          <button
            onClick={toggleMute}
            className="text-pink-300 hover:text-pink-200 transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div className="text-xs text-pink-200/70">Song for Yashvi</div>
        </div>

        {/* Autoplay notification when necessary */}
        {!hasInteracted && !isPlaying && (
          <div className="text-xs text-pink-300/90 mt-4 p-2 bg-pink-900/30 rounded-md animate-pulse">
            Click anywhere on the page to start the music ✨
          </div>
        )}

        {/* Hidden native audio element */}
        <audio
          ref={audioRef}
          className="hidden"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          loop
          autoPlay
        >
          <source src="/assets/music/Perfect.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      <p className="text-sm text-pink-200/80 italic mt-6 max-w-sm">
        Close your eyes and let the music take you back to our favorite moments
        together
      </p>

      {/* CSS animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0% {
            width: 0;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s infinite;
        }
      `}</style>
    </section>
  );
};

export default MusicSection;
