'use client'
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const CardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;  
    containerRef.current.style.transform = `translate(-2.1rem, -2ex);`;
  };
  return (
    <div className="flex h-[800px] cursor-pointer items-center justify-center">
      <div
        className="flip-card h-[180px] w-[300px] rounded-md"
        onClick={handleFlip}
      >
        <motion.div
          ref={containerRef}
          className="flip-card-inner size-[100%]"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.6, animationDirection: "normal" }}
          onAnimationComplete={() => setIsAnimating(false)}
          onMouseEnter={handleMouseEnter}
        >
          <div
            className="flip-card-front size-[100%] rounded-lg border-none bg-cover p-4 text-white"
            style={{ backgroundImage: `url(/card/SpaceCity.jpg)` }}
          >
            <h1 className="text-2xl">Going Genius</h1>
            <p>Join the group of geniuses</p>
          </div>

          <div
            className="flip-card-back size-[100%] rounded-lg border-none bg-cover p-4 text-white"
            style={{ backgroundImage: `url(/card/SpaceCity1.jpg)` }}
          >
            <p className="text-sm leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod animi iusto corrupti blanditiis tempore vitae incidunt deserunt natus?</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CardFlip;