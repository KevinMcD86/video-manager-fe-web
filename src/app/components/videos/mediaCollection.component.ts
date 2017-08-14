import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Series } from '../../../data_entities/series';
import { Movie } from '../../../data_entities/movie';

@Component({
  moduleId: module.id,
  selector: 'media-collection',
  templateUrl: 'mediaCollection.component.html',
  providers: [ VideoService ]
})
export class MediaCollectionComponent { 
    series : Series[] = new Array();
    movies : Movie[] = new Array();

    constructor(private videoService: VideoService) {
        this.videoService.getSeries()
            .subscribe(series => {
                for(var i = 0; i < series.length; i++) {
                    this.series.push(Object.assign(new Series(), series[i]));
                }
            });
        this.videoService.getMovies()
            .subscribe(movies => {
                for(var i = 0; i < movies.length; i++) {
                    this.movies.push(Object.assign(new Movie(), movies[i]));
                }
            })
    }
    
}