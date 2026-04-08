import React from 'react';
import { Modal, Form, Input, Select, Space, Button } from 'antd';
import { Subject, KnowledgeBlock } from './data';

interface AddQuestionModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (values: any) => void;
  subjects: Subject[];
  blocks: KnowledgeBlock[];
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({ 
  visible, onCancel, onSave, subjects, blocks 
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSave(values);
      form.resetFields();
    });
  };

  return (
    <Modal 
      title="Thêm câu hỏi mới" 
      visible={visible} 
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Lưu câu hỏi"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="subjectId" label="Môn học" rules={[{ required: true }]}>
          <Select placeholder="Chọn môn học">
            {subjects.map(s => <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item name="blockId" label="Khối kiến thức" rules={[{ required: true }]}>
          <Select placeholder="Chọn khối kiến thức">
            {blocks.map(b => <Select.Option key={b.id} value={b.id}>{b.name}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item name="level" label="Mức độ khó" rules={[{ required: true }]}>
          <Select placeholder="Chọn độ khó">
            <Select.Option value="Dễ">Dễ</Select.Option>
            <Select.Option value="Trung bình">Trung bình</Select.Option>
            <Select.Option value="Khó">Khó</Select.Option>
            <Select.Option value="Rất khó">Rất khó</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="content" label="Nội dung" rules={[{ required: true }]}>
          <Input.TextArea rows={4} placeholder="Nhập nội dung câu hỏi..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddQuestionModal;