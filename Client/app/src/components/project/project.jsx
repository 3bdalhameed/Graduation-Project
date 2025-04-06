import React from "react";
import Awareness from "../../pages/img/Awareness.png";
import Competition from "../../pages/img/Competition.png";
import Assessment from "../../pages/img/Assessment.png";
import Media from "../../pages/img/Media.png";
import ServiceCard from "./ServiceCard";
import PortalCard from "./PortalCard";

function ProjectSection() {
  const services = [
    { src: Awareness, title: "", description: "Access comprehensive learning materials and tutorials" },
    { src: Competition, title: "", description: "Sharpen your skills through interactive exercises" },
    { src: Assessment, title: "", description: "Join challenges and competitions to test your abilities" },
    { src: Media, title: "", description: "Engage in gamified cybersecurity scenarios" },
  ];
  const portals = [
    { src: Competition, title: "CTF Portal", description: "Join capture the flag competitions and track your progress", path: "/login", color: "blue", icon: "🚩" },
    { src: Competition, title: "School Portal", description: "Access administrative tools, analytics, and educational resources", path: "/", color: "purple", icon: "🏫" },
    { src: Competition, title: "Learning Portal", description: "Structured learning paths and collaborative educational content", path:"/learningPortalLogin", color: "green", icon: "📚" },
  ];
  return (
    <section className="relative py-24 overflow-hidden">

      <div className="container mx-auto px-6 relative z-20 pt-8">
        <div className="text-center mb-20">
          <p className="text-blue-700 dark:text-blue-400 text-lg font-semibold mb-2 tracking-wider animate-fade-in">
            What We Offer
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800 dark:text-white animate-fade-in-up">
            Our Services
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-500 dark:to-blue-300 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-32">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        <div className="text-center mb-20">
          <p className="text-blue-700 dark:text-blue-400 text-lg font-semibold mb-2 tracking-wider animate-fade-in">
            Access Points
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800 dark:text-white animate-fade-in-up">
            Our Portals
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-500 dark:to-blue-300 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {portals.map((portal, index) => (
            <PortalCard key={index} portal={portal} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;