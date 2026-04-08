import React, { useState } from 'react';
import { Table, Button, Card, Modal, Form, Input, InputNumber, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Subject } from './data';

interface Props {
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
}

const SubjectManager: React.FC<Props> = ({ subjects, setSubjects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = (values: any) => {
    const newSubject: Subject = { id: `S${Date.now()}`, ...values };
    setSubjects([...subjects, newSubject]);
    message.success('Đã thêm môn học mới!');
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Card extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>Thêm môn</Button>}>
      <Table 
        dataSource={subjects} 
        rowKey="id" 
        columns={[
          { title: 'Mã môn', dataIndex: 'code' },
          { title: 'Tên môn', dataIndex: 'name' },
          { title: 'Tín chỉ', dataIndex: 'credits' }
        ]} 
      />
      <Modal title="Thêm môn học" visible={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item name="code" label="Mã môn" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="name" label="Tên môn" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="credits" label="Số tín chỉ" rules={[{ required: true }]}><InputNumber min={1} style={{width: '100%'}} /></Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default SubjectManager;