import React, { useEffect } from "react";
import Navbar      from "./components/Navbar";
import Home        from "./components/Home";
import About       from "./components/About";
import Experience  from "./components/Experience";
import Projects    from "./components/Projects";
import Skills      from "./components/Skills";
import Contact     from "./components/Contact";
import Footer      from "./components/Footer";
import ScrollUpBtn from "./components/ScrollUpBtn";

export default function App() {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        const el = document.querySelector(a.getAttribute("href"));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }, []);

  return (
    <>
      {/* CDN fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <ScrollUpBtn />
      <Navbar />
      <main>
        <Home />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
