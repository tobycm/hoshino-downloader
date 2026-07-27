package tools

import (
	"fmt"
	"os"
	"path"
	"runtime"

	"github.com/hashicorp/go-extract"
)

var (
	ffmpegExtractCfg = extract.NewConfig(
		extract.WithPatterns("*/bin/ffmpeg", "*/bin/ffprobe", "*/bin/ffmpeg.exe", "*/bin/ffprobe.exe"),
	)
)

type FileDownload struct {
	link     string
	filename string
	ext      string
}

func GetToolsFolder() (string, error) {
	var folder string

	home, err := os.UserHomeDir()
	if err != nil {
		return "", err
	}

	switch runtime.GOOS {
	case "windows":
		folder = path.Join(home, ".hoshino_downloader", "tools")
	case "darwin":
		folder = path.Join(home, "Library", "Application Support", "hoshino-downloader", "tools")
	case "linux":
		folder = path.Join(home, ".local", "share", "hoshino-downloader", "tools")
	default:
		return "", fmt.Errorf("[install_ffmpeg] unsupported OS: %s", runtime.GOOS)
	}

	return folder, nil
}
