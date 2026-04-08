import React, { useState } from 'react';
import { Table, Button, Space, Tag, Card, Modal, Form, Input, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Question, Subject, KnowledgeBlock } from './data';

interface Props { questions: Question[]; setQuestions: any; subjects: Subject[]; blocks: KnowledgeBlock[]; }

const QuestionManager: React.FC<Props> = ({ questions, setQuestions, subjects, blocks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSave = (v: any) => {
    setQuestions([...questions, { id: `Q${Date.now().toString().slice(-3)}`, ...v }]);
    setIsModalOpen(false);
    form.resetFields();
    message.success('Đã thêm câu hỏi!');
  };

  return (
    <Card extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>Thêm câu hỏi</Button>}>
      <Table dataSource={questions} rowKey="id" size="small" columns={[
        { title: 'Nội dung', dataIndex: 'content', ellipsis: true },
        { title: 'Môn', dataIndex: 'subjectId', render: (id) => subjects.find(s=>s.id===id)?.name },
        { title: 'Khối KT', dataIndex: 'blockId', render: (id) => blocks.find(b=>b.id===id)?.name },
        { title: 'Mức độ', dataIndex: 'level', render: (l) => <Tag color="blue">{l}</Tag> }
      ]} />
      <Modal title="Thêm câu hỏi" visible={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="subjectId" label="Môn học" rules={[{required: true}]}><Select options={subjects.map(s=>({label: s.name, value: s.id}))} /></Form.Item>
          <Form.Item name="blockId" label="Khối kiến thức" rules={[{required: true}]}><Select options={blocks.map(b=>({label: b.name, value: b.id}))} /></Form.Item>
          <Form.Item name="level" label="Mức độ" rules={[{required: true}]}><Select options={['Dễ','Trung bình','Khó','Rất khó'].map(l=>({label:l, value:l}))} /></Form.Item>
          <Form.Item name="content" label="Nội dung" rules={[{required: true}]}><Input.TextArea /></Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};
export default QuestionManager;