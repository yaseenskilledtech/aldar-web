import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forgot-password',
  template: `
    <div class="container">
  <div class="col-md-12">
    <div class="logSkilled">
      <a routerLink="/home"> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" xml:space="preserve">
      <image style="overflow:visible;"id="Layer_6_xA0_Image" xlink:href="../../../../assets/pages/logoo.svg">
	</image>
        </svg></a>
    </div>
  </div>

  <div class="row">
    <div class="col-md-7 col-sm-7">
      <div class="leftImg">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 696 613"
          style="enable-background: new 0 0 696 613"
          xml:space="preserve"
        >
          <image
            style="overflow: visible"
            width="696"
            height="613"
            xlink:href="../../../../assets/user/forget.svg"
          ></image>
        </svg>
      </div>
    </div>

    <div class="col-md-5 col-sm-5">
      <div class="login">
        <p>هل نسيت كلمة المرور؟</p>
        <h3>أدخل بريدك الإلكتروني وسنرسل لك تعيين كلمة مرورك</h3>

        <form class="formLogin" [formGroup]="form" (submit)="forgotPassword()">
          <div class="mb-3">
            <label style="font-size: 15px;" for="exampleInputEmail1" class="form-label">  البريد الإلكتروني</label>
            <input  style="font-size: 15px;"
                    type="email"
              class="form-control text-end"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="أدخل البريد الإلكتروني"
              formControlName="email"
            />
            <div class="text-danger"  *ngIf="email.invalid && (email.dirty || email.touched)">
                <span *ngIf="email.errors?.required">Email require </span>
                <span *ngIf="email.errors?.email"> Must be an email </span>
           </div>
          </div>

          <button  type="submit" class="btn btn-primary btnLog" [disabled]="form.invalid || (loading$ | async ) ">
          <i class="fa fa-sync fa-spin" *ngIf="loading$ | async"></i>
            إرسال رمز التحقق</button>

          <h4 class="text-center mt-4">
            <i class="fa fa-long-arrow-alt-right text-primary mx-1"></i>
      
            <a  routerLink="/user/login"  class="text-primary">العودة لصفحة الدخول</a>
          </h4>
        </form>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  loading$: Observable<boolean>

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loading$ = this.userService.loading$
   }

  form = this.fb.group({
    email: ['',[ Validators.email, Validators.required ]],
  })

  get email() {
    return this.form.controls['email']
  }

  forgotPassword() {
    if(this.form.valid) {
      this.userService.forgotPassword(this.email.value)
    } else {
      alert('email required')
    }
   }

  ngOnInit(): void {
  }

}
