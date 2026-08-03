package tools

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path"
	"runtime"
	"strings"

	"github.com/lrstanley/go-ytdlp"
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

	err = os.MkdirAll(toolsFolder, 0755)
	if err != nil {
		return fmt.Errorf("[install_ytdlp] failed to create tools folder: %w", err)
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

func CheckForUpdateYtdlp() bool {
	return false
}

type GithubReleaseVersion struct {
	TagName string `json:"tag_name"`
}

func GetLatestYtdlpVersion() (string, error) {
	url := "https://api.github.com/repos/yt-dlp/yt-dlp/releases/latest"

	response, err := http.Get(url)
	if err != nil {
		return "", fmt.Errorf("Error occurred while fetching latest ytdlp version: %v", err)
	}
	defer response.Body.Close()

	var release GithubReleaseVersion
	if err := json.NewDecoder(response.Body).Decode(&release); err != nil {
		return "", fmt.Errorf("Error occurred while decoding latest ytdlp version: %v", err)
	}

	return release.TagName, nil
}

func GetCurrentYtdlpVersion(ctx context.Context) (string, error) {
	result, err := ytdlp.New().Version(ctx)
	if err != nil {
		return "", fmt.Errorf("Error occurred while fetching ytdlp version: %v", err)
	}

	// fmt.Printf("ytdlp version: %q\n", strings.Split(strings.Split(result.String(), " ")[2], "\n")[0])

	return strings.Split(strings.Split(result.String(), " ")[2], "\n")[0], nil
}
