import { Component, OnInit } from '@angular/core';
import { VideoService} from './services/video.service';
import { FacebookService } from './services/facebook.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers:[ VideoService ]
})
export class AppComponent implements OnInit{
  title = 'app';
  
  constructor(private facebookService : FacebookService) { 
  }

  ngOnInit(){
    console.log("FB Logged in? : " + this.facebookService.Loggedin );    
    
  }
}
