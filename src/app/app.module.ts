import { NgModule, APP_INITIALIZER }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './modules/app-routing.module';

import { AppComponent } from './app.component';
import { VideosComponent } from './components/videos/videos.component';
import { MediaCollectionComponent } from './components/videos/mediaCollection.component'
import { VideoPlayerComponent } from './components/videos/video-player.component';
import { VideoService } from './services/video.service';
import { EnvironmentVariableService } from './services/environment-variables.service'

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, AppRoutingModule ],
  declarations: [ AppComponent, VideosComponent, MediaCollectionComponent, VideoPlayerComponent ],
  providers: [  VideoService, 
                EnvironmentVariableService,
                { provide: APP_INITIALIZER,
                  useFactory: factory,
                  deps: [EnvironmentVariableService],
                  multi: true } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

export function factory(config: EnvironmentVariableService) {
  return () => config.load();
}