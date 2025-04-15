import { useEffect, useState } from "react";
import Header from "./components/Header";
import LandingSection from "./components/LandingSection";
import JourneySection from "./components/JourneySection";
import MusicSection from "./components/MusicSection";
import CheesecakeSection from "./components/CheesecakeSection";
import WishSection from "./components/WishSection";
import CountdownSection from "./components/CountdownSection";
import Footer from "./components/Footer";
import StarryBackground from "./components/StarrySky";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-montserrat text-white min-h-screen overflow-x-hidden">
      <StarryBackground />

      <div className="scroll-snap-container h-screen overflow-y-auto overflow-x-hidden relative z-10">
        <Header />
        <LandingSection />
        {loaded && (
          <>
            <JourneySection />
            <MusicSection />
            <CheesecakeSection />
            <WishSection />
            <CountdownSection />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
