import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Heart, Cake, Gift, Stars } from "lucide-react";

const images = [
  { src: "/assets/images/yashvi1.jpg", alt: "At Blue Oven Cafe" },
  { src: "/assets/images/yashvi2.jpg", alt: "SkyBlue Mall moment" },
  { src: "/assets/images/yashvi3.jpg", alt: "Theobroma Cafe smile" },
  { src: "/assets/images/yashvi4.jpg", alt: "Nin's Kitchen dinner" },
];

const JourneySection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    arrows: true,
    fade: true,
    customPaging: function () {
      return (
        <div className="w-3 h-3 mx-1 rounded-full bg-pink-300 opacity-50 hover:opacity-100 transition-opacity duration-300"></div>
      );
    },
  };

  return (
    <section
      id="journey"
      className="scroll-snap-section py-20 px-4 bg-gradient-to-br from-pink-100/20 via-purple-200/20 to-indigo-200/20 backdrop-blur-lg"
    >
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Birthday decorative elements */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <Cake size={40} className="text-pink-400" fill="#f9a8d4" />
        </div>
        <div className="absolute -left-8 top-20 hidden md:block">
          <Gift size={28} className="text-pink-300 opacity-70" />
        </div>
        <div className="absolute -right-8 top-24 hidden md:block">
          <Stars size={28} className="text-pink-300 opacity-70" />
        </div>
        <div className="absolute bottom-10 left-10 hidden md:block">
          <Heart
            size={24}
            className="text-pink-400 opacity-60"
            fill="#f9a8d4"
          />
        </div>
        <div className="absolute bottom-20 right-10 hidden md:block">
          <Heart
            size={20}
            className="text-pink-400 opacity-60"
            fill="#f9a8d4"
          />
        </div>

        {/* Main content */}
        <h2 className="text-4xl md:text-5xl font-dancing text-pink-400 mb-3 drop-shadow-glow relative inline-block">
          Happy Birthday, Yashvi
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></span>
        </h2>

        <p className="text-base md:text-lg text-pink-200 italic mb-3 max-w-xl mx-auto">
          Celebrating another year of you lighting up my world
        </p>

        <p className="text-sm md:text-base text-pink-100 mb-12 max-w-xl mx-auto">
          From our first moments together to today, every memory with you is a
          treasure. On your special day, here's a glimpse of our beautiful
          journey.
        </p>

        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl transform rotate-1"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-pink-500/10 to-purple-500/10 rounded-2xl transform -rotate-1"></div>

          <div className="relative z-10 px-4 py-6">
            <Slider {...settings} className="birthday-slider">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="px-2 outline-none focus:outline-none"
                >
                  <div className="rounded-2xl overflow-hidden shadow-xl ring-2 ring-pink-400/30 backdrop-blur-md transition-all duration-500 hover:ring-pink-400/60 hover:shadow-2xl hover:shadow-pink-400/20">
                    <div className="relative aspect-w-4 aspect-h-3 bg-gradient-to-b from-black/10 to-black/5">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto max-h-96 object-contain rounded-t-2xl"
                      />
                      {/* Add birthday badge to one of the images */}
                      {index === 0 && (
                        <div className="absolute top-3 right-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full transform rotate-12 shadow-lg">
                          Birthday Girl!
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-3 bg-gradient-to-r from-pink-900/30 to-purple-900/30 backdrop-blur-sm rounded-b-2xl">
                      <p className="text-sm md:text-base text-pink-100 italic font-light">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="max-w-md mx-auto px-6 py-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl shadow-lg">
          <p className="text-sm md:text-base text-pink-100 italic">
            On this special day, I celebrate not just the day you were born, but
            every moment I've been lucky enough to share with you. Here's to
            many more beautiful chapters together.
          </p>
          <p className="mt-3 text-sm md:text-base text-pink-200 font-medium">
            Forever yours ♡
          </p>
        </div>
      </div>

      {/* Add custom CSS for the slider dots and arrows */}
      <style jsx>{`
        :global(.birthday-slider .slick-dots) {
          bottom: -40px;
        }
        :global(.birthday-slider .slick-prev),
        :global(.birthday-slider .slick-next) {
          width: 30px;
          height: 30px;
          z-index: 20;
        }
        :global(.birthday-slider .slick-prev:before),
        :global(.birthday-slider .slick-next:before) {
          color: #f472b6;
          font-size: 30px;
          opacity: 0.75;
        }
        :global(.birthday-slider .slick-prev:hover:before),
        :global(.birthday-slider .slick-next:hover:before) {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default JourneySection;
