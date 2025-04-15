import { useEffect, useState, useRef } from "react";

const LandingSection = () => {
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [constellationVisible, setConstellationVisible] = useState(false);
  const svgRef = useRef(null);

  const points = [
    { x: 50, y: 100 }, // Y start
    { x: 100, y: 50 }, // Y end / A start
    { x: 125, y: 150 }, // A middle
    { x: 150, y: 50 }, // A end / S start
    { x: 175, y: 75 }, // S middle 1
    { x: 150, y: 100 }, // S middle 2
    { x: 175, y: 125 }, // S middle 3
    { x: 150, y: 150 }, // S end / H start
    { x: 175, y: 100 }, // H middle
    { x: 200, y: 50 }, // H top
    { x: 200, y: 150 }, // H bottom / V start
    { x: 225, y: 100 }, // V middle
    { x: 250, y: 150 }, // V end / I start
    { x: 250, y: 50 }, // I end
  ];

  useEffect(() => {
    const quoteTimer = setTimeout(() => {
      setQuoteVisible(true);
    }, 1000);

    const constellationTimer = setTimeout(() => {
      setConstellationVisible(true);
      createConstellation();
    }, 2000);

    return () => {
      clearTimeout(quoteTimer);
      clearTimeout(constellationTimer);
    };
  }, []);

  const createConstellation = () => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    points.forEach((point, i) => {
      const dot = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      dot.setAttribute("cx", point.x.toString());
      dot.setAttribute("cy", point.y.toString());
      dot.setAttribute("r", "3");
      dot.setAttribute("fill", "#FFD700");
      dot.classList.add("constellation-dot");
      dot.style.setProperty("--delay", `${i * 0.1}s`);
      svg.appendChild(dot);
    });

    for (let i = 0; i < points.length - 1; i++) {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", points[i].x.toString());
      line.setAttribute("y1", points[i].y.toString());
      line.setAttribute("x2", points[i + 1].x.toString());
      line.setAttribute("y2", points[i + 1].y.toString());
      line.setAttribute("stroke", "rgba(255, 215, 0, 0.5)");
      line.setAttribute("stroke-width", "1");
      line.classList.add("constellation-line");
      line.style.setProperty("--delay", `${i * 0.1 + 1}s`);
      svg.appendChild(line);
    }
  };

  return (
    <section
      id="landing"
      className="scroll-snap-section h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1A2E]/30 z-0" />

      <h1 className="text-4xl md:text-6xl font-dancing text-center mb-2 animate-float text-[#FFC0CB] z-10">
        Moonlight for Yashvi
      </h1>

      <p
        className={`text-xl md:text-2xl text-center max-w-2xl mb-12 text-[#F8F8FF] italic z-10 transition-opacity duration-1000 ${
          quoteVisible ? "opacity-100 animate-slide-up" : "opacity-0"
        }`}
      >
        "To the moon and back, and beyond the stars — this is for you, Yashvi."
      </p>

      <div
        className={`w-full max-w-md h-64 relative mb-8 transition-opacity duration-1000 ${
          constellationVisible ? "opacity-100 animate-slide-up" : "opacity-0"
        }`}
      >
        <svg
          ref={svgRef}
          id="constellation"
          viewBox="0 0 400 200"
          className="w-full h-full"
        ></svg>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-80 animate-pulse z-10">
        <p className="mb-2 text-sm">Scroll to explore</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-down"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>
  );
};

export default LandingSection;
