import { motion, useScroll, useTransform } from "framer-motion";

const DarkReveal = () => {
  // Use raw scrollY (not element-relative progress) so it's ALWAYS 0 at page load
  const { scrollY } = useScroll();

  // Fade from light to dark as you scroll past the hero
  const opacity = useTransform(scrollY, [0, 80, 220], [0, 0.7, 1]);

  return (
    <div className="relative h-screen pointer-events-none z-30">
      <motion.div
        style={{ opacity }}
        className="fixed top-0 left-0 w-full h-screen bg-bg-dark z-30 pointer-events-none"
      />
    </div>
  );
};

export default DarkReveal;
