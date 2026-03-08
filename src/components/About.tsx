import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="relative bg-bg-dark text-white pt-32 pb-80 px-12 z-40 overflow-hidden min-h-screen">
            <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-8 relative z-10">

                {/* The Gothic "About" Reveal */}
                <div className="col-span-12 mb-40 text-center lg:text-left">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="gothic text-[25vw] lg:text-[20vw] opacity-10 leading-none absolute top-[-5%] left-0 pointer-events-none"
                    >
                        About
                    </motion.h1>
                    <span className="mono-label text-lilac block mb-8">01 / ARCHITECTURE & PHILOSOPHY</span>
                </div>

                {/* Core Narrative */}
                <div className="col-span-12 lg:col-span-7 relative z-10">
                    <h2 className="text-5xl md:text-7xl font-serif italic mb-20 leading-tight">
                        Engineering <span className="text-lilac">Elegant</span> <br /> Complexity.
                    </h2>

                    <div className="max-w-xl">
                        <p className="text-lg md:text-xl font-light leading-relaxed mb-12 text-white/60">
                            I specialize in building visually captivating and functional systems
                            that make a strong first impression. With a focus on cohesive visual language,
                            I craft designs that align with your <span className="text-white">brand</span> and
                            engage your <span className="text-white">audience</span>.
                        </p>
                        <p className="text-lg md:text-xl font-light leading-relaxed text-white/60">
                            As an SAP Architect, I am proficient in leveraging high-performance
                            frameworks to build scalable, robust, and easy to manage infrastructures.
                        </p>
                    </div>
                </div>

                {/* Seductive CTA / Info */}
                <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-40 lg:mt-0 flex flex-col justify-end items-start border-l border-white/5 pl-12">
                    <div className="flex flex-col gap-12">
                        <div>
                            <span className="mono-label text-[9px] opacity-40 block mb-4">CAPABILITIES</span>
                            <ul className="flex flex-col gap-4 text-sm italic font-serif">
                                <li className="hover:text-lilac transition-colors cursor-none underline underline-offset-4 decoration-white/10">SAP Enterprise Solutions</li>
                                <li className="hover:text-lilac transition-colors cursor-none underline underline-offset-4 decoration-white/10">Modern Web Architecture</li>
                                <li className="hover:text-lilac transition-colors cursor-none underline underline-offset-4 decoration-white/10">3D Interaction Design</li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="mono-label text-[9px] opacity-40">AVAILABILITY</span>
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-lilac animate-pulse" />
                                <span className="text-sm tracking-widest uppercase">Now Open for Magic</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Visual Break / Image Placeholder */}
            <div className="mt-80 w-full aspect-video bg-white/[0.02] rounded-sm overflow-hidden flex items-center justify-center border border-white/5">
                <span className="mono-label opacity-10 text-[5vw]">Industrial Rigor</span>
            </div>
        </section>
    );
};

export default About;
