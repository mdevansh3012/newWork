import { useEffect, useState, useRef } from "react";
import { createStars } from "../lib/createStars";

const StarryBackground = () => {
  const [stars, setStars] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const { innerWidth, innerHeight } = window;
      setStars(createStars(innerWidth, innerHeight));
    }

    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setStars(createStars(innerWidth, innerHeight));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 bg-gradient-to-b from-[#121442] to-[#0F0F20]"
    >
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;
