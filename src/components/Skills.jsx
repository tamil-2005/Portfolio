import React, { useState } from "react";
import { useScrollReveal } from "../hooks/useCustomHooks";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { SKILL_CATEGORIES } from "../data/portfolioData";

/* ── Devicon CDN logo map ─────────────────────────────── */
const SKILL_LOGO = {
  "HTML5 & CSS3":    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "JavaScript ES6+": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "React & Redux":   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Tailwind CSS":    "https://cdn.simpleicons.org/tailwindcss/06b6d4",
  "Bootstrap":       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "Java":            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "Spring Boot":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  "REST API Design": "https://cdn.simpleicons.org/fastapi/009688",
  "MySQL":           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "Node.js":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "AWS":             "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "Terraform":       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  "Docker":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "CI/CD Pipelines": "https://cdn.simpleicons.org/githubactions/2088FF",
  "Git & GitHub":    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "VS Code":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "Postman":         "https://cdn.simpleicons.org/postman/FF6C37",
  "MS Office":       "https://img.icons8.com/color/48/microsoft-office-2019.png",
};

const LEVEL_META = {
  Expert:       { label: "Expert",       bg: "#dcfce7", text: "#15803d", border: "#bbf7d0" },
  Experienced:  { label: "Expert",       bg: "#dcfce7", text: "#15803d", border: "#bbf7d0" },
  Advanced:     { label: "Advanced",     bg: "#ede9fe", text: "#7c3aed", border: "#ddd6fe" },
  Intermediate: { label: "Intermediate", bg: "#dbeafe", text: "#1d4ed8", border: "#bfdbfe" },
  Basic:        { label: "Basic",        bg: "#f9fafb", text: "#6b7280", border: "#e5e7eb" },
};

const FLOAT_ICONS = [
  { icon: "fa-solid fa-code",   bg: "linear-gradient(135deg,#8b5cf6,#7c3aed)", top: 28,  left: 22,  size: 54, delay: "0s"   },
  { text: "</>",                bg: "linear-gradient(135deg,#6366f1,#4f46e5)", top: -8,  left: 360, size: 62, delay: "0.5s" },
  { icon: "fa-solid fa-cloud",  bg: "linear-gradient(135deg,#06b6d4,#0891b2)", top: 220, left: 10,  size: 54, delay: "1s"   },
  { icon: "fa-solid fa-wrench", bg: "linear-gradient(135deg,#f59e0b,#d97706)", top: 240, left: 370, size: 58, delay: "1.5s" },
];

const DOTS = [
  { top: 58,  left: 400, color: "#818cf8", size: 7 },
  { top: 178, left: 100, color: "#06b6d4", size: 5 },
  { top: 155, left: 8,   color: "#f59e0b", size: 5 },
  { top: 200, left: 350, color: "#8b5cf6", size: 4 },
];

const DEV_CODE_LINES = [
  { tokens: [{ c: "#6b7280", t: "// Build → Learn → Ship" }] },
  { tokens: [{ c: "#a78bfa", t: "const " }, { c: "#60a5fa", t: "developer" }, { c: "#e2e8f0", t: " = {" }] },
  { tokens: [{ c: "#94a3b8", t: "  name: " }, { c: "#34d399", t: '"Tamilselvan"' }, { c: "#e2e8f0", t: "," }] },
  { tokens: [{ c: "#94a3b8", t: "  passion: " }, { c: "#34d399", t: '"Building Web"' }, { c: "#e2e8f0", t: "," }] },
  { tokens: [{ c: "#94a3b8", t: "  stack: " }, { c: "#f472b6", t: '["MERN"' }, { c: "#e2e8f0", t: ", " }, { c: "#f472b6", t: '"AWS"' }, { c: "#e2e8f0", t: "]," }] },
  { tokens: [{ c: "#94a3b8", t: "  focus: " }, { c: "#34d399", t: '"Clean Code"' }] },
  { tokens: [{ c: "#e2e8f0", t: "};" }] },
  { tokens: [] },
  { tokens: [{ c: "#6b7280", t: "while " }, { c: "#e2e8f0", t: "(" }, { c: "#a78bfa", t: "learning" }, { c: "#e2e8f0", t: ") {" }] },
  { tokens: [{ c: "#60a5fa", t: "  build" }, { c: "#e2e8f0", t: "();" }] },
  { tokens: [{ c: "#60a5fa", t: "  grow" }, { c: "#e2e8f0", t: "();" }] },
  { tokens: [{ c: "#60a5fa", t: "  inspire" }, { c: "#e2e8f0", t: "();" }] },
  { tokens: [{ c: "#e2e8f0", t: "}" }] },
];

