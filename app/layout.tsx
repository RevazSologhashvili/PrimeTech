import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";  // Ensure this includes the CSS for hiding the default cursor


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrimeTech - IT სერვისები როგორც მცირე ისე დიდი ბიზნესებისთვის",
  description: "პრაიმტექი გთავაზობთ პროფესიონალურ IT სერვისებს მცირე და დიდი ბიზნესებისთვის. ჩვენი მომსახურება მოიცავს IT მხარდაჭერას, ტექნოლოგიურ გადაწყვეტილებებს, კომპიუტერული მომსახურებას და ტექნიკური პრობლემების სწრაფად და ეფექტურად მოგვარებას.",
  keywords: "IT სერვისები, IT მხარდაჭერა, ტექნოლოგიური გადაწყვეტილებები, ტექნოლოგიური სერვისები, PrimeTech, პრაიმტექი, აიტი სერვისები, აიტი მხარდაჭერა, ინფორმაციული ტექნოლოგიები, კომპიუტერული მომსახურება, კომპიუტერის შეკეთება, ტექნიკური მხარდაჭერა, ბიზნეს IT სერვისები",
  robots: "index, follow",  // This tells search engines to index the page and follow links on the page
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased` + " min-h-screen bg-main"}
      >


        {children}
      </body>
    </html>
  );
}
