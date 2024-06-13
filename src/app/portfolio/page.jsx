"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const items = [
  {
    id: 1,
    color: "from-red-300 to-blue-300",
    title: "NexSpace",
    desc: "Experience seamless social networking on NexSpace, where you can create and explore posts effortlessly with robust security and lightning-fast performance.",
    img: "/social.png",
    link: "https://nexspace.vercel.app/",
  },
  {
    id: 2,
    color: "from-blue-300 to-violet-300",
    title: "TaskFlow",
    desc: "The Cloud-Based Task Manager, built with the MERN stack, streamlines team task management with features for task assignment, tracking, and collaboration for admins and users.",
    img: "/taskmanager.png",
    link: "https://github.com/parth022002/Task-Manager",
  },
  {
    id: 3,
    color: "from-violet-300 to-purple-300",
    title: "EchoAssistant",
    desc: "Developed a voice assistant with Python, HTML, CSS, JS, Bootstrap, jQuery, and the Eel Python module for seamless UI.",
    img: "/voice.png",
    link: "https://github.com/parth022002/Voice-Assistant",
  },
  {
    id: 4,
    color: "from-purple-300 to-pink-300",
    title: "WebShare",
    desc: "WebShare: Fast, secure file-sharing web app for seamless transfer of documents, images, videos, and more. Effortlessly share with confidence.",
    img: "/FileShare.png",
    link: "https://web-fileshare.vercel.app/",
  },
  {
    id: 5,
    color: "from-pink-300 to-red-300",
    title: "ProctorShield",
    desc: "ProctorShield, my final year project, employs Flask and SQLite for backend operations, TailwindCSS for frontend aesthetics, and WebRTC alongside TensorFlow to bolster its Online Proctor System, ensuring comprehensive examination integrity.",
    img: "/proctorshield.png",
    link: "https://github.com/parth022002/ProctorShield",
  },
  {
    id: 6,
    color: "from-red-300 to-orange-300",
    title: "Spotify Clone",
    desc: "Developed a Spotify clone with added features using Next.js,React, Tailwind CSS, Redux, PostgreSQL, and Stripe.",
    img: "/spotify.png",
    link: "https://spotify-music-for-me.vercel.app/",
  },
  
  {
    id: 7,
    color: "from-orange-300 to-yellow-300",
    title: "AI ChatBot",
    desc: "Experience seamless conversational interactions with my AI chatbot project, developed using Flask and MongoDB for robust backend functionality, complemented by a sleek TailwindCSS frontend for a polished user interface.",
    img: "/ai chatbot.png",
    link: "https://github.com/parth022002/ChatBot",
  },
  {
    id: 8,
    color: "from-yellow-300 to-green-300",
    title: "Vchat",
    desc: "VChat, a project I developed, elevates video calling with PHP backend and WebRTC technology, showcasing expertise in web development and real-time communication solutions.",
    img: "/vchat.png",
    link: "https://github.com/parth022002/Internship/tree/master/CreArt%20Solution%20(27-07-23%20to%2014-08-23)/vchat%20code%20files",
  },
  {
    id: 9,
    color: "from-green-300 to-teal-300",
    title: "Chat With PDF",
    desc: "My Streamlit project empowers users to effortlessly navigate PDF documents using a chatbot interface, streamlining document exploration through intuitive interaction.",
    img: "/chat with pdf.png",
    link: "https://github.com/parth022002/Chat-with-pdf",
  },
  {
    id: 10,
    color: "from-teal-300 to-blue-300",
    title: "Resume Analyser",
    desc: "Created a tool to analyze resumes, providing scores,recommendations, and tips using PyResparser and PDFMiner",
    img: "/resume-analyser.png",
    link: "https://github.com/parth022002/Resume-Analyser",
  },
  {
    id: 11,
    color: "from-blue-300 to-indigo-300",
    title: "Discord Clone",
    desc: "Replicated Discord with real-time communication usingNext.js, Tailwind CSS, TypeScript, Prisma, MongoDB, and Socket.io.",
    img: "/discord-clone.jpg",
    link: "https://github.com/parth022002/Discord-Clone",
  },
  {
    id: 12,
    color: "from-indigo-300 to-violet-300",
    title: "E-Commerce Website ",
    desc: "EasyShop, my e-commerce project, leverages the power of WordPress to create a seamless online shopping experience, combining user-friendly design with robust functionality.",
    img: "/ecommerce.png",
    link: "https://github.com/parth022002/Wordpress/tree/main/Easyshops",
  },
];

const PortfolioPage = () => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-93%"]);

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-600vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-[600vh] relative pt-2 mt-2 " ref={ref}>
        <div className="w-screen h-[calc(100vh-6rem)] flex items-center justify-center text-8xl text-center">
          My Projects
        </div>
        <div className="sticky top-0 flex h-screen gap-4 items-center overflow-hidden bg-gradient-to-r from-red-300 to-violet-300">
          <motion.div style={{ x }} className="flex">
            <div className="h-screen w-screen flex items-center justify-center " />
            {items.map((item) => (
              <div
                className={`h-screen w-screen flex items-center justify-center bg-gradient-to-r ${item.color}`}
                key={item.id}
              >
                <div className="flex flex-col gap-6 text-white">
                  <h1 className="text-xl font-bold md:text-2xl lg:text-4xl xl:text-6xl">
                    {item.title}
                  </h1>
                  <div className="relative w-80 h-56 md:w-96 md:h-64 lg:w-[500px] lg:h-[350px] xl:w-[600px] xl:h-[420px]">
                    <Image src={item.img} alt="" fill />
                  </div>
                  <p className="w-80 md:w96 lg:w-[500px] lg:text-lg xl:w-[600px]">
                    {item.desc}
                  </p>
                  <Link href={item.link} className="flex justify-end">
                    <button className="p-2 text-md rounded-2xl md:p-4 md:text-md lg:p-4 lg:text-lg bg-white text-gray-800 font-semibold m-4">Link</button>
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="w-screen h-screen flex flex-col gap-16 items-center justify-center text-center">
        <h1 className="text-8xl">Do you have any Job for me?</h1>
        <div className="relative">
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            viewBox="0 0 300 300"
            className="w-64 h-64 md:w-[500px] md:h-[500px] "
          >
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
              />
            </defs>
            <text fill="#000">
              <textPath xlinkHref="#circlePath" className="text-xl">
                Hire Me. Hire Me. Hire Me. Hire Me.....
              </textPath>
            </text>
          </motion.svg>
          <Link
            href="/contact"
            className="w-16 h-16 md:w-28 md:h-28 absolute top-0 left-0 right-0 bottom-0 m-auto bg-black text-white rounded-full flex items-center justify-center"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioPage;