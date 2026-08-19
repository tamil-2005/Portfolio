import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IconBrandGithub,
  IconExternalLink,
  IconFileText,
  IconArrowUpRight,
  IconWifi,
  IconSparkles,
} from "@tabler/icons-react";

const linkIconFor = (iconClass = "") => {
  if (iconClass.includes("github")) return IconBrandGithub;
  if (iconClass.includes("file")) return IconFileText;
  if (iconClass.includes("arrow-up-right")) return IconArrowUpRight;
  return IconExternalLink;
};

export function MetallicChip() {
  return (
    <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-200 p-[1px] shadow-sm relative overflow-hidden flex-shrink-0 border border-amber-400/50">
      <div className="w-full h-full bg-amber-400/80 rounded-[4px] relative flex flex-col justify-between p-1">
        <div className="w-full h-[1px] bg-amber-600/40" />
        <div className="flex justify-between h-2">
          <div className="w-1.5 h-full border-r border-amber-600/40" />
          <div className="w-1.5 h-full border-l border-amber-600/40" />
        </div>
        <div className="w-full h-[1px] bg-amber-600/40" />
      </div>
    </div>
  );
}

export default function CreditCard({
  type = "gradient-strip",
  num = "01",
  title = "Project Title",
  desc = "Detailed project description highlighting features, architecture, and technology.",
  badge = "Featured",
  techs = ["React", "Node.js", "AWS"],
  links = [{ label: "Code", href: "#", icon: "github" }],
  accent = "#3b82f6",
  className = "",
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`group relative rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 ${className}`}
      style={{
        boxShadow: isHovered
          ? `0 20px 40px -12px ${accent}33, 0 8px 24px -4px rgba(0,0,0,0.12)`
          : "0 4px 20px -2px rgba(0,0,0,0.06)",
      }}
    >
      {/* Gradient Strip Top Bar (for type="gradient-strip") */}
      {type === "gradient-strip" && (
        <motion.div
          className="h-2 w-full"
          style={{
            backgroundImage: `linear-gradient(90deg, ${accent}, #a855f7, #22d3ee, ${accent})`,
            backgroundSize: "250% 100%",
          }}
          animate={{
            backgroundPositionX: isHovered ? ["0%", "100%"] : "0%",
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />
      )}

      {/* Card Header: Chip, Contactless icon & Card Number */}
      <div className="p-6 sm:p-7 pb-4">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <MetallicChip />
            <IconWifi className="text-slate-400 rotate-90 w-5 h-5" />
          </div>

          <div className="flex items-center gap-2">
            <span
              className="text-3xl font-black tracking-widest font-mono opacity-20 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: accent }}
            >
              {num}
            </span>
            {badge && (
              <span
                className="text-xs font-bold px-3 py-1 rounded-full border transition-all duration-300"
                style={{
                  backgroundColor: isHovered ? `${accent}15` : "#f1f5f9",
                  color: isHovered ? accent : "#475569",
                  borderColor: isHovered ? `${accent}40` : "#e2e8f0",
                }}
              >
                {badge}
              </span>
            )}
          </div>
        </div>

        {/* Project Title & Description */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          {title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-5">
          {desc}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {techs.map((t, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all duration-200"
              style={{
                borderColor: `${accent}35`,
                color: accent,
                backgroundColor: `${accent}0d`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Action Links */}
      <div className="px-6 sm:px-7 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-4">
          {links.map((l, lIdx) => {
            const LinkIcon = linkIconFor(l.icon);
            return (
              <a
                key={lIdx}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link"
              >
                <LinkIcon className="w-4 h-4 transition-transform group-hover/link:scale-110" />
                <span>{l.label}</span>
              </a>
            );
          })}
        </div>

        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
          PRO-PORTFOLIO
        </span>
      </div>
    </motion.div>
  );
}
