'use client'
import { motion } from "framer-motion";
import { useState } from "react";

const CardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }
  return (
    <div className="flex h-[800px] cursor-pointer items-center justify-center bg-black">
      <div
        className="flip-card h-[360px] w-[600px] rounded-md"
        onClick={handleFlip}
      >
        <motion.div
          className="flip-card-inner size-[100%]"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.6, animationDirection: "normal" }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <div
            className="flip-card-front size-[100%] rounded-lg border-[1px] bg-cover p-4 text-white"
            style={{ backgroundImage: `url(/card/SpaceCity.jpg)` }}
          >
            <h1 className="text-2xl">Sky</h1>
            <p>Live on top of the world</p>
          </div>

          <div
            className="flip-card-back size-[100%] rounded-lg border-[1px] bg-cover p-4 text-white"
            style={{ backgroundImage: `url(/card/SpaceCity1.jpg)` }}
          >
            <h1 className="text-2xl">Earth</h1>
            <p>Or in the maze of the city</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CardFlip;