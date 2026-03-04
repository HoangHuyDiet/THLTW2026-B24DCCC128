import moment from 'moment';
import { StudyData, StudySession } from './data.d';

const KEY = 'study_data_v4';

export const getStoredData = (): StudyData => {
  const saved = localStorage.getItem(KEY);
  return saved ? JSON.parse(saved) : { subjects: ['Toán', 'Văn', 'Anh'], sessions: [], goal: 40 };
};

export const saveStudyData = (data: StudyData) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const calcProgress = (sessions: StudySession[], goal: number) => {
  const curMonth = moment().format('YYYY-MM');
  const mins = sessions
    .filter(s => s.date?.startsWith(curMonth))
    .reduce((sum, s) => sum + Number(s.duration || 0), 0);
  const hours = (mins / 60).toFixed(1);
  const percent = goal > 0 ? Math.min(Math.round((Number(hours) / goal) * 100), 100) : 0;
  return { hours, percent };
};