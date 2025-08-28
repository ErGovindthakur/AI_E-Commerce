// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";
import bg4 from "../assets/bg4.jpg";

const Background = ({ heroCount }) => {
  let bgImage;

  if (heroCount === 0) {
    bgImage = bg1;
  } else if (heroCount === 1) {
    bgImage = bg2;
  } else if (heroCount === 3) {
    bgImage = bg3;
  } else {
    bgImage = bg4;
  }

  return (
    <motion.img
      key={heroCount} // important → triggers re-render & animation on change
      src={bgImage}
      alt={`background_${heroCount}`}
      className="w-full h-full object-cover absolute top-0 left-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    />
  );
};

export default Background;
