"use client";
import Brain from "@/components/brain";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const AboutPage = () => {
  const containerRef = useRef();

  const { scrollYProgress } = useScroll({ container: containerRef });

  const skillRef = useRef();
  // const isSkillRefInView = useInView(skillRef, {once:true});
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  const experienceRef = useRef();
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  const educationRef = useRef();
  const isEducationRefInView = useInView(educationRef, { margin: "-100px" });

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      {/* CONTAINER */}
      <div className="h-full overflow-scroll lg:flex" ref={containerRef}>
        {/* TEXT CONTAINER */}
        <div className="p-4 sm:p-8 md:p-12 lg:p-20 xl:p-16 flex flex-col gap-24 md:gap-32 lg:gap-48 xl:gap-64 lg:w-2/3 lg:pr-0 xl:w-1/2">
          {/* BIOGRAPHY CONTAINER */}
          <div className="flex flex-col gap-6 justify-center">
            {/* BIOGRAPHY TITLE */}
            <h1 className="font-bold text-2xl ">ABOUT</h1>
            {/* BIOGRAPHY DESC */}
            <p className="text-lg justify-text">
            I am an adaptable and enthusiastic software developer with a BE in Computer Science. I have a strong commitment to learning and staying current with new and emerging technologies. Throughout my college years, I completed numerous projects and internships, which have honed my skills and deepened my understanding of the field. I thrive on challenges and excel in diverse environments, always dedicated to continuous self-improvement. I blend technical expertise with creative problem-solving to bring innovative solutions to life. My portfolio showcases a wide array of projects that highlight my passion for coding, attention to detail, and commitment to delivering high-quality software. Eager to contribute my skills and embrace new opportunities, I aim to make a meaningful impact within an organization.
            </p>
            {/* BIOGRAPHY SIGN SVG*/}
            <div className="self-end">
              <svg
                width="170"
                height="77"
                viewBox="0 0 370 114"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 52C7.48837 59.989 8.56735 68.3011 10.4444 76.4444C12.5908 85.7557 15.9336 94.8317 17.7222 104.222C18.2054 106.759 13.7609 100.754 12.5 98.5C8.32822 91.0441 6.3315 82.8694 4.22223 74.6667C0.564431 60.4419 -1.36764 35.5621 19.9444 37.3889C31.9949 38.4218 43.5556 53.9216 43.5556 65.5556C43.5556 74.9068 35.2899 80.5238 26.7778 81.8333C21.6369 82.6242 20.1304 81.2608 18 77M51 82V86M70 30C62.2701 30.8282 37.4661 52.9597 45.4444 61.7778C52.3023 69.3575 64.689 62.9243 72.5556 66.5C78.8839 69.3765 81 75.4818 81 82.5C81 87.8181 75.3748 90.5417 71 92M97 83L96 82M106 35C107.067 35.2667 108.026 35.7638 108.89 36.4427M108.89 36.4427C114.93 41.1844 116.383 54.795 118 60.7222C118.167 61.3355 118.347 61.9373 118.539 62.5293M108.89 36.4427C109.128 37.3973 109.34 38.2959 109.5 39.1111C111.164 47.6169 114.69 55.0721 118.539 62.5293M108.89 36.4427C107.679 31.566 105.832 25.226 107.222 21.0556C109.475 14.296 115.673 17.9965 118.778 21.2222C126.887 29.6469 132.874 43.9847 136.778 54.8889C137.915 58.065 139.146 59.6639 141 62.4444C144.082 67.0671 147.266 69.8256 143 63M118.539 62.5293C119.779 66.3621 121.514 69.79 123.556 73.3333C125.292 76.3465 124.886 74.8836 123.722 72.5556C122.02 69.1517 120.248 65.8403 118.539 62.5293ZM102 46C104.646 46 106.986 44.5347 109.389 43.5556C112.926 42.1147 116.692 42.1567 120.222 40.7778C125.442 38.7388 136.671 37.5428 138.778 31.2222C139.893 27.8759 139.575 20.9236 138.778 17.5556C138.337 15.6938 132.831 3.28474 135.667 9.33333C139.469 17.4441 145.913 24.3326 149.056 32.7778C149.264 33.3375 149.469 33.8907 149.673 34.4378M149.673 34.4378C152.547 42.1617 155.052 48.674 160 55.3889C163.065 59.5489 157.664 54.7748 156.444 53.5556C152.945 50.0557 151.439 46.2493 150.5 41.5556C150.179 39.9517 149.563 36.9715 149.673 34.4378ZM149.673 34.4378C149.783 31.8984 150.623 29.8075 153.222 30C158.406 30.384 165.768 38.0995 168.444 42.2222C172.211 48.0245 176 45.8456 176 40C176 34.4477 174.503 30.6252 170.778 26.2222C167.27 22.0772 178.148 34.4129 180.444 39.3333C181.979 42.6214 185.945 42.5425 188.5 40.5556C190.91 38.6808 191 34.1906 191 31.2222C191 26.6121 189.19 26.7388 187.222 23C183.817 16.5306 189.345 24.2002 190.444 26.5556C194.473 35.1877 199 26.666 199 20.5C199 18.6772 198.899 16.8202 199 15C199.143 12.4303 204.48 19.8674 204.889 20.5556C207.359 24.7093 209.253 29.6376 210.782 34.8131M210.782 34.8131C213.124 42.7424 214.611 51.2519 216 58.4444C216.171 59.3283 218.646 69.7514 218.278 69.8333C214.925 70.5784 212.526 65.6083 211.444 63.4444C208.046 56.6467 205.333 49.0266 208.778 42C210.02 39.4653 210.423 37.2899 210.782 34.8131ZM210.782 34.8131C210.888 34.0747 210.991 33.3095 211.111 32.5C211.608 29.1477 214.389 26.4379 216.309 23.7469M216.309 23.7469C216.355 23.6831 216.4 23.6193 216.444 23.5556C220.112 18.302 224 13.0617 227.823 7.95882M216.309 23.7469C212.767 16.8755 212.697 7.26445 219.056 3.55556C221.025 2.40689 224.289 3 226.5 3C231.542 3 230.47 4.42838 228.514 7.03649L228.5 7.05556C228.36 7.24285 228.219 7.43034 228.078 7.61802M216.309 23.7469C218.002 27.0306 220.488 29.6886 223.444 30.7778C228.559 32.6621 232 23.5507 232 20C232 17.0142 231.221 13.0975 229.5 10.6111C229.355 10.4014 228.149 8.74898 227.823 7.95882M227.823 7.95882C227.908 7.84515 227.993 7.73155 228.078 7.61802M227.823 7.95882C227.678 7.60803 227.707 7.42721 228.078 7.61802M228.078 7.61802C228.106 7.63217 228.135 7.64835 228.167 7.66667C230.767 9.1835 238.822 21.0792 241.5 19.8889C244.352 18.6213 244.362 14.3188 247 13M194 2C192.785 2.13495 192 3.87512 192 3" 
                stroke="black" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </div>
            {/* BIOGRAPHY SCROLL SVG */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
            >
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"
              ></path>
              <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#000000"
                strokeWidth="1"
              ></path>
            </motion.svg>
          </div>
          {/* SKILLS CONTAINER */}
          <div className="flex flex-col gap-14 justify-center" ref={skillRef}>
            {/* SKILL TITLE */}
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl"
            >
              SKILLS
            </motion.h1>
            {/* SKILL LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              className="flex gap-4 flex-wrap"
            >
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                HTML5
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                CSS3
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                TailwindCSS
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                JavaScript
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Next.js
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                PHP
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Bootstrap
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                MongoDB
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                MySQL
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Python
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                C Programming
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                WordPress
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Firebase
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Git
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Figma
              </div>
              <div className="rounded  p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black">
                Framer Motion
              </div>

            </motion.div>
            {/* SKILL SCROLL SVG */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
            >
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"
              ></path>
              <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#000000"
                strokeWidth="1"
              ></path>
            </motion.svg>
          </div>
          {/* EXPERIENCE CONTAINER */}
          <div
            className="flex flex-col gap-12 justify-center "
            ref={experienceRef}
          >
            {/* EXPERIENCE TITLE */}
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl"
            >
              EXPERIENCE
            </motion.h1>
            {/* EXPERIENCE LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              className=""
            >
              {/* EXPERIENCE LIST ITEM */}
              <div className="flex justify-between h-48">
                {/* LEFT */}
                <div className="w-1/2 ">
                  {/* JOB TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    PHP Developer Intern
                  </div>
                  {/* JOB DESC */}
                  <div className="p-3 text-sm italic">
                    In this intern i have developed web based application using php frameworks.{" "}
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-red-400 text-sm font-semibold">
                    27th July 2023 - 10th Aug 2023
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                    CreArt Solution
                  </div>
                </div>
                {/* CENTER */}
                <div className="w-1/6 flex justify-center">
                  {/* LINE */}
                  <div className="w-1 h-full bg-gray-600 rounded relative">
                    {/* LINE CIRCLE */}
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="w-1/2 "></div>
              </div>
              {/* EXPERIENCE LIST ITEM */}
              <div className="flex justify-between h-48">
                {/* LEFT */}
                <div className="w-1/2 "></div>
                {/* CENTER */}
                <div className="w-1/6 flex justify-center">
                  {/* LINE */}
                  <div className="w-1 h-full bg-gray-600 rounded relative">
                    {/* LINE CIRCLE */}
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="w-1/2 ">
                  {/* JOB TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Android Developer Intern
                  </div>
                  {/* JOB DESC */}
                  <div className="p-3 text-sm italic">
                    In this Internship i have learned Android Development.{" "}
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-red-400 text-sm font-semibold">
                    1st july 2023 - 27th July 2023{" "}
                  </div>
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                    INTERNSAVY
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Experience SCROLL SVG */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
            >
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"
              ></path>
              <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#000000"
                strokeWidth="1"
              ></path>
            </motion.svg>
          </div>
          {/* EDUCATION CONTAINER */}
          <div
            className="flex flex-col gap-12 justify-center pb-48"
            ref={educationRef}
          >
            {/* Education TITLE */}
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isEducationRefInView ? { x: "0" } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl"
            >
              EDUCATION
            </motion.h1>
            {/* education LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isEducationRefInView ? { x: "0" } : {}}
              className=""
            >
              {/* Education LIST ITEM */}
              <div className="flex justify-between h-48">
                {/* LEFT */}
                <div className="w-1/2 ">
                  {/* Education TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    BE - Computer Science
                  </div>
                  {/* University Name */}
                  <div className="p-3 text-sm italic">
                    Marwadi Education Foundation - GTU{" "}
                  </div>
                  {/* Duration */}
                  <div className="p-3 text-red-400 text-sm font-semibold">
                    2020 - 2024
                  </div>
                </div>
                {/* CENTER */}
                <div className="w-1/6 flex justify-center">
                  {/* LINE */}
                  <div className="w-1 h-full bg-gray-600 rounded relative">
                    {/* LINE CIRCLE */}
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="w-1/2 "></div>
              </div>
              {/* EXPERIENCE LIST ITEM */}
              <div className="flex justify-between h-48">
                {/* LEFT */}
                <div className="w-1/2 "></div>
                {/* CENTER */}
                <div className="w-1/6 flex justify-center">
                  {/* LINE */}
                  <div className="w-1 h-full bg-gray-600 rounded relative">
                    {/* LINE CIRCLE */}
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="w-1/2 ">
                  {/* Education TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    INTERMEDIATE
                  </div>
                  {/* University name */}
                  <div className="p-3 text-sm italic">
                    Aditya Birla Higher Secondary School{" "}
                  </div>
                  {/* JOB DATE */}
                  <div className="p-3 text-red-400 text-sm font-semibold">
                    2018- 2020{" "}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
        {/* SVG CONTAINER */}
        <div className="hidden lg:block w-1/2 sticky top-0 z-30 xl:w-1/2">
          <Brain scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;