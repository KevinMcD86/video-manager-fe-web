import { Component, OnInit } from '@angular/core';
import { VideoService} from './services/video.service';
import { EnvironmentVariableService } from './services/environment-variables.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers:[ VideoService ]
})
export class AppComponent implements OnInit{
  title = 'app';
  
  envVars: Object;
  constructor(private envVarsSrvc: EnvironmentVariableService) { }

  ngOnInit(){
    this.envVars = this.envVarsSrvc.config;
  }
}
