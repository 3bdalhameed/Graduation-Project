import React from "react";
import logo from "../../pages/img/logo.png";
import playctf from "../../pages/img/playctf.png";

function ProjectSection() {
  const services = [
    { src: logo, title: "Learn", description: "Access comprehensive learning materials and tutorials" },
    { src: logo, title: "Practice", description: "Sharpen your skills through interactive exercises" },
    { src: playctf, title: "Compete", description: "Join challenges and competitions to test your abilities" },
    { src: playctf, title: "Play", description: "Engage in gamified cybersecurity scenarios" },
  ];

  const portals = [
    { src: playctf, title: "CTF Portal", description: "Join capture the flag competitions and track your progress", path: "/login", color: "blue" },
    { src: playctf, title: "School Portal", description: "Access administrative tools, analytics, and educational resources", path: "/", color: "purple" },
    { src: playctf, title: "Learning Portal", description: "Structured learning paths and collaborative educational content", path:"/learningPortalLogin", color: "green" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-100 to-white text-gray-900 dark:from-gray-800 dark:to-gray-900 dark:text-white">
      <div className="container mx-auto px-6">
        {/* Services Section */}
        <div className="text-center mb-16">
          <p className="text-blue-600 dark:text-blue-400 text-lg font-semibold mb-2">What We Offer</p>
          <h2 className="text-4xl font-bold mb-6">Our Services</h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
          {services.map((service, index) => (
            <div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              key={index}
            >
              <div className="overflow-hidden rounded-t-xl">
                <img
                  src={service.src}
                  alt={service.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Portals Section */}
        <div className="text-center mb-16">
          <p className="text-blue-600 dark:text-blue-400 text-lg font-semibold mb-2">Access Points</p>
          <h2 className="text-4xl font-bold mb-6">Our Portals</h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {portals.map((portal, index) => {
            let gradientClass = "from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600";
            if (portal.color === "purple") {
              gradientClass = "from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600";
            } else if (portal.color === "green") {
              gradientClass = "from-green-600 to-green-500 hover:from-green-700 hover:to-green-600";
            }
            
            return (
              <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                key={index}
              >
                <div className="relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass} opacity-80`}></div>
                  <img
                    src={portal.src}
                    alt={portal.title}
                    className="w-full h-52 object-cover"
                  />
                  <h3 className="absolute bottom-0 left-0 w-full p-6 text-3xl font-bold text-white">
                    {portal.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                    {portal.description}
                  </p>
                  <a
                    href={portal.path}
                    className={`inline-block px-6 py-3 bg-gradient-to-r ${gradientClass} text-white rounded-lg transition-all duration-300 shadow-lg`}
                  >
                    Access Portal
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;
