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
	versionLink = "https://dl.deno.land/release-latest.txt"
	downloadUrl = "https://dl.deno.land/release/%s/deno-%s.zip"
)

// TODO: finish deno
// TODO: need loading for install button
// TODO: update tools
// TODO: simplier tool download
// TODO: progress
// TODO: settings page
// TODO: queue system

// "Darwin x86_64") target="x86_64-apple-darwin" ;;
// "Darwin arm64") target="aarch64-apple-darwin" ;;
// "Linux aarch64") target="aarch64-unknown-linux-gnu" ;;
// *) target="x86_64-unknown-linux-gnu" ;;

func InstallDeno(ctx context.Context) error {
	var target string

	switch runtime.GOOS {
	case "linux":
		switch runtime.GOOS {
		case "arm64":
			target = "aarch64-unknown-linux-gnu"
		default:
			target = "x86_64-unknown-linux-gnu"
		}
	case "darwin":
		switch runtime.GOOS {
		case "arm64":
			target = "aarch64-apple-darwin"
		default:
			target = "x86_64-apple-darwin"
		}
	case "windows":
		target = "x86_64-pc-windows-msvc"
	default:
		return fmt.Errorf("[install_ytdlp] platform not supported")
	}

	versionResponse, err := http.Get(versionLink)
	if err != nil {
		return fmt.Errorf("[install_ytdlp] failed to get version: %w", err)
	}
	defer versionResponse.Body.Close()

	version, err := io.ReadAll(versionResponse.Body)
	if err != nil {
		return fmt.Errorf("[install_ytdlp] failed to read version: %w", err)
	}

	url := fmt.Sprintf(downloadUrl, version, target)

	toolsFolder, err := GetToolsFolder()
	if err != nil {
		return err
	}

	destinationFile, err := os.Create(path.Join(toolsFolder, "deno.zip"))
	if err != nil {
		return err
	}
	defer os.Remove(path.Join(toolsFolder, "deno.zip"))
	defer destinationFile.Close()

	response, err := http.Get(url)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return fmt.Errorf("[install_deno] failed to download deno (non 200): %s", response.Status)
	}

	_, err = io.Copy(destinationFile, response.Body)
	if err != nil {
		return fmt.Errorf("[install_deno] failed to copy deno: %w", err)
	}

	if _, err := destinationFile.Seek(0, 0); err != nil {
		return fmt.Errorf("[install_deno] failed to seek in destination file: %w", err)
	}

	if err := extract.Unpack(ctx, toolsFolder, destinationFile, extract.NewConfig()); err != nil {
		return fmt.Errorf("[install_deno] failed to unpack deno: %w", err)
	}

	if runtime.GOOS == "windows" {
		os.Chmod(path.Join(toolsFolder, "deno.exe"), 0755)
	} else {
		os.Chmod(path.Join(toolsFolder, "deno"), 0755)
	}

	return nil
}
