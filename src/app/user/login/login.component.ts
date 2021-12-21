import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  template: `
   <div class="container">
  <div class="col-md-12">
    <div class="logSkilled mt-3">
      <a routerLink="/"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" xml:space="preserve">
      <image style="overflow:visible;"id="Layer_6_xA0_Image" xlink:href="../../../../assets/pages/logoo.svg"   >
	</image>
        </svg>
      </a>
    </div>
  </div>

  <div class="row">
    <div class="col-md-7 col-sm-7">
      <div class="leftImg">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 806 628"
          style="enable-background: new 0 0 806 628"
          xml:space="preserve"
        >
          <image style="overflow: visible" width="806" height="628" xlink:href="../../../../assets/user/aa.svg"></image>
        </svg>
      </div>
    </div>

    <div class="float-end col-md-5 col-sm-5">
      <div class="login">
        <p> مرحب بعودتك للدار</p>

        <form class="formLogin">
          <div class="mb-3">
            <label class="form-label">البريد الإلكتروني</label>
            <input type="email" class="form-control text-end" name="email" [(ngModel)]="email"/>
          </div>
          <div class="mb-3 mt-3 forgetpass">
            <label class="form-label"
            >كلمة المرور
              <p class="float-start mb-1">
                <a routerLink="/user/forgot-password" class="text-primary">نسيت كلمة المرور ؟</a>
              </p></label
            >

            <input
              [type]="type"
              class="form-control"
              autocomplete="current-password"
              required=""
              id="id_password"
              name="password"
              [(ngModel)]="password"
            />
            <i
              class="far fa-eye"
              (click)="toggleType()"
              [class.text-primary]="type == 'text'"
              id="togglePassword"
              style="cursor: pointer"
            ></i>
          </div>


          <div class="row reqreq">
            <div class="col-sm-4">
              <div class="radio radio1">
                <input id="radio-4456" name="gender" type="checkbox"   />
                <label for="radio-4456" class="radio-label">ذكرني</label>
              </div>
            </div>
          </div>


          <button
            (click)="login()"
            type="submit"
            class="btn btn-primary btnLog"
            [disabled]="email == '' || password == '' || (loading$ | async)"
          >
          <i class="fa fa-sync fa-spin" *ngIf="loading$ | async "></i>
            تسجيل دخول
          </button>

          <h4 class="text-center mt-4 text-primary">ليس لديك حساب على منصتنا؟ <a routerLink="/user/register" class="text-secondary" >إنشئ حساب جديد</a></h4>
        </form>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  type = 'password';





  toggleType() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  login() {

    if(this.email && this.password) {
      this.userService.signIn(this.email, this.password)
    } else {
      alert('email and password require')
    }

  }


  loading$: Observable<boolean>
  constructor(private userService: UserService) {
    this.loading$ =  this.userService.loading$

   }

  ngOnInit(): void {
  }

}
