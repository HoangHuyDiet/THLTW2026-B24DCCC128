export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface Staff {
  id: string;
  name: string;
  maxCustomersPerDay: number;
  workingSchedule: string; 
  rating: number; 
}

export interface Booking {
  id: string;
  customerName: string;
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
  status: 'Chờ duyệt' | 'Xác nhận' | 'Hoàn thành' | 'Hủy';
}

export interface Review {
  id: string;
  bookingId: string;
  rating: number;
  comment: string;
  staffReply?: string;
}