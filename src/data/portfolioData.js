export const NAV = [
  { label: "About",      href: "#about" },
  { label: "Experience",  href: "#experience" },
  { label: "Projects",    href: "#projects" },
  { label: "Skills",      href: "#skills" },
  { label: "Contact",     href: "#contact" },
];

export const NAV_LINKS = NAV;

export const ROLES = ["Full Stack Developer","Cloud & DevOps Engineer","Problem Solver"];

export const TYPED_ROLES = ROLES;

export const SOCIALS = [
  { icon: "fa-brands fa-linkedin-in", href: "https://www.linkedin.com/in/new-hope~0011/", label: "LinkedIn" },
  { icon: "fa-brands fa-github",      href: "https://github.com/tamil-2005",              label: "GitHub" },
  { icon: "fa-solid fa-code",         href: "https://leetcode.com/u/gNObNS89zy/",         label: "LeetCode" },
];

export const SOCIAL = SOCIALS;

export const EDUCATION = [
  { degree:"Master of Computer Applications (MCA)", institution:"Madras University", location:"Chennai", duration:"2026 – 2028", status:"Pursuing", color:"#2563eb", short:"MU" },
  { degree:"BSc Computer Science", institution:"Vinayaka Mission's Research Foundation", location:"Chennai", duration:"2022 – 2025", status:"Completed", color:"#7c3aed", short:"VM" },
];

export const EXPERIENCE = [
  {
    id:"is-dev", company:"Infinitesol", title:"Software Developer", type:"Full-time",
    period:"Mar 2026 – Present", location:"Chennai · On-site",
    domain:"Cloud & DevOps",
    role:"Software Developer",
    duration:"3 months",
    description:"Designing and deploying cloud infrastructure on AWS using Terraform. Building CI/CD pipelines and driving DevOps adoption across engineering teams.",
    responsibilities:["Architected multi-account AWS landing zones with Terraform modules","Implemented automated deployment pipelines reducing release time by 40%","Managed IAM policies, VPC networking, and S3 lifecycle rules at scale","Authored internal runbooks for incident response and infrastructure provisioning"],
    skills:["AWS","Terraform","CI/CD","Docker","Shell"],
    logoColor:"#FF9900",
    group:"infinitesol"
  },
  {
    id:"is-intern", company:"Infinitesol", title:"Software Developer — Intern", type:"Internship",
    period:"Sep 2025 – Mar 2026", location:"Chennai · On-site",
    domain:"Cloud & DevOps",
    role:"Software Developer — Intern",
    duration:"6 months",
    description:"Supported cloud infrastructure setup and automation under senior engineers. Gained hands-on experience with AWS services and IaC tooling.",
    responsibilities:["Configured EC2, S3, and RDS instances for development environments","Wrote Terraform scripts for repeatable infrastructure provisioning","Assisted in setting up GitHub Actions workflows for automated testing","Documented infrastructure architecture and operational procedures"],
    skills:["AWS","Terraform","Linux","Git"],
    logoColor:"#FF9900",
    group:"infinitesol"
  },
  {
    id:"bnp", company:"BNP Paribas", title:"Full Stack Developer — Trainee", type:"Training",
    period:"Aug 2024 – Mar 2025", location:"Chennai · Hybrid",
    domain:"Full Stack",
    role:"Full Stack Developer — Trainee",
    duration:"8 months",
    description:"Completed an intensive full-stack training programme focused on enterprise banking applications. Built backend APIs and responsive frontends in an agile team.",
    responsibilities:["Developed RESTful microservices using Java Spring Boot with JPA/Hibernate","Built responsive React interfaces consuming backend APIs","Designed relational schemas and wrote optimised SQL queries in MySQL","Participated in daily standups, code reviews, and sprint planning"],
    skills:["Java","Spring Boot","React","MySQL","REST"],
    logoColor:"#00A651",
    group:"bnp"
  },
];

export const EXPERIENCES = EXPERIENCE;

export const PROJECTS = [
  { 
    num:"01",
    title:"Student Management System", 
    badge:"Team", 
    desc:"End-to-end platform automating academic operations — enrolment, grading, attendance tracking — with role-based access control and real-time dashboards.", 
    techs:["React","Spring Boot","MySQL","REST API"], 
    accent:"#3b82f6",
    links:[
      { icon:"fa-solid fa-file", label:"Docs", href:"https://drive.google.com/file/d/1s2cUL8_N3cVARc1LWs1piyK-yE4p4ubQ/view" },
      { icon:"fa-solid fa-arrow-up-right", label:"Live", href:"https://hostingsms-50026450457.development.catalystappsail.in/api/students" }
    ]
  },
  { 
    num:"02",
    title:"Budget Buddy", 
    badge:"Team", 
    desc:"Personal finance tracker with expense categorisation, monthly budget analysis, and intelligent spending recommendations powered by usage patterns.", 
    techs:["React","Tailwind CSS","Spring Boot","MySQL"], 
    accent:"#8b5cf6",
    links:[
      { icon:"fa-solid fa-file", label:"Docs", href:"https://drive.google.com/file/d/1VV_s2ASPJacbN_aqXOEyN_lbqA0wk-dU/view?usp=drive_link" }
    ]
  },
   { 
     num:"03",

    title:"AWS Landing Zone", 
    badge:"Infrastructure", 
    desc:"Multi-account AWS infrastructure setup with Terraform. Automated deployment of VPCs, security groups, IAM policies, and CI/CD pipelines for enterprise-grade cloud operations.", 
    techs:["AWS","Terraform","CI/CD","Docker","Infrastructure as Code"], 
    accent:"#f59e0b",
    links:[
      { icon:"fa-brands fa-github", label:"Code", href:"https://github.com/tamil-2005" },
      { icon:"fa-solid fa-arrow-up-right", label:"Details", href:"#experience" }
    ]
  },
  {
    num:"04",
    title:"FinOps Analyzer",
    badge:"Cloud",
    desc:"Cloud cost intelligence tool that ingests AWS billing data, flags idle resources and spend anomalies, and recommends rightsizing actions with projected monthly savings.",
    techs:["AWS","Cost Explorer","React","Spring Boot"],
    accent:"#10b981",
    links:[
      { icon:"fa-brands fa-github", label:"Code", href:"https://github.com/tamil-2005" }
    ]
  },
];

