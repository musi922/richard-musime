import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="relative bg-bg-dark text-white z-40 overflow-hidden"
    >
      {/* Main content — sits above the decorative text */}
      <div className="px-12 pt-4 pb-32 relative" style={{ zIndex: 1 }}>
        <div className="max-w-[1600px] mx-auto">
          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="mono-label text-lilac block mb-4">
              01 / ARCHITECTURE & PHILOSOPHY
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic text-white leading-tight mt-2">
              About
            </h2>
            <div className="h-px bg-white/10 mt-5 w-20" />
          </motion.div>

          {/* ── Content Grid ── */}
          <div className="grid grid-cols-12 gap-8">
            {/* Paragraphs */}
            <div className="col-span-12 lg:col-span-7">
              <div className="max-w-xl flex flex-col gap-8">
                <p className="text-base md:text-lg font-light leading-relaxed text-white/60">
                  Full Stack Software Engineer with 5+ years of experience building modern web applications
                  using TypeScript, JavaScript, React.js, and Node.js. Experienced in designing scalable
                  frontend and backend systems, building REST APIs, debugging complex applications, and improving
                  code quality through testing and code reviews.
                </p>
                <p className="text-base md:text-lg font-light leading-relaxed text-white/60">
                  I build scalable applications by leveraging an AI-first workflow to turn complex problems
                  into clean, production-ready solutions.
                </p>
              </div>
            </div>

            {/* Side Panel */}
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col gap-12 border-l border-white/5 pl-10">
              <div>
                <span className="mono-label text-[9px] opacity-40 block mb-4">
                  CAPABILITIES
                </span>
                <ul className="flex flex-col gap-4 text-sm italic font-serif">
                  <li className="hover:text-lilac transition-colors">
                  Scalable Full-Stack Applications
                  </li>
                  <li className="hover:text-lilac transition-colors">
                  SAP Enterprise Architecture
                  </li>
                  <li className="hover:text-lilac transition-colors">
                  Cloud & API Platform Engineering
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <span className="mono-label text-[9px] opacity-40">
                  AVAILABILITY
                </span>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-lilac animate-pulse" />
                  <span className="text-sm tracking-widest uppercase">
                    Available for work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
