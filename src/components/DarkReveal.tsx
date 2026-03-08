import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const DarkReveal = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Expand the bar vertically - Shifted trigger to ensure clean hero start
    const scaleY = useTransform(scrollYProgress, [0.25, 0.55], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0.25, 0.3], [0, 1]);
    const height = useTransform(scrollYProgress, [0.24, 0.25], ["0px", "2px"]);

    return (
        <div ref={containerRef} className="relative h-[200vh] pointer-events-none z-30">
            <motion.div
                style={{ scaleY, opacity, height }}
                className="fixed top-1/2 left-0 w-full bg-bg-dark z-30 origin-center"
            >
                {/* No borders here as per user request */}
            </motion.div>
        </div>
    );
};

export default DarkReveal;
