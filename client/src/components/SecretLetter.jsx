import React, { useState, useEffect } from "react";

const SecretLetter = ({ isRevealed = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Auto-open the letter if isRevealed is true (e.g., when countdown hits zero)
  useEffect(() => {
    if (isRevealed && !hasAnimated) {
      setTimeout(() => {
        setIsOpen(true);
        setHasAnimated(true);
      }, 1000);
    }
  }, [isRevealed, hasAnimated]);

  const toggleLetter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      <div
        className={`w-full transition-all duration-1000 ease-in-out transform ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-pink-400 py-4 px-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white text-center w-full">
              The Secret Letter
            </h2>
          </div>

          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-4xl font-script text-pink-500 mb-6">
                Hey Sunshine,
              </p>

              <p className="italic text-gray-700 mb-6">
                if you've have arrived here then I guess this is it.
              </p>

              <p className="text-gray-800 mb-6">
                I've always wondered what it would be like to have someone by my
                side when life's chaos feels too much—someone who brings peace
                amid all that noise. Never in my wildest dreams did I think that
                kind of peace could come from a person. But it's you, Yashvi
                Shah. You're the calm to my chaos, the stars in my sky, the
                dream I never want to wake up from.
              </p>

              <p className="text-gray-800 mb-6">
                I know I've made mistakes along the way, but I promise I've
                never done anything to hurt you on purpose. And I know I'm
                rambling now, but here's what I'm trying to say: I love you,
                Yashvi Pookie Shah. I'm completely, honestly, and madly in love
                with you. So if there's any part of you that feels the same
                way... I woo.
                <span className="text-2xl ml-2">❤️</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {!isOpen && (
        <div
          className={`cursor-pointer transform transition-all duration-500 hover:scale-105 ${
            isRevealed ? "animate-bounce" : ""
          }`}
          onClick={toggleLetter}
        >
          <div className="bg-pink-400 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <div className="text-white text-5xl mb-4">💌</div>
            <h3 className="text-white text-xl font-bold">Secret Letter</h3>
            <p className="text-white text-sm mt-2">Click to open</p>
          </div>
        </div>
      )}

      {isOpen && (
        <button
          onClick={toggleLetter}
          className="mt-6 bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded-full transition-colors duration-300"
        >
          Close Letter
        </button>
      )}
    </div>
  );
};

export default SecretLetter;
