

export interface Profile {
  id: string
  fullName: string
  email: string
  phone: string
  gender: genderType
  password: string
  createdAt?: any
  updatedAt?: any
  seqNo: number
  code: string
  nickname: string
  idNumber: string
  nationality: string
  birthdate: Date
  emirate: string


  education: string
  job: string
  rich: string
  socialStatus: string
  hasChildren: boolean
  childrenCount: number
  boyCount: number
  girlCount: number
  hose: string
  skinColor: string
  tall: number
  weight: number
  physique: string
  hairColor: string
  hairLong: string
  hairType: string
  eyeLevel: string
  eyeColor: string
  generalDress: string
  health: string
  smocking: boolean
  sportActivity: string
  familyCharacter: string

  makesYouSpecial: string
  specification: string

  images: string[]
}

type  genderType = 'ذكر' | 'أنثى'


