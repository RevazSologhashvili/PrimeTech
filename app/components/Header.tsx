"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) => path === pathname;

  // Check scroll position and update state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) { // Adjust threshold for scroll detection
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isNotMainPage = pathname !== "/"; // Check if the page is not the main page

  return (
    <div className="fixed w-full top-0 left-0 z-50 my-7">
      <header
        className={`max-w-[90%] rounded-full flex items-center justify-between text-gray-200 px-5 mx-auto 
          ${isNotMainPage || isScrolled ? "bg-gray-800/80 backdrop-blur-md" : "bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border border-white/50 border-gray-500"} transition duration-300 ease-in-out`}
      >
        <Link href={"/"}>
          <Image
            src={"/assets/logo_transparent.png"}
            width={120}
            height={100}
            alt="logo"
            className="aspect-video object-cover"
          />
        </Link>

        <nav className="flex-1 ml-10">
          <ul className="list-none flex items-center gap-5 text-md font-semibold">
            <li
              className={`${
                isActive("/")
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/40 hover:text-white"
              } px-3 py-2 rounded-md text-center transition-colors duration-300`}
            >
              <Link href={"/"}>მთავარი</Link>
            </li>
            <li
              className={`${
                isActive("/contact")
                  ? "bg-gray/20 text-white"
                  : "hover:bg-white/40 hover:text-white"
              } px-3 py-2 rounded-md text-center transition-colors duration-300`}
            >
              <Link href={"/contact"}>კონტაქტი</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
