export type FieldType = 'String' | 'Number' | 'Date';

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
}

export interface DiplomaRegister {
  id: string;
  year: number;
  currentNo: number;
}

export interface Decision {
  id: string;
  code: string;
  date: string;
  summary: string;
  registerId: string;
  viewCount: number;
}

export interface Diploma {
  id: string;
  enrollmentNo: number; 
  serialNo: string;     
  studentId: string;
  fullName: string;
  dob: string;
  decisionId: string;
  dynamic: Record<string, any>;
}