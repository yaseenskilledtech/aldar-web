import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { checkPasswords } from '../user';

@Component({
  selector: 'app-register',
  template: `
    <div class="container">
  <div class="col-md-12">
    <div class="logSkilled">
      <a routerLink="/"> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" xml:space="preserve">
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
          viewBox="0 0 748 608"
          style="enable-background: new 0 0 748 608"
          xml:space="preserve"
        >
          <image
            style="overflow: visible"
            width="748"
            height="608"
            xlink:href="../../../../assets/user/Register.svg"
          ></image>
        </svg>
      </div>
    </div>

    <div class="col-md-5 col-sm-5">
      <div class="login">
        <p>تبدأ المغامرة هنا</p>

        <h3>اجعل إدارة تطبيقك سهلة وممتعة!</h3>

        <form
          class="formLogin"
          [formGroup]="registerForm"
          (submit)="onSubmit()"
        >
          <div class="mb-3 reqreq">
            <label class="form-label">الإسم كاملاً</label>
            <input type="text" class="form-control" formControlName="fullName" />
            <div class="text-primary" *ngIf="fullName.invalid && (fullName.dirty || fullName.touched)">
              <i class="req text-primary"> الإسم كاملاً - مطلوب </i>
            </div>
          </div>

          <div class="mb-3 reqreq">
            <label class="form-label">البريد الإلكتروني</label>
            <input type="email" class="form-control text-end" formControlName="email" />

            <div class="text-primary" *ngIf="email.invalid && (email.dirty || email.touched)">
                <span *ngIf="email.errors?.required">البريد الإلكتروني مطلوب </span>
                <span *ngIf="email.errors?.email"> أدخل البريد الإلكتروني بالشكل الصحيح </span>
            </div>
          </div>

          <div class="mb-3 mt-3 reqreq">
            <label class="form-label">رقم الهاتف</label>
            <input type="text" class="form-control" formControlName="phone" />
            <div class="text-primary" *ngIf="phone.invalid && (phone.dirty || phone.touched)">
              <i class="req text-primary"> رقم التلفون - مطلوب </i>
            </div>
          </div>

          <div class="mb-0 mt-3 forgetpass reqreq">
            <label class="form-label"
              >كلمة المرور
              <p class="float-start mb-1">
                <a routerLink="/user/forget-password" class="text-primary">هل نسيت كلمة المرور؟</a>
              </p></label
            >
            <input [type]="type" class="form-control" placeholder="*********" formControlName="password" />

            <i
              class="far fa-eye float-end"
              [ngClass]="{ 'text-primary': type == 'text' }"
              (click)="toggleType()"
              style="cursor: pointer"
            ></i>

            <div class="text-primary"  *ngIf="password.invalid && (password.dirty || password.touched)">
                <span *ngIf="password.errors?.required"> كلمة المرور - مطلوبة </span>
                <span *ngIf="password.errors?.minlength"> يجب أن تكون كلمة المرور أكثر من 8 حروف </span>
            </div>
          </div>

          <div class="mb-2 mt-1 forgetpass reqreq">
            <label class="form-label">تأكيد كلمة المرور</label>
            <input [type]="type" class="form-control" formControlName="confirmPassword" placeholder="*********" />
            <i
              class="far fa-eye"
              [ngClass]="{ 'text-primary': type == 'text' }"
              (click)="toggleType()"
              id="togglePassword"
              style="cursor: pointer"
            ></i>
            <div class="text-primary"  *ngIf="registerForm.hasError('notMatch') && ( confirmPassword.dirty || confirmPassword.touched )">
              <i class="req text-primary"> كلمة المرور غير متطابقة </i>
            </div>
          </div>

          <div class="row reqreq">
            <div class="col-sm-4">
              <div class="radio radio1">
                <input id="radio-4456" name="gender" type="radio" value="ذكر" formControlName="gender" />
                <label for="radio-4456" class="radio-label">ذكر</label>
              </div>
            </div>

            <div class="col-sm-4">
              <div class="radio radio1">
                <input id="radio-4466" name="gender" type="radio" value="أنثى" formControlName="gender" />
                <label for="radio-4466" class="radio-label">أنثى</label>
              </div>
            </div>
            <i *ngIf="gender.invalid && (gender.dirty || gender.touched)"
              class="req ms-4 mt-0 lh-1 text-primary"
              style="text-align: left; left: -21px"
              >مطلوبة</i
            >
          </div>

          <div class="mb-1 form-check reqreq">
            <input type="checkbox" class="form-check-input text-primary" id="exampleCheck1" formControlName="policy" />
            <div
              class="text-primary"
              *ngIf="policy.invalid && (policy.dirty || policy.touched)"
            >
              <i class="req ms-4 mt-0 lh-1 text-primary">مطلوبة</i>
            </div>
            <label class="form-check-label" for="exampleCheck1"
              >أوافق على سياسة وشروط الخصوصية</label
            >
          </div>
          <div class="mb-2 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck11" />
            <label class="form-check-label" for="exampleCheck11">أوافق على تلقي رسالة من النشرة الإخبارية</label>
          </div>

          <button type="submit" class="btn btn-primary btnLog" [disabled]="loading$ | async">
            <i class="fa fa-sync fa-spin" *ngIf="loading$ | async "></i>
            تسجيل</button>

          <h4 class="text-center mt-3 text-primary fw-bold">
            هل لديك حساب؟ <a routerLink="/user/login" class="text-secondary"> قم بتسجيل الدخول بدلاً من ذلك</a>
          </h4>


        </form>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  loading$: Observable<boolean>

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth,
    private userService: UserService, private router: Router) {
      this.loading$ = userService.loading$
    }


  type = 'password';



  registerForm = this.fb.group(
    {
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [''],
      policy: [false, [Validators.requiredTrue]],
      gender: ['', [Validators.required]],
    },
    { validators: checkPasswords }
  );




  get fullName() {
    return this.registerForm.controls['fullName']
  }

  get email() {
    return this.registerForm.controls['email']
  }

  get password() {
    return this.registerForm.controls['password']
  }

  get confirmPassword () {
    return this.registerForm.controls['confirmPassword']
  }

  get phone() {
    return this.registerForm.controls['phone']
  }

  get policy() {
    return this.registerForm.controls['policy']
  }

  get gender() {
    return this.registerForm.controls['gender']
  }




  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
     this.userService.createUser(this.registerForm.value)
    }
  }

  toggleType() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }


}
