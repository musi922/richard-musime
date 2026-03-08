import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useSpring(0, { damping: 20, stiffness: 200 });
    const cursorY = useSpring(0, { damping: 20, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.getAttribute('role') === 'button' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: isHovering ? 'rgba(139, 92, 246, 0.3)' : 'transparent',
                border: '1px solid var(--accent-primary)',
                pointerEvents: 'none',
                zIndex: 9999,
                x: cursorX,
                y: cursorY,
                scale: isHovering ? 1.5 : 1,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-primary)',
                }}
            />
        </motion.div>
    );
};

export default CustomCursor;
