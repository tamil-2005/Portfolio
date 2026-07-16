import React from "react";
import { SOCIAL } from "../data/portfolioData";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)" }}>T</span>
          <span className="text-sm text-gray-500">
            © 2026 <strong className="text-gray-900">Tamilselvan Mariyappan</strong>. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-2">
          {SOCIAL.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all text-sm"
              aria-label={s.label}>
              <i className={s.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
