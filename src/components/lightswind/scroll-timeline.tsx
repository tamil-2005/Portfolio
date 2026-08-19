import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Calendar } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-slate-50 shadow-lg hover:shadow-xl transition-all duration-300",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 sm:p-8", className)} {...props} />
));
CardContent.displayName = "CardContent";

export interface TimelineEvent {
  id?: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  responsibilities?: string[];
  skills?: string[];
  type?: string;
  location?: string;
  group?: string;
  logoColor?: string;
  icon?: React.ReactNode;
  color?: string;
}


export interface ScrollTimelineProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
  animationOrder?: "sequential" | "staggered" | "simultaneous";
  cardAlignment?: "alternating" | "left" | "right";
  lineColor?: string;
  activeColor?: string;
  progressIndicator?: boolean;
  cardVariant?: "default" | "elevated" | "outlined" | "filled";
  cardEffect?: "none" | "glow" | "shadow" | "bounce";
  parallaxIntensity?: number;
  progressLineWidth?: number;
  progressLineCap?: "round" | "square";
  dateFormat?: "text" | "badge";
  className?: string;
  revealAnimation?: "fade" | "slide" | "scale" | "flip" | "none";
  connectorStyle?: "dots" | "line" | "dashed";
  perspective?: boolean;
  darkMode?: boolean;
  smoothScroll?: boolean;
}

const DEFAULT_EVENTS: TimelineEvent[] = [
  {
    year: "2023",
    title: "Major Achievement",
    subtitle: "Organization Name",
    description:
      "Description of the achievement or milestone reached during this time period.",
  },
  {
    year: "2022",
    title: "Important Milestone",
    subtitle: "Organization Name",
    description: "Details about this significant milestone and its impact.",
  },
  {
    year: "2021",
    title: "Key Event",
    subtitle: "Organization Name",
    description: "Information about this key event in the timeline.",
  },
];

