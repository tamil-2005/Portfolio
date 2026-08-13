import React, { useEffect, useRef, useState } from "react";
import { useTyped } from "../hooks/useCustomHooks";
import { TYPED_ROLES, SOCIAL } from "../data/portfolioData";
import Lanyard from "./Lanyard/Lanyard";

const CARD_IMAGE = "/img/Black Orange Simple Portrait Company ID Card.png";

export default function Home() {
  const role = useTyped(TYPED_ROLES, 80, 40);
  const sectionRef = useRef(null);
  // On desktop the lanyard canvas covers the whole hero so the card can be
  // dragged anywhere; below lg it stays confined to its own block.
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== "undefined" && window.innerWidth >= 1024);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden noise"
      style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0f172a 50%, #1e1b4b 100%)" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#2563eb,transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#7c3aed,transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-20">

          {/* Left — text */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 mb-6 anim-fadeUp">
              <span className="w-2 h-2 rounded-full bg-green-400 anim-pulse" />
              Available for opportunities
            </div>

            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold text-white leading-none tracking-tight mb-4 anim-fadeUp delay-100">
              Tamilselvan<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg,#60a5fa,#a78bfa)" }}>
                Mariyappan
              </span>
            </h1>

            <div className="h-10 flex items-center mb-6 anim-fadeUp delay-200">
              <span className="text-xl lg:text-2xl text-gray-300 font-light">
                {role}<span className="cursor-blink text-blue-400 ml-0.5">|</span>
              </span>
            </div>

            <p className="text-gray-400 leading-relaxed max-w-lg mb-8 anim-fadeUp delay-300">
              Building robust full-stack products — from clean React interfaces to scalable Java APIs
              and cloud-native infrastructure on AWS.
            </p>

            <div className="flex flex-wrap gap-3 mb-10 anim-fadeUp delay-400">
              <a href="#projects"
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)" }}>
                View My Work
              </a>
              <a href="#contact"
                className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-200 border border-white/15 bg-white/5 hover:bg-white/10 transition-all hover:-translate-y-0.5">
                Get In Touch
              </a>
            </div>

            <div className="flex items-center gap-4 anim-fadeUp delay-500">
              {SOCIAL.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all hover:-translate-y-0.5"
                  aria-label={s.label}>
                  <i className={`${s.icon} text-base`} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Lanyard scene (placeholder keeps layout when the canvas
              covers the whole hero on desktop) */}
          <div className="flex flex-none lg:flex-1 justify-center items-center h-[420px] sm:h-[480px] lg:h-[550px] w-full max-w-full anim-fadeUp delay-300" style={{ minWidth: 280 }}>
            {!isDesktop && (
              <Lanyard position={[0, 0, 12]} gravity={[0, -40, 0]} cardImage={CARD_IMAGE} />
            )}
          </div>
        </div>
      </div>

      {/* Desktop: full-section canvas so the card can be dragged across the
          whole hero. pointer-events-none keeps links clickable; the section
          itself feeds pointer events to the 3D scene. */}
      {isDesktop && (
        <div className="absolute inset-0 z-20 pointer-events-none anim-fadeUp delay-300">
          <Lanyard
            position={[0, 0, 12]}
            gravity={[0, -40, 0]}
            cardImage={CARD_IMAGE}
            eventSource={sectionRef}
            fullScreen
          />
        </div>
      )}

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>
    </section>
  );
}
