import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'

import { VideoService } from '../../services/video.service';
import { Video } from '../../../data_entities/video';
import { Series } from '../../../data_entities/series';

import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'videos',
  templateUrl: 'videos.component.html',
  providers: [ VideoService ]
})
export class VideosComponent implements OnInit { 
    videos: Video[] = new Array();
    seriesId: string;
    series = new Series();
    title: string;

    constructor(private videoService: VideoService, private route: ActivatedRoute, private location: Location) {
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.videoService.getEpisodes(params['id']))
            .subscribe(episodes => {
                for(var i = 0; i < episodes.length; i++)
                {
                    this.videos.push(Object.assign(new Video(), episodes[i]));
                }
            });
    }

    addVideo(event) {
        event.preventDefault();
        var newVideo = {
            title: this.title,
            season: "1"
        };

        this.videoService.addVideo(newVideo)
            .subscribe(video => {
                console.log(video);
                this.videos.push(video);
                this.title = '';
            });
    }

    deleteVideo(id) {
        var videos = this.videos;

        this.videoService.deleteVideo(id).subscribe(data => {
            if(data.n == 1) {
                for(var i = 0; i < videos.length; i++) {
                    if(videos[i]._id == id) {
                        videos.splice(i, 1);
                    }
                }
            }
        })
    }
}