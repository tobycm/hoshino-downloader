export namespace main {
	
	export class DebugInfo {
	    ToolPaths: tools.ToolPaths;
	    ToolFolder: string;
	    OS: string;
	    Arch: string;
	    YtdlpVersion: string;
	    LatestYtdlpVersion: string;
	    CanUpdateYtdlp: boolean;
	    FfmpegVersion: string;
	
	    static createFrom(source: any = {}) {
	        return new DebugInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ToolPaths = this.convertValues(source["ToolPaths"], tools.ToolPaths);
	        this.ToolFolder = source["ToolFolder"];
	        this.OS = source["OS"];
	        this.Arch = source["Arch"];
	        this.YtdlpVersion = source["YtdlpVersion"];
	        this.LatestYtdlpVersion = source["LatestYtdlpVersion"];
	        this.CanUpdateYtdlp = source["CanUpdateYtdlp"];
	        this.FfmpegVersion = source["FfmpegVersion"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
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
	    }
	}

}

export namespace tools {
	
	export class ToolPaths {
	    ytdlp: string;
	    ffmpeg: string;
	    deno: string;
	
	    static createFrom(source: any = {}) {
	        return new ToolPaths(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ytdlp = source["ytdlp"];
	        this.ffmpeg = source["ffmpeg"];
	        this.deno = source["deno"];
	    }
	}

}

