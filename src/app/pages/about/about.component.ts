import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AboutUsModel } from '../models/about';
import { AboutUsService } from '../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  aboutUs$!: Observable<AboutUsModel>;

  constructor(private aboutUsService: AboutUsService) {}

  ngOnInit(): void {
    this.aboutUs$ = this.aboutUsService.aboutUs$;
    this.aboutUs$.subscribe(console.log);
  }
}