/* Decorative plant SVG */
function Plant() {
  return (
    <div style={{ position: "absolute", bottom: -4, right: -14, zIndex: 4, userSelect: "none" }}>
      {/* Pot */}
      <div style={{
        width: 36, height: 22, borderRadius: "0 0 10px 10px",
        background: "linear-gradient(180deg,#c8c8cc,#a8a8ac)",
        margin: "0 auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        position: "relative", zIndex: 2,
      }}>
        <div style={{
          position: "absolute", top: -5, left: -2, right: -2, height: 8,
          background: "linear-gradient(180deg,#d8d8dc,#c0c0c4)",
          borderRadius: "4px 4px 0 0",
        }} />
      </div>
      {/* Stems & leaves */}
      <svg width="58" height="68" viewBox="0 0 58 68" style={{ position: "absolute", bottom: 16, left: -11, zIndex: 3 }}>
        {/* Main stem */}
        <path d="M29 68 Q28 48 26 30" stroke="#22c55e" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        {/* Left leaf */}
        <ellipse cx="16" cy="34" rx="13" ry="7" fill="#16a34a" transform="rotate(-35 16 34)" opacity="0.9"/>
        <ellipse cx="16" cy="34" rx="11" ry="5" fill="#22c55e" transform="rotate(-35 16 34)" opacity="0.8"/>
        {/* Right leaf */}
        <ellipse cx="38" cy="24" rx="13" ry="7" fill="#15803d" transform="rotate(25 38 24)" opacity="0.9"/>
        <ellipse cx="38" cy="24" rx="11" ry="5" fill="#16a34a" transform="rotate(25 38 24)" opacity="0.8"/>
        {/* Top leaf */}
        <ellipse cx="26" cy="14" rx="10" ry="6" fill="#22c55e" transform="rotate(-10 26 14)" opacity="0.9"/>
        <ellipse cx="26" cy="14" rx="8" ry="4" fill="#4ade80" transform="rotate(-10 26 14)" opacity="0.7"/>
        {/* Small side leaf */}
        <ellipse cx="20" cy="50" rx="8" ry="4.5" fill="#16a34a" transform="rotate(-50 20 50)" opacity="0.85"/>
      </svg>
    </div>
  );
}

function Laptop3D() {
  return (
    <div className="hidden lg:block flex-shrink-0 relative" style={{ width: 450, height: 340 }}>
      <DotLottieReact
        src="https://lottie.host/e481b028-7e5a-471f-a065-aed3e92abdc3/60XruRZiXc.json"
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

function SkillCard({ cat, visible, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 20,
        border: hovered ? `1px solid ${cat.color}40` : "1px solid #e5e7eb",
        background: "#fff",
        overflow: "hidden",
        transform: hovered ? "translateY(-6px) scale(1.015)" : "translateY(0) scale(1)",
        transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? `0 20px 44px rgba(0,0,0,0.1), 0 0 0 1px ${cat.color}20`
          : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Background icon watermark */}
      <div 
        className="pointer-events-none select-none animate-pulse-slow"
        style={{
          position: "absolute",
          right: "-15px",
          bottom: "-25px",
          fontSize: "12rem",
          color: cat.color,
          opacity: 0.04,
          zIndex: 1,
          lineHeight: 1,
        }}
      >
        <i className={cat.icon} />
      </div>

      {/* Top accent line */}
      <div style={{ height: 3, background: `linear-gradient(90deg,${cat.color},${cat.color}55)`, position: "relative", zIndex: 2 }} />

      {/* Card header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "18px 20px 14px",
        borderBottom: "1px solid #f3f4f6",
        position: "relative",
        zIndex: 2,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: `${cat.color}12`,
          border: `1px solid ${cat.color}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <i className={`${cat.icon} text-base`} style={{ color: cat.color }} />
        </div>
        <div>
          <h3 style={{ fontWeight: 700, color: "#111827", fontSize: "0.95rem" }}>{cat.label}</h3>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, color: cat.color, marginTop: 1 }}>{cat.skills.length} skills</p>
        </div>
      </div>

      {/* Skill rows */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16, position: "relative", zIndex: 2 }}>
        {cat.skills.map((s, i) => {
          const meta = LEVEL_META[s.tag] || LEVEL_META.Basic;
          const logo = SKILL_LOGO[s.name];
          return (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 7 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: 1 }}>
                  {logo && (
                    <img src={logo} alt={s.name}
                      style={{ width: 20, height: 20, objectFit: "contain", flexShrink: 0 }}
                      onError={e => { e.target.style.display = "none"; }}
                    />
                  )}
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>{s.name}</span>
                  {s.certified && (
                    <i className="fa-solid fa-certificate flex-shrink-0"
                      style={{ fontSize: "0.65rem", color: "#f59e0b" }} title="Certified" />
                  )}
                </div>
                <span style={{
                  flexShrink: 0, fontSize: "0.68rem", padding: "2px 8px",
                  borderRadius: 99, fontWeight: 600, border: "1px solid",
                  backgroundColor: meta.bg, color: meta.text, borderColor: meta.border,
                }}>{meta.label}</span>
              </div>
              {/* Progress bar */}
              <div style={{ height: 5, background: "#f3f4f6", borderRadius: 99, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 99,
                  width: visible ? `${s.level}%` : "0%",
                  transition: `width 1.1s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms`,
                  background: `linear-gradient(90deg,${cat.color},${cat.color}88)`,
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="skills" className="py-20 md:py-28 xl:py-36 overflow-x-hidden relative bg-slate-50/70 border-y border-gray-100">

      {/* Subtle glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#7c3aed,transparent 70%)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#06b6d4,transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header: text left, 3D laptop right */}
        <div className="flex items-start justify-between gap-8 mb-12 md:mb-16">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">Skills</span>
              <span className="flex-1 h-px bg-gray-200" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Tools of<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#2563eb,#7c3aed)" }}>
                my trade.
              </span>
            </h2>
            <p className="text-gray-500 max-w-xs text-sm sm:text-base">Technologies and tools I work with across the stack.</p>
          </div>
          <Laptop3D />
        </div>

        {/* Skill cards */}
        <div
          ref={ref}
          className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.key} cat={cat} visible={visible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
