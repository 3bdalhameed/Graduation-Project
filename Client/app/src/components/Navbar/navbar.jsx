import { useRef } from "react";
import Logo from "./components/Logo";
import BurgerMenu from "./components/BurgerMenu";
import DarkModeToggle from "./components/DarkModeToggle";
import NavItem from "./components/NavItem";
import MegaDropdownMenu from "./components/MegaDropdownMenu";
import MobileMenu from "./components/MobileMenu";
import AuthButtons from "./components/AuthButtons";
import BackdropOverlay from "./components/BackdropOverlay";
import { navItems } from "./data/navItems.jsx";
import { useNavbarLogic } from "./hooks/useNavbarLogic";

const NavBar = () => {
  // Use the custom navbar logic hook
  const {
    isMenuOpen,
    isVisible,
    scrolledDown,
    openDropdown,
    isLoggedIn,
    navRef,
    setOpenDropdown,
    handleDropdownToggle,
    handleNavigation,
    handleLogout,
    toggleMenu,
    closeAllMenus
  } = useNavbarLogic();

  // Refs
  const dropdownRef = useRef(null);

  // If navbar is hidden, don't render
  if (!isVisible) return null;

  return (
    <>
      {/* Single backdrop overlay for all menu states */}
      <BackdropOverlay
        isVisible={isMenuOpen || openDropdown !== null}
        onClick={closeAllMenus}
        zIndex="z-20"
      />

      <nav
        ref={navRef}
        className={`
          fixed w-full z-50 transition-all duration-300 py-1
          ${
            scrolledDown
              ? "bg-white/95 dark:bg-gray-900/95 shadow-lg"
              : "bg-white/80 dark:bg-gray-900/80"
          }
        `}
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Main navbar container */}
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                item={item}
                index={index}
                isActive={openDropdown === index}
                onToggle={handleDropdownToggle}
              />
            ))}
          </div>

          {/* Right section: Auth buttons & dark mode toggle */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* Auth Buttons */}
            <AuthButtons isLoggedIn={isLoggedIn} onLogout={handleLogout} />

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Mobile menu button */}
            <div className="md:hidden">
              <BurgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            </div>
          </div>
        </div>

        {/* Desktop Mega Dropdown Menu */}
        <MegaDropdownMenu
          activeDropdown={openDropdown}
          navItems={navItems}
          onNavigate={handleNavigation}
          isLoggedIn={isLoggedIn}
          dropdownRef={dropdownRef}
        />

        {/* Mobile Menu - No need for a separate backdrop */}
        <MobileMenu
          isMenuOpen={isMenuOpen}
          navItems={navItems}
          openDropdown={openDropdown}
          isLoggedIn={isLoggedIn}
          onToggleDropdown={handleDropdownToggle}
          onNavigate={handleNavigation}
          onLogout={handleLogout}
        />
      </nav>
    </>
  );
};

export default NavBar;
