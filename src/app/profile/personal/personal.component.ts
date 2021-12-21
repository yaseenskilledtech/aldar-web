import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {refs} from "../../share/utils/refs";
import {tap} from "rxjs/operators";
import {ProfileService} from "../services/profile.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit, OnDestroy  {
   refs = refs

  subscription: Subscription[] = []


  constructor(private fb: FormBuilder, public user: ProfileService) {}

  form = this.fb.group({
    education: [''],
    job: [''],
    rich: [''],
    socialStatus: [''],
    hasChildren: [false],
    boyCount: [0],
    girlCount: [0],
    hose: [''],
    skinColor: [''],
    tall: [0],
    weight: [0],
    physique: [''],
    hairColor: [''],
    hairLong: [''],
    hairType: [''],
    eyeLevel: [''],
    eyeColor: [''],
    generalDress: [''],
    health: [''],
    smocking: [],
    sportActivity: [''],
    familyCharacter: [''],

  })

  get hasChildren() {
     return this.form.controls['hasChildren']
  }

  ngOnInit(): void {



   this.subscription.push(
     /*
           socialStatus changes
       */
     this.form.controls['socialStatus'].valueChanges.pipe(
      tap(value => {
        this.currentStatus = value
        if (!this.refs.SocialStatus.acceptChildren(value)) {
          this.form.controls['hasChildren'].patchValue(false)
          this.form.controls['boyCount'].patchValue(0)
          this.form.controls['girlCount'].patchValue(0)
        }
      })
    ).subscribe()
   )


    this.subscription.push(
      /*
           hasChildren changes
       */
    this.form.controls['hasChildren'].valueChanges.pipe(
      tap(value => {
        if (!value) {
          this.form.controls['boyCount'].patchValue(0)
          this.form.controls['girlCount'].patchValue(0)
        }
      })
    ).subscribe()
    )
  }



  currentStatus = ''


  nextStep(number: number) {

  }

  saveChange() {
    this.user.updateProfile(this.form.value)
  }

  ngOnDestroy(): void {
     this.subscription.forEach(subscribe => subscribe.unsubscribe())
  }
}
