"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { sendMail } from '../api/actions'; // Import sendMail function

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

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

  // const scaleUp = {
  //   hidden: { scale: 0.8, opacity: 0 },
  //   visible: { 
  //     scale: 1, 
  //     opacity: 1,
  //     transition: { duration: 0.5 }
  //   }
  // };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { 
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse' as const
    }
  };

  // Form handling
  interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setFormStatus({ submitted: false, error: false, message: '' });

    try {
      // Prepare mail options
      const mailOptions = {
        from: formData.email,
        to: 'info.primetechteam@gmail.com',
        subject: formData.subject,
        text: formData.message,
      };

      // Call sendMail function
      await sendMail(mailOptions);

      // Update form status on success
      setFormStatus({
        submitted: true,
        error: false,
        message: 'თქვენი შეტყობინება წარმატებით გაიგზავნა!',
      });

      // Reset form fields
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      // Handle errors
      console.error('Error sending email:', error);
      setFormStatus({
        submitted: true,
        error: true,
        message: 'შეტყობინების გაგზავნისას მოხდა შეცდომა. გთხოვთ, სცადოთ თავიდან.',
      });
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-b from-gray-900/95 to-gray-800/95 text-gray-100 py-24">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
      >

        {/* Contact Information and Form */}
        <motion.div 
          variants={staggerContainer}
          className="flex flex-col lg:flex-row gap-12 mb-24"
        >
          {/* Contact Information */}
          <motion.div 
            variants={slideInLeft}
            className="lg:w-1/3 space-y-8"
          >
            <div className="bg-gray-800 backdrop-blur-lg bg-opacity-50 p-8 rounded-xl border border-gray-700 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">საკონტაქტო ინფორმაცია</h3>
              
              <div className="space-y-6">
                {[
                  {
                    title: "ელ-ფოსტა",
                    text: "info.primetechteam@gmail.com",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    )
                  },
                  {
                    title: "ტელეფონი",
                    text: "+995 511 77 99 01",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    )
                  },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="h-12 w-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white"
                      whileHover={pulseAnimation}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{item.title}</h4>
                      <p className="text-gray-300">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            {/* <motion.div 
              variants={scaleUp}
              className="bg-gray-800 backdrop-blur-lg bg-opacity-50 p-8 rounded-xl border border-gray-700 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">სოციალური ქსელები</h3>
              
              <div className="flex gap-4">
                {[
                  {
                    name: "Facebook",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    ),
                    color: "hover:bg-blue-600"
                  },
                  {
                    name: "Twitter",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    ),
                    color: "hover:bg-sky-500"
                  },
                  {
                    name: "LinkedIn",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                    ),
                    color: "hover:bg-blue-700"
                  },
                  {
                    name: "Instagram",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                    color: "hover:bg-pink-600"
                  }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className={`w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white transition-colors duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div> */}
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            variants={slideInRight}
            className="lg:w-2/3"
          >
            <div className="bg-gray-800 backdrop-blur-lg bg-opacity-50 p-8 rounded-xl border border-gray-700 shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">მოგვწერეთ</h3>
              
              {formStatus.submitted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-6 text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-xl font-bold text-white mb-2">მადლობა!</h4>
                  <p className="text-gray-300">{formStatus.message}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormStatus({ submitted: false, error: false, message: '' })}
                    className="mt-6 inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-blue-500/20 hover:shadow-xl transition-all duration-300"
                  >
                    გაგზავნეთ ახალი შეტყობინება
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-gray-300 mb-2 font-medium">თქვენი სახელი</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="სახელი გვარი"
                      />
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-gray-300 mb-2 font-medium">ელ-ფოსტა</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="თქვენი@ელფოსტა.ge"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-gray-300 mb-2 font-medium">თემა</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="შეტყობინების თემა"
                    />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-gray-300 mb-2 font-medium">შეტყობინება</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="დაწერეთ თქვენი შეტყობინება აქ..."
                    ></textarea>
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                  >
                    <span className="relative z-10">გაგზავნა</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}

export default ContactPage;