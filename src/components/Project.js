import React from "react";
import college from "../assets/college.jpg";
import eco from "../assets/eco.jpg";
import portfolio from "../assets/portfolio.jpg";
import doctor from "../assets/doctor.jpg";

const Projects = () => {
  // Array of projects with names, links, and images
  const projects = [
    {
      name: "College projectshowcase(Major-project)",
      link: "https://college-project-showcase-9yta.vercel.app/",
      image: college,
    },

    {
      name: "Eco-product webapp (Minor-project)",
      link: "#",
      image: eco,
    },
    {
      name: "Portfolio",
      link: "https://portfolio-gamma-wheat-89.vercel.app/",
      image: portfolio,
    },
    {
      name: "E-doctor Connect (Major-project)",
      link: "#",
      image: doctor,
    },
  
  ];

  return (
    <section id="projects" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          My Projects
        </h2>

        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-4 border-blue-800 bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105"
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover"
              />
              {/* Project Details */}
              <div
                className={`p-4 ${
                  project.name.includes("Game")
                    ? "border-l-4 border-r-4 border-gray-500"
                    : ""
                }`}
              >
                <h3 className="text-lg font-semibold">{project.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
