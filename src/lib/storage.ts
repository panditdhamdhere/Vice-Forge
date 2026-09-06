const BASE_KEY = "vice-forge:base";
const COVER_KEY = "vice-forge:cover";
const ALIAS_KEY = "vice-forge:alias";

export type ForgeDraft = {
  baseSrc: string | null;
  coverDataUrl: string | null;
  alias: string;
};

export function saveBaseSrc(src: string) {
  sessionStorage.setItem(BASE_KEY, src);
}

export function saveCover(dataUrl: string) {
  sessionStorage.setItem(COVER_KEY, dataUrl);
}

export function saveAlias(alias: string) {
  sessionStorage.setItem(ALIAS_KEY, alias);
}

export function loadDraft(): ForgeDraft {
  if (typeof window === "undefined") {
    return { baseSrc: null, coverDataUrl: null, alias: "UNKNOWN" };
  }

  return {
    baseSrc: sessionStorage.getItem(BASE_KEY),
    coverDataUrl: sessionStorage.getItem(COVER_KEY),
    alias: sessionStorage.getItem(ALIAS_KEY) || "UNKNOWN",
  };
}

export function clearDraft() {
  sessionStorage.removeItem(BASE_KEY);
  sessionStorage.removeItem(COVER_KEY);
  sessionStorage.removeItem(ALIAS_KEY);
}
