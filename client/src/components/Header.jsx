import React, { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation links
  const navLinks = [
    { name: "Journey", href: "#journey" },
    { name: "Music", href: "#music" },
    { name: "Wishes", href: "#wishes" },
    { name: "Countdown", href: "#countdown" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-pink-500/90 backdrop-blur-md py-2 shadow-lg"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-3xl font-bold text-white">
              <span className="inline-block">Y</span>
              <span className="inline-block text-pink-200">&</span>
              <span className="inline-block">K</span>
            </div>
            <div className="ml-2 hidden md:block">
              <span className="text-white/70 text-sm font-medium">
                Forever & Always
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-white hover:text-pink-400 font-medium transition-all duration-200 border-b-2 ${
                  isScrolled
                    ? "border-transparent hover:border-white"
                    : "border-transparent hover:border-pink-300"
                }`}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-white hover:bg-pink-100 text-pink-500 px-5 py-2 rounded-full font-medium transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
              Our Letter
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 px-2 mt-2 rounded-lg bg-pink-600/95 backdrop-blur-md animate-fadeIn">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-pink-400 py-2 px-3 rounded hover:bg-pink-500/50 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#secret-letter"
                className="bg-white text-pink-500 hover:bg-pink-100 py-2 px-3 rounded text-center font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Letter
              </a>
            </nav>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;
