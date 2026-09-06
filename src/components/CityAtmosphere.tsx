"use client";

import { motion } from "framer-motion";

type CityAtmosphereProps = {
  intensity?: "soft" | "full";
};

export function CityAtmosphere({ intensity = "full" }: CityAtmosphereProps) {
  const strong = intensity === "full";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,46,139,0.22),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(46,245,200,0.18),_transparent_50%),linear-gradient(180deg,#070b14_0%,#0e1628_55%,#12081a_100%)]" />
      <div className="city-grid absolute inset-0 opacity-40" />

      <motion.div
        className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-magenta/30 blur-[90px] pulse-glow"
        animate={{ x: [0, 30, 0], y: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-teal/25 blur-[100px] pulse-glow"
        animate={{ x: [0, -24, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {strong ? (
        <motion.div
          className="absolute left-1/3 top-1/4 h-56 w-56 rounded-full bg-coral/20 blur-[80px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <div className="neon-scan absolute inset-x-0 top-0 h-1/3 opacity-60" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night via-night/80 to-transparent" />
    </div>
  );
}
