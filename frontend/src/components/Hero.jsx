import { FaCircle } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion"

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  const slides = [0, 1, 2, 3]; // for the dots

  return (
    <div className="w-full md:w-[40%] h-full relative flex flex-col justify-center px-6 md:px-12">
      {/* Hero Text */}
      <motion.div
        key={heroCount} // animation triggers when heroCount changes
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-white font-bold text-2xl md:text-4xl lg:text-6xl space-y-4"
      >
        <p>{heroData.text}</p>
        <p className="text-orange-400">{heroData.text2}</p>
      </motion.div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4">
        {slides.map((index) => (
          <FaCircle
            key={index}
            className={`cursor-pointer w-3 h-3 md:w-4 md:h-4 transition-colors duration-300 ${
              heroCount === index ? "fill-orange-400" : "fill-white"
            }`}
            onClick={() => setHeroCount(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
