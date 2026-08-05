import { create } from "zustand";
import { persist } from "zustand/middleware";

const initial = {
  url: "",
};

type AppState = typeof initial & {
  setUrl: (url: string) => void;
};

export const useAppState = create<AppState>()(
  persist(
    (set) => ({
      ...initial,
      setUrl: (url) => set(() => ({ url })),
    }),
    { name: "hoshino-storage" },
  ),
);
