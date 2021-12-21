import {ValidatorFn, AbstractControl, ValidationErrors} from "@angular/forms"

export interface User {
  id: string
  fullName: string
  email: string
  phone: string
  gender: genderType
  password: string
  createdAt?: any
  seqNo: number
  code: string

}

type  genderType = 'ذكر' | 'أنثى'

export const checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value
  const confirmPassword = group.get('confirmPassword')?.value
  return password === confirmPassword ? null : {notMatch: true}
}



