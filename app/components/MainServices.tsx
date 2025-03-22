'use client'
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface MainServicesProps {
    imageSrc: string;
    MainServicesTitle: string;
    MainServicesDescription: string;
    imagePosition?: "left" | "right";
    accentColor?: string;
}

const MainServices = ({
    imageSrc,
    MainServicesTitle,
    MainServicesDescription,
    imagePosition = "left",
    accentColor = "from-blue-400 to-blue-600",
}: MainServicesProps) => {
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const slideInLeft = {
        hidden: { x: -100, opacity: 0 },
        visible: { 
            x: 0, 
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const slideInRight = {
        hidden: { x: 100, opacity: 0 },
        visible: { 
            x: 0, 
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const pulseAnimation = {
        scale: [1, 1.03, 1],
        transition: { 
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse' as const
        }
    };

    return (
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="container mx-auto p-6 sm:p-8 max-w-7xl my-12 sm:my-16 bg-gray-900/70 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500"
        >
            <div className={`flex flex-col ${imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 items-center`}>
                <motion.div 
                    className="w-full lg:w-1/3"
                    variants={imagePosition === "left" ? slideInLeft : slideInRight}
                >
                    <motion.div 
                        className="relative aspect-video md:aspect-square w-full overflow-hidden rounded-xl shadow-lg "
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            alt={`${MainServicesTitle} - service image`}
                            width={600}
                            height={600}
                            className="object-cover h-full w-full"
                            src={`/assets${imageSrc}`}
                            priority={true}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                        
                        {/* Add decorative element similar to contact page */}
                        <motion.div 
                            className={`absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r ${accentColor}`}
                            animate={pulseAnimation}
                        ></motion.div>
                    </motion.div>
                </motion.div>
                
                <motion.div 
                    className="w-full lg:w-1/2 flex flex-col justify-center mt-6 lg:mt-0"
                    variants={imagePosition === "left" ? slideInRight : slideInLeft}
                >
                    <motion.h3 
                        className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center lg:text-left relative bg-gradient-to-r ${accentColor} bg-clip-text text-transparent pb-3`}
                        animate={{ 
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ 
                            duration: 15, 
                            repeat: Infinity,
                            ease: "linear" 
                        }}
                    >
                        {MainServicesTitle}
                        <motion.span 
                            className={`block h-1 bg-gradient-to-r ${accentColor} rounded mt-4 mx-auto lg:mx-0`}
                            initial={{ width: 0 }}
                            whileInView={{ width: "40%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
                        ></motion.span>
                    </motion.h3>
                    
                    <motion.div 
                        className="mt-8 p-6 rounded-xl bg-gray-700/40 backdrop-blur-sm border border-gray-600/50 shadow-lg"
                        variants={fadeIn}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {MainServicesDescription}
                        </p>
                        
                        
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MainServices;