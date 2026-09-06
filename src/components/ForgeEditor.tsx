"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { ImageEditorSaveResult } from "@unlayer/react-image-editor";
import { loadDraft, saveCover } from "@/lib/storage";

const ImageEditor = dynamic(() => import("@unlayer/react-image-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[60vh] items-center justify-center border border-line bg-night-2 text-sm tracking-[0.2em] text-sand-dim uppercase">
      Booting forge…
    </div>
  ),
});

const TIPS = [
  { tool: "Filter", tip: "Push neon nights or heat haze" },
  { tool: "Text", tip: "Stamp your alias or WANTED" },
  { tool: "Stickers", tip: "Add tape, stamps, city marks" },
  { tool: "Frame", tip: "Lock it into a poster look" },
  { tool: "Draw", tip: "Scratch a street tag over it" },
] as const;

export function ForgeEditor() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [alias, setAlias] = useState("UNKNOWN");
  const [error, setError] = useState<string | null>(null);
  const [activeTip, setActiveTip] = useState(0);

  useEffect(() => {
    const draft = loadDraft();
    if (!draft.baseSrc) {
      router.replace("/forge");
      return;
    }
    setImage(draft.baseSrc);
    setAlias(draft.alias);
  }, [router]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveTip((i) => (i + 1) % TIPS.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  function handleSave({ dataUrl }: ImageEditorSaveResult) {
    saveCover(dataUrl);
    router.push("/reveal");
  }

  if (!image) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-night text-sand-dim">
        Loading cover…
      </div>
    );
  }

  return (
    <section className="flex min-h-[100dvh] flex-col bg-night">
      <header className="border-b border-line px-4 py-3 sm:px-8 sm:py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.3em] text-magenta uppercase sm:text-[11px]">
              Step 02 · React Image Editor
            </p>
            <h1 className="font-display truncate text-2xl text-sand sm:text-4xl">
              Forge · {alias}
            </h1>
          </div>
          <button
            type="button"
            onClick={() => router.push("/forge")}
            className="border border-line px-3 py-2 text-[10px] tracking-[0.18em] text-sand-dim uppercase transition hover:border-sand hover:text-sand sm:text-xs"
          >
            ← Change base
          </button>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TIPS.map((item, index) => {
            const live = index === activeTip;
            return (
              <button
                key={item.tool}
                type="button"
                onClick={() => setActiveTip(index)}
                className={`shrink-0 border px-3 py-2 text-left transition ${
                  live
                    ? "border-teal/60 bg-teal/10"
                    : "border-line bg-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <p className="text-[10px] tracking-[0.2em] text-teal uppercase">
                  {item.tool}
                </p>
                <p className="mt-0.5 text-xs text-sand-dim whitespace-nowrap">
                  {item.tip}
                </p>
              </button>
            );
          })}
        </div>

        <p className="mt-3 hidden text-sm text-sand-dim sm:block">
          Customize the cover, then hit <span className="text-sand">Save</span>{" "}
          in the editor to drop it across Vice Coast.
        </p>
        <p className="mt-2 text-xs text-sand-dim sm:hidden">
          Edit below → tap <span className="text-sand">Save</span> when ready.
        </p>
      </header>

      {error ? (
        <p className="border-b border-coral/40 bg-coral/10 px-4 py-3 text-sm text-coral sm:px-5">
          {error}
        </p>
      ) : null}

      <div className="flex-1 px-1 py-1 sm:px-4 sm:py-4">
        <ImageEditor
          image={image}
          minHeight="calc(100dvh - 190px)"
          style={{ width: "100%" }}
          options={{
            theme: "dark",
            features: {
              imageEditor: {
                tools: {
                  crop: true,
                  filter: true,
                  text: true,
                  stickers: true,
                  frame: true,
                  draw: true,
                  resize: false,
                  shapes: false,
                },
              },
            },
          }}
          onSave={handleSave}
          onCancel={() => router.push("/forge")}
          onLoadError={() =>
            setError("Could not load that image. Try another base or upload.")
          }
          onError={(err) => setError(err.message || "Editor failed to load.")}
        />
      </div>
    </section>
  );
}
