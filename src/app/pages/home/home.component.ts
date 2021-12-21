import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  template: `
    <app-nav></app-nav>
    <ng-container *ngIf="router.url == '/' ">
      <app-slider></app-slider>
      <app-steps></app-steps>
    </ng-container>

    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router) { }




  ngOnInit(): void {
  }

}
