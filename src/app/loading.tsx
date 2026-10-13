// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-gray-200 h-64 rounded-xl"></div>
      ))}
    </div>
  );
}