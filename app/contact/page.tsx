"use client";
import { sendMail } from "@/app/api/actions";
import React, { useState } from "react";

export default function Page() {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMail({ from, to: "rezosologa@gmail.com", subject, text });
      alert("Email sent successfully!");
      setFrom("");
      setSubject("");
      setText("");
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat bg-center bg-main flex items-center justify-center p-4">
      <div className="w-full max-w-7xl rounded-lg shadow-xl overflow-hidden backdrop-blur-xl bg-gray-900/70 mt-20 md:mt-26">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Left Section with Contact Info */}
          <div className="text-white flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold mb-4">საკონტაქტო ინფორმაცია</h2>
            <p className="text-lg mb-4">მისამართი: რამე მისამართი</p>
            <p className="text-lg mb-4">Phone: ტელ ნომერი</p>
            <p className="text-lg mb-4">Email: meili@address.com</p>

            <div className="flex justify-center mt-8">
              <div className="h-[250px] w-[250px] bg-cover bg-center rounded-full bg-[url('/assets/logo_transparent.png')]"></div>
            </div>
          </div>

          {/* Right Section with Contact Form */}
          <div className="flex flex-col justify-center bg-gray-600/70 backdrop-blur-lg p-6 rounded-xl shadow-2xl border border-gray-800">
            <h2 className="text-3xl font-bold text-center text-white mb-8">დაგვიკავშირდით</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-xl font-medium text-white mb-2">
                  ელ-ფოსტა
                </label>
                <input
                  type="email"
                  id="email"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full p-3 bg-white/20 rounded-lg border border-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                  required
                />
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="subject" className="block text-xl font-medium text-white mb-2">
                  სათაური
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 bg-white/20 rounded-lg border border-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                  required
                />
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-xl font-medium text-white mb-2">
                  მესიჯი
                </label>
                <textarea
                  id="message"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full p-3 bg-white/20 rounded-lg border border-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                  rows={5}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-xl hover:from-green-600 hover:to-green-700 transition-all ease-in-out active:from-green-400 active:to-green-500"
              >
                გაგზავნა
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
