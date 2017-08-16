import { NgModule, APP_INITIALIZER }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './modules/app-routing.module';

import { AppComponent } from './app.component';
import { VideosComponent } from './components/videos/videos.component';
import { MediaCollectionComponent } from './components/videos/mediaCollection.component'
import { VideoPlayerComponent } from './components/videos/video-player.component';
import { EnvironmentVariableService } from './services/environment-variables.service';
import { FacebookService } from './services/facebook.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, AppRoutingModule ],
  declarations: [ AppComponent, VideosComponent, MediaCollectionComponent, VideoPlayerComponent ],
  providers: [  EnvironmentVariableService,
                { provide: APP_INITIALIZER,
                  useFactory: envVarSrvFactory,
                  deps: [EnvironmentVariableService],
                  multi: true },
                FacebookService,
                { provide: APP_INITIALIZER,
                  useFactory: initializerFactory,
                  deps: [EnvironmentVariableService, FacebookService],
                  multi: true } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

export function envVarSrvFactory(config: EnvironmentVariableService) {
  return () => config.load();
}

export function initializerFactory(envVarService : EnvironmentVariableService, facebookService: FacebookService) {
  return () => {
    envVarService.load().then(
      () => facebookService.Load()
    );
  };
}