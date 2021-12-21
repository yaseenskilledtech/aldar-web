import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum DataType {
  String,
  Number,
  Boolean,
  Date,
}

export interface FilterModel {
  key: string;
  query: any;
  value: string;
}

export interface KeyModel {
  label: string;
  key: string;
  valueType: DataType;
}

export interface QueryModel {
  label: string;
  value: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  formArray!: FormArray;
  formGroup!: FormGroup;

  queries: QueryModel[] = [
    {
      label: 'يساوي',
      value: '==',
    },
    {
      label: 'اصغر تماما من',
      value: '<',
    },
    {
      label: 'أصغر او يساوي',
      value: '<=',
    },
    {
      label: 'أكبر تماما من',
      value: '>',
    },
    {
      label: 'أكبر او يساوي',
      value: '>=',
    },
    {
      label: 'يحوي',
      value: 'in',
    },
    {
      label: 'لا يحوي',
      value: 'not-in',
    },
  ];

  get controls(): FormGroup[] {
    return this.formArray.controls as FormGroup[];
  }

  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { keys: KeyModel[]; filter: any }
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      key: [null, Validators.required],
      query: [null, Validators.required],
      value: [null, Validators.required],
    });

    this.formArray = this.fb.array([this.formGroup]);
  }

  addNewField() {
    const field = this.fb.group({
      key: [null, Validators.required],
      query: [null, Validators.required],
      value: [null, Validators.required],
    });
    this.formArray.push(field);
  }

  deleteField(index: number) {
    this.formArray.removeAt(index);
  }

  submit() {
    console.log(this.formArray.value);
    this.dialogRef.close([...this.formArray.value]);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  /*
    we need: 

    1- keys (Input)
    2- build in queries 
    3- value
  */
}
