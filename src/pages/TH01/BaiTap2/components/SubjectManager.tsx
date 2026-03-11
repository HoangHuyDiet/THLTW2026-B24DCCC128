import React, { useState } from 'react';
import { Table, Button, Input, Space, Popconfirm, Modal } from 'antd';

export const SubjectManager = ({ subjects, setSubjects }: any) => {
  const [vis, setVis] = useState(false);
  const [idx, setIdx] = useState<number | null>(null);
  const [val, setVal] = useState('');

  const add = (v: string) => v && !subjects.includes(v) && setSubjects([...subjects, v]);
  
  const save = () => {
    if (idx !== null) {
      const copy = [...subjects];
      copy[idx] = val;
      setSubjects(copy);
      setVis(false);
    }
  };

  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Input.Search placeholder="Thêm môn mới..." enterButton="Thêm" onSearch={add} />
      <Table size="small" dataSource={subjects.map((s:string, i:number) => ({name: s, key: i}))} columns={[
        { title: 'Tên môn', dataIndex: 'name' },
        { title: 'Thao tác', render: (_, r, i) => (
          <Space>
            <Button type="link" onClick={() => {setIdx(i); setVal(r.name); setVis(true)}}>Sửa</Button>
            <Popconfirm title="Xóa?" onConfirm={() => setSubjects(subjects.filter((_:any, index:number) => index !== i))}><Button type="link" danger>Xóa</Button></Popconfirm>
          </Space>
        )}
      ]} />
      <Modal title="Sửa tên môn" visible={vis} onOk={save} onCancel={() => setVis(false)}>
        <Input value={val} onChange={e => setVal(e.target.value)} />
      </Modal>
    </Space>
  );
};