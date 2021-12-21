import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
    <app-nav></app-nav>
    <app-breadcrumb currentPage="المعلومات الشخصية "></app-breadcrumb>

    <div class="container">
      <div class="row widcol">

        <div class="col-6 col-md-2">
          <div class="box text-center fw-bold " routerLinkActive="colorGold"   routerLink="/profile/general">
            <div class="cir fw-bold mx-auto fillcolorGray text-white"><p>0<span class="fs-6">%</span></p></div>
            <div class="dot" (click)="toggleTabs(1)">
              <i class="fas fa-info float-end text-white"></i>
              <span class="float-end mr-4">المعلومات العامة</span>
            </div>
          </div>
        </div>

        <div class="col-6 col-md-2">
          <div class="box text-center fw-bold" routerLinkActive="colorGold"   routerLink="/profile/personal">
            <div class="cir fw-bold mx-auto "><p>0<span class="fs-6">%</span></p></div>
            <div class="dot" (click)="toggleTabs(2)">
              <i class="far fa-user float-end text-white"></i>
              <span class="float-end mr-4">المعلومات الشخصیة </span>
            </div>
          </div>
        </div>

        <div class="col-6 col-md-2">
          <div class="box text-center fw-bold" routerLinkActive="colorGold"  routerLink="/profile/writing">
            <div class="cir fw-bold mx-auto"><p>0<span class="fs-6">%</span></p></div>
            <div class="dot" (click)="toggleTabs(3)">
              <i class="fas fa-feather-alt float-end text-white"></i>
              <span class="float-end mr-4">الكتابة الحرة</span>
            </div>
          </div>
        </div>


        <div class="col-6 col-md-2">
          <div class="box text-center fw-bold" routerLinkActive="colorGold"   routerLink="/profile/test">
            <div class="cir fw-bold mx-auto"><p>0<span class="fs-6">%</span></p>

            </div>
            <div class="dot" (click)="toggleTabs(5)">
              <i class="fas fa-people-arrows float-end text-white"></i>
              <span class="float-end mr-4">إختبار الشخصية</span>
            </div>
          </div>
        </div>


        <div class="col-6 col-md-2">
          <div class="box text-center fw-bold" routerLinkActive="colorGold"  routerLink="/profile/order">
            <div class="cir cir1 fw-bold mx-auto"><p>0<span class="fs-6">%</span></p></div>
            <div class="dot" (click)="toggleTabs(4)">
              <i class="fas fa-link  float-end text-white"></i>
              <span class="float-end mr-4">طلبات الارتباط</span>
            </div>
          </div>
        </div>





      </div>
    </div>


     <router-outlet></router-outlet>

    <app-footer></app-footer>

  `,
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }


  openTab = 1;
  toggleTabs(tabNumber: number): void {
    this.openTab = tabNumber;
  }

  ngOnInit(): void {
  }

}
