import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function FloatingDock({ items, className = "" }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`flex items-end gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md ${className}`}
    >
      {items.map((item) => (
        <DockItem key={item.title} item={item} mouseX={mouseX} />
      ))}
    </motion.div>
  );
}

function DockItem({ item, mouseX }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthRaw  = useTransform(distance, [-120, 0, 120], [40, 72, 40]);
  const heightRaw = useTransform(distance, [-120, 0, 120], [40, 72, 40]);
  const width  = useSpring(widthRaw,  { stiffness: 300, damping: 22 });
  const height = useSpring(heightRaw, { stiffness: 300, damping: 22 });

  const y = useSpring(
    useTransform(distance, [-120, 0, 120], [0, -10, 0]),
    { stiffness: 300, damping: 22 }
  );

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={item.title}
      style={{ width, height, y }}
      className="relative flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-colors group"
    >
      <div className="flex items-center justify-center w-full h-full text-base">
        {item.icon}
      </div>
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <div className="bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-lg border border-white/10 shadow-lg">
          {item.title}
        </div>
      </div>
    </motion.a>
  );
}