export const SKILL_GROUPS = [
  { 
    key:"frontend",
    label:"Frontend", 
    category:"Frontend", 
    icon:"fa-solid fa-window-maximize", 
    color:"#3b82f6",
    items:[
      { name:"HTML5 & CSS3", level:"Experienced", certified:true, tag:"Experienced" },
      { name:"JavaScript ES6+", level:"Intermediate", certified:true, tag:"Intermediate" },
      { name:"React & Redux", level:"Intermediate", certified:false, tag:"Intermediate" },
      { name:"Tailwind CSS", level:"Intermediate", certified:false, tag:"Intermediate" },
      { name:"Bootstrap", level:"Intermediate", certified:false, tag:"Intermediate" },
    ],
    skills:[
      { name:"HTML5 & CSS3", level:90, certified:true, tag:"Experienced" },
      { name:"JavaScript ES6+", level:80, certified:true, tag:"Advanced" },
      { name:"React & Redux", level:78, certified:false, tag:"Advanced" },
      { name:"Tailwind CSS", level:78, certified:false, tag:"Advanced" },
      { name:"Bootstrap", level:65, certified:false, tag:"Intermediate" },
    ]
  },
  { 
    key:"backend",
    label:"Backend", 
    category:"Backend", 
    icon:"fa-solid fa-database", 
    color:"#8b5cf6",
    items:[
      { name:"Java", level:"Intermediate", certified:false, tag:"Intermediate" },
      { name:"Spring Boot", level:"Intermediate", certified:false, tag:"Intermediate" },
      { name:"REST API Design", level:"Intermediate", certified:false, tag:"Intermediate" },
      { name:"MySQL", level:"Intermediate", certified:true, tag:"Intermediate" },
      { name:"Node.js", level:"Basic", certified:false, tag:"Basic" },
    ],
    skills:[
      { name:"Java", level:80, certified:false, tag:"Advanced" },
      { name:"Spring Boot", level:70, certified:false, tag:"Intermediate" },
      { name:"REST API Design", level:75, certified:false, tag:"Intermediate" },
      { name:"MySQL", level:80, certified:true, tag:"Advanced" },
      { name:"Node.js", level:50, certified:false, tag:"Basic" },
    ]
  },
  { 
    key:"cloud",
    label:"Cloud & DevOps", 
    category:"Cloud & DevOps", 
    icon:"fa-solid fa-cloud", 
    color:"#06b6d4",
    items:[
      { name:"AWS", level:"Basic", certified:false, tag:"Basic" },
      { name:"Terraform", level:"Basic", certified:false, tag:"Basic" },
      { name:"Docker", level:"Basic", certified:false, tag:"Basic" },
      { name:"CI/CD Pipelines", level:"Basic", certified:false, tag:"Basic" },
    ],
    skills:[
      { name:"AWS", level:55, certified:false, tag:"Basic" },
      { name:"Terraform", level:55, certified:false, tag:"Basic" },
      { name:"Docker", level:50, certified:false, tag:"Basic" },
      { name:"CI/CD Pipelines", level:60, certified:false, tag:"Basic" },
    ]
  },
  { 
    key:"tools",
    label:"Tools", 
    category:"Tools", 
    icon:"fa-solid fa-wrench", 
    color:"#f59e0b",
    items:[
      { name:"Git & GitHub", level:"Intermediate", certified:false, tag:"Intermediate" },
      { name:"VS Code", level:"Experienced", certified:false, tag:"Experienced" },
      { name:"Postman", level:"Intermediate", certified:false, tag:"Intermediate" },
      { name:"MS Office", level:"Experienced", certified:true, tag:"Experienced" },
    ],
    skills:[
      { name:"Git & GitHub", level:75, certified:false, tag:"Intermediate" },
      { name:"VS Code", level:90, certified:false, tag:"Experienced" },
      { name:"Postman", level:70, certified:false, tag:"Intermediate" },
      { name:"MS Office", level:85, certified:true, tag:"Advanced" },
    ]
  },
];

export const SKILL_CATEGORIES = SKILL_GROUPS;

export const CONTACT = { name:"Tamilselvan Mariyappan", email:"tamilselvan.mariyappan@gmail.com", location:"Dharmapuri, Tamil Nadu" };

export const CONTACT_INFO = [
  { icon: "fa-solid fa-envelope", label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: "fa-solid fa-location-dot", label: "Location", value: CONTACT.location },
];
