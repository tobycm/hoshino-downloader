package main

import (
	"context"
	"fmt"
	"hoshino-downloader/tools"
	"hoshino-downloader/utils"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (app *App) startup(ctx context.Context) {
	app.ctx = ctx
	toolsFolder, err := tools.GetToolsFolder()
	if err != nil {
		panic(err)
	}

	utils.AddFolderToPATHEnv(toolsFolder)

	runtime.LogPrintf(app.ctx, "PATH: %s", os.Getenv("PATH"))
}

// Greet returns a greeting for the given name
func (app *App) Greet(name string) string {
	return fmt.Sprintf("a %s, It's show time!", name)
}

func (app *App) GetToolPaths() tools.ToolPaths {

	toolPaths := tools.GetPaths()

	runtime.LogPrintf(app.ctx, "Tool paths initialized: %+v", toolPaths)

	return toolPaths
}

func (app *App) InstallFfmpeg() string {
	if err := tools.InstallFfmpeg(app.ctx); err != nil {
		return err.Error()
	}
	return "FFMPEG installed successfully"
}
