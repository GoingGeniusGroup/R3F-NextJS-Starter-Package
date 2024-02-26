"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="z-[20] mt-40 flex w-full flex-row items-center justify-center px-20"
    >
      {/* <div className="m-auto flex size-full flex-col justify-center gap-5 text-start">
        <motion.div
          variants={slideInFromTop}
          className="border border-[#7042f88b] px-[7px] py-[8px] opacity-[0.9]"
        >
          <SparklesIcon className="mr-[10px] size-5 text-[#b49bff]" />
          <h1 className="text-[13px]">
            Fullstack Developer Portfolio
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="mt-6 flex size-auto max-w-[600px] flex-col gap-6 text-6xl font-bold text-white"
        >
          <span>
            Providing
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              the best{" "}
            </span>
            project exprience
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="my-5 max-w-[600px] text-lg text-gray-400"
        >
          I&apos;m a Full Stack Software Engineer with experience in Website,
          Mobile, and Software development. Check out my projects and skills.
        </motion.p>
        <motion.a
          variants={slideInFromLeft(1)}
          className="max-w-[200px] cursor-pointer rounded-lg py-2 text-center text-white"
        >
          Learn More!
        </motion.a>
      </div> */}
      <div className="mr-[-180px] flex size-full flex-col items-end">
        <Image
          src="https://models.readyplayer.me/658be9e8fc8bec93d06806f3.png?camera=fullbody?quality=100?"
          alt="work icons"
          height={650}
          width={650}
        />
      </div>
    </motion.div>
  );
};

export default HeroContent;
