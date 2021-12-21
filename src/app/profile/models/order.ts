// export interface Order {
//   id?: string
//   nationality: string
//   education: string
//   socialStatus: string
//   hasChildren: boolean
//   ageFrom: number
//   ageTo: number
//   tallFrom: number
//   tallTo: number
//   skinColor: string
//   emirate: string
//   smocking: boolean
//   rich: string
//   health: string
//   familyCharacter: string
//   job: string
//   marriageType: string
//   generalDress: string
//   sportActivity: string
//   height?:number;
//   wight?:number;
//   polygamy?:boolean;
//   doctrine?:string;
//   motherNationality?:string;
//   age?:number;
//   requiredSpecifications?:string;
//   tribe?:string;
// }


export interface Order {
  id: string;
  displayName: string;
  phoneNumber: string;
  fullName: string; //
  email: string;
  role: string;
  phone: string;
  gender: genderType;
  password: string;
  createdAt?: any;
  updatedAt?: any;
  seqNo: number;
  code: string;
  nickname: string; //
  idNumber: string; //
  nationality: string; //
  birthdate: any; //
  emirate: string; //

  education: string; //
  job: string;
  rich: string;
  socialStatus: string;
  hasChildren: boolean;
  childrenCount: number;
  boyCount: number;
  girlCount: number;
  hose: string;
  skinColor: string;
  tall: number;
  weight: number;
  physique: string;
  hairColor: string;
  hairLong: string;
  hairType: string;
  eyeLevel: string;
  eyeColor: string;
  generalDress: string;
  health: string;
  smocking: boolean;
  sportActivity: string;
  familyCharacter: string;

  makesYouSpecial: string;
  specification: string;
  belongToType: belongToType;
  belongTo: string | null;
  belongToName: string | null;

  createdFrom: createdFrom;
  createdBy: string;

  more: boolean;

  images: string[];

  // for orginaize
  status: string;
  group: string;
}

type genderType = 'ذكر' | 'أنثى';

type belongToType = 'خطابة' | 'موفق' | 'مركزدعوة' | 'كتابية' | 'الموقع';

export const belongType = ['خطابة', 'موفق', 'مركزدعوة', 'كتابية', 'الموقع'];

export type createdFrom = 'الموقع' | 'لوحةالأدمن' | 'لوحةخطابة' | 'لوحةموفق';