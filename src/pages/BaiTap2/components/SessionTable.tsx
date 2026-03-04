import React, { useState } from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import SessionModal from './SessionModal';

const SessionTable = ({ sessions, setSessions, subjects }: any) => {
  const [vis, setVis] = useState(false);
  const [editData, setEditData] = useState(null);

  const onSave = (v: any) => {
    const item = {
      ...v, 
      id: editData ? (editData as any).id : Date.now(), 
      date: v.date.format('YYYY-MM-DD HH:mm')
    };
    setSessions(editData ? sessions.map((s:any) => s.id === item.id ? item : s) : [...sessions, item]);
    setVis(false);
  };

  const columns = [
    { title: 'Môn', dataIndex: 'subject', width: 120 },
    { title: 'Thời gian', dataIndex: 'date', width: 160 },
    { title: 'Phút', dataIndex: 'duration', width: 80 },
    { title: 'Nội dung đã học', dataIndex: 'content', ellipsis: true },
    { title: 'Thao tác', width: 120, render: (_, r) => (
      <Space>
        <Button type="link" onClick={() => {setEditData(r); setVis(true)}}>Sửa</Button>
        <Popconfirm title="Xóa?" onConfirm={() => setSessions(sessions.filter((s:any) => s.id !== r.id))}><Button type="link" danger>Xóa</Button></Popconfirm>
      </Space>
    )}
  ];

  return (
    <>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" onClick={() => {setEditData(null); setVis(true)}}>Thêm buổi học</Button>
      </div>
      <Table dataSource={sessions} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
      <SessionModal visible={vis} onCancel={() => setVis(false)} onSave={onSave} initialValues={editData} subjects={subjects} />
    </>
  );
};
export default SessionTable;