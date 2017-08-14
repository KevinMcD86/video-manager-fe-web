import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class EnvironmentVariableService {
    config: Object;
 
    constructor(private http: Http) {
 
    }
 
    load() {
        return new Promise((resolve, reject) => {
            this.http
                .get('assets/environment-variables.json')
                .map(res => res.json())
                .subscribe(
                    (data) => {
                        this.config = data;
                        resolve(true);
                    },
                    (err) => {
                        console.error(err);
                        return Observable.throw(err.json().error || 'Server error');
                    }
                );
        });
    }

    get(key: any) {
        return this.config[key];
    }
};