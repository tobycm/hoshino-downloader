import { create } from "zustand";
import { persist } from "zustand/middleware";
import { main } from "../../wailsjs/go/models";

const defaultDownloadOptions: Omit<main.DownloadOptions, "Url" | "PlaylistRange" | "ExtractAudio" | "YtdlpPath" | "FfmpegPath" | "DenoPath"> = {
  OutputFolder: "",
  RemuxVideo: "mp4",
  VideoQuality: "best",
  AudioFormat: "mp3",
  AudioQuality: "2",
  EmbedSubs: false,
  EmbedThumbnail: true,
  EmbedChapters: true,
  EmbedMetadata: true,
  CropSquareThumbnail: true,
  DownloadPlaylist: false,
};

type SavedDownloadOptions = typeof defaultDownloadOptions & {
  save: (options: Partial<SavedDownloadOptions>) => void;
};

export const useSavedDownloadOptions = create<SavedDownloadOptions>()(
  persist(
    (set) => ({
      ...defaultDownloadOptions,
      save: (options) => set((state) => ({ ...state, ...options })),
    }),
    {
      name: "hoshino-storage",
    },
  ),
);
