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

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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

    // Close mobile menu when scroll starts
    const handleScrollStart = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScrollStart, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScrollStart);
    };
  }, [lastScrollY, isMobileMenuOpen]);

  const navItems = [
    { path: "/", label: "მთავარი" },
    { path: "/contact", label: "კონტაქტი" },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
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
            w-[95%] sm:w-[90%] mx-auto mt-2 sm:mt-4 rounded-full
            flex items-center justify-between
            px-3 sm:px-4 md:px-6 py-2 md:py-3
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
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
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
              width={70}
              height={70}
              className="w-16 h-auto sm:w-20 md:w-24 object-contain"
              alt="logo"
              priority
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
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed top-20 left-4 right-4 p-4 rounded-2xl bg-gray-800/95 backdrop-blur-md shadow-xl md:hidden z-50"
              >
                <ul className="flex flex-col gap-3">
                  {navItems.map((item) => (
                    <li key={item.path} className="w-full">
                      <Link
                        href={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`
                          block px-4 py-3 rounded-lg transition-all duration-300 text-center text-base
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
    </>
  );
}