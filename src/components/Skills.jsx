import React from "react";
import { useScrollReveal } from "../hooks/useCustomHooks";
import { ThreeDMarquee } from "./lightswind/3d-marquee";

const MARQUEE_TECH_LOGOS = [
  // Frontend
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML5 & CSS3", category: "Frontend", categoryColor: "#2563eb", level: 90, tag: "Expert", certified: true },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript ES6+", category: "Frontend", categoryColor: "#2563eb", level: 85, tag: "Advanced", certified: true },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React & Redux", category: "Frontend", categoryColor: "#2563eb", level: 80, tag: "Advanced", certified: false },
  { src: "https://cdn.simpleicons.org/tailwindcss/06b6d4", alt: "Tailwind CSS", category: "Frontend", categoryColor: "#2563eb", level: 82, tag: "Advanced", certified: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", alt: "Bootstrap", category: "Frontend", categoryColor: "#2563eb", level: 70, tag: "Intermediate", certified: false },
  
  // Backend
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", alt: "Java", category: "Backend", categoryColor: "#7c3aed", level: 80, tag: "Advanced", certified: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", alt: "Spring Boot", category: "Backend", categoryColor: "#7c3aed", level: 75, tag: "Intermediate", certified: false },
  { src: "https://cdn.simpleicons.org/fastapi/009688", alt: "REST API Design", category: "Backend", categoryColor: "#7c3aed", level: 78, tag: "Intermediate", certified: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", alt: "MySQL", category: "Backend", categoryColor: "#7c3aed", level: 82, tag: "Advanced", certified: true },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js", category: "Backend", categoryColor: "#7c3aed", level: 65, tag: "Intermediate", certified: false },

  // Cloud & DevOps
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", alt: "AWS Cloud", category: "Cloud", categoryColor: "#06b6d4", level: 72, tag: "Intermediate", certified: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg", alt: "Terraform", category: "Cloud", categoryColor: "#06b6d4", level: 75, tag: "Intermediate", certified: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker", category: "Cloud", categoryColor: "#06b6d4", level: 68, tag: "Intermediate", certified: false },
  { src: "https://cdn.simpleicons.org/githubactions/2088FF", alt: "CI/CD Pipelines", category: "Cloud", categoryColor: "#06b6d4", level: 70, tag: "Intermediate", certified: false },
  
  // Tools
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", alt: "Git & GitHub", category: "Tools", categoryColor: "#f59e0b", level: 85, tag: "Advanced", certified: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", alt: "VS Code", category: "Tools", categoryColor: "#f59e0b", level: 90, tag: "Expert", certified: false },
  { src: "https://cdn.simpleicons.org/postman/FF6C37", alt: "Postman", category: "Tools", categoryColor: "#f59e0b", level: 75, tag: "Intermediate", certified: false },
];

export default function Skills() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="skills" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-950 text-white border-y border-slate-800 py-20">
      {/* Background Glow Orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none z-0"
        style={{ background: "radial-gradient(circle,#3b82f6,transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none z-0"
        style={{ background: "radial-gradient(circle,#7c3aed,transparent 70%)" }}
      />

      {/* Full-Page Background 3D Marquee Container */}
      <div
        ref={ref}
        className={`absolute inset-0 w-full h-full z-0 transition-all duration-700 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <ThreeDMarquee
          images={MARQUEE_TECH_LOGOS}
          cols={5}
          className="w-full h-full bg-transparent border-none rounded-none"
        />
      </div>

      {/* Overlapping Glassmorphism Top-Left Heading */}
      <div className="absolute top-8 left-4 sm:top-12 sm:left-8 lg:top-14 lg:left-12 z-20 pointer-events-none max-w-sm sm:max-w-md lg:max-w-lg px-2">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/85 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              Technical Stack
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Tools of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">my trade.</span>
          </h2>
          
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Hover over any technology card to view proficiency metrics, certifications, and domain details.
          </p>
        </div>
      </div>

    </section>
  );
}





