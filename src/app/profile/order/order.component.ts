import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {MatOptionSelectionChange} from "@angular/material/core";
import {map, startWith, tap} from "rxjs/operators";
import {countryJson} from "../../share/utils/country";
import {refs} from "../../share/utils/refs";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  countries = countryJson

  refs = refs
  constructor(private fb: FormBuilder, public order: OrderService) {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.countries.slice())),
    );
  }


  form = this.fb.group({
    nationality: [''],
    education: [''],
    socialStatus: [''],
    hasChildren: [false],
    ageFrom: [0],
    ageTo: [0],
    tallFrom: [0],
    tallTo: [0],
    skinColor: [''],
    emirate: [''],
    smocking: [''],
    rich: [''],
    health: [''],
    familyCharacter: [''],
    job: [''],
    marriageType: [''],
    generalDress: [''],
    sportActivity: [''],

  })

  get  hasChildren() {
    return this.form.controls['hasChildren']
  }

  get socialStatus() {
    return this.form.controls['socialStatus']
  }

  ngOnInit(): void {

    this.socialStatus.valueChanges.pipe(
      tap(value => {
        if (!this.refs.SocialStatus.acceptChildren(value)) {
          this.hasChildren.patchValue(false)
        }
      })
    ).subscribe()


   this.order.order$.subscribe(order => {
      this.stateCtrl.patchValue(countryJson.find(r => r.code == order?.nationality)?.name)

    })
  }

  setHasChild(target: any) {

  }

  onSubmit() {
     this.order.updateProfile(this.form.value)
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
}
