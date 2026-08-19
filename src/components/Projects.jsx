import React from "react";
import { motion } from "framer-motion";
import { IconSparkles } from "@tabler/icons-react";
import { useScrollReveal } from "../hooks/useCustomHooks";
import { PROJECTS } from "../data/portfolioData";
import CreditCard from "./shared-assets/credit-card/credit-card";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export default function Projects() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="projects" className="min-h-screen py-20 md:py-28 relative bg-slate-50/70 border-y border-gray-200/70 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
            Projects & Work
          </span>
          <span className="flex-1 h-px bg-gray-200" />
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-12 md:mb-16 leading-tight flex items-center gap-3">
          <span>
            Things I've<br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#2563eb,#7c3aed)",
              }}
            >
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {PROJECTS.map((p, i) => (
            <CreditCard
              key={i}
              type="gradient-strip"
              num={p.num}
              title={p.title}
              desc={p.desc}
              badge={p.badge}
              techs={p.techs}
              links={p.links}
              accent={p.accent}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

