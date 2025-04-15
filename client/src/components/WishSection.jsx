import React, { useState, useCallback, useMemo } from "react";
import { Send, Heart } from "lucide-react";

// Stars are placed in their own layer to prevent repaints when scrolling
const StarBackground = React.memo(() => {
  const stars = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      key: i,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 0.5 + 0.5}rem`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
      },
    }));
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      {stars.map((star) => (
        <div
          key={star.key}
          className="absolute text-yellow-100 opacity-70 star-twinkle"
          style={star.style}
        >
          ✦
        </div>
      ))}
    </div>
  );
});

// Shooting star effect (optimized to prevent layout thrashing)
const ShootingStar = React.memo(() => (
  <div className="shooting-star">
    <div className="shooting-star-trail"></div>
  </div>
));

// The form component with optimized event handling
const WishForm = React.memo(({ onSubmit, wish, onChange }) => {
  const characterCount = wish.length;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="relative">
        <textarea
          value={wish}
          onChange={onChange}
          placeholder="Tell me your birthday wish, Yashvi..."
          className="w-full p-4 rounded-lg bg-black/20 text-pink-100 placeholder-pink-300/50 border border-pink-400/30 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400/50"
          rows="5"
          maxLength={150}
        />
        <div className="absolute bottom-2 right-2 text-xs text-pink-300/70">
          {characterCount}/150
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          className="submit-button flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg"
        >
          <span>Send my wish</span>
          <Send size={16} />
        </button>
      </div>
    </form>
  );
});

// Confirmation component with reduced animations
const WishConfirmation = React.memo(({ wish }) => (
  <div className="static-card relative bg-gradient-to-r from-pink-900/40 to-purple-900/40 p-8 rounded-xl shadow-lg ring-1 ring-pink-400/30">
    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
      <Heart size={28} className="text-pink-400" fill="#f9a8d4" />
    </div>

    <p className="text-pink-100 text-xl italic mb-4">
      🌟 Your wish has been sent to the cosmos, my Sunshine.
    </p>

    <div className="text-pink-200/80 text-sm">
      May your birthday be as magical as your wish.
    </div>

    <div className="mt-6 py-2 px-4 bg-pink-900/20 rounded-lg border border-pink-400/20">
      <p className="text-pink-200/90 italic">{wish}</p>
    </div>
  </div>
));

// Main component optimized for smooth scrolling
const WishSection = () => {
  const [wish, setWish] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showShootingStar, setShowShootingStar] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (wish.trim()) {
        // Batch state updates to minimize renders
        requestAnimationFrame(() => {
          setSubmitted(true);
          setShowShootingStar(true);
          setTimeout(() => {
            setShowShootingStar(false);
          }, 1000);
        });
      }
    },
    [wish]
  );

  const handleTextChange = useCallback((e) => {
    // Debounce state updates for text input
    const newValue = e.target.value;
    requestAnimationFrame(() => {
      setWish(newValue);
    });
  }, []);

  // Static section heading that never changes
  const sectionHeading = useMemo(
    () => (
      <>
        <h2 className="text-3xl md:text-5xl font-dancing text-pink-300 mb-4 relative inline-block">
          Wish Upon a Star
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></span>
        </h2>

        <p className="text-base md:text-lg text-pink-100 italic mb-10 max-w-xl mx-auto">
          Share your birthday wish, and I'll send it to the stars above—just for
          you.
        </p>
      </>
    ),
    []
  );

  return (
    <section
      id="wishes"
      className="py-24 px-6 text-center relative z-10 overflow-hidden"
    >
      {/* Static background stars */}
      <StarBackground />

      {/* Conditionally render shooting star animation */}
      {showShootingStar && <ShootingStar />}

      <div className="relative max-w-2xl mx-auto">
        {sectionHeading}

        <div className="max-w-lg mx-auto">
          {!submitted ? (
            <div className="static-card bg-gradient-to-r from-pink-900/30 to-purple-900/30 p-6 rounded-xl shadow-lg ring-1 ring-pink-400/30">
              <WishForm
                onSubmit={handleSubmit}
                wish={wish}
                onChange={handleTextChange}
              />
            </div>
          ) : (
            <WishConfirmation wish={wish} />
          )}
        </div>
      </div>

      {/* Optimized static CSS with no dynamic JavaScript interactions */}
      <style jsx>{`
        /* Force GPU acceleration for smoother scrolling */
        section {
          transform: translateZ(0);
          will-change: transform;
        }

        /* Optimize star animations */
        .star-twinkle {
          animation: twinkle-fixed ease-in-out infinite;
          will-change: opacity;
        }

        /* Static animations that don't require JavaScript */
        @keyframes twinkle-fixed {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        /* Optimized shooting star that doesn't affect scrolling */
        .shooting-star {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(to right, transparent, #f9a8d4);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: shooting 1s ease-in forwards;
          z-index: 30;
          box-shadow: 0 0 8px 4px rgba(249, 168, 212, 0.6);
          will-change: transform, opacity;
          pointer-events: none;
        }

        .shooting-star-trail {
          position: absolute;
          width: 50px;
          height: 1px;
          background: linear-gradient(to right, transparent, #f9a8d4);
          transform: translateX(-100%);
        }

        @keyframes shooting {
          0% {
            transform: translate(-100%, 100%);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(100%, -100%);
            opacity: 0;
          }
        }

        /* Button hover effects that don't cause repaints */
        .submit-button {
          transition: transform 0.2s ease;
        }

        .submit-button:hover {
          transform: scale(1.05);
        }

        /* Static cards that don't cause repaints on hover */
        .static-card {
          transition: transform 0.3s ease;
        }

        .static-card:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default React.memo(WishSection);
