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
    title: "ShoeSavvy - Ecommerce",
    desc: "ShoeSavvy: Your ultimate destination for stylish and comfortable footwear. Discover the latest trends and timeless classics for every occasion.",
    img: "/shoesavvy.png",
    link: "https://shoesavvy.42web.io/",
  },
  {
    id: 3,
    color: "from-violet-300 to-purple-300",
    title: "TechForum",
    desc: "TechForum: A dynamic platform built with PHP, MySQL, HTML, and CSS, providing users with a space to ask questions, share knowledge, and engage in tech discussions.",
    img: "/forum.png",
    link: "http://myforum.42web.io/",
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
    title: "UrbanHaven - Ecommerce",
    desc: "UrbanHaven: An e-commerce platform built with WordPress, offering a seamless shopping experience with a wide range of products, user-friendly design, and robust functionality.",
    img: "/urbanhaven.png",
    link: "https://urbanhaven.42web.io/",
  },
  {
    id: 7,
    color: "from-orange-300 to-yellow-300",
    title: "TaskFlow",
    desc: "The Cloud-Based Task Manager, built with the MERN stack, streamlines team task management with features for task assignment, tracking, and collaboration for admins and users.",
    img: "/taskmanager.png",
    link: "https://github.com/parth022002/Task-Manager",
  },
  {
    id: 8,
    color: "from-yellow-300 to-green-300",
    title: "EchoAssistant",
    desc: "Developed a voice assistant with Python, HTML, CSS, JS, Bootstrap, jQuery, and the Eel Python module for seamless UI.",
    img: "/voice.png",
    link: "https://github.com/parth022002/Voice-Assistant",
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
    title: "TechPulse - Blog",
    desc: "TechPulse: A WordPress-powered blog delivering the latest tech insights, in-depth analysis, and cutting-edge trends with a modern, elegant design.",
    img: "/Techpulse.png",
    link: "http://personalblog.42web.io/",
  },
  {
    id: 11,
    color: "from-blue-300 to-indigo-300",
    title: "AI ChatBot",
    desc: "Experience seamless conversational interactions with my AI chatbot project, developed using Flask and MongoDB for robust backend functionality, complemented by a sleek TailwindCSS frontend for a polished user interface.",
    img: "/ai chatbot.png",
    link: "https://github.com/parth022002/ChatBot",
  },
  {
    id: 12,
    color: "from-indigo-300 to-violet-300",
    title: "Vchat",
    desc: "VChat, a project I developed, elevates video calling with PHP backend and WebRTC technology, showcasing expertise in web development and real-time communication solutions.",
    img: "/vchat.png",
    link: "https://github.com/parth022002/Internship/tree/master/CreArt%20Solution%20(27-07-23%20to%2014-08-23)/vchat%20code%20files",
  },
  {
    id: 13,
    color: "from-violet-300 to-purple-300",
    title: "Spotify Clone",
    desc: "Developed a Spotify clone with added features using Next.js, React, Tailwind CSS, Redux, PostgreSQL, and Stripe.",
    img: "/spotify.png",
    link: "https://spotify-music-for-me.vercel.app/",
  },
  {
    id: 14,
    color: "from-purple-300 to-pink-300",
    title: "Resume Analyser",
    desc: "Created a tool to analyze resumes, providing scores, recommendations, and tips using PyResparser and PDFMiner.",
    img: "/resume-analyser.png",
    link: "https://github.com/parth022002/Resume-Analyser",
  },
  {
    id: 15,
    color: "from-pink-300 to-red-300",
    title: "Discord Clone",
    desc: "Replicated Discord with real-time communication using Next.js, Tailwind CSS, TypeScript, Prisma, MongoDB, and Socket.io.",
    img: "/discord-clone.jpg",
    link: "https://github.com/parth022002/Discord-Clone",
  },
  {
    id: 16,
    color: "from-red-300 to-orange-300",
    title: "EnergizeWell",
    desc: "EnergizeWell: A WordPress blog dedicated to promoting healthy living and wellness, offering tips, guides, and inspiration to help you live energized and feel great.",
    img: "/energizewell.png",
    link: "http://energizewell.42web.io/",
  },
];

