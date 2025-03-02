"use client";
import { DiscordIcon } from "@/components/icons/discord-icon";
import type { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion, useMotionValue } from "framer-motion";
import {
  Code,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Moon,
  Sun,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function LinktreePage() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [init, setInit] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Initialize particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const links = [
    {
      title: "Portfolio",
      url: "https://syhru.vercel.app/",
      icon: <Code className="h-5 w-5" />,
      description: "Check out my latest projects",
      color: "from-violet-600 to-indigo-600",
    },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/muhammad-syahru-413241278/",
      icon: <Linkedin className="h-5 w-5" />,
      description: "Professional connections",
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "Instagram",
      url: "https://www.instagram.com/syhru_arr",
      icon: <Instagram className="h-5 w-5" />,
      description: "Let’s be friends & share the fun!",
      color: "from-pink-500 to-purple-500",
    },
    {
      title: "GitHub",
      url: "https://github.com/syhru",
      icon: <Github className="h-5 w-5" />,
      description: "See my code repositories",
      color: "from-gray-700 to-gray-900",
    },
    {
      title: "Discord",
      url: "https://discord.com/users/arull6593",
      icon: <DiscordIcon className="h-5 w-5" />, // Using the custom Discord icon
      description: "Space for collaboration.",
      color: "from-[#5865F2] to-[#7289DA]", // Discord's signature colors
    },
  ];

  // Updated particle configuration for a more elegant effect
  const particlesOptions: ISourceOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value:
          theme === "dark"
            ? ["#4f46e5", "#7c3aed", "#2563eb", "#db2777"]
            : "#000000",
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 0.8,
        straight: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 40,
      },
      opacity: {
        animation: {
          enable: true,
          speed: 0.05,
          sync: false,
          minimumValue: 0.1,
        },
        value: { min: 0.1, max: 0.5 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 1,
          sync: false,
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
          color: {
            value: ["#ffffff", "#4f46e5", "#7c3aed", "#2563eb", "#db2777"],
          },
        },
      },
    },
    detectRetina: true,
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const profileVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className={`min-h-screen ${
        theme === "dark"
          ? "dark bg-black"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-100"
      } flex flex-col items-center py-12 px-4 relative overflow-hidden`}>
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          className="absolute inset-0"
        />
      )}

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header with theme toggle */}
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}>
          <motion.button
            onClick={toggleTheme}
            className={`p-3 rounded-full ${
              theme === "dark"
                ? "bg-gray-900 text-white border border-gray-800"
                : "bg-white text-gray-800"
            } shadow-lg`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </motion.button>
        </motion.div>

        {/* Profile section */}
        <motion.div
          className="flex flex-col items-center space-y-6"
          variants={profileVariants}
          initial="hidden"
          animate="visible">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <div
              className={`h-32 w-32 rounded-full overflow-hidden border-4 ${
                theme === "dark" ? "border-indigo-500/20" : "border-blue-300/30"
              } shadow-xl`}>
              <motion.div
                className="w-full h-full"
                animate={{
                  background: [
                    "linear-gradient(to bottom right, #8b5cf6, #ec4899, #ef4444)",
                    "linear-gradient(to bottom right, #3b82f6, #8b5cf6, #ec4899)",
                    "linear-gradient(to bottom right, #10b981, #3b82f6, #8b5cf6)",
                    "linear-gradient(to bottom right, #8b5cf6, #ec4899, #ef4444)",
                  ],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}>
                <img
                  src="/images/me.jpg" // Ganti dengan path gambar Anda
                  alt="Profile"
                  className="h-full w-full object-cover custom-object-position"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}>
            <h1
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              } mb-2`}>
              Syahru
            </h1>
            <div
              className={`px-4 py-1 rounded-full ${
                theme === "dark"
                  ? "bg-purple-900/50 text-purple-200"
                  : "bg-blue-100 text-blue-800"
              } text-sm inline-block mb-2`}>
              Fullstack Dev
            </div>
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              } max-w-xs mx-auto`}>
              Creating digital experiences & sharing knowledge about web
              development
            </p>
          </motion.div>
        </motion.div>

        {/* Links section */}
        <motion.div
          className="space-y-4 mt-8"
          variants={container}
          initial="hidden"
          animate="show">
          {links.map((link, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 400 },
              }}
              whileTap={{ scale: 0.97 }}
              className="perspective-1000">
              <motion.a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-xl overflow-hidden ${
                  theme === "dark"
                    ? "bg-gray-900/30 backdrop-blur-sm"
                    : "bg-white/80 backdrop-blur-sm"
                } shadow-lg hover:shadow-xl transition-all duration-300`}
                style={{
                  transformStyle: "preserve-3d",
                }}
                whileHover={{
                  rotateX: 5,
                  rotateY: 10,
                  transition: { duration: 0.2 },
                }}>
                <div
                  className={`h-1 w-full bg-gradient-to-r ${link.color}`}></div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${link.color} text-white`}>
                      {link.icon}
                    </div>
                    <div>
                      <h3
                        className={`font-medium ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                        {link.title}
                      </h3>
                      <p
                        className={`text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}>
                        {link.description}
                      </p>
                    </div>
                  </div>
                  <ExternalLink
                    className={`h-4 w-4 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </div>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          className={`mt-12 text-center ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          } text-sm`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
          <p>Copyright © {new Date().getFullYear()} by Syahru</p>
          <p className="text-xs mt-1">Linkmee-v2</p>
        </motion.footer>
      </div>
    </div>
  );
}
