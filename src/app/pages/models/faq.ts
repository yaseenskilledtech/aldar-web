export interface Category {
  title: string;
  questions: Question[];
  id?: string;
  seqNo?: number;
}

export interface Question {
  title: string;
  answer: string;
  id: string;
  seqNo: number;
}
