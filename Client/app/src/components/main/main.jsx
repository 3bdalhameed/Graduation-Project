import React, { useEffect, useRef } from "react";
import React, { useEffect, useRef } from "react";
import hacker from "../../pages/img/hacker.png";
import Button from "../encryptbutton.jsx";

function MainSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speedX: Math.random() * 0.3 - 0.15,
      speedY: Math.random() * 0.3 - 0.15,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDarkMode = document.documentElement.classList.contains("dark");

      particles.forEach((particle) => {
        ctx.fillStyle = isDarkMode
          ? `rgba(56, 189, 248, ${particle.opacity})`
          : `rgba(37, 99, 235, ${particle.opacity * 1.2})`;

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
      <div className="absolute inset-0 -z-10">
        <canvas ref={canvasRef} aria-hidden="true" className="w-full h-full" />
      </div>
      <div className="container mx-auto px-6 py-24 sm:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider mb-2 text-blue-700 dark:text-blue-400">
                Cyber Security Platform
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-800 dark:text-white">
                Welcome to <span className="text-gradient">JuCC</span>
              </h1>
            </div>

            <p className="text-lg max-w-lg text-gray-700 dark:text-gray-300">
              Enhance your{" "}
              <span className="font-medium text-blue-700 dark:text-blue-400">
                Hacking
              </span>{" "}
              experience with cutting-edge challenges, immersive learning, and a
              vibrant community of security enthusiasts.
            </p>

            <div className="inline-block">
              <Button />
            </div>
          </div>

          <div className="relative mt-8 md:mt-0">
            <div className="absolute inset-0 -z-10 blur-3xl rounded-full bg-blue-200/60 dark:bg-blue-900/20"></div>
            <img
              src={hacker}
              alt="Cybersecurity specialist"
              className="w-full max-w-lg mx-auto object-contain relative animate-image-reveal filter dark:brightness-110 drop-shadow-xl"
              loading="lazy"
            />
          </div>
        </div>

        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-blue-700/70 dark:text-blue-400/60 animate-bounce">
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
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-transparent to-transparent z-10"></div>
    </section>
  );
}

export default MainSection;