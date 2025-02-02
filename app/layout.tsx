import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";  // Ensure this includes the CSS for hiding the default cursor
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrimeTech - IT Services for Businesses and Individuals",
  description: "PrimeTech offers top-notch IT solutions, including software development, web design, cloud services, IT support, and more. Our experts help businesses and individuals achieve success with cutting-edge technology.",
  keywords: "IT services, software development, web design, cloud services, IT support, tech solutions, technology services, PrimeTech",
  robots: "index, follow",  // This tells search engines to index the page and follow links on the page
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased` + " min-h-screen"}
      >
        <CustomCursor />
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
