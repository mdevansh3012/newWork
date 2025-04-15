import React from "react";

const Landing = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="w-full h-full animate-twinkle" id="starfield"></div>
      </div>
      <h1 className="text-4xl md:text-6xl font-dancing text-white drop-shadow-glow z-10">
        To the moon and back, and beyond the stars — this is for you, Yashvi.
      </h1>
      <p className="mt-4 text-lg text-white/80 z-10">
        A gift coded with love under the stars ✨
      </p>
    </section>
  );
};

export default Landing;
