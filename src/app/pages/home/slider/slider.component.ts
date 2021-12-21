import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ViewSetting } from '../../models/home';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnDestroy {
  views!: ViewSetting[];
  subscription!: Subscription;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.subscription = this.homeService.mainPageSetting$
      .pipe(
        tap((views) => {
          this.views = views;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
