export namespace tools {
	
	export class ToolPaths {
	    ytdlp: string;
	    ffmpeg: string;
	    ffprobe: string;
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
	        this.ffprobe = source["ffprobe"];
	        this.deno = source["deno"];
	        this.bun = source["bun"];
	        this.node = source["node"];
	    }
	}

}

