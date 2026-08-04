export namespace main {
	
	export class DebugInfo {
	    ToolPaths: tools.ToolPaths;
	    ToolFolder: string;
	    OS: string;
	    Arch: string;
	    YtdlpVersion: string;
	    LatestYtdlpVersion: string;
	    CanUpdateYtdlp: boolean;
	    DenoVersion: string;
	    LatestDenoVersion: string;
	    CanUpdateDeno: boolean;
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
	        this.DenoVersion = source["DenoVersion"];
	        this.LatestDenoVersion = source["LatestDenoVersion"];
	        this.CanUpdateDeno = source["CanUpdateDeno"];
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
	export class Job {
	    ID: number;
	    Progress?: ytdlp.ProgressUpdate;
	    Options?: DownloadOptions;
	    Metadata?: ytdlp.ExtractedInfo;
	
	    static createFrom(source: any = {}) {
	        return new Job(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ID = source["ID"];
	        this.Progress = this.convertValues(source["Progress"], ytdlp.ProgressUpdate);
	        this.Options = this.convertValues(source["Options"], DownloadOptions);
	        this.Metadata = this.convertValues(source["Metadata"], ytdlp.ExtractedInfo);
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
	export class TestInfo {
	    Info: ytdlp.ExtractedInfo;
	    Error: any;
	
	    static createFrom(source: any = {}) {
	        return new TestInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Info = this.convertValues(source["Info"], ytdlp.ExtractedInfo);
	        this.Error = source["Error"];
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
	export class UpdateInfo {
	    CurrentYtdlpVersion: string;
	    LatestYtdlpVersion: string;
	    CanUpdateYtdlp: boolean;
	    CurrentDenoVersion: string;
	    LatestDenoVersion: string;
	    CanUpdateDeno: boolean;
	
	    static createFrom(source: any = {}) {
	        return new UpdateInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.CurrentYtdlpVersion = source["CurrentYtdlpVersion"];
	        this.LatestYtdlpVersion = source["LatestYtdlpVersion"];
	        this.CanUpdateYtdlp = source["CanUpdateYtdlp"];
	        this.CurrentDenoVersion = source["CurrentDenoVersion"];
	        this.LatestDenoVersion = source["LatestDenoVersion"];
	        this.CanUpdateDeno = source["CanUpdateDeno"];
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

export namespace ytdlp {
	
	export class ExtractedChapterData {
	    start_time?: number;
	    end_time?: number;
	    title?: string;
	
	    static createFrom(source: any = {}) {
	        return new ExtractedChapterData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.start_time = source["start_time"];
	        this.end_time = source["end_time"];
	        this.title = source["title"];
	    }
	}
	export class ExtractedFragment {
	    url: string;
	    path?: string;
	    duration: number;
	    filesize?: number;
	
	    static createFrom(source: any = {}) {
	        return new ExtractedFragment(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.path = source["path"];
	        this.duration = source["duration"];
	        this.filesize = source["filesize"];
	    }
	}
	export class ExtractedFormat {
	    url: string;
	    request_data?: string;
	    manifest_url?: string;
	    ext?: string;
	    format?: string;
	    format_id?: string;
	    format_note?: string;
	    width?: number;
	    height?: number;
	    aspect_ratio?: number;
	    resolution?: string;
	    tbr?: number;
	    abr?: number;
	    acodec?: string;
	    asr?: number;
	    audio_channels?: number;
	    vbr?: number;
	    fps?: number;
	    vcodec?: string;
	    container?: string;
	    filesize?: number;
	    filesize_approx?: number;
	    player_url?: string;
	    protocol?: string;
	    fragment_base_url?: string;
	    fragments?: ExtractedFragment[];
	    is_from_start?: boolean;
	    preference?: number;
	    source_preference?: number;
	    language?: string;
	    language_preference?: number;
	    quality?: number;
	    http_headers?: Record<string, string>;
	    stretched_ratio?: number;
	    no_resume?: boolean;
	    has_drm?: any;
	    extra_param_to_segment_url?: string;
	    rows?: number;
	    columns?: number;
	    page_url?: string;
	    app?: string;
	    play_path?: string;
	    tc_url?: string;
	    flash_version?: string;
	    rtmp_live?: boolean;
	    rtmp_conn?: string;
	    rtmp_protocol?: string;
	    rtmp_real_time?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new ExtractedFormat(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.request_data = source["request_data"];
	        this.manifest_url = source["manifest_url"];
	        this.ext = source["ext"];
	        this.format = source["format"];
	        this.format_id = source["format_id"];
	        this.format_note = source["format_note"];
	        this.width = source["width"];
	        this.height = source["height"];
	        this.aspect_ratio = source["aspect_ratio"];
	        this.resolution = source["resolution"];
	        this.tbr = source["tbr"];
	        this.abr = source["abr"];
	        this.acodec = source["acodec"];
	        this.asr = source["asr"];
	        this.audio_channels = source["audio_channels"];
	        this.vbr = source["vbr"];
	        this.fps = source["fps"];
	        this.vcodec = source["vcodec"];
	        this.container = source["container"];
	        this.filesize = source["filesize"];
	        this.filesize_approx = source["filesize_approx"];
	        this.player_url = source["player_url"];
	        this.protocol = source["protocol"];
	        this.fragment_base_url = source["fragment_base_url"];
	        this.fragments = this.convertValues(source["fragments"], ExtractedFragment);
	        this.is_from_start = source["is_from_start"];
	        this.preference = source["preference"];
	        this.source_preference = source["source_preference"];
	        this.language = source["language"];
	        this.language_preference = source["language_preference"];
	        this.quality = source["quality"];
	        this.http_headers = source["http_headers"];
	        this.stretched_ratio = source["stretched_ratio"];
	        this.no_resume = source["no_resume"];
	        this.has_drm = source["has_drm"];
	        this.extra_param_to_segment_url = source["extra_param_to_segment_url"];
	        this.rows = source["rows"];
	        this.columns = source["columns"];
	        this.page_url = source["page_url"];
	        this.app = source["app"];
	        this.play_path = source["play_path"];
	        this.tc_url = source["tc_url"];
	        this.flash_version = source["flash_version"];
	        this.rtmp_live = source["rtmp_live"];
	        this.rtmp_conn = source["rtmp_conn"];
	        this.rtmp_protocol = source["rtmp_protocol"];
	        this.rtmp_real_time = source["rtmp_real_time"];
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
	
	export class ExtractedHeatmapData {
	    start_time?: number;
	    end_time?: number;
	    value?: number;
	
	    static createFrom(source: any = {}) {
	        return new ExtractedHeatmapData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.start_time = source["start_time"];
	        this.end_time = source["end_time"];
	        this.value = source["value"];
	    }
	}
	export class ExtractedVideoComment {
	    author?: string;
	    author_id?: string;
	    author_thumbnail?: string;
	    author_url?: string;
	    author_is_verified?: boolean;
	    author_is_uploader?: boolean;
	    id?: string;
	    html?: string;
	    text?: string;
	    timestamp?: number;
	    parent?: string;
	    like_count?: number;
	    dislike_count?: number;
	    is_favorited?: boolean;
	    is_pinned?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new ExtractedVideoComment(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.author = source["author"];
	        this.author_id = source["author_id"];
	        this.author_thumbnail = source["author_thumbnail"];
	        this.author_url = source["author_url"];
	        this.author_is_verified = source["author_is_verified"];
	        this.author_is_uploader = source["author_is_uploader"];
	        this.id = source["id"];
	        this.html = source["html"];
	        this.text = source["text"];
	        this.timestamp = source["timestamp"];
	        this.parent = source["parent"];
	        this.like_count = source["like_count"];
	        this.dislike_count = source["dislike_count"];
	        this.is_favorited = source["is_favorited"];
	        this.is_pinned = source["is_pinned"];
	    }
	}
	export class ExtractedThumbnail {
	    id?: string;
	    url: string;
	    preference?: number;
	    width?: number;
	    height?: number;
	    resolution?: string;
	    filesize?: number;
	    http_headers?: Record<string, string>;
	
	    static createFrom(source: any = {}) {
	        return new ExtractedThumbnail(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.url = source["url"];
	        this.preference = source["preference"];
	        this.width = source["width"];
	        this.height = source["height"];
	        this.resolution = source["resolution"];
	        this.filesize = source["filesize"];
	        this.http_headers = source["http_headers"];
	    }
	}
	export class ExtractedVersion {
	    current_git_head?: string;
	    release_git_head?: string;
	    repository?: string;
	    version?: string;
	
	    static createFrom(source: any = {}) {
	        return new ExtractedVersion(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.current_git_head = source["current_git_head"];
	        this.release_git_head = source["release_git_head"];
	        this.repository = source["repository"];
	        this.version = source["version"];
	    }
	}
	export class ExtractedInfo {
	    url: string;
	    request_data?: string;
	    manifest_url?: string;
	    ext?: string;
	    format?: string;
	    format_id?: string;
	    format_note?: string;
	    width?: number;
	    height?: number;
	    aspect_ratio?: number;
	    resolution?: string;
	    tbr?: number;
	    abr?: number;
	    acodec?: string;
	    asr?: number;
	    audio_channels?: number;
	    vbr?: number;
	    fps?: number;
	    vcodec?: string;
	    container?: string;
	    filesize?: number;
	    filesize_approx?: number;
	    player_url?: string;
	    protocol?: string;
	    fragment_base_url?: string;
	    fragments?: ExtractedFragment[];
	    is_from_start?: boolean;
	    preference?: number;
	    source_preference?: number;
	    language?: string;
	    language_preference?: number;
	    quality?: number;
	    http_headers?: Record<string, string>;
	    stretched_ratio?: number;
	    no_resume?: boolean;
	    has_drm?: any;
	    extra_param_to_segment_url?: string;
	    rows?: number;
	    columns?: number;
	    page_url?: string;
	    app?: string;
	    play_path?: string;
	    tc_url?: string;
	    flash_version?: string;
	    rtmp_live?: boolean;
	    rtmp_conn?: string;
	    rtmp_protocol?: string;
	    rtmp_real_time?: boolean;
	    _type: string;
	    _version?: ExtractedVersion;
	    id: string;
	    title?: string;
	    formats: ExtractedFormat[];
	    requested_formats?: ExtractedFormat[];
	    url?: string;
	    filename?: string;
	    _filename?: string;
	    ext: string;
	    format: string;
	    player_url?: string;
	    direct?: boolean;
	    alt_title?: string;
	    display_id?: string;
	    thumbnails?: ExtractedThumbnail[];
	    thumbnail?: string;
	    description?: string;
	    uploader?: string;
	    license?: string;
	    creator?: string;
	    timestamp?: number;
	    upload_date?: string;
	    release_timestamp?: number;
	    release_date?: string;
	    modified_timestamp?: number;
	    modified_date?: string;
	    uploader_id?: string;
	    uploader_url?: string;
	    channel?: string;
	    channel_id?: string;
	    channel_url?: string;
	    channel_follower_count?: number;
	    channel_is_verified?: boolean;
	    location?: string;
	    subtitles?: Record<string, Array<ExtractedSubtitle>>;
	    requested_subtitles?: Record<string, Array<ExtractedSubtitle>>;
	    automatic_captions?: Record<string, Array<ExtractedSubtitle>>;
	    duration?: number;
	    view_count?: number;
	    concurrent_view_count?: number;
	    like_count?: number;
	    dislike_count?: number;
	    repost_count?: number;
	    average_rating?: number;
	    comment_count?: number;
	    comments?: ExtractedVideoComment[];
	    age_limit?: number;
	    webpage_url?: string;
	    categories?: string[];
	    tags?: string[];
	    cast?: string[];
	    is_live?: boolean;
	    was_live?: boolean;
	    live_status?: string;
	    start_time?: number;
	    end_time?: number;
	    chapters?: ExtractedChapterData[];
	    heatmap?: ExtractedHeatmapData[];
	    playable_in_embed?: any;
	    availability?: string;
	    chapter?: string;
	    chapter_number?: number;
	    chapter_id?: string;
	    playlist?: string;
	    playlist_index?: number;
	    playlist_id?: string;
	    playlist_title?: string;
	    playlist_uploader?: string;
	    playlist_uploader_id?: string;
	    playlist_count?: number;
	    series?: string;
	    series_id?: string;
	    season?: string;
	    season_number?: number;
	    season_id?: string;
	    episode?: string;
	    episode_number?: number;
	    episode_id?: string;
	    track?: string;
	    track_number?: number;
	    track_id?: string;
	    artist?: string;
	    genre?: string;
	    album?: string;
	    album_type?: string;
	    album_artist?: string;
	    disc_number?: number;
	    release_year?: number;
	    composer?: string;
	    section_start?: number;
	    section_end?: number;
	    rows?: number;
	    columns?: number;
	    extractor?: string;
	    extractor_key?: string;
	    webpage_url_basename?: string;
	    webpage_url_domain?: string;
	    autonumber: number;
	    epoch?: number;
	    entries: ExtractedInfo[];
	
	    static createFrom(source: any = {}) {
	        return new ExtractedInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.request_data = source["request_data"];
	        this.manifest_url = source["manifest_url"];
	        this.ext = source["ext"];
	        this.format = source["format"];
	        this.format_id = source["format_id"];
	        this.format_note = source["format_note"];
	        this.width = source["width"];
	        this.height = source["height"];
	        this.aspect_ratio = source["aspect_ratio"];
	        this.resolution = source["resolution"];
	        this.tbr = source["tbr"];
	        this.abr = source["abr"];
	        this.acodec = source["acodec"];
	        this.asr = source["asr"];
	        this.audio_channels = source["audio_channels"];
	        this.vbr = source["vbr"];
	        this.fps = source["fps"];
	        this.vcodec = source["vcodec"];
	        this.container = source["container"];
	        this.filesize = source["filesize"];
	        this.filesize_approx = source["filesize_approx"];
	        this.player_url = source["player_url"];
	        this.protocol = source["protocol"];
	        this.fragment_base_url = source["fragment_base_url"];
	        this.fragments = this.convertValues(source["fragments"], ExtractedFragment);
	        this.is_from_start = source["is_from_start"];
	        this.preference = source["preference"];
	        this.source_preference = source["source_preference"];
	        this.language = source["language"];
	        this.language_preference = source["language_preference"];
	        this.quality = source["quality"];
	        this.http_headers = source["http_headers"];
	        this.stretched_ratio = source["stretched_ratio"];
	        this.no_resume = source["no_resume"];
	        this.has_drm = source["has_drm"];
	        this.extra_param_to_segment_url = source["extra_param_to_segment_url"];
	        this.rows = source["rows"];
	        this.columns = source["columns"];
	        this.page_url = source["page_url"];
	        this.app = source["app"];
	        this.play_path = source["play_path"];
	        this.tc_url = source["tc_url"];
	        this.flash_version = source["flash_version"];
	        this.rtmp_live = source["rtmp_live"];
	        this.rtmp_conn = source["rtmp_conn"];
	        this.rtmp_protocol = source["rtmp_protocol"];
	        this.rtmp_real_time = source["rtmp_real_time"];
	        this._type = source["_type"];
	        this._version = this.convertValues(source["_version"], ExtractedVersion);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.formats = this.convertValues(source["formats"], ExtractedFormat);
	        this.requested_formats = this.convertValues(source["requested_formats"], ExtractedFormat);
	        this.url = source["url"];
	        this.filename = source["filename"];
	        this._filename = source["_filename"];
	        this.ext = source["ext"];
	        this.format = source["format"];
	        this.player_url = source["player_url"];
	        this.direct = source["direct"];
	        this.alt_title = source["alt_title"];
	        this.display_id = source["display_id"];
	        this.thumbnails = this.convertValues(source["thumbnails"], ExtractedThumbnail);
	        this.thumbnail = source["thumbnail"];
	        this.description = source["description"];
	        this.uploader = source["uploader"];
	        this.license = source["license"];
	        this.creator = source["creator"];
	        this.timestamp = source["timestamp"];
	        this.upload_date = source["upload_date"];
	        this.release_timestamp = source["release_timestamp"];
	        this.release_date = source["release_date"];
	        this.modified_timestamp = source["modified_timestamp"];
	        this.modified_date = source["modified_date"];
	        this.uploader_id = source["uploader_id"];
	        this.uploader_url = source["uploader_url"];
	        this.channel = source["channel"];
	        this.channel_id = source["channel_id"];
	        this.channel_url = source["channel_url"];
	        this.channel_follower_count = source["channel_follower_count"];
	        this.channel_is_verified = source["channel_is_verified"];
	        this.location = source["location"];
	        this.subtitles = this.convertValues(source["subtitles"], Array<ExtractedSubtitle>, true);
	        this.requested_subtitles = this.convertValues(source["requested_subtitles"], Array<ExtractedSubtitle>, true);
	        this.automatic_captions = this.convertValues(source["automatic_captions"], Array<ExtractedSubtitle>, true);
	        this.duration = source["duration"];
	        this.view_count = source["view_count"];
	        this.concurrent_view_count = source["concurrent_view_count"];
	        this.like_count = source["like_count"];
	        this.dislike_count = source["dislike_count"];
	        this.repost_count = source["repost_count"];
	        this.average_rating = source["average_rating"];
	        this.comment_count = source["comment_count"];
	        this.comments = this.convertValues(source["comments"], ExtractedVideoComment);
	        this.age_limit = source["age_limit"];
	        this.webpage_url = source["webpage_url"];
	        this.categories = source["categories"];
	        this.tags = source["tags"];
	        this.cast = source["cast"];
	        this.is_live = source["is_live"];
	        this.was_live = source["was_live"];
	        this.live_status = source["live_status"];
	        this.start_time = source["start_time"];
	        this.end_time = source["end_time"];
	        this.chapters = this.convertValues(source["chapters"], ExtractedChapterData);
	        this.heatmap = this.convertValues(source["heatmap"], ExtractedHeatmapData);
	        this.playable_in_embed = source["playable_in_embed"];
	        this.availability = source["availability"];
	        this.chapter = source["chapter"];
	        this.chapter_number = source["chapter_number"];
	        this.chapter_id = source["chapter_id"];
	        this.playlist = source["playlist"];
	        this.playlist_index = source["playlist_index"];
	        this.playlist_id = source["playlist_id"];
	        this.playlist_title = source["playlist_title"];
	        this.playlist_uploader = source["playlist_uploader"];
	        this.playlist_uploader_id = source["playlist_uploader_id"];
	        this.playlist_count = source["playlist_count"];
	        this.series = source["series"];
	        this.series_id = source["series_id"];
	        this.season = source["season"];
	        this.season_number = source["season_number"];
	        this.season_id = source["season_id"];
	        this.episode = source["episode"];
	        this.episode_number = source["episode_number"];
	        this.episode_id = source["episode_id"];
	        this.track = source["track"];
	        this.track_number = source["track_number"];
	        this.track_id = source["track_id"];
	        this.artist = source["artist"];
	        this.genre = source["genre"];
	        this.album = source["album"];
	        this.album_type = source["album_type"];
	        this.album_artist = source["album_artist"];
	        this.disc_number = source["disc_number"];
	        this.release_year = source["release_year"];
	        this.composer = source["composer"];
	        this.section_start = source["section_start"];
	        this.section_end = source["section_end"];
	        this.rows = source["rows"];
	        this.columns = source["columns"];
	        this.extractor = source["extractor"];
	        this.extractor_key = source["extractor_key"];
	        this.webpage_url_basename = source["webpage_url_basename"];
	        this.webpage_url_domain = source["webpage_url_domain"];
	        this.autonumber = source["autonumber"];
	        this.epoch = source["epoch"];
	        this.entries = this.convertValues(source["entries"], ExtractedInfo);
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
	export class ExtractedSubtitle {
	    url: string;
	    data?: string;
	    name?: string;
	    http_headers?: Record<string, string>;
	
	    static createFrom(source: any = {}) {
	        return new ExtractedSubtitle(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.data = source["data"];
	        this.name = source["name"];
	        this.http_headers = source["http_headers"];
	    }
	}
	
	
	
	export class ProgressUpdate {
	    info?: ExtractedInfo;
	    status: string;
	    total_bytes: number;
	    downloaded_bytes: number;
	    fragment_index?: number;
	    fragment_count?: number;
	    filename: string;
	    // Go type: time
	    started: any;
	    // Go type: time
	    finished?: any;
	
	    static createFrom(source: any = {}) {
	        return new ProgressUpdate(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.info = this.convertValues(source["info"], ExtractedInfo);
	        this.status = source["status"];
	        this.total_bytes = source["total_bytes"];
	        this.downloaded_bytes = source["downloaded_bytes"];
	        this.fragment_index = source["fragment_index"];
	        this.fragment_count = source["fragment_count"];
	        this.filename = source["filename"];
	        this.started = this.convertValues(source["started"], null);
	        this.finished = this.convertValues(source["finished"], null);
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

}

