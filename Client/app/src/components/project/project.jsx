import React from "react";
import Awarenessimg from "../../pages/img/JCCT.png";
import Competitionimg from "../../pages/img/JuCC_cyberhub.png";
import Assessmentimg from "../../pages/img/JuCC_Assessment.png";
import Mediaimg from "../../pages/img/JuCC_media&awareness.png";
import ServiceCard from "./ServiceCard";
import PortalCard from "./PortalCard";



function ProjectSection() {
  const services = [
    { 
      src: Awarenessimg, 
      title: "JNCSF", 
      description: "Learn the core of the Jordanian cybersecurity framework.", 
      link: "/JCCTteam" 
    },
    { 
      src: Competitionimg, 
      title: "CyberHub", 
      description: "Boost your skills with hands-on labs and challenges.", 
      link: "/cyberhubteam" 
    },
    { 
      src: Assessmentimg, 
      title: "Assessment", 
      description: "Test your knowledge and track your progress.", 
      link: "/assessmentteam" 
    },
    { 
      src: Mediaimg, 
      title: "Awareness", 
      description: "Stay sharp with interactive cybersecurity lessons.", 
      link: "/awarenessteam" 
    }      
  ];
  
  const portals = [
    { src: Competitionimg, title: "Learning Portal", description: "Structured learning paths and collaborative educational content", path:"/login", color: "green", icon: "📚" },
    { src: Competitionimg, title: "School Portal", description: "Access administrative tools, analytics, and educational resources", path: "/", color: "purple", icon: "🏫" },
    { src: Competitionimg, title: "CTF Portal", description: "Join capture the flag competitions and track your progress", path: "/login", color: "blue", icon: "🚩" },
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