import { create } from "zustand";
import { persist } from "zustand/middleware";

const initial = {
  ytdlp: "",
  ffmpeg: "",
  deno: "",
  bun: "",
  node: "",
};

type ToolsState = typeof initial & {
  setTools: (newTools: typeof initial) => void;
};

export const useTools = create<ToolsState>()(
  persist(
    (set) => ({
      ...initial,
      setTools: (newTools: typeof initial) => set(() => newTools),
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
