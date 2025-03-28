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
    <section className="relative py-24 overflow-hidden">
      {/* Enhanced background with improved light mode gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/70 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 -z-10"></div>
      
      {/* Subtle grid pattern overlay with improved light mode visibility */}
      <div className="absolute inset-0 bg-grid opacity-[0.07] dark:opacity-[0.05] -z-10"></div>
      
      {/* Top gradient transition with improved light mode */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gray-900 z-10"></div>
      
      <div className="container mx-auto px-6 relative z-20">
        {/* Services Section - Enhanced with better light mode */}
        <div className="text-center mb-20">
          <p className="text-blue-700 dark:text-blue-400 text-lg font-semibold mb-2 tracking-wider animate-fade-in">
            What We Offer
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800 dark:text-white animate-fade-in-up">
            Our Services
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-500 dark:to-blue-300 mx-auto rounded-full"></div>
        </div>
        
        {/* Completely redesigned service cards with improved light mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-32">
          {services.map((service, index) => (
            <div
              className="group relative bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 
                       rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up
                       border border-blue-100 dark:border-transparent"
              style={{animationDelay: `${index * 100}ms`}}
              key={index}
            >
              {/* Card decorative elements with improved light mode */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/15 dark:bg-blue-500/20 rounded-bl-full z-0"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500/10 dark:bg-blue-500/10 rounded-tr-full z-0"></div>
              
              {/* Hover reveal border effect with improved light mode */}
              <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-blue-600/50 dark:group-hover:border-blue-400/50 transition-all duration-300"></div>
              
              {/* Image container with improved styling for light mode */}
              <div className="relative h-44 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                  src={service.src}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 text-white z-20">
                  <h3 className="text-2xl font-bold mb-1 drop-shadow-md">
                    {service.title}
                  </h3>
                </div>
              </div>
              
              {/* Content area with improved layout for light mode */}
              <div className="p-5 relative z-10">
                <div className="mb-5">
                  <p className="text-gray-700 dark:text-gray-300">
                    {service.description}
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <a
                    href="#"
                    className="inline-flex items-center space-x-1 text-blue-700 dark:text-blue-400 font-medium group-hover:underline transition-all"
                  >
                    <span>Explore</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                  
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                    {index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Portals Section - Enhanced for light mode */}
        <div className="text-center mb-20">
          <p className="text-blue-700 dark:text-blue-400 text-lg font-semibold mb-2 tracking-wider animate-fade-in">
            Access Points
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800 dark:text-white animate-fade-in-up">
            Our Portals
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-500 dark:to-blue-300 mx-auto rounded-full"></div>
        </div>
        
        {/* Completely redesigned portal cards with improved light mode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {portals.map((portal, index) => {
            let baseColor = "blue";
            let textColor = "text-blue-700 dark:text-blue-400";
            let bgColor = "bg-blue-100 dark:bg-blue-900/20";
            let borderColor = "border-blue-200 dark:border-blue-800";
            let gradientClass = "from-blue-700 to-blue-500";
            let hoverGradientClass = "group-hover:from-blue-800 group-hover:to-blue-600";
            
            if (portal.color === "purple") {
              baseColor = "purple";
              textColor = "text-purple-700 dark:text-purple-400";
              bgColor = "bg-purple-100 dark:bg-purple-900/20";
              borderColor = "border-purple-200 dark:border-purple-800";
              gradientClass = "from-purple-700 to-purple-500";
              hoverGradientClass = "group-hover:from-purple-800 group-hover:to-purple-600";
            } else if (portal.color === "green") {
              baseColor = "green";
              textColor = "text-green-700 dark:text-green-400";
              bgColor = "bg-green-100 dark:bg-green-900/20";
              borderColor = "border-green-200 dark:border-green-800";
              gradientClass = "from-green-700 to-green-500";
              hoverGradientClass = "group-hover:from-green-800 group-hover:to-green-600";
            }
            
            return (
              <div
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl 
                           hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700
                           animate-fade-in-up"
                style={{animationDelay: `${index * 150}ms`}}
                key={index}
              >
                {/* Card decorative accent with improved light mode */}
                <div className={`h-2 w-full bg-gradient-to-r ${gradientClass} transition-all duration-300 ${hoverGradientClass}`}></div>
                
                {/* Card content container */}
                <div className="p-6">
                  {/* Portal icon/badge with improved light mode */}
                  <div className={`w-14 h-14 rounded-2xl ${bgColor} ${borderColor} border-2 flex items-center justify-center mb-5`}>
                    <span className={`text-2xl ${textColor}`}>
                      {baseColor === "blue" && "🚩"}
                      {baseColor === "purple" && "🏫"}
                      {baseColor === "green" && "📚"}
                    </span>
                  </div>
                  
                  {/* Portal title with improved light mode */}
                  <h3 className={`text-2xl font-bold mb-4 ${textColor} transition-colors duration-300`}>
                    {portal.title}
                  </h3>
                  
                  {/* Portal description with improved light mode */}
                  <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
                    {portal.description}
                  </p>
                  
                  {/* Action button with improved light mode */}
                  <a
                    href={portal.path}
                    className={`inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r ${gradientClass} ${hoverGradientClass} 
                             text-white font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl shadow-md`}
                  >
                    <span>Access Portal</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
                
                {/* Portal image background with improved light mode */}
                <div className="absolute top-24 right-0 -z-10 opacity-10 dark:opacity-5">
                  <img
                    src={portal.src}
                    alt=""
                    className="w-64 h-64 object-cover"
                  />
                </div>
                
                {/* Hover effect overlay with improved light mode */}
                <div className={`absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-300 
                              group-hover:border-${baseColor}-500/60 dark:group-hover:border-${baseColor}-400/30 pointer-events-none`}></div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Bottom gradient transition with improved light mode */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-blue-50 dark:from-gray-900 to-transparent"></div>
    </section>
  );
}

export default ProjectSection;
