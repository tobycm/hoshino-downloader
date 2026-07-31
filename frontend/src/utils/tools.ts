export const tools = ["ytdlp", "ffmpeg", "deno"] as const;
export type Tool = (typeof tools)[number];
