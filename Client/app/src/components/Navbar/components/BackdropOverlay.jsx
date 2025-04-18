import React from "react";

const BackdropOverlay = ({
  isVisible,
  onClick,
  isMobile = false,
  isLight = false,
  zIndex = "z-20",
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed inset-0 transition-all duration-300 ease-in-out
        ${isMobile ? "md:hidden" : ""}
        ${isLight ? "bg-black/10 dark:bg-black/20" : "bg-black/25 dark:bg-black/40"}
        ${zIndex}
      `}
      style={{
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      }}
      onClick={onClick}
      aria-hidden="true"
    />
  );
};

export default BackdropOverlay;