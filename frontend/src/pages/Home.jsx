import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Background from "../components/Background";
import Hero from "../components/Hero";

const Home = () => {
  const heroData = [
    { text: "30% OFF Limited Offer", text2: "Style That Speaks" },
    { text: "New Arrivals 2025", text2: "Trendy & Affordable" },
    { text: "Upgrade Your Wardrobe", text2: "Premium Quality" },
    { text: "Shop the Best Deals", text2: "Don't Miss Out!" },
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount === 3 ? 0 : prevCount + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-l from-gray-800 to-gray-900 overflow-hidden">
      {/* Background with animation */}
      <AnimatePresence mode="wait">
        <Background key={heroCount} heroCount={heroCount} />
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center h-full">
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>
    </div>
  );
};

export default Home;