export const ScrollTimeline = ({
  events = DEFAULT_EVENTS,
  title = "Timeline",
  subtitle = "Scroll to explore the journey",
  animationOrder = "sequential",
  cardAlignment = "alternating",
  lineColor = "bg-slate-200 dark:bg-slate-700",
  activeColor = "bg-purple-600",
  progressIndicator = true,
  cardVariant = "default",
  cardEffect = "shadow",
  parallaxIntensity = 0,
  progressLineWidth = 4,
  progressLineCap = "round",
  dateFormat = "badge",
  revealAnimation = "slide",
  className = "",
  connectorStyle = "line",
  perspective = false,
  darkMode = false,
  smoothScroll = true,
}: ScrollTimelineProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 20%", "end 80%"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const getCardVariants = (index: number) => {
    const isLeft =
      cardAlignment === "left" ||
      (cardAlignment === "alternating" && index % 2 === 0);

    return {
      initial: {
        opacity: 0,
        x: isLeft ? -40 : 40,
        y: 20,
      },
      whileInView: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.6,
          delay: (index % 3) * 0.15,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
      },
      viewport: { once: true, margin: "-60px" },
    };
  };

  const getCardClasses = (index: number) => {
    const baseClasses =
      "relative z-30 rounded-2xl transition-all duration-300";
    const alignmentClassesDesktop =
      cardAlignment === "alternating"
        ? index % 2 === 0
          ? "lg:mr-[calc(50%+24px)]"
          : "lg:ml-[calc(50%+24px)]"
        : cardAlignment === "left"
        ? "lg:mr-auto lg:ml-0"
        : "lg:ml-auto lg:mr-0";

    return cn(
      baseClasses,
      alignmentClassesDesktop,
      "w-full lg:w-[calc(50%-44px)]"
    );
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        darkMode ? "bg-background text-foreground" : "",
        className
      )}
    >
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            Career Journey
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {title}
        </h2>
        <p className="text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pb-24">
        <div className="relative mx-auto">
          {/* Base Background Vertical Line (100% Visible) */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-10 rounded-full bg-slate-300 dark:bg-slate-700"
            style={{ width: `${progressLineWidth}px` }}
          />

          {/* Animated Active Progress Line */}
          {progressIndicator && (
            <>
              <motion.div
                className="absolute top-0 z-10 rounded-full bg-gradient-to-b from-blue-500 via-purple-600 to-cyan-500 shadow-md shadow-purple-500/40"
                style={{
                  height: progressHeight,
                  width: `${progressLineWidth}px`,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
              {/* Traveling Glow Comet */}
              <motion.div
                className="absolute z-20 pointer-events-none"
                style={{
                  top: progressHeight,
                  left: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                }}
              >
                <div
                  className="w-5 h-5 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(168,85,247,1) 0%, rgba(99,102,241,0.8) 50%, rgba(34,211,238,0) 80%)",
                    boxShadow:
                      "0 0 15px 4px rgba(168,85,247,0.7), 0 0 25px 8px rgba(99,102,241,0.5)",
                  }}
                />
              </motion.div>
            </>
          )}

          {/* Timeline Event Cards */}
          <div className="relative z-20 space-y-12 sm:space-y-16">
            {events.map((event, index) => {
              return (
                <div
                  key={event.id || index}
                  className={cn(
                    "relative flex items-center py-2",
                    "flex-col lg:flex-row",
                    cardAlignment === "alternating"
                      ? index % 2 === 0
                        ? "lg:justify-start"
                        : "lg:flex-row-reverse lg:justify-start"
                      : cardAlignment === "left"
                      ? "lg:justify-start"
                      : "lg:flex-row-reverse lg:justify-start"
                  )}
                >
                  {/* Timeline Center Node Dot */}
                  <div className="absolute top-8 lg:top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 z-30">
                    <div className="w-7 h-7 rounded-full border-4 border-purple-600 bg-white dark:bg-slate-900 shadow-lg shadow-purple-500/30 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    </div>
                  </div>

                  <motion.div
                    className={cn(getCardClasses(index), "mt-12 lg:mt-0")}
                    variants={getCardVariants(index)}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: "-60px" }}
                  >
                    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                      {event.logoColor && (
                        <div
                          className="h-1.5 w-full"
                          style={{
                            background: `linear-gradient(90deg, ${event.logoColor}, ${event.logoColor}77)`,
                          }}
                        />
                      )}
                      <CardContent className="p-6 sm:p-7">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            {event.icon && (
                              <div className="flex-shrink-0">{event.icon}</div>
                            )}
                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-0.5">
                                {event.year}
                              </span>
                              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {event.title}
                              </h3>
                              {event.subtitle && (
                                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                                  {event.subtitle}
                                </p>
                              )}
                            </div>
                          </div>

                          {event.type && (
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex-shrink-0 border border-slate-200 dark:border-slate-700">
                              {event.type}
                            </span>
                          )}
                        </div>

                        {event.location && (
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                            <span className="inline-flex items-center gap-1.5">
                              <i className="fa-solid fa-location-dot text-slate-400" />
                              {event.location}
                            </span>
                          </div>
                        )}

                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-medium">
                          {event.description}
                        </p>

                        {event.responsibilities &&
                          event.responsibilities.length > 0 && (
                            <div className="mb-5 border-t border-slate-100 dark:border-slate-800 pt-3.5">
                              <h4 className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-3">
                                Key Highlights
                              </h4>
                              <ul className="space-y-2.5">
                                {event.responsibilities.map((res, rIdx) => (
                                  <li
                                    key={rIdx}
                                    className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium"
                                  >
                                    <span
                                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                      style={{
                                        backgroundColor: event.logoColor
                                          ? `${event.logoColor}20`
                                          : "#3b82f620",
                                      }}
                                    >
                                      <i
                                        className="fa-solid fa-check text-[9px]"
                                        style={{
                                          color: event.logoColor || "#3b82f6",
                                        }}
                                      />
                                    </span>
                                    <span>{res}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {event.skills && event.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                            {event.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


