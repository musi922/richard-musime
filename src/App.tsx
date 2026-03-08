import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import About from "./components/About";
import Tools from "./components/Tools";
import DarkReveal from "./components/DarkReveal";
import ContactModal from "./components/ContactModal";

// Project data with actual images provided by user
const projects = [
  {
    id: "01",
    title: "Health Alert Organization",
    category: "WEB APPLICATION",
    description:
      "Health Alert Organization (HAO) — a platform focused on timely, accessible health information.",
    tags: ["REACT", "NODE"],
    image: "/images/hao.png",
  },
  {
    id: "02",
    title: "Creative Youth For Change",
    category: "WEB APPLICATION",
    description:
      "Digital platform (2022) supporting youth empowerment and community development programs in Pakistan.",
    tags: ["Nest js", "Next js"],
    image: "/images/cyc.png",
  },
  {
    id: "03",
    title: "CoRoute",
    category: "WEB APPLICATION",
    description:
      "Pooling platform connecting riders and drivers with routes across Canadian cities.",
    tags: ["REACT", "NODE"],
    image: "/images/coroute.png",
  },
  {
    id: "04",
    title: "Oucboll Freezer",
    category: "WEB APPLICATION",
    description:
      "Monitoring and management platform for energy-efficient industrial freezers.",
    tags: ["REACT", "NODE"],
    image: "/images/oucboll.png",
  },
];

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState("hero");
  const [sectionProgress, setSectionProgress] = useState<
    Record<string, number>
  >({
    hero: 0,
    about: 0,
    work: 0,
    tools: 0,
    contact: 0,
  });
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => {
      const sections = ["about", "work", "tools", "contact"];
      let current = "hero";
      const progressMap: Record<string, number> = {
        hero: 0,
        about: 0,
        work: 0,
        tools: 0,
        contact: 0,
      };

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const simpleProgress = Math.max(
            0,
            Math.min(1, -rect.top / (rect.height - 100)),
          );
          progressMap[id] = simpleProgress;
          if (rect.top <= 200) current = id;
        }
      }

      setActiveSection(current);
      setSectionProgress(progressMap);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const formattedDate = time
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();

  const navItems = [
    { id: "about", label: "ABOUT", href: "#about" },
    { id: "work", label: "PROJECTS", href: "#work" },
    { id: "tools", label: "TOOLS", href: "#tools" },
    { id: "contact", label: "TALK", href: "#contact" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-x-hidden">
      <CustomCursor />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Project Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 bg-black/90 z-[300] flex items-center justify-center cursor-none p-8"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 mono-label text-white/40 hover:text-white"
            >
              [ CLOSE ]
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={lightboxImg}
              alt="Project preview"
              className="max-w-5xl max-h-[85vh] w-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PERSISTENT NAV LAYER */}
      <div
        className={`grid-pin-system pointer-events-none transition-colors duration-500 ${activeSection !== "hero" ? "text-white" : "text-charcoal"}`}
      >
        {/* Top Left: Menu */}
        <nav className="grid-pin top-0 left-0 flex flex-col gap-1 items-start pointer-events-auto">
          {navItems.map((item, idx) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-item mono-label group flex items-center gap-2 transition-colors relative ${activeSection === item.id ? "active" : ""}`}
            >
              <div
                className="nav-pill opacity-100"
                style={{ width: `${sectionProgress[item.id] * 110}%` }}
              />
              <span className="opacity-40 group-hover:opacity-100 transition-opacity">
                0{idx + 1}
              </span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Top Center-Right: Name */}
        <div className="grid-pin top-0 left-1/2 ml-[15vw] flex flex-col gap-0 items-start pointer-events-auto">
          <span className="mono-label font-bold text-[12px] leading-none">
            MUSIME RICHARD
          </span>
          <span className="mono-label text-[9px] opacity-40">
            DIGITAL ARCHITECT
          </span>
        </div>

        {/* Top Right: Clock */}
        <div className="grid-pin top-0 right-0 text-right flex flex-col gap-0 items-end pointer-events-auto">
          <span className="mono-label text-[12px] leading-none">
            {formattedTime} [GMT+2]
          </span>
          <span className="mono-label text-[9px] opacity-40">
            {formattedDate}
          </span>
        </div>
      </div>

      <main>
        {/* Fixed Hero */}
        <Hero onProjectClick={(src) => setLightboxImg(src)} />

        {/* Scroll Spacer REMOVED — DarkReveal provides its own scroll space */}

        {/* Scrollable Content */}
        <div className="relative z-10 pointer-events-none">
          <DarkReveal />

          {/* Everything below the curtain should be interactive */}
          <div className="pointer-events-auto">
          <About />

          {/* ── PROJECTS SECTION ── */}
          <section
            id="work"
            className="bg-bg-dark py-24 px-12 relative z-40 text-white border-t border-white/5"
          >
            <div className="max-w-[1600px] mx-auto">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-14"
              >
                <span className="mono-label text-lilac block mb-4">
                  02 / PROJECTS
                </span>
                <h2 className="text-4xl md:text-6xl font-serif italic text-white leading-tight">
                  Projects
                </h2>
                <div className="h-px bg-white/10 mt-6 w-24" />
              </motion.div>

              {/* Timeline List */}
              <div className="flex flex-col divide-y divide-white/5">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="group flex items-center gap-8 py-8 cursor-none"
                    onClick={() => setLightboxImg(project.image)}
                  >
                    {/* Index */}
                    <span className="mono-label text-[10px] text-white/20 w-8 shrink-0">
                      {project.id}
                    </span>

                    {/* Thumbnail */}
                    <div className="w-16 h-20 shrink-0 overflow-hidden bg-white/5 border border-white/10 group-hover:border-lilac/40 transition-all duration-500">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://picsum.photos/seed/${project.title}/200/300`;
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-4xl font-serif italic tracking-tight group-hover:text-lilac transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-white/30 text-sm mt-1">
                        {project.description}
                      </p>
                    </div>

                    {/* Category */}
                    <span className="hidden md:block mono-label text-[9px] text-white/20">
                      {project.category}
                    </span>

                    {/* Tags */}
                    <div className="hidden md:flex gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="mono-label text-[9px] border border-white/10 px-2 py-1 text-white/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View indicator */}
                    <span className="mono-label text-[9px] text-lilac/0 group-hover:text-lilac/80 transition-colors duration-300 shrink-0">
                      VIEW →
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <Tools />

          {/* ── TALK SECTION ── */}
          <section
            id="contact"
            className="bg-bg-dark py-32 px-12 relative z-40 text-white border-t border-white/5"
          >
            <div className="max-w-[1600px] mx-auto">
              {/* Header */}
              <div className="mb-16">
                <span className="mono-label text-lilac block mb-4">
                  04 / TALK
                </span>
                <h2 className="text-4xl md:text-6xl font-serif italic text-white leading-tight">
                  Talk
                </h2>
                <div className="h-px bg-white/10 mt-6 w-24" />
              </div>
              <p className="text-white/40 text-sm max-w-md mb-12 leading-relaxed">
                Have a project in mind? Want to collaborate? I'm always open to
                interesting conversations.
              </p>
              <button
                onClick={() => setIsContactOpen(true)}
                className="btn-minimal border-white/20 hover:bg-white hover:text-bg-dark transition-all px-12 py-6 text-sm"
              >
                Reach Out
              </button>
            </div>
          </section>
          </div>
        </div>
      </main>

      <footer className="bg-bg-dark p-12 border-t border-white/5 relative z-40 flex justify-between items-end opacity-20 text-white">
        <span className="mono-label text-[9px]">
          © 2026 Musime Richard • Artifact M-R
        </span>
        <div className="flex gap-8">
          <a href="https://github.com/musi922" className="mono-label text-[9px]">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
