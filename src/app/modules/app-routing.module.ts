import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideosComponent }   from '../components/videos/videos.component';
import { MediaCollectionComponent }   from '../components/videos/mediaCollection.component';
import { VideoPlayerComponent }  from '../components/videos/video-player.component';

const routes: Routes = [
  { path: '', redirectTo: '/media-collection', pathMatch: 'full' },
  { path: 'media-collection',  component: MediaCollectionComponent },
  { path: 'series/:id',  component: VideosComponent },
  { path: 'episodes/:id',  component: VideoPlayerComponent },
  { path: 'movies/:id',  component: VideoPlayerComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}