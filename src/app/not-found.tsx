// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold text-emerald-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">পেজটি পাওয়া যায়নি!</h2>
      <p className="text-gray-500 mb-6">আপনি যে লিঙ্কটি খুঁজছেন তা সঠিক নয় অথবা পেজটি সরিয়ে নেওয়া হয়েছে।</p>
      <Link
        href="/"
        className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}