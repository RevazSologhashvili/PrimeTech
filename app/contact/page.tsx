"use client"
import { sendMail } from "@/app/api/actions";
import { Card, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMail({ from, to: 'rezosologa@gmail.com', subject, text });
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
    <>
    <div>
    </div>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="flex flex-col md:flex-row w-full max-w-7xl bg-white/10 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden">
          <div className="w-full md:w-1/2 p-6 bg-gradient-to-r from-blue-800 to-purple-800 text-white">
            <h2 className="mb-4 text-3xl font-bold">საკონტაქტო ინფორმაცია</h2>
            <p className="mb-2">რამე მისამართი</p>
            <p className="mb-2">Phone: ტელ ნომერი</p>
            <p className="mb-2">Email: მეილი</p>
            <div className="mt-8">
              <Link href="/" className="flex justify-center">
                <Image src="/service.png" width={600} height={400} alt="logo" className="object-fit rounded-md" />
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-6">
            <Card className="w-full p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg">
              <h2 className="mb-6 text-5xl font-bold text-center text-black">Contact Us</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-black">E-mail</label>
                  <TextField
                    id="email"
                    variant="outlined"
                    fullWidth
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    slotProps={{ input: { style: { color: '#000' } } }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="title" className="text-black">სათაური</label>
                  <TextField
                    id="title"
                    variant="outlined"
                    fullWidth
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    slotProps={{ input: { style: { color: '#000' } } }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="textBody" className="text-black">მესიჯი</label>
                  <TextField
                    id="textBody"
                    variant="outlined"
                    multiline
                    rows={5}
                    fullWidth
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    slotProps={{ input: { style: { color: '#000' } } }}
                  />
                </div>
                <button className="px-4 py-2 mt-4 text-white bg-gradient-to-r from-green-400 to-green-600 rounded-md hover:from-green-500 hover:to-green-700 transition-all ease-in-out active:from-green-300 active:to-green-500">
                  გაგზავნა
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
