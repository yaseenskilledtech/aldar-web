import { Component } from '@angular/core';
import {InitService} from "./share/services/init.service";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  ` ,
})
export class AppComponent {
  title = 'aldaarmarriage';
  constructor(public userInit: InitService) {
    userInit.init()
  }
}
