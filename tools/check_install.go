package tools

import (
	"os/exec"
)

type ToolPaths struct {
	Ytdlp  string `json:"ytdlp"`
	FFmpeg string `json:"ffmpeg"`
	Deno   string `json:"deno"`
}

func GetPaths() ToolPaths {
	var paths ToolPaths
	var err error

	paths.FFmpeg, err = exec.LookPath("ffmpeg")
	if err != nil || paths.FFmpeg == "" {
		paths.FFmpeg, _ = exec.LookPath("ffmpeg.exe")
	}
	paths.Ytdlp, err = exec.LookPath("yt-dlp")
	if err != nil || paths.Ytdlp == "" {
		paths.Ytdlp, _ = exec.LookPath("yt-dlp.exe")
	}
	paths.Deno, err = exec.LookPath("deno")
	if err != nil || paths.Deno == "" {
		paths.Deno, _ = exec.LookPath("deno.exe")
	}

	return paths
}
