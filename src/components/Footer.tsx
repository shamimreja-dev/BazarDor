// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white border-t py-8 text-xs text-gray-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="font-bold text-slate-800 text-sm flex items-center justify-center sm:justify-start gap-1">
            🛒 বাজার দর
          </h3>
          <p className="mt-0.5">প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        </div>
        <p className="text-gray-400">
          “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
        </p>
      </div>
    </footer>
  );
}