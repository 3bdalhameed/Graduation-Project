import React from "react";

const BlurOverlay = ({ isActive = false }) => {
  return (
    <div
      className={`
        fixed inset-0 pointer-events-none z-10
        transition-opacity duration-500 ease-in-out
        ${isActive ? 'opacity-100' : 'opacity-0'}
      `}
      style={{
        backdropFilter: isActive ? 'blur(8px)' : 'blur(0px)',
        WebkitBackdropFilter: isActive ? 'blur(8px)' : 'blur(0px)',
      }}
      aria-hidden="true"
    />
  );
};

export default BlurOverlay;