"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

export interface MarqueeImage {
  src: string;
  alt: string;
  category?: string;
  categoryColor?: string;
  level?: number;
  tag?: string;
  certified?: boolean;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface ThreeDMarqueeProps {
  images: MarqueeImage[];
  className?: string;
  cols?: number; // default is 5
  onImageClick?: (image: MarqueeImage, index: number) => void;
}

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  images,
  className = "",
  cols = 5,
  onImageClick,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Clone the image list 4 times for a seamless infinite loop
  const duplicatedImages = [...images, ...images, ...images, ...images];

  const groupSize = Math.ceil(duplicatedImages.length / cols);
  const imageGroups = Array.from({ length: cols }, (_, index) =>
    duplicatedImages.slice(index * groupSize, (index + 1) * groupSize)
  );

  const handleImageClick = (image: MarqueeImage, globalIndex: number) => {
    if (onImageClick) {
      onImageClick(image, globalIndex);
    } else if (image.href) {
      window.open(image.href, image.target || "_self");
    }
  };

  return (
    <section
      className={`w-full h-full min-h-[650px] overflow-hidden relative ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-20" />

      <div className="flex w-full h-full items-center justify-center relative">
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <div
            className="w-full max-w-7xl px-4 sm:px-6 py-4 origin-center transition-transform duration-700 ease-out"
            style={{
              transform: "rotateX(25deg) rotateY(0deg) rotateZ(12deg) scale(1.05)",
            }}
          >
            <div
              className="grid gap-3 sm:gap-6 lg:gap-8 justify-items-center w-full"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              }}
            >
              {imageGroups.map((imagesInGroup, idx) => (
                <motion.div
                  key={`column-${idx}`}
                  animate={{ y: idx % 2 === 0 ? [0, -320] : [-320, 0] }}
                  transition={{
                    duration: idx % 2 === 0 ? 26 : 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex flex-col items-center gap-5 sm:gap-7 relative w-full"
                >
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-px bg-gradient-to-b from-blue-500/20 via-purple-500/25 to-cyan-500/20 pointer-events-none" />
                  
                  {imagesInGroup.map((image, imgIdx) => {
                    const globalIndex = idx * groupSize + imgIdx;
                    const isHovered = hoveredIndex === globalIndex;

                    return (
                      <div
                        key={`img-${idx}-${imgIdx}`}
                        className="relative z-10 hover:z-50 w-full flex justify-center"
                        onMouseEnter={() => setHoveredIndex(globalIndex)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <motion.div
                          whileHover={{ y: -10, scale: 1.15 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className={`w-28 sm:w-36 lg:w-40 h-28 sm:h-36 lg:h-36 rounded-2xl p-3.5 flex flex-col items-center justify-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xl transition-all duration-300 relative ${
                            isHovered
                              ? "ring-2 ring-purple-500/90 shadow-2xl shadow-purple-500/40 border-purple-400"
                              : "hover:border-slate-300"
                          }`}
                          onClick={() => handleImageClick(image, globalIndex)}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-10 h-10 sm:w-14 sm:h-14 object-contain mb-2 drop-shadow-md transition-transform duration-300"
                            onError={(e) => {
                              (e.currentTarget as HTMLElement).style.display = "none";
                            }}
                          />
                          <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 text-center tracking-tight truncate w-full px-1">
                            {image.alt}
                          </span>

                          {/* Pop up details box on hover - counter rotated to sit straight upright */}
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9, rotateZ: -12, rotateX: -25 }}
                                animate={{ opacity: 1, y: -10, scale: 1, rotateZ: -12, rotateX: -25 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9, rotateZ: -12, rotateX: -25 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 sm:w-60 p-3.5 rounded-2xl bg-slate-900/95 text-white shadow-2xl border border-purple-500/50 backdrop-blur-2xl pointer-events-none z-50 origin-bottom"
                              >
                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                  <span
                                    className="text-[9px] sm:text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white shadow-sm"
                                    style={{
                                      backgroundColor:
                                        image.categoryColor || "#3b82f6",
                                    }}
                                  >
                                    {image.category || "Skill"}
                                  </span>
                                  {image.certified && (
                                    <span className="text-[9px] sm:text-[10px] text-amber-400 font-bold flex items-center gap-1">
                                      <i className="fa-solid fa-certificate" /> Certified
                                    </span>
                                  )}
                                </div>

                                <div className="font-extrabold text-xs sm:text-sm text-white mb-1">
                                  {image.alt}
                                </div>

                                {image.level && (
                                  <div className="space-y-1 mt-1">
                                    <div className="flex justify-between text-[10px] text-slate-300 font-medium">
                                      <span>Proficiency</span>
                                      <span className="text-purple-300 font-bold">
                                        {image.tag || "Advanced"} ({image.level}%)
                                      </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                                      <div
                                        className="h-full rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400"
                                        style={{ width: `${image.level}%` }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};





