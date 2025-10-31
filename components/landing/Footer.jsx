"use client";
import { useCurrentYear } from "@/hooks/useCurrentYear";

export default function Footer() {
  const currentYear = useCurrentYear();

  return (
    <footer className="py-16 bg-gray-950 text-gray-400 text-sm px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
        <p>© {currentYear} UddoktaHut. সর্বস্বত্ব সংরক্ষিত।</p>
        <div className="flex justify-center sm:justify-end gap-6">
          <a href="#" className="hover:text-white transition">
            প্রাইভেসি
          </a>
          <a href="#" className="hover:text-white transition">
            টার্মস
          </a>
          <a href="#" className="hover:text-white transition">
            যোগাযোগ
          </a>
        </div>
      </div>
    </footer>
  );
}
