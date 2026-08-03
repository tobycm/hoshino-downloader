package main

import (
	"context"
	"fmt"
	"hoshino-downloader/tools"
	"hoshino-downloader/utils"
	"os"
	rt "runtime"

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

	runtime.LogPrintf(app.ctx, "Environment: %+v", runtime.Environment(app.ctx))

	runtime.LogPrintf(app.ctx, "PATH: %s", os.Getenv("PATH"))
}

type DebugInfo struct {
	ToolPaths tools.ToolPaths

	ToolFolder string

	OS   string
	Arch string

	YtdlpVersion       string
	LatestYtdlpVersion string
	CanUpdateYtdlp     bool
	FfmpegVersion      string
}

func (app *App) GetDebugInfo() DebugInfo {
	toolFolder, err := tools.GetToolsFolder()
	if err != nil {
		runtime.LogPrintf(app.ctx, "Error occurred while getting tools folder: %v", err)
		return DebugInfo{}
	}

	ytdlpVersion, err := tools.GetCurrentYtdlpVersion(app.ctx)
	if err != nil {
		runtime.LogPrintf(app.ctx, "Error occurred while fetching ytdlp version: %v", err)
		return DebugInfo{}
	}

	latestYtdlpVersion, err := tools.GetLatestYtdlpVersion()
	if err != nil {
		runtime.LogPrintf(app.ctx, "Error occurred while fetching latest ytdlp version: %v", err)
		return DebugInfo{}
	}

	ffmpegVersion, err := tools.GetCurrentFfmpegVersion()
	if err != nil {
		runtime.LogPrintf(app.ctx, "Error occurred while fetching ffmpeg version: %v", err)
		return DebugInfo{}
	}

	return DebugInfo{
		ToolPaths: app.GetToolPaths(),

		ToolFolder: toolFolder,
		OS:         rt.GOOS,
		Arch:       rt.GOARCH,

		YtdlpVersion:       ytdlpVersion,
		LatestYtdlpVersion: latestYtdlpVersion,
		CanUpdateYtdlp:     ytdlpVersion < latestYtdlpVersion,
		FfmpegVersion:      ffmpegVersion,
	}
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

func (app *App) InstallYtdlp() string {
	if err := tools.InstallYtdlp(); err != nil {
		return err.Error()
	}
	return "Yt-dlp installed successfully"
}

func (app *App) InstallDeno() string {
	if err := tools.InstallDeno(app.ctx); err != nil {
		return err.Error()
	}
	return "Deno installed successfully"
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
	Url          string
	OutputFolder string
	RemuxVideo   string // format
	ExtractAudio bool
	AudioFormat  string
	AudioQuality string

	EmbedSubs           bool
	EmbedThumbnail      bool
	EmbedChapters       bool
	EmbedMetadata       bool
	CropSquareThumbnail bool

	DownloadPlaylist bool
	PlaylistRange    string

	YtdlpPath  string
	FfmpegPath string
	DenoPath   string
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

	if options.ExtractAudio {
		command = command.ExtractAudio()
	}

	if options.EmbedSubs {
		command = command.EmbedSubs()
	}

	if options.EmbedThumbnail {
		command = command.EmbedThumbnail()
	}

	if options.CropSquareThumbnail {
		command = command.ConvertThumbnails("jpg").
			PostProcessorArgs("ThumbnailsConvertor+ffmpeg_o:-vf crop='ih:ih:(iw-ih)/2:0'")
	}

	if options.EmbedChapters {
		command = command.EmbedChapters()
	}

	if options.EmbedMetadata {
		command = command.EmbedMetadata()
	} else {
		command = command.NoEmbedMetadata()
	}

	if options.DownloadPlaylist {
		command = command.YesPlaylist()
	} else {
		command = command.NoPlaylist()
	}

	if options.PlaylistRange != "" {
		command = command.PlaylistItems(options.PlaylistRange)
	}

	runtime.LogPrintf(app.ctx, "Download Options: %v", options)
	runtime.LogPrintf(app.ctx, "Yt-dlp command: %v", command.BuildCommand(app.ctx))

	result, err := command.Run(context.Background(), options.Url)
	if err != nil {
		runtime.LogPrintf(app.ctx, "Error occurred while downloading: %v | Logs: %v", err, result.OutputLogs)
		return fmt.Sprintf("Error occurred while downloading: %v | Logs: %v", err, result.OutputLogs)
	}

	runtime.LogPrintf(app.ctx, "Download completed: %v", result.OutputLogs)

	return fmt.Sprintf("Download completed: %v", result.OutputLogs)
}

func (app *App) GetSensibleDownloadFolder() string {
	return utils.GetSensibleDownloadFolder()
}
