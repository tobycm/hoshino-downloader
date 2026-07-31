package utils

import (
	"fmt"
	"io"
	"os"
	"path"
	"path/filepath"
	"runtime"
)

func CopyAllFilesInFolder(src, dst string) error {
	files, err := os.ReadDir(src)
	if err != nil {
		return err
	}

	if _, err := os.ReadDir(dst); err != nil {
		return fmt.Errorf("failed to read destination directory: %w", err)
	}

	for _, file := range files {
		if file.IsDir() {
			continue
		}
		srcPath := path.Join(src, file.Name())
		dstPath := path.Join(dst, file.Name())
		if err := CopyFile(srcPath, dstPath); err != nil {
			return err
		}
	}
	return nil
}

func CopyFile(src, dst string) error {
	source, err := os.Open(src)
	if err != nil {
		return err
	}
	defer source.Close()

	destination, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer destination.Close()

	_, err = io.Copy(destination, source)
	return err
}

func AddFolderToPATHEnv(folder string) error {
	currentPath := os.Getenv("PATH")
	newPath := folder + string(os.PathListSeparator) + currentPath
	return os.Setenv("PATH", newPath)
}

func GetSensibleDownloadFolder() string {
	switch runtime.GOOS {
	case "windows":
		return filepath.Join(os.Getenv("USERPROFILE"), "Downloads")
	case "darwin":
		return filepath.Join(os.Getenv("HOME"), "Downloads")
	case "linux":
		return filepath.Join(os.Getenv("HOME"), "Downloads")
	default:
		return filepath.Join(os.Getenv("HOME"), "Downloads")
	}
}
