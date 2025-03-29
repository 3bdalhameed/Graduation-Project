import React from "react";

function PortalCard({ portal, index }) {
    const colorConfig = {
        blue: {
          text: "text-blue-700 dark:text-blue-400",
          bg: "bg-blue-100 dark:bg-blue-900/20",
          border: "border-blue-200 dark:border-blue-800",
          gradient: "from-blue-700 to-blue-500",
          hoverGradient: "group-hover:from-blue-800 group-hover:to-blue-600",
          hoverBorder: "group-hover:border-blue-500/60 dark:group-hover:border-blue-400/30"
        },
        purple: {
          text: "text-purple-700 dark:text-purple-400",
          bg: "bg-purple-100 dark:bg-purple-900/20",
          border: "border-purple-200 dark:border-purple-800",
          gradient: "from-purple-700 to-purple-500",
          hoverGradient: "group-hover:from-purple-800 group-hover:to-purple-600",
          hoverBorder: "group-hover:border-purple-500/60 dark:group-hover:border-purple-400/30"
        },
        green: {
          text: "text-green-700 dark:text-green-400",
          bg: "bg-green-100 dark:bg-green-900/20",
          border: "border-green-200 dark:border-green-800",
          gradient: "from-green-700 to-green-500",
          hoverGradient: "group-hover:from-green-800 group-hover:to-green-600",
          hoverBorder: "group-hover:border-green-500/60 dark:group-hover:border-green-400/30"
        }
      };
      
      const colors = colorConfig[portal.color];

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl 
                  hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700
                  animate-fade-in-up flex flex-col h-full"
      style={{ animationDelay: `${index * 150}ms` }}
      key={index}
    >
      <div className={`h-2 w-full bg-gradient-to-r ${colors.gradient} transition-all duration-300 ${colors.hoverGradient}`}></div>

      <div className="p-6 flex flex-col flex-grow">
        <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.border} border-2 flex items-center justify-center mb-5`}>
          <span className={`text-2xl ${colors.text}`}>{portal.icon}</span>
        </div>

        <h3 className={`text-2xl font-bold mb-4 ${colors.text} transition-colors duration-300`}>
          {portal.title}
        </h3>

        <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg flex-grow">
          {portal.description}
        </p>

        <a
          href={portal.path}
          className={`inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r ${colors.gradient} ${colors.hoverGradient} 
                      text-white font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl shadow-md w-full sm:w-auto`}
        >
          <span>Access Portal</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      </div>

      <div className="absolute top-24 right-0 -z-10 opacity-10 dark:opacity-5">
        <img
          src={portal.src}
          alt=""
          className="w-64 h-64 object-cover"
        />
      </div>

      <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-300 pointer-events-none"
        style={{ borderColor: 'transparent' }}></div>
    </div>
  );
}

export default PortalCard;
