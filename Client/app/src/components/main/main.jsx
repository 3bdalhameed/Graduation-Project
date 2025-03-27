import React, { useEffect, useRef } from "react";
import hacker from "../../pages/img/hacker.png";
import Button from "../encryptbutton.jsx";

function MainSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Handle responsive canvas sizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Create optimized particles
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speedX: Math.random() * 0.3 - 0.15,
      speedY: Math.random() * 0.3 - 0.15,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    // Particle animation loop with dark mode awareness
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDarkMode = document.documentElement.classList.contains("dark");

      particles.forEach((particle) => {
        // Use theme colors based on dark/light mode
        ctx.fillStyle = isDarkMode
          ? `rgba(56, 189, 248, ${particle.opacity})`
          : `rgba(2, 132, 199, ${particle.opacity})`;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Navbar spacer - height matches navbar height */}
      <div className="absolute top-0 left-0 w-full h-16 z-30">
        {/* Transparent spacer - actual navbar is handled by the Navbar component */}
      </div>

      {/* Content-to-background gradient transition */}
      <div className="absolute top-16 left-0 w-full h-8 z-30 bg-gradient-to-b from-white/80 dark:from-gray-900/80 to-transparent"></div>

      {/* Optimized canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-50/50 dark:from-blue-900/20 via-white/30 dark:via-gray-900/30 to-white dark:to-gray-900"></div>

      {/* Tech symbols */}
      <div className="hidden md:block absolute top-28 left-10 text-4xl font-mono animate-float-slow text-blue-500/10 dark:text-blue-400/10">{`{ }`}</div>
      <div className="hidden md:block absolute bottom-20 right-10 text-3xl font-mono animate-float text-teal-500/10 dark:text-teal-400/10">{`</>`}</div>

      <div className="container mx-auto px-6 py-24 sm:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content section */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider mb-2 text-blue-600 dark:text-blue-400">
                Cyber Security Platform
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                Welcome to <span className="text-gradient">JuCC</span>
              </h1>
            </div>

            <p className="text-lg max-w-lg text-gray-700 dark:text-gray-300">
              Enhance your{" "}
              <span className="font-medium text-blue-600 dark:text-blue-400">
                Hacking
              </span>{" "}
              experience with cutting-edge challenges, immersive learning, and a
              vibrant community of security enthusiasts.
            </p>

            {/* Main CTA Button with improved styling */}
            <div className="inline-block">
              <Button />
            </div>
          </div>

          {/* Image with improved responsive handling */}
          <div className="relative mt-8 md:mt-0">
            <div className="absolute inset-0 -z-10 blur-3xl rounded-full bg-blue-100/50 dark:bg-blue-900/20"></div>
            <img
              src={hacker}
              alt="Cybersecurity specialist"
              className="w-full max-w-lg mx-auto object-contain relative animate-image-reveal filter dark:brightness-110"
              loading="lazy"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-blue-600/60 dark:text-blue-400/60 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Minimal grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.03]"></div>

      {/* Enhanced footer gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
    </section>
  );
}

export default MainSection;
