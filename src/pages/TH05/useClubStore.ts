import { useState } from 'react';
import moment from 'moment';

export const useClubStore = () => {
  const [clubs, setClubs] = useState<any[]>([
    { id: 'C1', name: 'CLB Guitar', chairperson: 'Hoàng', isActive: true, description: '<b>Âm nhạc</b> kết nối.' },
    { id: 'C2', name: 'CLB Bóng đá', chairperson: 'Nam', isActive: true, description: 'Sân cỏ PTIT.' }
  ]);

  const [apps, setApps] = useState<any[]>([
    { id: '1', fullName: 'Nguyễn Văn A', email: 'a@gmail.com', phone: '0912', status: 'Pending', clubId: 'C1', history: [] },
    { id: '2', fullName: 'Trần Thị B', email: 'b@gmail.com', phone: '0987', status: 'Approved', clubId: 'C1', history: [{action: 'Admin Approved', time: '09:00 01/04'}] },
  ]);

  const updateStatus = (ids: string[], status: string, reason?: string) => {
    setApps(prev => prev.map(item => ids.includes(item.id) ? {
      ...item, status, rejectReason: reason,
      history: [...(item.history || []), { action: `Admin ${status}`, time: moment().format('HH:mm DD/MM/YYYY'), note: reason }]
    } : item));
  };

  const saveClub = (values: any) => {
    if (values.id) setClubs(prev => prev.map(c => c.id === values.id ? { ...c, ...values } : c));
    else setClubs(prev => [...prev, { ...values, id: `C${Date.now()}`, isActive: true }]);
  };

  const deleteClub = (id: string) => setClubs(prev => prev.filter(c => c.id !== id));

  const batchChangeClub = (ids: string[], newClubId: string) => {
  setApps(prev => prev.map(item => 
    ids.includes(item.id) ? { ...item, clubId: newClubId } : item
  ));
};

  return { clubs, apps, setApps, updateStatus, saveClub, deleteClub, batchChangeClub };
};