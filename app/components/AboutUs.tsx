"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AboutUs = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
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

  const scaleUp = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { 
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse' as const
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900/95 to-gray-800/95 text-gray-100 py-16">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
      >
        {/* Section header */}
        <motion.div 
          variants={fadeIn}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent pb-3"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "linear" 
            }}
          >
            ჩვენ შესახებ
          </motion.h2>
         
          <motion.p 
            variants={fadeIn}
            className="mt-4 text-gray-300 max-w-2xl mx-auto text-lg"
          >
            გაეცანით ჩვენს გუნდს და კომპანიის ისტორიას - თქვენი სანდო IT პარტნიორი
          </motion.p>
        </motion.div>

        {/* Company story section */}
        <motion.div 
          variants={staggerContainer}
          className="flex flex-col lg:flex-row items-center mb-24 gap-12"
        >
          <motion.div 
            variants={slideInLeft}
          >
            <motion.div 
              className="relative rounded-xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl">
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={slideInRight}
            
          >
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent pb-3">კომპანიის ისტორია</h3>
            <div className="space-y-4">
                <motion.p 
                className="text-gray-300"
                variants={fadeIn}
                >
                ჩვენი კომპანია 2024 წელს შეიქმნა, რათა მცირე თუ დიდი ბიზნესისთვის ტექნოლოგიური გამოწვევებისთვის ეფექტური და ინოვაციური გადაწყვეტილებები შეგვეთავაზებინა. დღეს ჩვენ ვამაყობთ, რომ ვართ ერთ-ერთი წამყვანი IT მომსახურების პროვაიდერი.
                </motion.p>
              <motion.p 
                className="text-gray-300"
                variants={fadeIn}
              >
                ჩვენი მიზანია შევქმნათ თანამედროვე ტექნოლოგიური გადაწყვეტილებები ნებისმიერი ზომის ბიზნესისთვის და დავეხმაროთ მათ წარმატების მიღწევაში. ჩვენ ვამაყობთ, რომ გვყავს კმაყოფილი კლიენტები როგორც მცირე ბიზნესების, ასევე მსხვილი კორპორაციების სახით.
              </motion.p>
              <motion.p 
                className="text-gray-300"
                variants={fadeIn}
              >
                ჩვენი გუნდი შედგება კვალიფიციური IT სპეციალისტებისგან, რომლებსაც აქვთ მრავალწლიანი გამოცდილება სხვადასხვა ტექნოლოგიურ სფეროში.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Our values section */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-24"
        >
          <motion.h3 
            variants={fadeIn}
            className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent pb-3"
          >
            ჩვენი ღირებულებები
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "გუნდური მუშაობა",
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                  ),
                  text: "ჩვენ მტკიცედ გვწამს, რომ მეტი ეფექტურობის, განვითარების და საუკეთესო შედეგების მისაღწევად აუცილებელია მუდმივი გუნდურობა, რაც უზრუნვეყოფს სამუშაოს სწრაფ და ეფექტურ შესრულებას.",
                  color: "from-blue-600 to-blue-400"
                  },
                  {
                  title: "ხარისხი",
                  icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                ),
                text: "ჩვენთვის ხარისხი უმთავრესია. ვცდილობთ მუდმივად გავაუმჯობესოთ ჩვენი სერვისები და შევქმნათ საიმედო გადაწყვეტილებები.",
                color: "from-green-600 to-green-400"
              },
              {
                title: "ინოვაცია",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                text: "ტექნოლოგიების სფერო მუდმივად იცვლება და ჩვენც ცვლილებებთან ერთად ვვითარდებით. ჩვენი სპეციალისტები მუდმივად იმაღლებენ კვალიფიკაციას და ეცნობიან უახლეს ტექნოლოგიებს.",
                color: "from-purple-600 to-purple-400"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                className="bg-gray-800 backdrop-blur-lg bg-opacity-50 p-8 rounded-xl border border-gray-700 shadow-lg"
              >
                <motion.div 
                  className={`h-16 w-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mx-auto mb-6 text-white`}
                  whileHover={pulseAnimation}
                >
                  {value.icon}
                </motion.div>
                <motion.h4 
                  className={`text-xl font-semibold mb-4 text-center bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}
                >
                  {value.title}
                </motion.h4>
                <motion.p className="text-gray-300 text-center">
                  {value.text}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>

  

        {/* Stats section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          className="my-24 bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-12 rounded-2xl backdrop-blur-lg shadow-lg border border-blue-900/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {[
              // { value: "10+", label: "წელი ბაზარზე" },
              { value: "30+", label: "კმაყოფილი კლიენტი" },
              { value: "5+", label: "IT სპეციალისტი" },
              { value: "24/7", label: "მხარდაჭერა" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.5,
                    delay: index * 0.1
                  }
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    delay: index * 0.3,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  {stat.value}
                </motion.div>
                <motion.p 
                  className="text-gray-300 mt-3 text-lg"
                  variants={fadeIn}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          className="text-center"
        >
          <motion.h3 
            className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            მზად ხართ დაიწყოთ თანამშრომლობა?
          </motion.h3>
        
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/contact">
              <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
                <span className="relative z-10">დაგვიკავშირდით!</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;