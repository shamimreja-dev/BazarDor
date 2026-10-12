import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর - BazarDor",
  description: "নিত্যপ্রয়োজনীয় পণ্যের সঠিক বাজার দর এক নজরে",
};

// API থেকে পণ্যের ডেটা নিয়ে আসার জন্য ফাংশন
async function getProducts() {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ১. পণ্যের তালিকা ফেচ করে নিচ্ছি
  const products = await getProducts();

  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-theme="light"
    >
      <body suppressHydrationWarning
       className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
             

        {/* টোস্ট নোটিফিকেশন কন্টেইনার */}
        <Toaster position="top-center" />

        {/* নেভবারে products ডেটা পাস করা হলো */}
        <Navbar products={products} />

        {/* মেইন কন্টেন্ট */}
        <main className="flex-1">{children}</main>

        {/* ফুটার */}
        <Footer />
      </body>
    </html>
  );
}