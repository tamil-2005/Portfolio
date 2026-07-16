import React, { useState } from "react";
import { useScrollReveal } from "../hooks/useCustomHooks";
import { EXPERIENCES } from "../data/portfolioData";

/* Company logo components */
function InfinitosolLogo({ size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 12,
      overflow: "hidden", flexShrink: 0,
      boxShadow: "0 4px 14px rgba(0,180,180,0.35)",
    }}>
      <img
        src="/img/infinitesol-logo.png"
        alt="Infinitesol"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

function BNPLogo({ size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 12,
      overflow: "hidden", flexShrink: 0,
      boxShadow: "0 4px 14px rgba(0,166,81,0.4)",
    }}>
      <img
        src="/img/bnp-logo.png"
        alt="BNP Paribas"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

function CompanyLogo({ group, size = 40 }) {
  if (group === "infinitesol") return <InfinitosolLogo size={size} />;
  if (group === "bnp")         return <BNPLogo size={size} />;
  return null;
}

export default function Experience() {
  const [active, setActive] = useState("is-dev");
  const [ref, visible]      = useScrollReveal();
  const exp                 = EXPERIENCES.find(e => e.id === active) || EXPERIENCES[0];
  const infJobs             = EXPERIENCES.filter(e => e.group === "infinitesol");

  return (
    <section id="experience" className="py-20 md:py-28 xl:py-36 relative overflow-hidden bg-slate-50/70 border-y border-gray-100">

      {/* Subtle background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#7c3aed,transparent 70%)" }} />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">Experience</span>
          <span className="flex-1 h-px bg-gray-200" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-12 md:mb-16 leading-tight">
          Where I've<br />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#2563eb,#7c3aed)" }}>
            worked.
          </span>
        </h2>

        <div ref={ref} className={`flex flex-col md:flex-row gap-6 md:gap-8 min-w-0 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* ── Sidebar selector ── */}
          <div className="md:w-60 lg:w-72 xl:w-80 flex-shrink-0 flex flex-col gap-3 md:self-start md:sticky md:top-24">

            {/* Infinitesol group */}
            <div className="rounded-2xl border border-gray-200 p-4 sm:p-5 bg-white shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
                <CompanyLogo group="infinitesol" size={40} />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Infinitesol</p>
                  <p className="text-xs text-gray-400">Career Path</p>
                </div>
              </div>

              {/*
                Timeline: the connector is drawn as two half-segments per item
                (dot → gap below, gap above → dot) so the line starts at the
                first dot and ends exactly at the last dot — never overshooting.
                Dot centre and segments share x = 13px.
              */}
              <div>
                {infJobs.map((job, idx) => (
                  <div key={job.id} className="relative pl-6 mb-3 last:mb-0">
                    {idx > 0 && (
                      <span className="absolute left-3 w-0.5 bg-orange-200" style={{ top: -12, height: "calc(50% + 12px)" }} />
                    )}
                    {idx < infJobs.length - 1 && (
                      <span className="absolute left-3 top-1/2 w-0.5 bg-orange-200" style={{ height: "calc(50% + 12px)" }} />
                    )}
                    <span className={`absolute left-[7px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all ${active === job.id ? "bg-orange-500 border-orange-500 scale-125 shadow-[0_0_0_4px_rgba(249,115,22,0.15)]" : "bg-white border-gray-300"}`} />
                    <button onClick={() => setActive(job.id)}
                      className={`w-full text-left rounded-xl px-3 sm:px-4 py-3 transition-all ${active === job.id ? "border border-orange-200 bg-orange-50 shadow-sm" : "hover:bg-gray-50 border border-transparent"}`}>
                      <p className={`text-sm font-semibold leading-snug ${active === job.id ? "text-orange-700" : "text-gray-800"}`}>{job.role}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{job.duration}</p>
                      {job.type === "Full-time" && (
                        <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">{job.type}</span>
                      )}
                      {job.type === "Internship" && (
                        <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">{job.type}</span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* BNP Paribas */}
            <button onClick={() => setActive("bnp")}
              className={`w-full text-left rounded-2xl border p-4 sm:p-5 transition-all hover:shadow-md bg-white shadow-sm ${active === "bnp" ? "border-green-300 bg-green-50/40" : "border-gray-200 hover:border-gray-300"}`}>
              <div className="flex items-center gap-3">
                <CompanyLogo group="bnp" size={40} />
                <div className="flex-1 text-left min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">BNP Paribas</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{EXPERIENCES.find(e => e.id === "bnp")?.role}</p>
                  <p className="text-xs text-gray-400">{EXPERIENCES.find(e => e.id === "bnp")?.duration}</p>
                  <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium">Training</span>
                </div>
                {active === "bnp" && <i className="fa-solid fa-chevron-right text-green-500 text-xs flex-shrink-0" />}
              </div>
            </button>
          </div>

          {/* ── Detail panel ── */}
          <div className="relative overflow-hidden flex-1 min-w-0 rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Background logo watermark for detail panel */}
            {exp.group === "infinitesol" && (
              <div 
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: "url('/img/infinitesol-logo.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
              />
            )}
            {exp.group === "bnp" && (
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: "url('/img/bnp-logo.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
              />
            )}

            {/* Coloured top accent */}
            <div className="h-1" style={{ background: `linear-gradient(90deg,${exp.logoColor},${exp.logoColor}88)` }} />

            <div key={exp.id} className="anim-fadeIn">
            {/* Header */}
            <div className="relative z-10 p-5 sm:p-8 border-b border-gray-100">
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex items-start gap-4 min-w-0">
                  <CompanyLogo group={exp.group} size={52} />
                  <div className="min-w-0">
                    <span className="inline-block text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">{exp.domain}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{exp.role}</h3>
                    <p className="text-gray-500 mt-0.5 font-medium">{exp.company}</p>
                  </div>
                </div>
                <span className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 font-medium">{exp.type}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: "fa-solid fa-calendar",      val: exp.duration },
                  { icon: "fa-solid fa-clock",          val: exp.period },
                  { icon: "fa-solid fa-location-dot",   val: exp.location },
                ].map((m, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600">
                    <i className={`${m.icon} text-gray-400`} />{m.val}
                  </span>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="relative z-10 p-5 sm:p-8">
              <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">{exp.description}</p>

              <h4 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Responsibilities</h4>
              <ul className="space-y-3 mb-6 sm:mb-8">
                {exp.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${exp.logoColor}18` }}>
                      <i className="fa-solid fa-check text-xs" style={{ color: exp.logoColor }} />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>

              <h4 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">Stack</h4>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors"
                    style={{ borderColor: `${exp.logoColor}30`, color: exp.logoColor, backgroundColor: `${exp.logoColor}08` }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
