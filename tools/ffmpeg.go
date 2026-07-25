package tools

import (
	"context"
	"fmt"
	"hoshino-downloader/utils"
	"io"
	"net/http"
	"os"
	"path"
	"runtime"
	"strings"

	"github.com/hashicorp/go-extract"
)

var ()

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

	toolsFolder, err := GetToolsFolder()
	if err != nil {
		return err
	}

	tempFolder := path.Join(toolsFolder, "temp")
	if err := os.MkdirAll(tempFolder, 0775); err != nil {
		return fmt.Errorf("[install_ffmpeg] failed to create temp folder: %w", err)
	}
	defer os.RemoveAll(tempFolder)

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

	binFolder := path.Join(tempFolder, strings.TrimSuffix(fileDownload.filename, fileDownload.ext), "bin")

	utils.CopyAllFilesInFolder(binFolder, toolsFolder)

	files, err := os.ReadDir(toolsFolder)
	if err != nil {
		return fmt.Errorf("[install_ffmpeg] failed to read tools folder: %w", err)
	}

	for _, file := range files {
		os.Chmod(path.Join(toolsFolder, file.Name()), 0755)
	}

	return nil
}
