import React from "react";

const About = () => {
  return (
   
    <div id="about" className="w-full min-h-screen flex items-center bg-white">
      <div className="w-full lg:w-[80%] mx-auto px-4 sm:px-10 lg:px-0 flex flex-col gap-2 pt-5 pb-5 text-black">
        {/* Title */}
        <div className="flex flex-col gap-2 mb-2 md:mb-4">
          <h2 className="font-serif text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-800 mb-6">
            About Me
          </h2>
          <span className="w-16 h-[4px] bg-white rounded" />
          <span className="w-8 h-[4px] bg-white rounded" />
        </div>
        <h4 className="capitalize text-xl font-semibold text-black mb-2">
          I'm Kanchan Kushwaha and I'm a <span className="text-rose-500"  > <b>web developer</b> </span>
        </h4>
        <p className="text-lg">
          I'm a <span className="text-rose-500 font-semibold"><b>MERN Full Stack Developer</b></span> and an aspiring Database Administrator (DBA) with a passion for building scalable,
          user-friendly web applications. My expertise lies in <b>MongoDB, Express.js, React.js, Node.js & Typescript</b>, and I'm
          always eager to explore new technologies that enhance performance.
          <br />⮕ I Develop full-stack web applications using the MERN stack
          <br />⮕ Build responsive, SEO-friendly websites with Next.js
          <br />⮕ Continuously learning Database Administration (SQL & NoSQL)
          <br />Some of my projects include an <b>Eco-friendly Marketplace webapp</b>, a <b>Portfolio website</b>, and a
          major project  <b>College Project Showcase Website</b>.
        </p>
        <div className="w-full flex flex-col lg:flex-row gap-6 sm:gap-4 lg:gap-6 justify-between">
          {/* Left Column */}
          <div className="w-full flex flex-col items-stretch gap-4">
            <ul className="text-black">
              <li className="py-2 border-b border-gray-600"><span className="font-bold">Email:</span> kanchankushwaha65520@gmail.com</li>
              <li className="py-2 border-b border-gray-600"><span className="font-bold">Freelance:</span> Available</li>
              <li className="py-2 border-b border-gray-600"><span className="font-bold">Degree:</span> B.Tech in Computer Science </li>
              <li className="py-2 border-b border-gray-600"><span className="font-bold">Location:</span> Noida</li>
            </ul>
            <div className="flex gap-4 justify-center sm:justify-start">
              <button className="px-4 sm:px-6 py-2 bg-rose-500 rounded-full text-black font-bold">Hire me</button>
            </div>
          </div>
          {/* Right Column - Skill Progress Bars */}
          <div className="w-full flex flex-col gap-2">
            {[
              { skill: "Reactjs/Expressjs", percent: 90 },
              { skill: "HTML/CSS/Javascript", percent: 91 },
              { skill: "Nextjs/Mongodb", percent: 80 },
              { skill: "Nodejs/Typescript", percent: 85 }
            ].map(({ skill, percent }, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="w-full flex justify-between font-semibold">
                  <span>{skill}</span>
                  <span>{percent}%</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full">
                  <div className={`w-[${percent}%] h-2 bg-rose-500 rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
