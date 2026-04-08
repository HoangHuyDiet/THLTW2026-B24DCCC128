export interface StudySession {
  id: number;
  subject: string;
  date: string;
  duration: number;
  content: string;
}

export interface StudyData {
  subjects: string[];
  sessions: StudySession[];
  goal: number;
}