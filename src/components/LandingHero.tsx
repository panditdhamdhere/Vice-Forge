"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CityAtmosphere } from "@/components/CityAtmosphere";

export function LandingHero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-1 flex-col overflow-hidden">
      <CityAtmosphere />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between px-4 pb-8 pt-6 sm:px-10 sm:pb-10 sm:pt-8">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] tracking-[0.35em] text-sand-dim uppercase sm:text-xs"
        >
          Built with React Image Editor
        </motion.p>

        <div className="grid flex-1 items-end gap-8 pb-4 pt-10 sm:gap-10 sm:pb-6 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-0">
          <div className="relative z-10 max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-[clamp(3.6rem,16vw,8.5rem)] leading-[0.85] text-sand"
            >
              Vice
              <br />
              <span className="bg-gradient-to-r from-magenta via-coral to-teal bg-clip-text text-transparent">
                Forge
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-5 max-w-md text-base leading-relaxed text-sand-dim sm:mt-6 sm:text-xl"
            >
              Forge a cover identity for Vice Coast nights — then watch it hit
              the city wall.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10"
            >
              <Link
                href="/forge"
                className="group relative inline-flex w-full items-center justify-center overflow-hidden bg-sand px-8 py-4 text-sm font-semibold tracking-[0.18em] text-night uppercase sm:w-auto"
              >
                <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-magenta to-teal transition duration-300 group-hover:translate-y-0" />
                <span className="relative z-10 transition group-hover:text-sand">
                  Forge your cover
                </span>
                <span className="relative z-10 ml-3 transition group-hover:text-sand">
                  →
                </span>
              </Link>
              <p className="text-xs tracking-[0.2em] text-sand-dim uppercase">
                Edit · Reveal · Share
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-magenta/30 via-transparent to-teal/30 blur-2xl sm:-inset-6" />
            <div className="relative aspect-[4/5] max-h-[48dvh] overflow-hidden border border-line bg-night-2/70 shadow-[0_0_80px_rgba(255,46,139,0.18)] sm:max-h-none lg:max-h-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bases/luna.svg"
                alt="Sample Vice Coast cover portrait"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-3xl text-sand">Luna</p>
                <p className="mt-1 text-sm tracking-[0.2em] text-teal uppercase">
                  Club runner · wanted soft
                </p>
              </div>
              <div className="absolute top-4 right-4 border border-teal/40 bg-night/70 px-3 py-1 text-[10px] tracking-[0.25em] text-teal uppercase backdrop-blur">
                Live cover
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
