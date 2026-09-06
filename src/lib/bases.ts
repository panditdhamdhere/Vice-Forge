export type CoverBase = {
  id: string;
  name: string;
  role: string;
  src: string;
  accent: string;
};

export const COVER_BASES: CoverBase[] = [
  {
    id: "rio",
    name: "Rio",
    role: "Night driver",
    src: "/bases/rio.svg",
    accent: "#2ef5c8",
  },
  {
    id: "luna",
    name: "Luna",
    role: "Club runner",
    src: "/bases/luna.svg",
    accent: "#ff6a4a",
  },
  {
    id: "knox",
    name: "Knox",
    role: "Harbor fixer",
    src: "/bases/knox.svg",
    accent: "#f0c25b",
  },
  {
    id: "vera",
    name: "Vera",
    role: "Radio ghost",
    src: "/bases/vera.svg",
    accent: "#ff2e8b",
  },
  {
    id: "dez",
    name: "Dez",
    role: "Mural thief",
    src: "/bases/dez.svg",
    accent: "#e76f51",
  },
  {
    id: "sol",
    name: "Sol",
    role: "Coast smuggler",
    src: "/bases/sol.svg",
    accent: "#e9c46a",
  },
];
