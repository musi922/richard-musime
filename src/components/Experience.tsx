import { motion } from 'framer-motion';

const experiences = [
    {
        role: "Lead Full Stack Engineer",
        company: "Moyotech Solutions",
        period: "24 — NOW",
        index: "01"
    },
    {
        role: "Full Stack Architect",
        company: "Health Alert Org",
        period: "21 — 24",
        index: "02"
    },
    {
        role: "SAP Junior Consultant",
        company: "Complex Systems",
        period: "19 — 21",
        index: "03"
    }
];

const Experience = () => {
    return (
        <section id="experience" className="bg-bg-dark text-white py-60 px-12 relative z-40 border-t border-white/5">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-40">
                    <span className="mono-label text-lilac mb-6 block">03 / CURRICULUM</span>
                    <h2 className="text-8xl md:text-[8vw] italic leading-none tracking-tighter">
                        The Timeline
                    </h2>
                </div>

                <div className="divide-y divide-white/5 border-b border-white/5">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group py-16 flex flex-col md:flex-row items-baseline justify-between hover:bg-white/[0.02] transition-colors -mx-4 px-4 rounded-sm"
                        >
                            <div className="flex items-baseline gap-20">
                                <span className="mono-label text-[10px] text-lilac opacity-30">{exp.index}</span>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-4xl md:text-6xl font-light italic-serif leading-none transition-all duration-700 group-hover:pl-4 group-hover:text-lilac">
                                        {exp.role}
                                    </h3>
                                    <span className="mono-label text-[9px] opacity-40">{exp.company}</span>
                                </div>
                            </div>
                            <span className="mono-label text-[11px] opacity-30 mt-4 md:mt-0 italic">{exp.period}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
