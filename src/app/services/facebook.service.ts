import { Injectable } from '@angular/core'
import { EnvironmentVariableService } from './environment-variables.service'

import 'rxjs/add/operator/toPromise';

declare const FB : any;

@Injectable()
export class FacebookService {
    User : any;
    Loggedin = null;
    AccessToken : string;

    constructor(private _envVar : EnvironmentVariableService) { 
        
    }

    Load() {
        console.log("App ID: " + this._envVar.get('facebookAppId'));

        FB.init({ 
            appId: this._envVar.get('facebookAppId'),
            status: true, 
            cookie: true, 
            xfbml: true,
            version: 'v2.4'
        });

        this.CheckLoginStatus();
    }

    GetMyDetails() : Promise<any> {
        let facebook = this;

        return new Promise(function(resolve, reject) {
            FB.api('/me?fields=id,name,first_name,gender,picture.width(150).height(150),age_range,friends',
                function(result) {
                    if (result && !result.error) {
                        facebook.User = result;
                        console.log(facebook.User);
                        resolve(result);
                    } else {
                        console.log(result.error);
                        reject(Error("Could not retrieve user details"));
                    }
                });
        });
    }

    CheckLoginStatus() : Promise<boolean> {
        console.log("Check status");
        let facebook = this;

        return new Promise(function(resolve, reject) {
            if(facebook.Loggedin == null) {
                FB.getLoginStatus(response => {
                    let loggedIn = facebook.StatusChangeCallback(response);
                    if(loggedIn) {
                        facebook.GetMyDetails().then(results => resolve(loggedIn));
                    } else {
                        resolve(loggedIn);
                    }
                });
            } else {
                resolve(facebook.Loggedin);
            } 
        });
    }

    StatusChangeCallback(response: any) : boolean {
        if (response.status === 'connected') {
            console.log('connected');
            this.Loggedin = true;
            this.AccessToken = response.authResponse.accessToken;
            this.GetMyDetails();
        } else {
            this.Loggedin = false;
        }
        return this.Loggedin;
    }

    Login() {
        FB.login(function(result) {
            this.loged = true;
            this.token = result;
        }, { scope: 'user_friends' });
        console.log('logged in');

        this.GetMyDetails();
    }
}