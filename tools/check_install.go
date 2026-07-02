package tools

import (
	"os/exec"
)

type ToolPaths struct {
	Ytdlp   string `json:"ytdlp"`
	FFmpeg  string `json:"ffmpeg"`
	Ffprobe string `json:"ffprobe"`
	Deno    string `json:"deno"`
	Bun     string `json:"bun"`
	Node    string `json:"node"`
}

func GetPaths() ToolPaths {
	var paths ToolPaths
	var err error

	paths.FFmpeg, err = exec.LookPath("ffmpeg")
	if err != nil || paths.FFmpeg == "" {
		paths.FFmpeg, _ = exec.LookPath("ffmpeg.exe")
	}
	paths.Ffprobe, err = exec.LookPath("ffprobe")
	if err != nil || paths.Ffprobe == "" {
		paths.Ffprobe, _ = exec.LookPath("ffprobe.exe")
	}
	paths.Ytdlp, err = exec.LookPath("yt-dlp")
	if err != nil || paths.Ytdlp == "" {
		paths.Ytdlp, _ = exec.LookPath("yt-dlp.exe")
	}
	paths.Deno, err = exec.LookPath("deno")
	if err != nil || paths.Deno == "" {
		paths.Deno, _ = exec.LookPath("deno.exe")
	}
	paths.Bun, err = exec.LookPath("bun")
	if err != nil || paths.Bun == "" {
		paths.Bun, _ = exec.LookPath("bun.exe")
	}
	paths.Node, err = exec.LookPath("node")
	if err != nil || paths.Node == "" {
		paths.Node, _ = exec.LookPath("node.exe")
	}

	return paths
}
