
import './globals.css';
import { Toaster } from 'react-hot-toast';

import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'BazarDor - বাজারের দর এক নজরে',
  description: 'দৈনন্দিন নিত্যপ্রয়োজনীয় পণ্যের বাজার দর',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="h-full">
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden"
      >
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              fontSize: '14px',
            },
          }}
        />

        <Navbar />
        <PriceTicker />

        <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}