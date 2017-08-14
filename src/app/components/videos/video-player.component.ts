import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'

import { Video } from '../../../data_entities/video';
import { Series } from '../../../data_entities/series';
import { VideoService } from '../../services/video.service'

import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'video-player',
  templateUrl: 'video-player.component.html',
  providers: [ VideoService ]
})
export class VideoPlayerComponent implements OnInit { 
    video = new Video();
    file: string;
    videoUrl: string;
    series: Series;

    constructor(
        private videoService: VideoService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {

        // Parse the URL
        let index = 0;
        let urlArray : string[] = [];
        this.route.url.subscribe(value => {
            urlArray[index++] = value[0].path;
        });
        
        this.route.params
            .switchMap((params: Params) => {
                if(urlArray[0] == 'movies') {
                    return this.videoService.getMovie(params['id']);
                }
                return this.videoService.getEpisode(params['id']);
            })
            .subscribe(episode => {
                this.setVideo(episode);
            });
    }

    setVideo(episode: Video) {
        Object.assign(this.video, episode);
        this.videoUrl = this.video.getVideoUrl();
    }

    checkVideoAndSeriesLoaded() {
        return this.video;
    }

    goBack(): void {
        this.location.back();
    }
}