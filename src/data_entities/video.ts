export class Video {
    _id: string;
    title: string;
    season: number;
    episode: number;
    description: string;
    file: string;
    series_id: string;
    videoSource: string;
    screenshotSource: string;

    getVideoUrl() : string {
        return this.videoSource +  this.file;
    }

    getScreenshotUrl() : string {
        return this.screenshotSource +  this.file + ".jpg";
    }
}