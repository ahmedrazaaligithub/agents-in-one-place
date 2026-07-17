"use client";

import { motion } from "framer-motion";

type Blob = {
  className: string;
  animate: {
    x?: number[];
    y?: number[];
    scale?: number[];
  };
  duration: number;
  delay?: number;
};

const blobs: Blob[] = [
  {
    className:
      "top-[-12%] left-[8%] h-[30rem] w-[30rem] rounded-full bg-primary/35 blur-[110px]",
    animate: {
      x: [0, 140, -60, 0],
      y: [0, 90, -50, 0],
      scale: [1, 1.2, 0.88, 1],
    },
    duration: 11,
  },
  {
    className:
      "top-[6%] right-[-8%] h-96 w-96 rounded-full bg-fuchsia-500/30 blur-[100px]",
    animate: {
      x: [0, -110, 60, 0],
      y: [0, 100, -40, 0],
      scale: [1, 0.85, 1.18, 1],
    },
    duration: 13,
    delay: 0.5,
  },
  {
    className:
      "bottom-[-15%] left-[30%] h-[26rem] w-[26rem] rounded-full bg-violet-600/30 blur-[110px]",
    animate: {
      x: [0, 90, -100, 0],
      y: [0, -90, 60, 0],
      scale: [1, 1.22, 0.86, 1],
    },
    duration: 15,
    delay: 1,
  },
];

export function AnimatedBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden " +
        (className ?? "")
      }
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute ${blob.className}`}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            delay: blob.delay ?? 0,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
