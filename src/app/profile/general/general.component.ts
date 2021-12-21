import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {countryJson } from "../../share/utils/country";
import {Observable, Subscription, throwError} from "rxjs";
import {catchError, concatMap, last, map, startWith, tap} from "rxjs/operators";
import {refs} from "../../share/utils/refs";
import {MatOptionSelectionChange} from "@angular/material/core";
import {ProfileService} from "../services/profile.service";
import {UploadService} from "../../share/services/upload.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy  {


 countries = countryJson

  refs = refs


  nationalitySub = Subscription.EMPTY

  constructor(private fb: FormBuilder, public user: ProfileService, private upload: UploadService, public snack: MatSnackBar) {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.countries.slice())),
    );

  }

  form = this.fb.group({
    code: [''],
    nickname: [''],
    fullName: [''],
    idNumber: [''],
    nationality: [''],
    birthdate: [''],
    email: [''],
    phone: [''],
    gender: [''],
    emirate: [''],
  });


  saveUpdate() {
    this.user.updateProfile(this.form.value)
  }

  deleteImage(image: string) {
   this.user.removeImage(image)

  }

  setPhoto(param: any) {

  }




  percentage$!: Observable<number | undefined>
  url!: string
  uploadImage(e: any) {
    const  file: File = e.target.files[0]

    const { task, ref  } = this.upload.upload(file)

    this.percentage$ = task.percentageChanges()

    task.snapshotChanges()
      .pipe(
        last(),
        concatMap( () => ref.getDownloadURL()),
        tap(url => {
          this.url = url
          this.user.addImage(url)
        }),
        catchError(err => {
          this.snack.open('file not uploaded something gos error')
          return throwError(err)
        })
      )
      .subscribe()

  }

  nextStep(number: number) {

  }


 /*
     autocomplete -------------------------------
  */

  stateCtrl = new FormControl();
  filteredStates: Observable<{ name: string, code: string}[]>;
  private _filterStates(value: string): {name: string, code: string}[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  onChange(e: MatOptionSelectionChange) {
    const country = this.countries.find(c => c.name === e.source.value)
    this.form.controls['nationality'].patchValue(country?.code)
  }


  ngOnInit(): void {
    this.nationalitySub =  this.user.user$.subscribe(user => {
      this.stateCtrl.patchValue(countryJson.find(r => r.code == user?.nationality)?.name)

    })
  }

  ngOnDestroy(): void {
    this.nationalitySub.unsubscribe()
  }


  addImage(image: string) {

  }





}
