export interface Workout {
  id: string;
  date: string;
  type: 'Cardio' | 'Strength' | 'Yoga' | 'HIIT' | 'Other';
  duration: number;
  calories: number;
  note: string;
  status: 'Hoàn thành' | 'Bỏ lỡ';
}

export interface HealthMetric {
  id: string;
  date: string;
  weight: number;
  height: number;
  heartRate: number;
  sleepHours: number;
}

export interface Goal {
  id: string;
  title: string;
  type: 'Giảm cân' | 'Tăng cơ' | 'Cải thiện sức bền' | 'Khác';
  targetValue: number;
  currentValue: number;
  deadline: string;
  status: 'Đang thực hiện' | 'Đã đạt' | 'Đã hủy';
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  description: string;
  calPerHour: number;
}