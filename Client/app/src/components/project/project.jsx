import React from "react";
import logo from "../../pages/img/logo.png";
import playctf from "../../pages/img/playctf.png";

function ProjectSection() {
  const services = [
    { src: logo, title: "Learn" },
    { src: logo, title: "Practice" },
    { src: playctf, title: "Compete" },
    { src: playctf, title: "Play" },
  ];

  const portals = [
    { src: playctf, title: "CTF Portal", description: "Manage your profile and activities." },
    { src: playctf, title: "School Portal", description: "Access administrative tools and analytics." },
    { src: playctf, title: "Learning Portal", description: "Collaborate and manage your team." },
  ];

  return (
    <section className="py-20 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto">
        {/* Services Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-indigo-600 dark:text-blue-400">
            Services
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
              key={index}
            >
              <div className="mb-4">
                <img
                  src={service.src}
                  alt={service.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-2">
                  {service.title}
                </h4>
                <a
                  href="login.html"
                  className="text-indigo-600 dark:text-blue-400 hover:underline"
                >
                  More Info
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Portals Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-indigo-600 dark:text-blue-400">
            Portals
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portals.map((portal, index) => (
            <div
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
              key={index}
            >
              <div className="mb-4">
                <img
                  src={portal.src}
                  alt={portal.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-2">
                  {portal.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{portal.description}</p>
                <a
                  href="login.html"
                  className="text-indigo-600 dark:text-blue-400 hover:underline"
                >
                  Access Portal
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;
