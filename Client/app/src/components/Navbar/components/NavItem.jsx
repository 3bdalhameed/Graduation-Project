import React from "react";
import { FaCaretDown } from "react-icons/fa";

const NavItem = ({ item, index, isActive, onToggle }) => {
  return (
    <div
      className={`relative ${isActive ? 'nav-item-active' : ''}`}
    >
      <div
        onClick={(e) => {
          if (item.dropdown) onToggle(index, e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (item.dropdown) onToggle(index, e);
          }
        }}
        className={`
          flex items-center font-medium transition-all duration-300 cursor-pointer
          ${item.color} ${item.hover} px-4 py-2.5 text-sm md:text-base relative group
          rounded-lg hover:scale-105
        `}
        role="button"
        tabIndex={0}
        aria-expanded={isActive}
        aria-haspopup="true"
      >
        {item.icon}
        <span className="mx-1">{item.label}</span>
        {item.dropdown && (
          <FaCaretDown 
            className={`ml-1 transition-transform duration-300 ${
              isActive ? "transform rotate-180" : ""
            }`} 
            aria-hidden="true"
          />
        )}
        
        {/* Enhanced animated underline effect */}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transform 
                        group-hover:w-full transition-all duration-300 ease-out"></span>
      </div>
    </div>
  );
};

export default NavItem;