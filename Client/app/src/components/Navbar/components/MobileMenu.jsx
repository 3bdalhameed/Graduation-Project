import React from "react";
import MobileNavItem from "./MobileNavItem";
import AuthButtons from "./AuthButtons";

const MobileMenu = ({ 
  isMenuOpen, 
  navItems, 
  openDropdown,
  isLoggedIn,
  onToggleDropdown,
  onNavigate,
  onLogout
}) => {
  if (!isMenuOpen) return null;
  
  return (
    <div 
      className={`
        md:hidden fixed top-[59px] inset-x-0 bg-white dark:bg-gray-900 shadow-xl
        border-t border-gray-200 dark:border-gray-700
        transition-all duration-300 opacity-100 translate-y-0
        z-40 overflow-auto h-[calc(100vh-59px)]
      `}
      aria-hidden={!isMenuOpen}
    >
      <div className="px-6 py-4 space-y-2 overflow-y-auto pb-20">
        {/* Mobile navigation items */}
        {navItems.map((item, index) => (
          <MobileNavItem
            key={index}
            item={item}
            index={index}
            isActive={openDropdown === index}
            onToggle={onToggleDropdown}
            onNavigate={onNavigate}
            isLoggedIn={isLoggedIn}
          />
        ))}

        {/* Mobile auth buttons */}
        <AuthButtons
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          isMobile={true}
          onMobileClick={(path) => {
            if (path) {
              onNavigate(path, false);
            } else {
              onLogout();
            }
          }}
        />
      </div>
    </div>
  );
};

export default MobileMenu;