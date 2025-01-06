import React from "react";
import arrow from "../../pages/img/arrow.png";
import logo from "../../pages/img/logo.png";
import playctf from "../../pages/img/playctf.png";

function Project() {
  const projects = [
    { src: logo, title: "Learn" },
    { src: logo, title: "Practice" },
    { src: playctf, title: "Compete" },
    { src: playctf, title: "Play" },
  ];

  return (
    <section className="py-20 bg-gray-100" id="projects">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800">Sample Projects</h3>
        </div>
        {/* Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
              key={index}
            >
              <div className="mb-4">
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {project.title}
                </h4>
                <a
                  href="login.html"
                  className="text-blue-500 hover:underline"
                >
                  More Info
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* Arrow Navigation */}
        <div className="flex justify-center mt-12">
          <a
            href="#ending"
            className="inline-block transform hover:-translate-y-2 transition duration-300"
          >
            <img src={arrow} alt="Scroll Down" className="w-10 h-10" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Project;
