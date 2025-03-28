import React from "react";

const NavigationLinks = ({ navItems, isMobile }) => {
  if (isMobile) {
    return (
      <>
        {navItems.map((item, index) => (
          <div key={index}>
            {item.href ? (
              <a
                href={item.href}
                className={`flex items-center py-2 px-3 rounded-md transition-all duration-200 
                font-medium ${item.colorClass} ${item.hoverClass}`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ) : (
              <button
                onClick={item.onClick}
                className={`flex w-full text-left items-center py-2 px-3 rounded-md transition-all duration-200 
                font-medium ${item.colorClass} ${item.hoverClass}`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )}
          </div>
        ))}
      </>
    );
  }
  
  return (
    <div className="hidden md:flex items-center space-x-6">
      {navItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href ? (
            <a 
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 
              font-medium ${item.colorClass} ${item.hoverClass}`}
            >
              <span className="mr-2">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ) : (
            <button
              onClick={item.onClick}
              className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 
              font-medium ${item.colorClass} ${item.hoverClass}`}
            >
              <span className="mr-2">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavigationLinks;
