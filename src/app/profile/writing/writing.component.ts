import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ProfileService} from "../services/profile.service";

@Component({
  selector: 'app-writing',
  template: `
    <div class="container">
      <form [formGroup]="form" [connectForm]="user.user$ | async" class="freew">
        <div class="bodyform">
          <div class="mb-3 mt-2">
            <label for="makesYouSpecial" class="mb-1">مايجعلك مميز </label>
            <textarea
              class="form-control"
              id="makesYouSpecial"
              style="height: 100px"
              formControlName="makesYouSpecial"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="specification">مواصفات الشريك الذي تبحث عنه</label>
            <textarea
              class="form-control"
              id="specification"
              style="height: 100px"
              formControlName="specification"
            ></textarea>
          </div>






        </div>




        <div class="bodyform mt-4 mb-4 bg-transparent">
          <div class="row">
            <div class="col-sm-4 col-2">
              <a routerLink="#">
                <i class="fas fa-chevron-right float-start ArrowLEFT text-primary"></i>
              </a>
            </div>

            <div class="col-sm-4 col-8">
              <button type="submit"
                      (click)="saveUpdate()"
                      [disabled]="user.loading$ | async"
                      class="btn btn-primary btnLog btnNext saveInfo mx-auto fs-6 text-white fw-bold mt-4 mb-4">
                <i class="fa fa-sync fa-spin" *ngIf="user.loading$ | async "></i>
                حفظ التعديل

              </button>
            </div>

            <div class="col-sm-4 col-2">
              <a routerLink="#">
                <i class="fas fa-chevron-left float-end ArrowLEFT text-primary"></i>
              </a>
            </div>
          </div>
        </div>


      </form>
    </div>
  `,
  styleUrls: ['./writing.component.scss']
})
export class WritingComponent implements OnInit {

  constructor(private fb: FormBuilder, public user: ProfileService) { }

  form = this.fb.group({
    makesYouSpecial: [''],
    specification: [''],
  })

  ngOnInit(): void {
  }

  saveUpdate() {
    this.user.updateProfile(this.form.value)
  }
}
