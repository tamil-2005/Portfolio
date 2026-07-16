import React, { useState, useEffect } from "react";
export default function ScrollUpBtn() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-6 z-50 w-11 h-11 rounded-xl text-white shadow-lg transition-all duration-300 flex items-center justify-center hover:shadow-xl hover:-translate-y-0.5 ${show ? "bottom-6 opacity-100 pointer-events-auto" : "-bottom-16 opacity-0 pointer-events-none"}`}
      style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)" }}
      aria-label="Back to top"
    >
      <i className="fa-solid fa-arrow-up text-sm" />
    </button>
  );
}
