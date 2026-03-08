import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, Suspense } from "react";
import Spline from "@splinetool/react-spline";
import ErrorBoundary from "./ErrorBoundary";

type HeroProps = {
  onProjectClick?: (src: string) => void;
};

const Hero = ({ onProjectClick }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Stay visible until well into the scroll so it's always seen on hero
  const splineOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="fixed inset-0 h-screen flex flex-col items-center justify-center overflow-hidden z-0"
    >
      {/* 3D Spline Centerpiece - Upscaled & Centered */}
      <motion.div
        style={{ opacity: splineOpacity }}
        className="absolute-center z-0 flex items-center justify-center pointer-events-auto"
      >
        <div className="w-[80vw] h-[80vh] md:w-[70vw] md:h-[70vh] max-w-5xl max-h-[900px] flex items-center justify-center">
          <ErrorBoundary
            fallback={
              <div className="text-charcoal/10 mono-label">
                [ 3D SYSTEM OFFLINE ]
              </div>
            }
          >
            <Suspense
              fallback={
                <div className="w-32 h-32 rounded-full bg-neutral-100 animate-pulse" />
              }
            >
              <Spline
                className="w-full h-full"
                scene="https://prod.spline.design/eihSP8JFX99LXuhX/scene.splinecode"
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </motion.div>

      {/* Primary Statement (Bottom Left Corner) */}
      <div className="absolute bottom-16 left-12 max-w-sm z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mono-label text-sm leading-relaxed text-charcoal/80 font-serif"
        >
          Building full-stack platforms where architecture, performance, and
          user experience converge seamlessly. <br />
          <span className="mono-label text-[10px] opacity-40 mt-4 block">
            [ SCROLL TO EXPLORE ]
          </span>
        </motion.p>
      </div>

      {/* Project Thumbnails (Bottom Right Corner) */}
      <div className="absolute bottom-16 right-12 z-10 flex gap-4 items-end">
        {[
          {
            num: "01",
            src: "/images/hao.png",
            label: "Health Alert Organization",
          },
          {
            num: "02",
            src: "/images/cyc.png",
            label: "Creative Youth For Change",
          },
          { num: "03", src: "/images/coroute.png", label: "CoRoute" },
          { num: "04", src: "/images/oucboll.png", label: "Oucboll Freezer" },
        ].map((proj) => (
          <button
            key={proj.num}
            type="button"
            className="flex flex-col gap-2 cursor-pointer outline-none"
            onClick={() => onProjectClick?.(proj.src)}
          >
            <span className="mono-label text-[9px] opacity-40">
              [ {proj.num} ]
            </span>
            <div className="w-24 h-32 bg-charcoal/5 border border-charcoal/10 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img
                src={proj.src}
                alt={proj.label}
                className="w-full h-full object-cover opacity-80"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://picsum.photos/seed/${proj.label}/200/300`;
                }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Grid Decals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute top-[20%] left-[10%] mono-label rotate-90 origin-left">
          EST. 2026
        </div>
        <div className="absolute bottom-[20%] right-[10%] mono-label -rotate-90 origin-right">
          ARTIFACT NO. 09
        </div>
      </div>
    </section>
  );
};

export default Hero;
