export const jobs = ['حكومي', 'خاص', 'اعمال حرة', 'لااعمل'];
export const educations = [
  'غير متعلم',
  'إبتدائي',
  'إعدادي',
  'ثانوي',
  'جامعي',
  'ماجستير',
  'دكتوراة',
];
export const cookingSkills = ['استطيع الطبخ', 'لا استطيع الطبخ', 'استطيع الاشراف على الطبخ'];
export const hoses = ['لايوجد', 'يوجد'];
export const skinColors = ['أسمر', 'أسمر فاتح', 'قمحي', 'قمحي فاتح', 'أبيض', 'أشقر'];
export const physiques = ['صغيرة', 'وسط', 'نحيفة', 'عادية', 'سمينة', 'رياضية', 'عضلات'];
export const hairColors = ['أبيض', 'أشقر', 'بني', 'بني فاتح', 'أسود', 'أحمر', 'أصلع', 'متغير'];
export const hairLongs = ['طويل', 'قصير', 'أصلع', 'حلاقة خفيفة'];
export const hairTypes = ['ناعم', 'مموج', 'مجعد', 'عادي'];


export const eyeLevels = ['نظارة', 'عدسات', 'عادي', 'الكل'];
export const eyeColors = ['ازرق', 'أخضر', 'بني', 'رمادي', 'عسلي'];
export const generalDress = ['رسمي', 'رياضي', 'بدلة', 'عادي'];
export const health = [
  'سليم',
  'مشاكل صحية بسيطة',
  'مشاكل صحية كبيرة',
  'إعاقة بسيطة',
  'إعاقة كبيرة',
];
export const smocking = ['نعم', 'لا'];
export const sportActivities = ['يومي', 'اسبوعي', 'شهري', 'غير مهتم'];
export const familyCharacter = ['عصرية', 'محافظة', 'معتدلة'];
export const emirates = [
  'ابوظبي',
  'دبي',
  'الشارقة',
  'أم القيوين',
  'الفجيرة',
  'عجمان',
  'رأس الخيمة',
];
export const marriageType = ['تعدد', 'وحيدة'];
export const hasChildren = ['نعم', 'لا'];
export const rich = ['غني', 'متوسطة', 'غيرمهم'];
export const allowJob = ['تعمل', 'لاتعمل', 'غير مهم'];

export const divorceCount: number[] = [];
for (let x = 1; x < 11; x++) {
  divorceCount.push(x);
}

export const weights: number[] = [];
for (let x = 30; x < 250; x++) {
  weights.push(x);
}

export const heights: number[] = [];
for (let x = 130; x < 251; x++) {
  heights.push(x);
}

export const ages: number[] = [];
for (let x = 12; x < 81; x++) {
  ages.push(x);
}

export const children: number[] = [];
for (let x = 0; x < 21; x++) {
  children.push(x);
}



 type  genderType = 'ذكر' | 'أنثى'

 export const  socialStatus : {name: string, gender: genderType }[] = [
    { gender: 'ذكر', name: 'معدد'},
    { gender: 'أنثى', name: 'أرملة'},
    { gender: 'ذكر', name: 'مطلق'},
    { gender: 'ذكر', name: 'عازب'},
    { gender: 'أنثى', name: 'عزباء'},
    { gender: 'ذكر', name: 'متزوج'},
    { gender: 'أنثى', name: 'مطلقة'},
  ]

export class SocialStatus {

  static status(gender: genderType) {
    let arr: any = []
    socialStatus.map(sts => { if(sts.gender == gender) { arr.push(sts.name) }})
    return arr
  }
  static  acceptChildren(status: string) {
     return ! ['عازب', 'عزباء'].includes(status)
  }
}



export enum genderEnum {
  male = 'ذكر',
  female = 'أنثى',
}

export const refs = {
  SocialStatus,
  jobs,
  ages,
  educations,
  socialStatus,
  cookingSkills,
  hoses,
  skinColors,
  physiques,
  hairColors,
  hairTypes,
  hairLongs,
  eyeLevels,
  eyeColors,
  generalDress,
  health,
  smocking,
  sportActivities,
  familyCharacter,
  emirates,
  children,
  heights,
  weights,
  divorceCount,
  marriageType,
  hasChildren,
  rich,
  allowJob,
};
