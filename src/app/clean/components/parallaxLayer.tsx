"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

const ParallaxLayer = ({
  children,
  speed = 0.5,
  className = "",
  direction = "up",
}: ParallaxLayerProps) => {
  const { scrollYProgress } = useScroll();

  // Always call useTransform once
  const outputRange = (() => {
    switch (direction) {
      case "up":
        return ["0%", `${-100 * speed}%`];
      case "down":
        return ["0%", `${100 * speed}%`];
      case "left":
        return ["0%", `${-100 * speed}%`];
      case "right":
        return ["0%", `${100 * speed}%`];
      default:
        return ["0%", `${-100 * speed}%`];
    }
  })();

  const transform = useTransform(scrollYProgress, [0, 1], outputRange);

  const motionStyle =
    direction === "left" || direction === "right"
      ? { x: transform }
      : { y: transform };

  return (
    <motion.div className={className} style={motionStyle}>
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
