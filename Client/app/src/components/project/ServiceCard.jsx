import React from "react";
import { Link } from "react-router-dom";

function ServiceCard({ service, index }) {
  return (
    <Link to={service.link}>
      <div
        className="group relative bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 
                     rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up
                     border border-blue-100 dark:border-transparent"
        style={{ animationDelay: `${index * 100}ms` }}
        key={index}
      >
        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/15 dark:bg-blue-500/20 rounded-bl-full z-0"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-500/10 dark:bg-blue-500/10 rounded-tr-full z-0"></div>

        <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-blue-600/50 dark:group-hover:border-blue-400/50 transition-all duration-300"></div>

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

        <div className="p-5 relative z-10">
          <div className="mb-5">
            <p className="text-gray-700 dark:text-gray-300">
              {service.description}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div className="inline-flex items-center space-x-1 text-blue-700 dark:text-blue-400 font-medium group-hover:underline transition-all">
              <span>Explore</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </div>

            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
              {index + 1}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
