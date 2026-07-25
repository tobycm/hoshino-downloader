package main

import (
	"context"
	"fmt"
	"hoshino-downloader/tools"
	"hoshino-downloader/utils"

	"github.com/lrstanley/go-ytdlp"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx             context.Context
	CheckedForTools bool
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		CheckedForTools: false,
	}
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

	// runtime.LogPrintf(app.ctx, "PATH: %s", os.Getenv("PATH"))
}

func (app *App) CheckTools(firstTime bool) (tools.ToolPaths, error) {
	if firstTime && app.CheckedForTools {
		return tools.ToolPaths{}, fmt.Errorf("checked for tools already")
	}

	app.CheckedForTools = true

	return tools.GetPaths(), nil

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

func (app *App) GetOutputFolder() string {
	folder, error := runtime.OpenDirectoryDialog(app.ctx, runtime.OpenDialogOptions{})
	if error != nil {
		runtime.LogPrintf(app.ctx, "Error occurred while opening directory dialog: %v", error)
		return fmt.Sprintf("Error occurred while opening directory dialog: %v", error)
	}
	return folder
}

type DownloadOptions struct {
	Url            string
	OutputFolder   string
	RemuxVideo     string // format
	ExtractAudio   bool
	AudioFormat    string
	AudioQuality   string
	EmbedSubs      bool
	EmbedThumbnail bool
	EmbedChapters  bool

	DownloadPlaylist bool

	YtdlpPath  string
	FfmpegPath string
	DenoPath   string
	BunPath    string
	NodePath   string
}

func (app *App) Download(options DownloadOptions) string {
	command := ytdlp.New().
		SetExecutable(options.YtdlpPath).
		Paths(options.OutputFolder).
		Output("%(title)s [%(id)s].%(ext)s").
		FFmpegLocation(options.FfmpegPath)

	if options.RemuxVideo != "" {
		command = command.RemuxVideo(options.RemuxVideo)
	}

	if options.AudioFormat != "" {
		command = command.AudioFormat(options.AudioFormat)
	}

	if options.AudioQuality != "" {
		command = command.AudioQuality(options.AudioQuality)
	}

	if options.DenoPath != "" {
		command = command.JsRuntimes("deno")
	}

	if options.BunPath != "" {
		command = command.JsRuntimes("bun")
	}

	if options.NodePath != "" {
		command = command.JsRuntimes("node")
	}

	if options.ExtractAudio {
		command = command.ExtractAudio()
	}

	if options.EmbedSubs {
		command = command.EmbedSubs()
	}

	if options.EmbedThumbnail {
		command = command.EmbedThumbnail()
	}

	if options.EmbedChapters {
		command = command.EmbedChapters()
	}

	if options.DownloadPlaylist {
		command = command.YesPlaylist()
	} else {
		command = command.NoPlaylist()
	}

	runtime.LogPrintf(app.ctx, "Download Options: %v", options)

	result, err := command.Run(context.Background(), options.Url)
	if err != nil {
		runtime.LogPrintf(app.ctx, "Error occurred while downloading: %v | Logs: %v", err, result.OutputLogs)
		return fmt.Sprintf("Error occurred while downloading: %v | Logs: %v", err, result.OutputLogs)
	}

	runtime.LogPrintf(app.ctx, "Download completed: %v", result.OutputLogs)

	return fmt.Sprintf("Download completed: %v", result.OutputLogs)
}
