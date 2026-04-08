export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
}

export interface KnowledgeBlock {
  id: string;
  name: string;
}

export interface Question {
  id: string;
  subjectId: string;
  content: string;
  level: 'Dễ' | 'Trung bình' | 'Khó' | 'Rất khó';
  blockId: string;
}

export interface Exam {
  id: string;
  name: string;
  subjectId: string;
  questions: Question[]; 
  createdAt: string;
}