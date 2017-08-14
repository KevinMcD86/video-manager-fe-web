import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Series } from '../../../data_entities/series';

@Component({
  moduleId: module.id,
  selector: 'series',
  templateUrl: 'series.component.html',
  providers: [ VideoService ]
})
export class SeriesComponent { 
    series : Series[] = new Array();

    constructor(private videoService: VideoService) {
        this.videoService.getSeries()
            .subscribe(series => {
                for(var i = 0; i < series.length; i++)
                {
                    this.series.push(Object.assign(new Series(), series[i]));
                }
            })
    }
    
}