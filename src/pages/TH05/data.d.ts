export interface Club {
  id: string;
  name: string;
  avatar: string;
  foundDate: string;
  description: string;
  chairperson: string;
  isActive: boolean;
}

export interface HistoryItem {
  action: string;
  time: string;
  note?: string;
}

export interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: 'Nam' | 'Nữ';
  address: string;
  talent: string;
  clubId: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  rejectReason?: string;
  history: HistoryItem[];
}