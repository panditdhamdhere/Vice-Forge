"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CityAtmosphere } from "@/components/CityAtmosphere";
import { loadDraft } from "@/lib/storage";

const SURFACES = ["phone", "billboard", "wanted"] as const;
type Surface = (typeof SURFACES)[number];

export function RevealStage() {
  const router = useRouter();
  const [cover, setCover] = useState<string | null>(null);
  const [alias, setAlias] = useState("UNKNOWN");
  const [surface, setSurface] = useState<Surface>("phone");

  useEffect(() => {
    const draft = loadDraft();
    if (!draft.coverDataUrl) {
      router.replace("/forge");
      return;
    }
    setCover(draft.coverDataUrl);
    setAlias(draft.alias);

    const timers = [
      window.setTimeout(() => setSurface("billboard"), 2200),
      window.setTimeout(() => setSurface("wanted"), 4400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [router]);

  const shareText = useMemo(
    () =>
      `I forged my Vice Coast cover identity with @unlayer React Image Editor. Meet ${alias}. #BuiltWithImageEditor`,
    [alias],
  );

  const tweetHref = useMemo(() => {
    const url =
      typeof window !== "undefined" ? window.location.origin : "https://viceforge.app";
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
  }, [shareText]);

  function downloadCover() {
    if (!cover) return;
    const a = document.createElement("a");
    a.href = cover;
    a.download = `vice-forge-${alias.toLowerCase().replace(/\s+/g, "-")}.png`;
    a.click();
  }

  if (!cover) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-night text-sand-dim">
        Developing cover…
      </div>
    );
  }

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <CityAtmosphere />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-6 py-8 sm:px-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.35em] text-gold uppercase">
              Step 03 · City drop
            </p>
            <h1 className="font-display mt-2 text-5xl text-sand sm:text-6xl">
              {alias} is live
            </h1>
          </div>
          <div className="flex gap-2">
            {SURFACES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSurface(item)}
                className={`px-3 py-2 text-[11px] tracking-[0.2em] uppercase transition ${
                  surface === item
                    ? "bg-sand text-night"
                    : "border border-line text-sand-dim hover:text-sand"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </header>

        <div className="relative mt-8 flex flex-1 items-center justify-center py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={surface}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              className="w-full max-w-3xl"
            >
              {surface === "phone" ? <PhoneSurface cover={cover} alias={alias} /> : null}
              {surface === "billboard" ? (
                <BillboardSurface cover={cover} alias={alias} />
              ) : null}
              {surface === "wanted" ? <WantedSurface cover={cover} alias={alias} /> : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
          <a
            href={tweetHref}
            target="_blank"
            rel="noreferrer"
            className="bg-sand px-5 py-3 text-sm font-semibold tracking-[0.16em] text-night uppercase transition hover:bg-white"
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
          <Link
            href="/forge"
            className="px-5 py-3 text-sm tracking-[0.16em] text-sand-dim uppercase transition hover:text-sand"
          >
            Forge another
          </Link>
          <p className="ml-auto text-xs tracking-[0.18em] text-sand-dim uppercase">
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
      <div className="rounded-[2rem] border border-line bg-night-2 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt={`${alias} phone lock screen`} className="aspect-[9/16] w-full object-cover" />
          <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/50 to-transparent p-6 pt-10 text-center">
            <p className="text-xs tracking-[0.3em] text-sand/80 uppercase">Vice Coast</p>
            <p className="font-display mt-2 text-5xl text-sand">9:41</p>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <p className="font-display text-3xl text-sand">{alias}</p>
            <p className="text-xs tracking-[0.2em] text-teal uppercase">Lock screen cover</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BillboardSurface({ cover, alias }: { cover: string; alias: string }) {
  return (
    <div className="relative overflow-hidden border border-line bg-night-2 shadow-[0_0_60px_rgba(46,245,200,0.12)]">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,46,139,0.15),transparent_40%,rgba(46,245,200,0.12))]" />
      <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt={`${alias} billboard`} className="aspect-[4/5] h-full w-full object-cover md:aspect-auto md:min-h-[420px]" />
        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="text-xs tracking-[0.3em] text-magenta uppercase">Highway 7 · Night drop</p>
            <h2 className="font-display mt-3 text-5xl leading-none text-sand sm:text-6xl">
              {alias}
            </h2>
            <p className="mt-4 max-w-xs text-sand-dim">
              Seen on every overpass from the marina to the motel strip.
            </p>
          </div>
          <p className="font-display text-2xl text-teal">NOW PLAYING IN THE CITY</p>
        </div>
      </div>
    </div>
  );
}

function WantedSurface({ cover, alias }: { cover: string; alias: string }) {
  const bounty = useMemo(
    () => `$${(48000 + (alias.length * 1379) % 51000).toLocaleString()}`,
    [alias],
  );

  return (
    <div className="mx-auto max-w-lg border border-gold/50 bg-[#1a140f] p-5 shadow-[0_0_50px_rgba(240,194,91,0.15)] sm:p-7">
      <p className="font-display text-center text-5xl text-gold sm:text-6xl">Wanted</p>
      <p className="mt-1 text-center text-xs tracking-[0.35em] text-sand-dim uppercase">
        Vice Coast Metro · Soft warrant
      </p>
      <div className="mt-5 overflow-hidden border border-gold/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt={`${alias} wanted poster`} className="aspect-[4/5] w-full object-cover" />
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-4xl text-sand">{alias}</p>
          <p className="text-xs tracking-[0.2em] text-sand-dim uppercase">
            Identity forged · unconfirmed
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] tracking-[0.2em] text-gold uppercase">Bounty</p>
          <p className="font-display text-3xl text-coral">{bounty}</p>
        </div>
      </div>
    </div>
  );
}
