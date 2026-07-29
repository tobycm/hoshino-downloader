import { create } from "zustand";
import { persist } from "zustand/middleware";

const tools = ["ytdlp", "ffmpeg", "deno", "bun", "node"] as const;
export type Tool = (typeof tools)[number];

const initial: Record<Tool, string> & { missing?: Tool[] } = {
  ytdlp: "",
  ffmpeg: "",
  deno: "",
  bun: "",
  node: "",
  missing: [] as Tool[],
};

type ToolsState = typeof initial & {
  setTools: (newTools: typeof initial) => void;
  setMissing: (missing: Tool[]) => void;
};

export const useTools = create<ToolsState>()(
  persist(
    (set) => ({
      ...initial,
      setTools: (newTools: typeof initial) => set(() => newTools),
      setMissing: (missing: Tool[]) => set(() => ({ missing })),
    }),
    {
      name: "hoshino-storage",
      partialize: (state) => ({
        ytdlp: state.ytdlp,
        ffmpeg: state.ffmpeg,
        deno: state.deno,
        bun: state.bun,
        node: state.node,
      }),
    },
  ),
);
