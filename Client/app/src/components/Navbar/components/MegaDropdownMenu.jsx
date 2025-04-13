import React from "react";
import { FaChevronRight } from "react-icons/fa";

const MegaDropdownMenu = ({ activeDropdown, navItems, onNavigate, isLoggedIn, dropdownRef }) => {
  if (activeDropdown === null) return null;
  
  // Group dropdown items into columns for the mega menu
  const groupItemsInColumns = (items, columnsCount = 3) => {
    const filtered = items.filter(item => isLoggedIn ? true : !item.requiresAuth);
    const itemsPerColumn = Math.ceil(filtered.length / columnsCount);
    const columns = [];

    for (let i = 0; i < columnsCount; i++) {
      const start = i * itemsPerColumn;
      const end = start + itemsPerColumn;
      const columnItems = filtered.slice(start, end);

      if (columnItems.length > 0) {
        columns.push(columnItems);
      }
    }

    return columns;
  };
  
  return (
    <div 
      ref={dropdownRef}
      className={`
        absolute z-40 left-0 right-0 w-full mt-1
        bg-white/90 dark:bg-gray-800/95
        border-t border-gray-200 dark:border-gray-700
        shadow-2xl transition-all duration-300 ease-in-out
        animate-dropdownOpen origin-top
      `}
      role="menu"
    >
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
          {groupItemsInColumns(navItems[activeDropdown]?.dropdownItems || [], 3).map((column, colIndex) => (
            <div key={colIndex} className="space-y-3">
              {column.map((dropdownItem, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => onNavigate(dropdownItem.href, dropdownItem.requiresAuth)}
                  className={`
                    flex flex-col w-full text-left p-4 rounded-xl
                    ${dropdownItem.color || navItems[activeDropdown]?.color} 
                    transition-all duration-200 hover:scale-[1.03]
                    bg-white/80 dark:bg-gray-800/80
                    hover:bg-white/95 dark:hover:bg-gray-700/95
                    shadow-sm hover:shadow-lg border border-gray-100/60 dark:border-gray-700/60
                    group/item relative overflow-hidden
                  `}
                  role="menuitem"
                >
                  {/* Background hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-gray-600/20 -translate-x-full group-hover/item:animate-shimmer"></div>
                  
                  <div className="flex items-center mb-2 relative z-10">
                    <div className="mr-3 p-2.5 bg-gray-100/80 dark:bg-gray-700/80 rounded-full text-lg
                                  shadow-inner group-hover/item:bg-white dark:group-hover/item:bg-gray-600 
                                  transition-all duration-300 ring-2 ring-white/10 dark:ring-gray-700/40">
                      {dropdownItem.icon}
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{dropdownItem.label}</span>
                    <FaChevronRight className="ml-auto opacity-0 transform translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 ease-in-out" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs ml-12 relative z-10">
                    {dropdownItem.description}
                  </p>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaDropdownMenu;