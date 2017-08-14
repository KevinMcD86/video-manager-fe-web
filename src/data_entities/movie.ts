export class Movie {
    _id: string;
    title: string;
    description: string;
    file: string;
    videoSource: string;
    screenshotSource: string;

    getVideoUrl() : string {
        return this.videoSource +  this.file;
    }

    getScreenshotUrl() : string {
        return this.screenshotSource +  this.title + ".jpg";
    }
}