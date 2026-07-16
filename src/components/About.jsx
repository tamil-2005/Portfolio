import React from "react";
import { useScrollReveal } from "../hooks/useCustomHooks";
import { EDUCATION } from "../data/portfolioData";

function RevealDiv({ children, className = "", delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">{children}</span>
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
      <span className="w-12 h-px bg-gray-300" />
    </div>
  );
}

const STATS = [
  { icon: "fa-solid fa-display",     value: "1.5+", label: "Years in Tech",  color: "#2563eb", bg: "#eff4ff" },
  { icon: "fa-solid fa-code",        value: "10+",  label: "Projects Built", color: "#7c3aed", bg: "#f3efff" },
  { icon: "fa-solid fa-layer-group", value: "7+",   label: "Technologies",   color: "#10b981", bg: "#ecfdf5" },
  { icon: "fa-solid fa-cloud",       value: "2+",   label: "Cloud Services", color: "#f59e0b", bg: "#fff7ed" },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 xl:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#fafbff 0%,#ffffff 100%)" }}>

      {/* Soft decorative wash */}
      <div className="absolute -top-24 right-0 w-[560px] h-[560px] rounded-full opacity-60 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#eef2ff 0%,transparent 70%)" }} />
      <div className="absolute bottom-0 -left-32 w-[480px] h-[480px] rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#f5f3ff 0%,transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: label, heading, intro, actions ── */}
          <div className="min-w-0">
            <RevealDiv className="mb-5">
              <SectionLabel>About Me</SectionLabel>
            </RevealDiv>

            <RevealDiv delay={100}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Engineering ideas<br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#2563eb,#7c3aed)" }}>
                  into reality.
                </span>
              </h2>
            </RevealDiv>

            <RevealDiv delay={200}>
              <p className="text-gray-600 leading-relaxed mb-3 max-w-lg">
                My stack spans <strong className="text-gray-900">React</strong> on the frontend,{" "}
                <strong className="text-gray-900">Java + Spring Boot</strong> on the backend,{" "}
                <strong className="text-gray-900">MySQL</strong> for data, and{" "}
                <strong className="text-gray-900">AWS + Terraform</strong> for cloud infrastructure.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 max-w-lg">
                I care about writing clean, maintainable code and shipping things that actually work.
              </p>
            </RevealDiv>

            <RevealDiv delay={300} className="flex flex-wrap items-center gap-3">
              <a href="./Assets/Resume.pdf" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all"
                style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)" }}>
                <i className="fa-solid fa-download text-xs" />
                Download Resume
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-blue-600 border border-blue-200 bg-white hover:bg-blue-50 hover:-translate-y-0.5 transition-all">
                <i className="fa-solid fa-paper-plane text-xs" />
                Contact Me
              </a>
            </RevealDiv>
          </div>

          {/* ── Right: 2×2 stat cards ── */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 max-w-md w-full mx-auto lg:mx-0 lg:ml-auto">
            {STATS.map((s, i) => (
              <RevealDiv key={s.label} delay={150 + i * 100}>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: s.bg }}>
                    <i className={`${s.icon} text-lg`} style={{ color: s.color }} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 leading-none mb-1.5">{s.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{s.label}</div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>

        {/* ── Education ── */}
        <RevealDiv delay={100} className="mt-14 md:mt-16 mb-6">
          <SectionLabel>Education</SectionLabel>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {EDUCATION.map((edu, i) => (
            <RevealDiv key={i} delay={150 + i * 100}>
              <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-sm"
                  style={{ background: `linear-gradient(135deg,${edu.color},#7c3aed)` }}>
                  <i className="fa-solid fa-graduation-cap text-base sm:text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm leading-snug">{edu.degree}</h4>
                      <p className="text-gray-500 text-sm mt-0.5">{edu.institution}</p>
                    </div>
                    <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${edu.status === "Pursuing" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"}`}>
                      {edu.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2.5 text-xs text-gray-400">
                    <span><i className="fa-solid fa-calendar mr-1" />{edu.duration}</span>
                    <span><i className="fa-solid fa-location-dot mr-1" />{edu.location}</span>
                  </div>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
