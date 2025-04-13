import React from "react";
import { FaCaretDown, FaChevronRight } from "react-icons/fa";

const MobileNavItem = ({ item, index, isActive, onToggle, onNavigate, isLoggedIn }) => {
  return (
    <div className="py-2">
      {/* Parent item */}
      <div
        onClick={(e) => {
          if (item.dropdown) onToggle(index, e);
        }}
        className={`
          flex items-center justify-between rounded-lg font-medium 
          transition-all duration-200 cursor-pointer
          ${item.color} ${item.hover} px-4 py-3
          ${isActive ? 'bg-white/60 dark:bg-gray-800/60 shadow-sm' : ''}
        `}
        role="button"
        tabIndex={0}
        aria-expanded={isActive}
      >
        <div className="flex items-center">
          {item.icon}
          <span>{item.label}</span>
        </div>
        {item.dropdown && (
          <FaCaretDown
            className={`transition-transform duration-300 ${
              isActive ? "transform rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Mobile dropdown menu with animation */}
      {item.dropdown && (
        <div 
          className={`
            mt-1 pl-4 space-y-2 overflow-hidden transition-all duration-300
            ${isActive ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}
          `}
          aria-hidden={!isActive}
        >
          {item.dropdownItems
            .filter((dropdownItem) =>
              isLoggedIn ? true : !dropdownItem.requiresAuth
            )
            .map((dropdownItem, itemIndex) => (
              <button
                key={itemIndex}
                onClick={() =>
                  onNavigate(dropdownItem.href, dropdownItem.requiresAuth)
                }
                className={`
                  block w-full text-left px-4 py-3 rounded-xl text-sm 
                  ${dropdownItem.color || item.color} transition-all duration-200
                  bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                  hover:bg-white/80 dark:hover:bg-gray-700/80
                  shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700
                  hover:translate-x-1
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 p-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                      {dropdownItem.icon}
                    </div>
                    <span className="font-medium">{dropdownItem.label}</span>
                  </div>
                  <FaChevronRight className="text-xs" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-7">
                  {dropdownItem.description}
                </p>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavItem;