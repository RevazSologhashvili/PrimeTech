"use client"
import { sendMail } from "../api/actions";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Page() {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendMail({ from, to: "rezosologa@gmail.com", subject, text });
      setSubmitted(true);
      setFrom("");
      setSubject("");
      setText("");
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email.");
    }
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: MapPin, text: "რამე მისამართი", label: "მისამართი" },
    { icon: Phone, text: "ტელ ნომერი", label: "Phone" },
    { icon: Mail, text: "meili@address.com", label: "Email" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat bg-center bg-main flex items-center justify-center p-4 py-24">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-gray-900/70"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-12">
          {/* Left Section */}
          <motion.div 
            variants={itemVariants}
            className="text-white flex flex-col justify-between space-y-8"
          >
            <div>
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent pb-5"
              >
                საკონტაქტო ინფორმაცია
              </motion.h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center space-x-4 text-lg group"
                  >
                    <div className="p-3 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-all duration-300">
                      <item.icon className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{item.label}</p>
                      <p className="text-white">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="flex justify-center mt-8"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-[200px] w-[200px] md:h-[250px] md:w-[250px]"
              >
                <div className="absolute inset-0 bg-[url('/assets/logo_transparent.png')] bg-contain bg-no-repeat bg-center rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent rounded-2xl animate-pulse" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Section */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col justify-center bg-gray-800/50 backdrop-blur-lg p-6 md:p-8 rounded-xl shadow-2xl border border-gray-700/50"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold text-center text-white mb-8"
            >
              დაგვიკავშირდით
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {["email", "subject", "message"].map((field, index) => (
                <motion.div
                  key={field}
                  variants={itemVariants}
                  custom={index}
                >
                  <label 
                    htmlFor={field}
                    className="block text-lg font-medium text-white mb-2"
                  >
                    {field === "email" ? "ელ-ფოსტა" : field === "subject" ? "სათაური" : "მესიჯი"}
                  </label>
                  {field === "message" ? (
                    <textarea
                      id={field}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full p-3 bg-white/10 rounded-lg border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 text-white placeholder-gray-400 transition-all duration-300"
                      rows={5}
                      required
                    />
                  ) : (
                    <input
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      value={field === "email" ? from : subject}
                      onChange={(e) => field === "email" ? setFrom(e.target.value) : setSubject(e.target.value)}
                      className="w-full p-3 bg-white/10 rounded-lg border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 text-white placeholder-gray-400 transition-all duration-300"
                      required
                    />
                  )}
                </motion.div>
              ))}

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-3 px-6 text-white rounded-lg
                  ${isSubmitting ? 'bg-gray-500' : 'bg-gradient-to-r from-green-500 to-green-600'}
                  transform transition-all duration-300
                  hover:scale-[1.02] hover:shadow-lg
                  active:scale-[0.98]
                  disabled:opacity-70 disabled:cursor-not-allowed
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "იგზავნება..." : submitted ? "გაიგზავნა! ✓" : "გაგზავნა"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}