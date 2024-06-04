"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Homepage = () => {
  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-50 sm:mb-2">
        {/* IMAGE CONTAINER */}
        <div className="h-1/2 lg:h-full lg:w-1/2 relative ">
          <Image src="/hero.png" alt="" fill className="object-contain px-16" />
        </div>
        {/* TEXT CONTAINER */}
        <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-3  justify-center">
          {/* TITLE */}
          <h5 className="text-1xl md:text-2xl font-bold">
            Hey,
          </h5>
          <h1 className="text-4xl md:text-6xl font-bold">
          I&apos;m Parth Ahuja
          </h1>
          <h1 className="text-2xl md:text-4xl font-bold">
          Software Engineer
          </h1>
          {/* DESC */}
          <p className="md:text-xl">
            Welcome to my digital realm, where innovation meets precision. As a passionate software developer,
            I create elegant solutions to complex problems. Explore my portfolio to see a diverse array of 
            projects reflecting my dedication to quality, creativity, and technological excellence.
          </p>
          {/* BUTTONS */}
          <div className="w-full flex gap-4">
            <a href="/resume.pdf" target="_blank">
            <button className="p-4 rounded-lg ring-1 ring-black flex items-center gap-2" >
              <Image src="/resume.png" width={6} height={6} alt="Icon" className="h-6 w-6"/>
              <span>Resume</span>
            </button>
            </a>
            <a href="/contact">
            <button className="p-4 rounded-lg ring-1 ring-black bg-black text-white">
              Contact Me
            </button>
            </a>
            
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Homepage;
