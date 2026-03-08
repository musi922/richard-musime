import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import ProjectCard from './components/ProjectCard';
import DarkReveal from './components/DarkReveal';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState('hero');
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({
    hero: 0, about: 0, work: 0, experience: 0, contact: 0
  });

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
      const sections = ['about', 'work', 'experience', 'contact'];
      let current = 'hero';
      const progressMap: Record<string, number> = { hero: 0, about: 0, work: 0, experience: 0, contact: 0 };

      // Hero progress (starts at 100% and stays)
      progressMap.hero = window.scrollY > 10 ? 1 : 0;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const viewHeight = window.innerHeight;

          // Alternatively, simpler: progress is 1 if passed, 0 if not reached, and relative if inside
          const simpleProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - 100)));

          progressMap[id] = simpleProgress;

          if (rect.top <= 200) {
            current = id;
          }
        }
      }

      setActiveSection(current);
      setSectionProgress(progressMap);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const formattedDate = time.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-x-hidden">
      <CustomCursor />

      {/* JORDAN GRID PINNED ELEMENTS (PERSISTENT LAYER) */}
      <div className={`grid-pin-system pointer-events-none transition-colors duration-500 ${activeSection !== 'hero' ? 'text-white' : 'text-charcoal'}`}>
        {/* Top Left: Menu */}
        <nav className="grid-pin top-0 left-0 flex flex-col gap-1 items-start pointer-events-auto">
          {[
            { id: 'about', label: 'ABOUT', href: '#about' },
            { id: 'work', label: 'PROJECTS', href: '#work' },
            { id: 'experience', label: 'ARCHIVE', href: '#experience' },
            { id: 'contact', label: 'TALK', href: '#contact' }
          ].map((item, idx) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-item mono-label group flex items-center gap-2 transition-colors relative ${activeSection === item.id ? 'active' : ''}`}
            >
              <div
                className="nav-pill opacity-100"
                style={{ width: `${sectionProgress[item.id] * 110}%` }}
              />
              <span className="opacity-40 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Top Center-Right: Name Label */}
        <div className="grid-pin top-0 left-1/2 ml-[15vw] flex flex-col gap-0 items-start pointer-events-auto">
          <span className="mono-label font-bold text-[12px] leading-none">MUSIME RICHARD</span>
          <span className="mono-label text-[9px] opacity-40">DIGITAL ARCHITECT</span>
        </div>

        {/* Top Right: Clock & Date */}
        <div className="grid-pin top-0 right-0 text-right flex flex-col gap-0 items-end pointer-events-auto">
          <span className="mono-label text-[12px] leading-none">{formattedTime} [GMT+2]</span>
          <span className="mono-label text-[9px] opacity-40">{formattedDate}</span>
        </div>
      </div>

      <main>
        {/* Fixed Background Layer */}
        <Hero />

        {/* Scroll Spacer - Reduced for faster reveal */}
        <div className="h-[40vh] pointer-events-none" />

        {/* Scrollable Content Layer - Flows over the pinned hero */}
        <div className="relative z-10">
          {/* The Curtain Transition Layer */}
          <DarkReveal />
          <About />

          <section id="work" className="bg-bg-dark py-60 px-12 relative z-40 text-white">
            <div className="max-w-[1600px] mx-auto">
              <div className="grid grid-cols-12 gap-8 mb-40">
                <div className="col-span-12">
                  <span className="mono-label text-lilac mb-8 block">02 / WORK</span>
                  <h2 className="text-8xl md:text-[10vw] italic-serif leading-[0.7] tracking-tighter">
                    Selected <br /> <span className="opacity-10 inline-block translate-x-12">Artifacts</span>
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-60">
                <ProjectCard
                  title="S/4HANA Migration Hub"
                  category="ENTERPRISE / SAP"
                  description="Engineered for mission-critical transitions."
                  tags={["BTP", "UI5", "CAP"]}
                />
                <ProjectCard
                  title="Med-Alert SaaS"
                  category="STARTUP / SAAS"
                  description="Real-time life-saving orchestration."
                  tags={["NODE", "REACT", "PSQL"]}
                />
              </div>
            </div>
          </section>

          <Experience />

          <section id="contact" className="bg-bg-dark py-[40vh] px-12 relative z-40 text-white border-t border-white/5">
            <div className="max-w-[1600px] mx-auto text-center">
              <span className="mono-label text-lilac mb-12 block">04 / TALK</span>
              <h2 className="text-9xl md:text-[15vw] italic-serif leading-[0.75] mb-20 tracking-tighter">
                Initiate <br /> <span className="opacity-20 italic">Dialogue.</span>
              </h2>
              <a
                href="mailto:richardmusime6@gmail.com"
                className="btn-minimal border-white/20 hover:bg-white hover:text-bg-dark transition-all px-12 py-6 text-sm"
              >
                Reach Out
              </a>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-bg-dark p-12 border-t border-white/5 relative z-40 flex justify-between items-end opacity-20 text-white">
        <span className="mono-label text-[9px]">© 2026 Musime Richard • Artifact M-R</span>
        <div className="flex gap-8">
          <a href="#" className="mono-label text-[9px]">LinkedIn</a>
          <a href="#" className="mono-label text-[9px]">GitHub</a>
          <a href="#" className="mono-label text-[9px]">Read.cv</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
