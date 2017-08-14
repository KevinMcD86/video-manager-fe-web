import { Video } from './video'

export class Series {
    _id: string;
    title: string;
    description: string;
    episodes: Video[];
    screenshotSource: string;

    getScreenshotUrl() : string {
        return this.screenshotSource +  this.title + ".jpg";
    }
}