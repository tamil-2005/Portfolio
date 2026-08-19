import React from "react";
import { EXPERIENCES } from "../data/portfolioData";
import { ScrollTimeline } from "./lightswind/scroll-timeline";

const TIMELINE_EVENTS = [
  {
    id: "is-dev",
    year: "Mar 2026 – Present",
    title: "Software Developer",
    subtitle: "Infinitesol • Full-time",
    description:
      "Designing and deploying cloud infrastructure on AWS using Terraform. Building CI/CD pipelines and driving DevOps adoption across engineering teams.",
    responsibilities: [
      "Architected multi-account AWS landing zones with Terraform modules",
      "Implemented automated deployment pipelines reducing release time by 40%",
      "Managed IAM policies, VPC networking, and S3 lifecycle rules at scale",
      "Authored internal runbooks for incident response and infrastructure provisioning",
    ],
    skills: ["AWS", "Terraform", "CI/CD", "Docker", "Shell"],
    type: "Full-time",
    location: "Chennai · On-site",
    logoColor: "#FF9900",
    icon: (
      <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md border border-amber-500/30 flex-shrink-0 bg-white">
        <img
          src="/img/infinitesol-logo.png"
          alt="Infinitesol"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    ),
  },
  {
    id: "is-intern",
    year: "Sep 2025 – Mar 2026",
    title: "Software Developer — Intern",
    subtitle: "Infinitesol • Internship",
    description:
      "Supported cloud infrastructure setup and automation under senior engineers. Gained hands-on experience with AWS services and IaC tooling.",
    responsibilities: [
      "Configured EC2, S3, and RDS instances for development environments",
      "Wrote Terraform scripts for repeatable infrastructure provisioning",
      "Assisted in setting up GitHub Actions workflows for automated testing",
      "Documented infrastructure architecture and operational procedures",
    ],
    skills: ["AWS", "Terraform", "Linux", "Git"],
    type: "Internship",
    location: "Chennai · On-site",
    logoColor: "#FF9900",
    icon: (
      <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md border border-amber-500/30 flex-shrink-0 bg-white">
        <img
          src="/img/infinitesol-logo.png"
          alt="Infinitesol"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    ),
  },
  {
    id: "bnp",
    year: "Aug 2024 – Mar 2025",
    title: "Full Stack Developer — Trainee",
    subtitle: "BNP Paribas • Training",
    description:
      "Completed an intensive full-stack training programme focused on enterprise banking applications. Built backend APIs and responsive frontends in an agile team.",
    responsibilities: [
      "Developed RESTful microservices using Java Spring Boot with JPA/Hibernate",
      "Built responsive React interfaces consuming backend APIs",
      "Designed relational schemas and wrote optimised SQL queries in MySQL",
      "Participated in daily standups, code reviews, and sprint planning",
    ],
    skills: ["Java", "Spring Boot", "React", "MySQL", "REST"],
    type: "Training",
    location: "Chennai · Hybrid",
    logoColor: "#00A651",
    icon: (
      <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md border border-emerald-500/30 flex-shrink-0 bg-white">
        <img
          src="/img/bnp-logo.png"
          alt="BNP Paribas"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    ),
  },
];

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-20 md:py-28 relative overflow-hidden bg-slate-50/80 border-y border-gray-200/70 flex flex-col justify-center">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/3 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#3b82f6,transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#7c3aed,transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollTimeline
          events={TIMELINE_EVENTS}
          title="Where I've Worked"
          subtitle="Scroll to explore my professional journey across full-stack development, cloud infrastructure & DevOps."
          progressIndicator={true}
          cardAlignment="alternating"
          revealAnimation="slide"
          cardEffect="shadow"
          connectorStyle="line"
          progressLineWidth={3}
        />
      </div>
    </section>
  );
}

