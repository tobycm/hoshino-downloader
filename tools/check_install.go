package tools

import (
	"os/exec"
	"runtime"
)

type ToolPaths struct {
	Ytdlp  string `json:"ytdlp"`
	FFmpeg string `json:"ffmpeg"`
	Deno   string `json:"deno"`
	Spotdl string `json:"spotdl"`
}

func GetPaths() ToolPaths {
	var paths ToolPaths

	ext := ""
	if runtime.GOOS == "windows" {
		ext = ".exe"
	}

	paths.FFmpeg, _ = exec.LookPath("ffmpeg" + ext)
	paths.Ytdlp, _ = exec.LookPath("yt-dlp" + ext)
	paths.Deno, _ = exec.LookPath("deno" + ext)
	paths.Spotdl, _ = exec.LookPath("spotdl" + ext)

	return paths
}
