export namespace main {
	
	export class DownloadOptions {
	    Url: string;
	    OutputFolder: string;
	    RemuxVideo: string;
	    ExtractAudio: boolean;
	    AudioFormat: string;
	    AudioQuality: string;
	    EmbedSubs: boolean;
	    EmbedThumbnail: boolean;
	    EmbedChapters: boolean;
	    EmbedMetadata: boolean;
	    CropSquareThumbnail: boolean;
	    DownloadPlaylist: boolean;
	    PlaylistRange: string;
	    YtdlpPath: string;
	    FfmpegPath: string;
	    DenoPath: string;
	    BunPath: string;
	    NodePath: string;
	
	    static createFrom(source: any = {}) {
	        return new DownloadOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Url = source["Url"];
	        this.OutputFolder = source["OutputFolder"];
	        this.RemuxVideo = source["RemuxVideo"];
	        this.ExtractAudio = source["ExtractAudio"];
	        this.AudioFormat = source["AudioFormat"];
	        this.AudioQuality = source["AudioQuality"];
	        this.EmbedSubs = source["EmbedSubs"];
	        this.EmbedThumbnail = source["EmbedThumbnail"];
	        this.EmbedChapters = source["EmbedChapters"];
	        this.EmbedMetadata = source["EmbedMetadata"];
	        this.CropSquareThumbnail = source["CropSquareThumbnail"];
	        this.DownloadPlaylist = source["DownloadPlaylist"];
	        this.PlaylistRange = source["PlaylistRange"];
	        this.YtdlpPath = source["YtdlpPath"];
	        this.FfmpegPath = source["FfmpegPath"];
	        this.DenoPath = source["DenoPath"];
	        this.BunPath = source["BunPath"];
	        this.NodePath = source["NodePath"];
	    }
	}

}

export namespace tools {
	
	export class ToolPaths {
	    ytdlp: string;
	    ffmpeg: string;
	    deno: string;
	    bun: string;
	    node: string;
	
	    static createFrom(source: any = {}) {
	        return new ToolPaths(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ytdlp = source["ytdlp"];
	        this.ffmpeg = source["ffmpeg"];
	        this.deno = source["deno"];
	        this.bun = source["bun"];
	        this.node = source["node"];
	    }
	}

}

