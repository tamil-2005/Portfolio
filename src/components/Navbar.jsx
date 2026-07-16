import React, { useState, useEffect } from "react";
import { NAV_LINKS } from "../data/portfolioData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#030206]/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 lg:h-20">

        {/* Logo */}
        <a href="#home" className="font-bold text-lg tracking-wider text-white flex items-center gap-2 flex-shrink-0">
          <span className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl flex items-center justify-center text-white text-sm font-extrabold shadow-lg shadow-indigo-500/20" style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)" }}>T</span>
          <span className="font-extrabold tracking-widest text-xs sm:text-sm lg:text-base">TAMILSELVAN</span>
        </a>

        {/* Desktop nav — visible at md+ */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-2">
          <div className="relative flex flex-col items-center">
            <a href="#home" className={`px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${active === "home" ? "text-white" : "text-gray-400 hover:text-white"}`}>Home</a>
            {active === "home" && <span className="absolute bottom-0 w-4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />}
          </div>
          {NAV_LINKS.map(l => (
            <div key={l.href} className="relative flex flex-col items-center">
              <a href={l.href} className={`px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${active === l.href.slice(1) ? "text-white" : "text-gray-400 hover:text-white"}`}>{l.label}</a>
              {active === l.href.slice(1) && <span className="absolute bottom-0 w-4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />}
            </div>
          ))}
          {/* Download Resume — only at lg+ to prevent crowding at 768px */}
          <a href="./Assets/Resume.pdf" target="_blank" rel="noreferrer"
            className="ml-2 lg:ml-4 px-4 lg:px-5 py-2 lg:py-2.5 rounded-xl text-xs lg:text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 hidden lg:flex items-center gap-2"
            style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)" }}>
            <i className="fa-solid fa-download text-xs" />
            Download Resume
          </a>
        </nav>

        {/* Hamburger — visible below md */}
        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          onClick={() => setOpen(o => !o)}>
          <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${open ? "w-5 rotate-45 translate-y-2" : "w-5"}`} />
          <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${open ? "w-0 opacity-0" : "w-4"}`} />
          <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${open ? "w-5 -rotate-45 -translate-y-2" : "w-5"}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden bg-[#030206] backdrop-blur-md border-b border-white/5 overflow-hidden transition-all duration-300 ${open ? "max-h-96 py-3" : "max-h-0"}`}>
        <a href="#home" onClick={() => setOpen(false)} className="block px-6 py-3 text-gray-300 text-sm font-medium hover:bg-white/5 hover:text-white transition-colors">Home</a>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-6 py-3 text-gray-300 text-sm font-medium hover:bg-white/5 hover:text-white transition-colors">{l.label}</a>
        ))}
        <div className="px-6 pt-3 pb-4">
          <a href="./Assets/Resume.pdf" target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)" }}>
            <i className="fa-solid fa-download text-xs" />
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
}
