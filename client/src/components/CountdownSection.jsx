import React, { useEffect, useState } from "react";
import SecretLetter from "./SecretLetter"; // Import the SecretLetter component

const CountdownSection = () => {
  const birthday = new Date("2025-04-17T18:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = birthday - now;

      // Check if countdown is complete
      if (distance < 0) {
        clearInterval(interval);
        setIsTimerComplete(true);
        setShowConfetti(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });

      // Pulse animation every minute change
      if (Math.floor((distance / (1000 * 60)) % 60) !== timeLeft.minutes) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft.minutes]);

  // Calculate percentage of time passed for progress indicator
  const totalTimeFrame = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
  const elapsed = totalTimeFrame - (birthday - new Date().getTime());
  const percentComplete = Math.min(
    100,
    Math.max(0, (elapsed / totalTimeFrame) * 100)
  );

  // Simple confetti component
  const Confetti = () => {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => {
          const size = Math.random() * 10 + 5;
          const left = Math.random() * 100;
          const animationDuration = Math.random() * 3 + 2;
          const color = [
            "bg-pink-500",
            "bg-purple-500",
            "bg-yellow-400",
            "bg-blue-400",
          ][Math.floor(Math.random() * 4)];

          return (
            <div
              key={i}
              className={`absolute ${color} rounded-sm`}
              style={{
                width: size + "px",
                height: size + "px",
                left: left + "%",
                top: "-20px",
                animation: `confetti ${animationDuration}s ease-in-out ${
                  Math.random() * 3
                }s forwards`,
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <section
      id="countdown"
      className="scroll-snap-section py-20 px-6 text-center relative z-10"
    >
      {showConfetti && <Confetti />}

      {!isTimerComplete ? (
        <div
          className={`transition-all duration-300 ${
            isAnimating ? "scale-105" : "scale-100"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pink-300 mb-4">
            Countdown to Your Special Day
          </h2>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-white/80 mb-8">
              The excitement builds with every passing moment! ✨
            </p>

            <div className="grid grid-cols-4 gap-4 mb-10">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/10"
                >
                  <div className="text-5xl font-bold text-white mb-2">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-pink-200 font-medium uppercase tracking-wide text-sm">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative h-4 bg-white/10 rounded-full overflow-hidden w-full max-w-xl mx-auto">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"
                style={{ width: `${percentComplete}%` }}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center bg-pink-500/30 backdrop-blur-sm px-6 py-2 rounded-full">
                <span className="text-pink-200 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <span className="text-white text-sm">
                  {new Date(birthday).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 mb-16 transition-all duration-1000 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold text-pink-300 mb-8 animate-pulse">
            The Day Has Arrived! 🎉
          </h2>
          <SecretLetter isRevealed={true} />
        </div>
      )}

      <div className="absolute -bottom-16 left-0 right-0 h-32 bg-gradient-to-t from-pink-500/10 to-transparent z-0" />

      {/* Add keyframes for confetti animation */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in;
        }
      `}</style>
    </section>
  );
};

export default CountdownSection;
