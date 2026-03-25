import { useState } from 'react';
import { Diploma, DiplomaRegister, Decision, FormField } from './data';

export const useDiplomaStore = () => {
  const [registers, setRegisters] = useState<DiplomaRegister[]>([
    { id: 'REG_2024', year: 2024, currentNo: 2 },
    { id: 'REG_2025', year: 2025, currentNo: 1 }
  ]);

  const [decisions, setDecisions] = useState<Decision[]>([
    { 
      id: 'DEC_101', 
      code: '101/QĐ-PTIT', 
      date: '2024-06-15', 
      summary: 'Quyết định tốt nghiệp đợt 1 năm 2024 cho sinh viên hệ chính quy', 
      registerId: 'REG_2024',
      viewCount: 15 
    },
    { 
      id: 'DEC_202', 
      code: '202/QĐ-PTIT', 
      date: '2025-01-10', 
      summary: 'Quyết định tốt nghiệp đợt sớm năm 2025', 
      registerId: 'REG_2025',
      viewCount: 5 
    }
  ]);

  const [fields, setFields] = useState<FormField[]>([
    { id: 'f_noisinh', label: 'Nơi sinh', type: 'String' },
    { id: 'f_dantoc', label: 'Dân tộc', type: 'String' },
    { id: 'f_gpa', label: 'Điểm trung bình', type: 'Number' },
    { id: 'f_nhaphoc', label: 'Ngày nhập học', type: 'Date' }
  ]);

  const [diplomas, setDiplomas] = useState<Diploma[]>([
    {
      id: 'DIP_001',
      enrollmentNo: 1,
      serialNo: 'B24-0001',
      studentId: 'B22DCCN001',
      fullName: 'Nguyễn Văn An',
      dob: '2004-05-20',
      decisionId: 'DEC_101',
      dynamic: { 'f_noisinh': 'Hà Nội', 'f_dantoc': 'Kinh', 'f_gpa': 3.6 }
    },
    {
      id: 'DIP_002',
      enrollmentNo: 2,
      serialNo: 'B24-0002',
      studentId: 'B22DCCN002',
      fullName: 'Trần Thị Bình',
      dob: '2004-11-02',
      decisionId: 'DEC_101',
      dynamic: { 'f_noisinh': 'Hải Phòng', 'f_dantoc': 'Kinh', 'f_gpa': 3.2 }
    },
    {
      id: 'DIP_003',
      enrollmentNo: 1, 
      serialNo: 'B25-0001',
      studentId: 'B22DCCN999',
      fullName: 'Lê Hoàng Minh',
      dob: '2004-01-15',
      decisionId: 'DEC_202',
      dynamic: { 'f_noisinh': 'Đà Nẵng', 'f_dantoc': 'Tày', 'f_gpa': 3.9 }
    }
  ]);

  const getNextNo = (decisionId: string) => {
    const decision = decisions.find(d => d.id === decisionId);
    if (!decision) return 1;
    const countInRegister = diplomas.filter(dip => {
      const parentDec = decisions.find(dec => dec.id === dip.decisionId);
      return parentDec?.registerId === decision.registerId;
    }).length;
    return countInRegister + 1;
  };

  return { registers, setRegisters, decisions, setDecisions, fields, setFields, diplomas, setDiplomas, getNextNo };
};
