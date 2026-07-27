package tools

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path"
	"runtime"
)

func InstallYtdlp() error {
	var url string
	var filename = "yt-dlp"

	switch runtime.GOOS {
	case "linux":
		url = "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp"
	case "darwin":
		url = "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos"
	case "windows":
		url = "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe"
		filename = "yt-dlp.exe"
	default:
		return fmt.Errorf("[install_ytdlp] platform not supported")
	}

	toolsFolder, err := GetToolsFolder()
	if err != nil {
		return err
	}

	destinationFile, err := os.Create(path.Join(toolsFolder, filename))
	if err != nil {
		return err
	}
	defer destinationFile.Close()

	response, err := http.Get(url)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return fmt.Errorf("[install_ytdlp] failed to download ytdlp (non 200): %s", response.Status)
	}

	_, err = io.Copy(destinationFile, response.Body)
	if err != nil {
		return fmt.Errorf("[install_ytdlp] failed to copy ytdlp: %w", err)
	}

	os.Chmod(path.Join(toolsFolder, filename), 0755)

	return nil
}
