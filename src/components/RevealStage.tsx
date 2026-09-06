"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CityAtmosphere } from "@/components/CityAtmosphere";
import { loadDraft } from "@/lib/storage";

const SURFACES = ["phone", "billboard", "wanted"] as const;
type Surface = (typeof SURFACES)[number];

const SURFACE_COPY: Record<Surface, { label: string; beat: string }> = {
  phone: { label: "Phone", beat: "Lock screen leak" },
  billboard: { label: "Billboard", beat: "Highway 7 takeover" },
  wanted: { label: "Wanted", beat: "Metro soft warrant" },
};

function playDropSting() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctx();
    const now = ctx.currentTime;

    const makeTone = (
      freq: number,
      start: number,
      duration: number,
      type: OscillatorType,
      gainValue: number,
    ) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now + start);
      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(gainValue, now + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + duration + 0.02);
    };

    makeTone(110, 0, 0.28, "sawtooth", 0.045);
    makeTone(220, 0.04, 0.22, "triangle", 0.03);
    makeTone(440, 0.12, 0.18, "sine", 0.02);
    window.setTimeout(() => void ctx.close(), 800);
  } catch {
    // Audio is optional — ignore blocked autoplay / unsupported contexts.
  }
}

export function RevealStage() {
  const router = useRouter();
  const [cover, setCover] = useState<string | null>(null);
  const [alias, setAlias] = useState("UNKNOWN");
  const [surface, setSurface] = useState<Surface>("phone");
  const [intro, setIntro] = useState(true);
  const [montageKey, setMontageKey] = useState(0);

  useEffect(() => {
    const draft = loadDraft();
    if (!draft.coverDataUrl) {
      router.replace("/forge");
      return;
    }
    setCover(draft.coverDataUrl);
    setAlias(draft.alias);
  }, [router]);

  useEffect(() => {
    if (!cover) return;

    setIntro(true);
    setSurface("phone");
    playDropSting();

    const timers = [
      window.setTimeout(() => setIntro(false), 900),
      window.setTimeout(() => {
        setSurface("billboard");
        playDropSting();
      }, 2800),
      window.setTimeout(() => {
        setSurface("wanted");
        playDropSting();
      }, 5200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [cover, montageKey]);

  const shareText = useMemo(
    () =>
      `I forged my Vice Coast cover identity with @unlayer React Image Editor. Meet ${alias}. #BuiltWithImageEditor`,
    [alias],
  );

  const tweetHref = useMemo(() => {
    const url =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://viceforge.app";
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
  }, [shareText]);

  function downloadCover() {
    if (!cover) return;
    const a = document.createElement("a");
    a.href = cover;
    a.download = `vice-forge-${alias.toLowerCase().replace(/\s+/g, "-")}.png`;
    a.click();
  }

  function selectSurface(next: Surface) {
    setIntro(false);
    setSurface(next);
    playDropSting();
  }

  if (!cover) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-night text-sand-dim">
        Developing cover…
      </div>
    );
  }

  return (
    <section className="relative min-h-dvh overflow-hidden">
      <CityAtmosphere />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 py-6 sm:px-10 sm:py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] tracking-[0.35em] text-gold uppercase sm:text-xs">
              Step 03 · City drop
            </p>
            <h1 className="font-display mt-2 text-4xl text-sand sm:text-6xl">
              {alias} is live
            </h1>
            <p className="mt-2 text-sm text-sand-dim">
              {SURFACE_COPY[surface].beat}
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto">
            <div className="flex gap-2">
              {SURFACES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectSurface(item)}
                  className={`flex-1 px-3 py-2 text-[10px] tracking-[0.2em] uppercase transition sm:flex-none sm:text-[11px] ${
                    surface === item && !intro
                      ? "bg-sand text-night"
                      : "border border-line text-sand-dim hover:text-sand"
                  }`}
                >
                  {SURFACE_COPY[item].label}
                </button>
              ))}
            </div>
            <div className="flex h-1 overflow-hidden bg-line/40">
              {SURFACES.map((item) => (
                <div
                  key={item}
                  className={`flex-1 transition-colors duration-300 ${
                    SURFACES.indexOf(item) <= SURFACES.indexOf(surface)
                      ? "bg-teal"
                      : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        </header>

        <div className="relative mt-6 flex flex-1 items-center justify-center py-4 sm:mt-8 sm:py-6">
          <AnimatePresence mode="wait">
            {intro ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                <p className="text-xs tracking-[0.45em] text-magenta uppercase">
                  Cover drop
                </p>
                <p className="font-display mt-3 text-6xl text-sand sm:text-8xl">
                  Going live
                </p>
                <p className="mt-3 text-sm tracking-[0.25em] text-teal uppercase">
                  {alias}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={surface}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.98 }}
                transition={{ duration: 0.45 }}
                className="w-full max-w-3xl"
              >
                {surface === "phone" ? (
                  <PhoneSurface cover={cover} alias={alias} />
                ) : null}
                {surface === "billboard" ? (
                  <BillboardSurface cover={cover} alias={alias} />
                ) : null}
                {surface === "wanted" ? (
                  <WantedSurface cover={cover} alias={alias} />
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:pt-6">
          <a
            href={tweetHref}
            target="_blank"
            rel="noreferrer"
            className="bg-sand px-5 py-3 text-center text-sm font-semibold tracking-[0.16em] text-night uppercase transition hover:bg-white"
          >
            Share on X
          </a>
          <button
            type="button"
            onClick={downloadCover}
            className="border border-line px-5 py-3 text-sm tracking-[0.16em] text-sand uppercase transition hover:border-sand"
          >
            Download cover
          </button>
          <button
            type="button"
            onClick={() => setMontageKey((k) => k + 1)}
            className="border border-line px-5 py-3 text-sm tracking-[0.16em] text-sand-dim uppercase transition hover:border-sand hover:text-sand"
          >
            Replay drop
          </button>
          <Link
            href="/forge"
            className="px-5 py-3 text-center text-sm tracking-[0.16em] text-sand-dim uppercase transition hover:text-sand"
          >
            Forge another
          </Link>
          <p className="text-xs tracking-[0.18em] text-sand-dim uppercase sm:ml-auto">
            #BuiltWithImageEditor
          </p>
        </footer>
      </div>
    </section>
  );
}

function PhoneSurface({ cover, alias }: { cover: string; alias: string }) {
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="relative rounded-4xl border border-line bg-[#12161f] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(255,46,139,0.12)]">
        <div className="absolute top-5 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/90" />
        <div className="relative overflow-hidden rounded-3xl bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover}
            alt={`${alias} phone lock screen`}
            className="aspect-9/16 w-full object-cover"
          />
          <div className="absolute inset-x-0 top-0 bg-linear-to-b from-black/60 to-transparent p-6 pt-12 text-center">
            <p className="text-[10px] tracking-[0.35em] text-sand/75 uppercase">
              Vice Coast · LTE
            </p>
            <p className="font-display mt-2 text-6xl text-sand">9:41</p>
            <p className="mt-1 text-xs text-sand/60">Friday, Night Shift</p>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 pb-8">
            <p className="font-display text-4xl text-sand">{alias}</p>
            <p className="mt-1 text-[11px] tracking-[0.22em] text-teal uppercase">
              Cover identity · unlocked
            </p>
            <div className="mx-auto mt-5 h-1 w-28 rounded-full bg-sand/40" />
          </div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

function BillboardSurface({ cover, alias }: { cover: string; alias: string }) {
  return (
    <div className="relative">
      <div className="absolute -top-3 left-[12%] right-[12%] z-10 h-3 bg-[#2a3140] shadow-[0_0_20px_rgba(46,245,200,0.25)]" />
      <div className="absolute top-0 left-[18%] h-4 w-2 bg-[#3a4255]" />
      <div className="absolute top-0 right-[18%] h-4 w-2 bg-[#3a4255]" />

      <div className="relative overflow-hidden border border-teal/30 bg-night-2 shadow-[0_0_70px_rgba(46,245,200,0.16)]">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          animate={{ opacity: [0.15, 0.35, 0.18, 0.4, 0.2] }}
          transition={{ duration: 2.8, repeat: Infinity }}
          style={{
            background:
              "linear-gradient(120deg, rgba(255,46,139,0.2), transparent 42%, rgba(46,245,200,0.18))",
          }}
        />

        <div className="grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover}
              alt={`${alias} billboard`}
              className="aspect-4/5 h-full w-full object-cover md:aspect-auto md:min-h-[440px]"
            />
            <div className="absolute top-3 left-3 border border-sand/30 bg-night/70 px-2 py-1 text-[10px] tracking-[0.2em] text-sand uppercase backdrop-blur">
              Live feed
            </div>
          </div>
          <div className="relative flex flex-col justify-between border-t border-line p-6 md:border-t-0 md:border-l sm:p-8">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-magenta uppercase sm:text-xs">
                Highway 7 · Night drop
              </p>
              <h2 className="font-display mt-3 text-5xl leading-none text-sand sm:text-7xl">
                {alias}
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand-dim sm:text-base">
                Plastered from the marina overpass to the motel strip. The city
                already knows the face.
              </p>
            </div>
            <div className="mt-8">
              <p className="font-display text-2xl text-teal sm:text-3xl">
                NOW PLAYING IN THE CITY
              </p>
              <p className="mt-2 text-[11px] tracking-[0.2em] text-sand-dim uppercase">
                Powered by React Image Editor
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-0 h-16 w-3 bg-[#2a3140]" />
      <div className="mx-auto h-2 w-24 bg-[#1a2030]" />
    </div>
  );
}

function WantedSurface({ cover, alias }: { cover: string; alias: string }) {
  const bounty = useMemo(
    () => `$${(48000 + ((alias.length * 1379) % 51000)).toLocaleString()}`,
    [alias],
  );

  return (
    <div className="relative mx-auto max-w-lg">
      <div className="border border-gold/55 bg-[#1a140f] p-5 shadow-[0_0_60px_rgba(240,194,91,0.18)] sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-5xl text-gold sm:text-6xl">Wanted</p>
            <p className="mt-1 text-[10px] tracking-[0.35em] text-sand-dim uppercase sm:text-xs">
              Vice Coast Metro · Soft warrant
            </p>
          </div>
          <motion.div
            initial={{ rotate: -18, scale: 1.2, opacity: 0 }}
            animate={{ rotate: -12, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
            className="border-2 border-coral px-2 py-1 text-[10px] font-semibold tracking-[0.18em] text-coral uppercase"
          >
            Active
          </motion.div>
        </div>

        <div className="relative mt-5 overflow-hidden border border-gold/35">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover}
            alt={`${alias} wanted poster`}
            className="aspect-4/5 w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.04)_4px)]" />
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-4xl text-sand">{alias}</p>
            <p className="text-[10px] tracking-[0.2em] text-sand-dim uppercase sm:text-xs">
              Identity forged · unconfirmed
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-[0.2em] text-gold uppercase">
              Bounty
            </p>
            <p className="font-display text-3xl text-coral sm:text-4xl">
              {bounty}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-gold/25 pt-4">
          <div className="flex gap-1">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="inline-block bg-gold/70"
                style={{ width: i % 3 === 0 ? 3 : 2, height: 22 }}
              />
            ))}
          </div>
          <p className="text-[10px] tracking-[0.16em] text-sand-dim uppercase">
            Case VF-{alias.slice(0, 3).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
