"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { COVER_BASES } from "@/lib/bases";
import { saveAlias, saveBaseSrc } from "@/lib/storage";
import { CityAtmosphere } from "@/components/CityAtmosphere";

export function BasePicker() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState(COVER_BASES[0].id);
  const [alias, setAlias] = useState("");
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const active =
    uploadPreview != null
      ? null
      : (COVER_BASES.find((b) => b.id === selected) ?? COVER_BASES[0]);

  const previewSrc = uploadPreview ?? active?.src ?? COVER_BASES[0].src;
  const previewName = uploadPreview
    ? alias || "Custom"
    : alias || active?.name || "UNKNOWN";

  function continueWith(src: string, nextAlias: string) {
    saveBaseSrc(src);
    saveAlias(nextAlias.trim() || active?.name || "UNKNOWN");
    router.push("/forge/edit");
  }

  function onUpload(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      if (!result) return;
      setUploadPreview(result);
      setSelected("upload");
    };
    reader.readAsDataURL(file);
  }

  return (
    <section className="relative min-h-[100dvh] overflow-hidden pb-28 lg:pb-8">
      <CityAtmosphere intensity="soft" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-4 py-6 sm:px-10 sm:py-8">
        <header className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.35em] text-teal uppercase sm:text-xs">
              Step 01 · Choose a face
            </p>
            <h1 className="font-display mt-2 text-4xl text-sand sm:text-6xl">
              Pick your cover
            </h1>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-sand-dim md:block">
            Start from a Vice Coast base or upload your own shot.
          </p>
        </header>

        <div className="mt-6 grid flex-1 gap-6 lg:mt-10 lg:grid-cols-[1fr_320px] lg:gap-8">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4">
            {COVER_BASES.map((base, index) => {
              const isActive = !uploadPreview && selected === base.id;
              return (
                <motion.button
                  key={base.id}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setUploadPreview(null);
                    setSelected(base.id);
                  }}
                  className={`group relative aspect-[4/5] overflow-hidden border text-left transition ${
                    isActive
                      ? "border-teal shadow-[0_0_0_1px_rgba(46,245,200,0.4)]"
                      : "border-line hover:border-sand/40"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={base.src}
                    alt={base.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
                    <p className="font-display text-xl text-sand sm:text-2xl">
                      {base.name}
                    </p>
                    <p
                      className="text-[10px] tracking-[0.16em] uppercase sm:text-[11px]"
                      style={{ color: base.accent }}
                    >
                      {base.role}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <aside className="hidden flex-col border border-line bg-night/60 p-5 backdrop-blur-md lg:flex">
            <div className="aspect-[4/5] overflow-hidden border border-line bg-night-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewSrc}
                alt="Selected cover base"
                className="h-full w-full object-cover"
              />
            </div>

            <label className="mt-5 block text-xs tracking-[0.2em] text-sand-dim uppercase">
              Street alias
              <input
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder={active?.name ?? "Your name"}
                maxLength={18}
                className="mt-2 w-full border border-line bg-transparent px-3 py-3 text-base tracking-normal text-sand outline-none placeholder:text-sand/30 focus:border-teal"
              />
            </label>

            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-4 border border-line px-4 py-3 text-xs tracking-[0.2em] text-sand-dim uppercase transition hover:border-sand hover:text-sand"
            >
              Upload your face
            </button>

            <button
              type="button"
              onClick={() =>
                continueWith(previewSrc, alias || active?.name || "UNKNOWN")
              }
              className="mt-3 bg-sand px-4 py-4 text-sm font-semibold tracking-[0.18em] text-night uppercase transition hover:bg-white"
            >
              Open forge →
            </button>
          </aside>
        </div>
      </div>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-night/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="h-14 w-11 shrink-0 overflow-hidden border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <input
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder={previewName}
            maxLength={18}
            className="min-w-0 flex-1 border border-line bg-transparent px-3 py-2.5 text-sm text-sand outline-none placeholder:text-sand/35 focus:border-teal"
            aria-label="Street alias"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="shrink-0 border border-line px-2.5 py-2.5 text-[10px] tracking-[0.12em] text-sand-dim uppercase"
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() =>
              continueWith(previewSrc, alias || active?.name || "UNKNOWN")
            }
            className="shrink-0 bg-sand px-3 py-2.5 text-[10px] font-semibold tracking-[0.12em] text-night uppercase"
          >
            Forge
          </button>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onUpload(e.target.files?.[0])}
      />
    </section>
  );
}
