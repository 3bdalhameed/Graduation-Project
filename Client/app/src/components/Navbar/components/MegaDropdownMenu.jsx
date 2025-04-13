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
  
  const activeCategory = navItems[activeDropdown]?.label || "";
  
  return (
    <div 
      ref={dropdownRef}
      className={`
        absolute z-40 left-0 right-0 w-full mt-0
        bg-gradient-to-b from-white/90 to-white/95 dark:from-gray-800/90 dark:to-gray-900/95
        border-t border-gray-200/50 dark:border-gray-700/50
        shadow-2xl shadow-gray-200/50 dark:shadow-gray-900/50 
        transition-all duration-300 ease-out
        animate-dropdownOpen origin-top
      `}
      style={{
        boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }}
      role="menu"
    >
      <div className="container mx-auto px-5 py-6">
        {/* Category header */}
        <div className="mb-4 border-b border-gray-100 dark:border-gray-700/30 pb-2">
          <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 px-2">
            {activeCategory}
            <span className="ml-1 text-sm font-normal text-gray-400 dark:text-gray-500">menu</span>
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groupItemsInColumns(navItems[activeDropdown]?.dropdownItems || [], 3).map((column, colIndex) => (
            <div key={colIndex} className="space-y-3">
              {column.map((dropdownItem, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => onNavigate(dropdownItem.href, dropdownItem.requiresAuth)}
                  className={`
                    flex items-start w-full text-left p-3.5 rounded-xl
                    ${dropdownItem.color || navItems[activeDropdown]?.color} 
                    transition-all duration-300 hover:scale-[1.02]
                    bg-white/70 dark:bg-gray-800/70
                    hover:bg-gradient-to-br hover:from-white hover:to-gray-50/90 
                    dark:hover:from-gray-800 dark:hover:to-gray-700/90
                    hover:shadow-md hover:shadow-primary-100/20 dark:hover:shadow-primary-900/10
                    border border-gray-100/50 dark:border-gray-700/40
                    group/item relative overflow-hidden
                  `}
                  role="menuitem"
                >
                  {/* Background glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/5 to-transparent -translate-x-full group-hover/item:animate-shimmer"></div>
                  </div>
                  
                  <div className="mr-3 p-2 bg-gradient-to-br from-gray-50 to-gray-100/80 dark:from-gray-700 dark:to-gray-800/80 
                              rounded-lg text-base shadow-sm
                              group-hover/item:from-primary-50 group-hover/item:to-primary-100/50 
                              dark:group-hover/item:from-primary-900/30 dark:group-hover/item:to-primary-800/20 
                              group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400
                              transition-all duration-300">
                    {dropdownItem.icon}
                  </div>
                  
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-medium text-gray-800 dark:text-gray-200 group-hover/item:text-primary-700 dark:group-hover/item:text-primary-400 transition-colors duration-200">
                      {dropdownItem.label}
                    </span>
                    {dropdownItem.description && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5 line-clamp-2">
                        {dropdownItem.description}
                      </p>
                    )}
                  </div>
                  
                  <FaChevronRight className="ml-3 mt-1 text-xs text-gray-300 dark:text-gray-600 
                                          opacity-0 transform translate-x-2 
                                          group-hover/item:opacity-100 group-hover/item:translate-x-0 
                                          group-hover/item:text-primary-500 dark:group-hover/item:text-primary-400
                                          transition-all duration-300 ease-in-out" />
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