const achievements = [
  {
    
    id: 1,
    color: "from-orange-300 to-red-300",
    title: "Oracle OCI Generative AI",
    desc: "Certified Oracle Professional in OCI Generative AI, 2024. Recognized for expertise in advanced AI solutions on Oracle Cloud.",
    img: "/1)generativeai.jpg",
  },
  {
    id: 2,
    color: "from-red-300 to-pink-300",
    title: "TATA’s ‘Data Visualisation’",
    desc: "Completed TATA’s ‘Data Visualisation’ project with Forage, mastering business insights through effective data analysis.",
    img: "/2)Tata-Data Visualisation.jpg",
  },
  {
    id: 3,
    color: "from-pink-300 to-purple-300",
    title: "LinkedIn Learning’s ‘Career Essentials in Software Development’ by Microsoft",
    desc: "Completed LinkedIn Learning’s ‘Career Essentials in Software Development’ by Microsoft, enhancing programming and software development skills.",
    img: "/3)CertificateOfCompletion_Career Essentials in Software Development by Microsoft and LinkedIn.jpg",
  },
  {
    id: 4,
    color: "from-purple-300 to-violet-300",
    title: "LinkedIn Learning’s ‘Career Essentials in Generative AI’ by Microsoft",
    desc: "Completed LinkedIn Learning’s ‘Career Essentials in Generative AI’ by Microsoft, gaining expertise in AI ethics and generative AI technologies.",
    img: "/4)CertificateOfCompletion_Career Essentials in Generative AI by Microsoft and LinkedIn-1.jpg",
  },
  {
    id: 5,
    color: "from-violet-300 to-indigo-300",
    title: "100 Day's Coding Challenge By Talent Battle ",
    desc: "Successfully completed Talent Battle’s ‘100 Day’s Coding Series Challenge’ in Python Programming, demonstrating proficiency in coding and problem-solving.",
    img: "/5)100 Days Coding Series Challenge Certificate_Parth Ahuja-1.jpg",
  },
  {
    id: 6,
    color: "from-indigo-300 to-blue-300",
    title: "Software Engineer Certification by HackerRank",
    desc: "Achieved HackerRank’s Software Engineer role certification, demonstrating expertise in software engineering skills and problem-solving.",
    img: "/6)software_engineer certificate-1.jpg",
  },
  {
    id: 7,
    color: "from-blue-300 to-teal-300",
    title: "TCS iON Career Edge - Young Professional Certificate",
    desc: "Achievement certificate for completing professional skills course by TCS, enhancing career readiness.",
    img: "/7)Parth_Ahuja_2850432-1.jpg",
  },
  {
    id: 8,
    color: "from-teal-300 to-green-300",
    title: "HackerRank Python (Basic) Certificate",
    desc: "Recognizes successful completion of the Python (Basic) assessment, demonstrating foundational proficiency in Python programming.",
    img: "/8)python_basic certificate-1.jpg",
  },
  {
    id: 9,
    color: "from-green-300 to-yellow-300",
    title: "HackerRank CSS Certificate",
    desc: "Awarded for successfully clearing the CSS assessment on HackerRank, demonstrating proficiency in CSS skills. Dated 20 Jul, 2023.",
    img: "/9)css certificate-1.jpg",
  },
  {
    id: 10,
    color: "from-yellow-300 to-orange-300",
    title: "HackerRank SQL (Advanced) Certificate",
    desc: "Awarded for successfully clearing the advanced SQL assessment on HackerRank, demonstrating expertise in SQL database management. Dated 01 May, 2024.",
    img: "/10)sql_advanced certificate-1.jpg",
  },
  {
    id: 11,
    color: "from-orange-300 to-red-300",
    title: "Udemy Passport to Communication Skills Certificate",
    desc: "Awarded for completing the Passport to Communication Skills course on Udemy, covering essential communication techniques. Dated 08 Apr, 2021.",
    img: "/11)Passport to communication Skill-1.jpg",
  },
  {
    id: 12,
    color: "from-red-300 to-pink-300",
    title: "Intel AI for Youth Program Participation Certificate",
    desc: "Official recognition of Parth Ahuja’s participation in the Intel AI for Youth Program, endorsed by Digital India and the Government of India on 20/08/2021.",
    img: "/12)AI_appreciate-1.jpg",
  },
  {
    id: 13,
    color: "from-pink-300 to-purple-300",
    title: "Intellify Hackthon 2023",
    desc: " Certificate awarded for participating in the Intellify Hackathon 2023 organized by Marwadi University, showcasing collaboration with sponsors like IEEE MEF Student Branch",
    img: "/13)Intellify-1.jpg",
  },
  {
    id: 14,
    color: "from-purple-300 to-violet-300",
    title: "Google Digital Marketing Certificate",
    desc: "Awarded for successfully completing The Fundamentals of Digital Marketing certification exam by Google Digital Unlocked, showcasing proficiency in digital marketing strategies.",
    img: "/14)Digital Marketing By Google-1.jpg",
  },
  {
    id: 15,
    color: "from-violet-300 to-blue-300",
    title: "Google Analytics for Beginners Certificate",
    desc: "Awarded for successfully completing the Google Analytics for Beginners course by Google Analytics Academy, demonstrating foundational skills in web analytics.",
    img: "/15)Google Analytics for Beginners-1.jpg",
  },
  {
    id: 16,
    color: "from-blue-300 to-red-300",
    title: "Algorithm Arena Participation Certificate",
    desc: "Recognizes Parth Ahuja’s remarkable coding skills and dedication in the Algorithm Arena event organized by Marwadi University, in collaboration with IEEE and Algorithm Arena.",
    img: "/16)Parth Ahuja -1.jpg",
  },
];

const PortfolioPage = () => {
  const projectsRef = useRef();
  const achievementsRef = useRef();

  const { scrollYProgress: projectsScrollYProgress } = useScroll({ target: projectsRef });
  const projectsX = useTransform(projectsScrollYProgress, [0, 1], ["10%", "-93%"]);

  const { scrollYProgress: achievementsScrollYProgress } = useScroll({ target: achievementsRef });
  const achievementsX = useTransform(achievementsScrollYProgress, [0, 1], ["10%", "-93%"]);

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-600vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-[600vh] relative pt-2 mt-2 " ref={projectsRef}>
        <div className="w-screen h-[calc(100vh-6rem)] flex items-center justify-center text-8xl text-center">
          My Projects
        </div>
        <div className="sticky top-0 flex h-screen gap-4 items-center overflow-hidden bg-gradient-to-r from-red-300 to-red-300">
          <motion.div style={{ x: projectsX }} className="flex">
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
                  <div className="relative w-80 h-56 md:w-96 md:h-64 lg:w-[500px] lg:h-[400px] xl:w-[650px] xl:h-[420px]">
                    <Image src={item.img} alt="" fill />
                  </div>
                  <p className="w-80 md:w96 lg:w-[500px] lg:text-lg xl:w-[600px]">
                    {item.desc}
                  </p>
                  <Link href={item.link} className="flex justify-end">
                    <button className="p-2 text-md rounded-2xl md:p-4 md:text-md lg:p-4 lg:text-lg bg-white text-gray-800 font-semibold m-4 hover:bg-gray-800 hover:text-white">Link</button>
                  </Link>
                </div>
              </div>
            ))}

          </motion.div>
        </div>
      </div>

      <div className="h-[600vh] relative pt-2 mt-2 " ref={achievementsRef}>
        <div className="w-screen h-[calc(100vh-6rem)] flex items-center justify-center text-8xl text-center">
          My Achievements
        </div>
        <div className="sticky top-0 flex h-screen gap-4 items-center overflow-hidden bg-gradient-to-r from-orange-300 to-orange-300">
          <motion.div style={{ x: achievementsX }} className="flex">
            <div className="h-screen w-screen flex items-center justify-center " />
            {achievements.map((item) => (
              <div
                className={`h-screen w-screen flex items-center justify-center bg-gradient-to-r ${item.color}`}
                key={item.id}
              >
                <div className="flex flex-col gap-6 text-white">
                  <h1 className="text-xl font-bold md:text-xl lg:text-2xl xl:text-4xl">
                    {item.title}
                  </h1>
                  <div className="relative w-80 h-56 md:w-96 md:h-64 lg:w-[500px] lg:h-[350px] xl:w-[600px] xl:h-[420px]">
                    <Image src={item.img} alt="" fill />
                  </div>
                  <p className="w-80 md:w96 lg:w-[500px] lg:text-lg xl:w-[600px]">{item.desc}</p>
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