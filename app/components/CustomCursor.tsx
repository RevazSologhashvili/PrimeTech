"use client"
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", () => setIsClicking(true));
    window.addEventListener("mouseup", () => setIsClicking(false));

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", () => setIsClicking(true));
      window.removeEventListener("mouseup", () => setIsClicking(false));
    };
  }, []);

  return (
    <>
      {/* Outer cursor (ring) */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-white pointer-events-none topAll mix-blend-difference animate-pulse"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
          duration: 0
        }}
      />
      
      {/* Inner cursor (dot) */}
      <motion.div
        className=" fixed w-2 h-2 bg-white rounded-full pointer-events-none topAll mix-blend-difference animate-pulse"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isClicking ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 750,
          damping: 28,
          mass: 0.25,
          duration: 0
        }}
      />
    </>
  );
};

export default CustomCursor;