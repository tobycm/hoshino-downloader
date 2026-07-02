package tools

import (
	"os/exec"
)

type ToolPaths struct {
	ytdlp   string
	ffmpeg  string
	ffprobe string
	deno    string
	bun     string
	node    string
}

func GetPaths() ToolPaths {
	var paths ToolPaths
	var err error

	paths.ffmpeg, err = exec.LookPath("ffmpeg")
	if err != nil {
		paths.ffmpeg, _ = exec.LookPath("ffmpeg.exe")
	}
	paths.ffprobe, err = exec.LookPath("ffprobe")
	if err != nil {
		paths.ffprobe, _ = exec.LookPath("ffprobe.exe")
	}
	paths.ytdlp, err = exec.LookPath("yt-dlp")
	if err != nil {
		paths.ytdlp, _ = exec.LookPath("yt-dlp.exe")
	}
	paths.deno, err = exec.LookPath("deno")
	if err != nil {
		paths.deno, _ = exec.LookPath("deno.exe")
	}
	paths.bun, err = exec.LookPath("bun")
	if err != nil {
		paths.bun, _ = exec.LookPath("bun.exe")
	}
	paths.node, err = exec.LookPath("node")
	if err != nil {
		paths.node, _ = exec.LookPath("node.exe")
	}

	return paths
}
