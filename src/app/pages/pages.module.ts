import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from './home/slider/slider.component';
import { AboutComponent } from './about/about.component';
import { OurStrategyComponent } from './our-strategy/our-strategy.component';
import { FaqComponent } from './faq/faq.component';
import { StepsComponent } from './home/steps/steps.component';
import { ShareModule } from '../share/share.module';
import { OrderComponent } from './order/order.component';
import { BlogComponent } from './blog/blog.component';
import { OrderService } from './services/order.service';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogsService } from './services/blogs.service';
import { FaqService } from './services/faq.service';
import { AboutUsService } from './services/about.service';
import { StratigyService } from './services/stratigy.service';
import { HomeService } from './services/home.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'our-strategy', component: OurStrategyComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'blogs', component: BlogComponent },
      { path: 'faq', component: FaqComponent },
    ],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent,
    AboutComponent,
    OurStrategyComponent,
    FaqComponent,
    StepsComponent,
    OrderComponent,
    BlogComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    OrderService,
    BlogsService,
    FaqService,
    AboutUsService,
    StratigyService,
    HomeService,
  ],
})
export class PagesModule {}
