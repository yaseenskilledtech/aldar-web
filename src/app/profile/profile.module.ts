import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {RouterModule, Routes} from "@angular/router";
import {ShareModule} from "../share/share.module";
import { GeneralComponent } from './general/general.component';
import { PersonalComponent } from './personal/personal.component';
import { WritingComponent } from './writing/writing.component';
import { TestComponent } from './test/test.component';
import { OrderComponent } from './order/order.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import {MaterialModule} from "../material/material.module";
import {MatSelectModule} from "@angular/material/select";
import {OrderService} from "./services/order.service";
import {ProfileService} from "./services/profile.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";

const routes: Routes = [
  { path: '', component: ProfileComponent ,
    children: [
      { path: "general", component: GeneralComponent },
      { path: "personal", component: PersonalComponent },
      { path: "writing", component: WritingComponent },
      { path: "test", component: TestComponent },
      { path: "order", component: OrderComponent },
    ]
  }
]

@NgModule({
  declarations: [
    ProfileComponent,
    GeneralComponent,
    PersonalComponent,
    WritingComponent,
    TestComponent,
    OrderComponent
  ],
    imports: [
        CommonModule,
        ShareModule,
        NgxMaskModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MaterialModule,
        MatSelectModule,
        MatProgressBarModule,
    ],
  providers: [OrderService, ProfileService]
})
export class ProfileModule { }
