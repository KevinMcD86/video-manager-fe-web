import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'

import { Video } from '../../data_entities/video';

import 'rxjs/add/operator/map'

import { EnvironmentVariableService } from './environment-variables.service'

@Injectable()
export class VideoService {
    ApiSource : string;
    
    constructor(private http: Http, private _envVar : EnvironmentVariableService) { 
        this.ApiSource = _envVar.get('apiSource');
    }

    getEpisodes(seriesId) {
        let api = this.ApiSource;
        return this.http.get(api+'/episodes/'+seriesId)
            .map(res => res.json());
    }

    getSeriesById(id) {
        let api = this.ApiSource;
        return this.http.get(api+'/series/'+id)
            .map(res => res.json());
    }

    getSeries() {
        let api = this.ApiSource;
        console.log("Get Series: " + api);
        try {
            return this.http.get(api+'/series')
                .map(res => res.json());
        } catch (e) {
            console.log("Get Series Error: " + (<Error>e).message);
        }
    }

    getEpisode(id) {
        let api = this.ApiSource;
        return this.http.get(api+'/episode/'+id)
            .map(res =>  res.json());
    }

    getMovies() {
        let api = this.ApiSource;
        return this.http.get(api+'/movies')
            .map(res => res.json());
    }

    getMovie(id) {
        let api = this.ApiSource;
        return this.http.get(api+'/movie/'+id)
            .map(res => res.json());
    }

    addVideo(newVideo) {
        let api = this.ApiSource;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(api+'/video', JSON.stringify(newVideo), {headers: headers})
            .map(res => res.json());
    }

    deleteVideo(id) {
        let api = this.ApiSource;
        return this.http.delete(api+'/videos/'+id)
            .map(res => res.json());
    }

    updateVideo(video) {
        let api = this.ApiSource;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(api+'/video'+video._id, JSON.stringify(video), {headers: headers})
            .map(res => res.json());
    }
}