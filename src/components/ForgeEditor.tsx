"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { ImageEditorSaveResult } from "@unlayer/react-image-editor";
import { loadDraft, saveCover } from "@/lib/storage";

const ImageEditor = dynamic(() => import("@unlayer/react-image-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[70vh] items-center justify-center border border-line bg-night-2 text-sm tracking-[0.2em] text-sand-dim uppercase">
      Booting forge…
    </div>
  ),
});

export function ForgeEditor() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [alias, setAlias] = useState("UNKNOWN");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const draft = loadDraft();
    if (!draft.baseSrc) {
      router.replace("/forge");
      return;
    }
    setImage(draft.baseSrc);
    setAlias(draft.alias);
  }, [router]);

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
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-8">
        <div>
          <p className="text-[11px] tracking-[0.3em] text-magenta uppercase">
            Step 02 · React Image Editor
          </p>
          <h1 className="font-display text-3xl text-sand sm:text-4xl">
            Forge · {alias}
          </h1>
        </div>
        <p className="max-w-sm text-sm text-sand-dim">
          Crop, filter, stamp text, stickers, and frames. Save to drop your
          cover across Vice Coast.
        </p>
      </header>

      {error ? (
        <p className="border-b border-coral/40 bg-coral/10 px-5 py-3 text-sm text-coral">
          {error}
        </p>
      ) : null}

      <div className="flex-1 px-2 py-2 sm:px-4 sm:py-4">
        <ImageEditor
          image={image}
          minHeight="calc(100dvh - 140px)"
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
