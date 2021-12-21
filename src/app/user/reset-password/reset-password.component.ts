import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { checkPasswords } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'reset-password',
  template: `
    <div class="container">
  <div class="col-md-12">
    <div class="logSkilled">
      <a routerLink="/home"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" xml:space="preserve">
      <image style="overflow:visible;"id="Layer_6_xA0_Image" xlink:href="../../../../assets/pages/logoo.svg"   >
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
          viewBox="0 0 676 623"
          style="enable-background: new 0 0 676 623"
          xml:space="preserve"
        >
          <image
            style="overflow: visible"
            width="676"
            height="623"
            xlink:href="../../../../assets/user/Reset-password.svg"
          ></image>
        </svg>
      </div>
    </div>

    <div class="float-end col-md-5 col-sm-5">
      <div class="login">
        <p>إعادة كلمة المرور</p>
        <h3>
          يجب أن تكون كلمة مرورك الجديدة مختلفة عن كلمات المرور المستخدمة سابقًا
        </h3>

        <form
          class="formLogin"
          [formGroup]="form"
          (submit)="onSubmit()"
        >
          <div class="mb-0 mt-3 forgetpass">
            <label for="resetPassword1" class="form-label">كلمة المرور الجديدة</label>
            <input
              [type]="type"
              class="form-control"
              autocomplete="current-password"
              required=""
              id="resetPassword1"
              placeholder="*********"
              formControlName="password"

            />
            <i
              class="far fa-eye float-end"
              [ngClass]="{ 'text-primary': type == 'text' }"
              (click)="toggleType()"
              style="cursor: pointer"
            ></i>
            <div class="text-danger"  *ngIf="password.invalid && (password.dirty || password.touched)">
                <span *ngIf="password.errors?.required"> كلمة المرور مطلوبة </span>
                <span *ngIf="password.errors?.minlength"> يجب ان لاتقل عن ثمانية احرف  </span>
              
             
            </div>

          </div>

          <div class="mb-2 mt-1 forgetpass">
            <label for="resetPassword2" class="form-label"
              >تأكيد كلمة المرور
            </label>
            <input
              [type]="type"
              class="form-control"
              autocomplete="current-password"
              required=""
              id="resetPassword2"
              placeholder="*********"
              formControlName="confirmPassword"
            />
            <i
              class="far fa-eye float-end"
              [ngClass]="{ 'text-primary': type == 'text' }"
              (click)="toggleType()"
              style="cursor: pointer"
            ></i>
          
            <div class="text-danger"  *ngIf="form.hasError('notMatch') && ( confirmPassword.dirty || confirmPassword.touched )">
            كلمة المرور غير متطابقة   
           </div>
          </div>

          <button type="submit" class="btn btn-primary btnLog" [disabled]="form.invalid || ( loading$ | async )">
            <i class="fa fa-sync fa-spin" *ngIf="loading$ | async "></i>
            تأكيد</button>

          <h4 class="text-center mt-4"><a routerLink="/user/login" class="text-primary">العودة لصفحة الدخول</a></h4>
        </form>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  type = 'password';

  loading$: Observable<boolean>

  code: string

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute) {
    this.loading$ = this.userService.loading$
    this.code = this.route.snapshot.queryParams['oobCode']
   }

  form = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['']
  }, { validators: checkPasswords })


  get password() {
    return this.form.controls['password']
  }

  get confirmPassword() {
    return this.form.controls['confirmPassword']
  }


  toggleType() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  onSubmit() {

    if(this.form.valid) {
      this.userService.resetPassword(this.code, this.password.value)

    } else {
      alert('password required')
    }
    
  }



}
