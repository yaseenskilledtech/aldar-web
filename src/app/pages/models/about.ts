
export interface AboutUsModel {
  title: string;
  description: string;
  aboutUsMediaUrl: string;
  aboutUsMediaType: string;
  aboutUsItems?: AboutUsItem[];
  ourPrinciples?: PricipleItem[];
  ourPrincipleMediaUrl?: string;
  ourPrincipleMediaType?: string;
  id?: string;
}

export interface AboutUsItem {
  title: string;
  iconUrl: string;
  description: string;
  seqNo: number;
  id: string;
}

export interface PricipleItem {
  title: string;
  description: string;
  seqNo: number;
  id: string;
}
