'use client'
import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
    title: string;
    subtitle: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };
    
    return (
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-16"
        >
            <motion.h2 
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent pb-3"
                variants={fadeIn}
                animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ 
                    duration: 15, 
                    repeat: Infinity,
                    ease: "linear" 
                }}
            >
                {title}
            </motion.h2>

            <motion.p 
                variants={fadeIn}
                className="mt-4 text-white max-w-2xl mx-auto text-lg"
            >
                {subtitle}
            </motion.p>
        </motion.div>
    );
};

export default SectionTitle;