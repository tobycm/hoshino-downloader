package tools

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"path"
	"runtime"
	"strings"
)

func InstallSpotdl() error {
	url := "https://github.com/spotDL/spotify-downloader/releases/latest/download/spotDL"
	filename := "spotdl"

	if runtime.GOOS == "windows" {
		filename += ".exe"
	}

	toolsFolder, err := GetToolsFolder()
	if err != nil {
		return err
	}

	err = os.MkdirAll(toolsFolder, 0755)
	if err != nil {
		return fmt.Errorf("[install_spotdl] failed to create tools folder: %w", err)
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
		return fmt.Errorf("[install_spotdl] failed to download spotdl (non 200): %s", response.Status)
	}

	_, err = io.Copy(destinationFile, response.Body)
	if err != nil {
		return fmt.Errorf("[install_spotdl] failed to copy spotdl: %w", err)
	}

	os.Chmod(path.Join(toolsFolder, filename), 0755)

	return nil
}

func GetLatestSpotdlVersion() (string, error) {
	url := "https://api.github.com/repos/spotDL/spotify-downloader/releases/latest"

	response, err := http.Get(url)
	if err != nil {
		return "", fmt.Errorf("Error occurred while fetching latest ytdlp version: %v", err)
	}
	defer response.Body.Close()

	var release GithubReleaseVersion
	if err := json.NewDecoder(response.Body).Decode(&release); err != nil {
		return "", fmt.Errorf("Error occurred while decoding latest spotdl version: %v", err)
	}

	return release.TagName, nil
}

func GetCurrentSpotdlVersion(ctx context.Context) (string, error) {
	exe := "spotdl"
	if runtime.GOOS == "windows" {
		exe += ".exe"
	}

	cmd := exec.Command(exe, "--version")
	output, err := cmd.Output()
	if err != nil {
		return "", fmt.Errorf("Error occurred while fetching spotdl version: %v", err)
	}

	return strings.TrimSpace(string(output)), nil
}
