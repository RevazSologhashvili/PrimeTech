"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => path === pathname;
  const isNotMainPage = pathname !== "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Apply background when scrolled
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { path: "/", label: "მთავარი" },
    { path: "/contact", label: "კონტაქტი" },
  ];

  return (
    <motion.div
      className="fixed w-full top-0 left-0 z-50"
      initial={{ y: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        transition: { duration: 0.3 },
      }}
    >
      <header
        className={`
          max-w-[90%] md:max-w-[95%] mx-auto mt-4 rounded-full
          flex items-center justify-between
          px-4 md:px-6 py-2 md:py-3
          transition-all duration-300 ease-in-out
          ${
            isNotMainPage || isScrolled
              ? "bg-gray-800/90 backdrop-blur-md shadow-lg"
              : "bg-transparent border border-white/20"
          }
          ${isScrolled ? "md:py-2 shadow-2xl" : ""}
        `}
      >
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/assets/logo_transparent.png"
            width={90}
            height={100}
            alt="logo"
        
          />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-4 lg:gap-6 text-sm lg:text-base font-medium">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`
                    px-4 py-2 rounded-full transition-all duration-300
                    ${
                      isActive(item.path)
                        ? "bg-white/20 text-white"
                        : "text-gray-200 hover:bg-white/10"
                    }
                    ${isScrolled ? "hover:bg-white/20" : "hover:bg-white/10"}
                  `}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-2 mx-4 p-4 rounded-2xl bg-gray-800/95 backdrop-blur-md md:hidden"
            >
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        block px-4 py-2 rounded-lg transition-all duration-300
                        ${
                          isActive(item.path)
                            ? "bg-white/20 text-white"
                            : "text-gray-200 hover:bg-white/10"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </motion.div>
  );
}
