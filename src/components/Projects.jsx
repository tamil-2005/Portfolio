import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IconSparkles,
  IconFileText,
  IconArrowUpRight,
  IconBrandGithub,
  IconExternalLink,
  IconCode,
  IconCloud,
  IconServer2,
  IconChartBar,
} from "@tabler/icons-react";
import { useScrollReveal } from "../hooks/useCustomHooks";
import { PROJECTS } from "../data/portfolioData";

const linkIconFor = (iconClass = "") => {
  if (iconClass.includes("github")) return IconBrandGithub;
  if (iconClass.includes("file")) return IconFileText;
  if (iconClass.includes("arrow-up-right")) return IconArrowUpRight;
  return IconExternalLink;
};

const WATERMARK_ICONS = [IconCode, IconCloud, IconServer2, IconChartBar];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Projects() {
  const [hovered, setHovered] = useState(null);
  const [ref, visible]        = useScrollReveal();

  return (
    <section id="projects" className="py-20 md:py-28 xl:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">Projects</span>
          <span className="flex-1 h-px bg-gray-200" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-12 md:mb-16 leading-tight flex items-center gap-3">
          <span>
            Things I've<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#2563eb,#7c3aed)" }}>
              built.
            </span>
          </span>
          <motion.span
            className="text-purple-500"
            animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <IconSparkles size={32} strokeWidth={1.75} />
          </motion.span>
        </h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
        >
          {PROJECTS.map((p, i) => {
            const WatermarkIcon = WATERMARK_ICONS[i % WATERMARK_ICONS.length];
            const isHovered = hovered === i;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ y: -8, scale: 1.012 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative rounded-2xl border border-gray-200 bg-white overflow-hidden flex flex-col"
                style={{
                  boxShadow: isHovered
                    ? `0 20px 40px -12px ${p.accent}30, 0 8px 16px -4px rgba(0,0,0,0.08)`
                    : "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                {/* Faint rotating watermark icon */}
                <motion.div
                  className="pointer-events-none absolute -right-4 -bottom-4 text-gray-900"
                  style={{ opacity: 0.035 }}
                  animate={{ rotate: isHovered ? 12 : 0, scale: isHovered ? 1.08 : 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <WatermarkIcon size={128} strokeWidth={1} />
                </motion.div>

                {/* Coloured top stripe with hover shimmer */}
                <motion.div
                  className="h-1.5 w-full"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${p.accent}, ${p.accent}88, ${p.accent})`,
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPositionX: isHovered ? ["0%", "100%"] : "0%" }}
                  transition={{ duration: 1.4, repeat: isHovered ? Infinity : 0, ease: "linear" }}
                />

                {/* Number + badge */}
                <div className="relative px-5 sm:px-6 pt-5 sm:pt-6 pb-3 flex items-start justify-between">
                  <motion.span
                    className="text-4xl sm:text-5xl font-black leading-none select-none"
                    animate={{
                      color: isHovered ? p.accent : "#e5e7eb",
                      scale: isHovered ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {p.num}
                  </motion.span>
                  {p.badge && (
                    <motion.span
                      className="text-xs px-2.5 py-1 rounded-full font-medium border"
                      animate={
                        isHovered
                          ? { backgroundColor: `${p.accent}10`, color: p.accent, borderColor: `${p.accent}30`, scale: 1.05 }
                          : { backgroundColor: "#f9fafb", color: "#6b7280", borderColor: "#e5e7eb", scale: 1 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {p.badge}
                    </motion.span>
                  )}
                </div>

                <div className="relative px-5 sm:px-6 flex-1 flex flex-col">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 transition-colors duration-200 group-hover:text-blue-600">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 sm:mb-5 flex-1">{p.desc}</p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
                    {p.techs.map((t, ti) => (
                      <span key={ti} className="text-xs px-2.5 py-1 rounded-full font-medium border"
                        style={{ borderColor: `${p.accent}30`, color: p.accent, backgroundColor: `${p.accent}08` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links footer */}
                <div className="relative px-5 sm:px-6 pb-5 sm:pb-6 flex items-center gap-4 border-t border-gray-100 pt-4 mt-auto">
                  {p.links.map((l, li) => {
                    const LinkIcon = linkIconFor(l.icon);
                    const isArrow = l.icon.includes("arrow") || LinkIcon === IconExternalLink;
                    return (
                      <a
                        key={li}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <span
                          className={`inline-flex transition-transform duration-300 ${
                            isArrow
                              ? "group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                              : "group-hover/link:rotate-12"
                          }`}
                        >
                          <LinkIcon size={16} strokeWidth={2} />
                        </span>
                        {l.label}
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
