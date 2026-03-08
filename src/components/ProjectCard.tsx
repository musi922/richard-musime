import { motion } from 'framer-motion';

interface ProjectCardProps {
    title: string;
    category: string;
    description: string;
    tags: string[];
}

const ProjectCard = ({ title, category, description, tags }: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-none"
        >
            <div className="flex flex-col gap-8">
                {/* Large Visual Reveal Area */}
                <div className="project-reveal-box border border-white/5 group-hover:border-lilac/30 transition-colors duration-700">
                    <div className="absolute inset-0 bg-white/[0.03] flex items-center justify-center">
                        <span className="mono-label text-lilac/20 text-[2vw] group-hover:scale-110 transition-transform duration-1000">REVEAL ARTIFACT</span>
                    </div>
                    {/* Image Mask Reveal Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-bg-dark z-10 origin-right"
                        initial={{ scaleX: 1 }}
                        whileInView={{ scaleX: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <span className="mono-label text-lilac text-[9px]">{category}</span>
                        <div className="flex gap-4">
                            {tags.map((tag, i) => (
                                <span key={i} className="mono-label text-[8px] opacity-20 uppercase tracking-widest">{tag}</span>
                            ))}
                        </div>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-light italic-serif leading-none group-hover:text-lilac transition-colors duration-500">
                        {title}
                    </h3>

                    <p className="text-sm text-white/40 leading-relaxed font-light max-w-sm">
                        {description}
                    </p>

                    <div className="h-px bg-white/5 w-0 group-hover:w-full transition-all duration-1000" />
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
