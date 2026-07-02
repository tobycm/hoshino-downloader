package tools

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"os"
	"path"
	"runtime"

	"github.com/hashicorp/go-extract"
)

var (
	extractCfg = extract.NewConfig()
)

type FileDownload struct {
	link     string
	filename string
	ext      string
}

func buildFfmpegBtbnLink() (FileDownload, error) {
	var os string
	var arch string
	ext := ".zip"

	switch runtime.GOOS {
	case "windows":
		os = "win"
	case "linux":
		os = "linux"
		ext = ".tar.xz"
	default:
		return FileDownload{}, fmt.Errorf("[btbn] unsupported OS: %s", runtime.GOOS)
	}

	switch runtime.GOARCH {
	case "amd64":
		arch = "64"
	case "arm64":
		arch = "arm64"
	default:
		return FileDownload{}, fmt.Errorf("[btbn] unsupported architecture: %s", runtime.GOARCH)
	}

	return FileDownload{
		link:     fmt.Sprintf("https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-%s%s-gpl%s", os, arch, ext),
		filename: fmt.Sprintf("ffmpeg-master-latest-%s%s-gpl%s", os, arch, ext),
		ext:      ext,
	}, nil
}

func getToolFolder() (string, error) {
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

func InstallFfmpeg(ctx context.Context) error {

	var fileDownload FileDownload
	var err error

	switch runtime.GOOS {
	case "windows":
		fileDownload, err = buildFfmpegBtbnLink()
	case "darwin":
		fileDownload = FileDownload{
			link:     "https://evermeet.cx/ffmpeg/getrelease/zip",
			filename: "ffmpeg.zip",
			ext:      ".zip",
		}
	case "linux":
		fileDownload, err = buildFfmpegBtbnLink()
	default:
		return fmt.Errorf("[install_ffmpeg] unsupported OS: %s", runtime.GOOS)
	}

	if err != nil {
		return err
	}

	toolFolder, err := getToolFolder()
	if err != nil {
		return err
	}

	tempFolder := path.Join(toolFolder, "temp")
	if err := os.MkdirAll(tempFolder, 0755); err != nil {
		return fmt.Errorf("[install_ffmpeg] failed to create temp folder: %w", err)
	}

	destinationFile, err := os.Create(path.Join(tempFolder, fileDownload.filename))
	if err != nil {
		return err
	}
	defer destinationFile.Close()

	response, err := http.Get(fileDownload.link)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return fmt.Errorf("[install_ffmpeg] failed to download ffmpeg (non 200): %s", response.Status)
	}

	_, err = io.Copy(destinationFile, response.Body)
	if err != nil {
		return fmt.Errorf("[install_ffmpeg] failed to copy ffmpeg: %w", err)
	}

	if _, err := destinationFile.Seek(0, 0); err != nil {
		return fmt.Errorf("[install_ffmpeg] failed to seek in destination file: %w", err)
	}

	if err := extract.Unpack(ctx, tempFolder, destinationFile, extractCfg); err != nil {
		return fmt.Errorf("[install_ffmpeg] failed to unpack ffmpeg: %w", err)
	}

	return nil
}

func InstallDeno() error {
	return nil
}

// https://evermeet.cx/ffmpeg/getrelease/ffprobe/zip
