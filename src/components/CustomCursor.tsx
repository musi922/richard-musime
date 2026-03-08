import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            setIsHovering(
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                !!target.closest('a') ||
                !!target.closest('button')
            );
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    return (
        <>
            {/* Outer ring */}
            <motion.div
                animate={{
                    x: pos.x - 16,
                    y: pos.y - 16,
                    scale: isHovering ? 1.6 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(160, 160, 240, 0.8)',
                    backgroundColor: isHovering ? 'rgba(160, 160, 240, 0.15)' : 'transparent',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    mixBlendMode: 'difference',
                }}
            />
            {/* Inner dot */}
            <motion.div
                animate={{
                    x: pos.x - 3,
                    y: pos.y - 3,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ type: 'spring', damping: 35, stiffness: 400, mass: 0.3 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(160, 160, 240, 1)',
                    pointerEvents: 'none',
                    zIndex: 99999,
                }}
            />
        </>
    );
};

export default CustomCursor;
