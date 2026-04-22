export interface Room {
  id: string;
  code: string;
  name: string;
  capacity: number;
  type: 'Lý thuyết' | 'Thực hành' | 'Hội trường';
  supervisor: string;
}