import React, { useState } from 'react';
import { Table, Button, Card, Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { KnowledgeBlock } from './data';

interface Props {
  blocks: KnowledgeBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<KnowledgeBlock[]>>;
}

const KnowledgeBlockManager: React.FC<Props> = ({ blocks, setBlocks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = (values: any) => {
    const newBlock: KnowledgeBlock = { id: `B${Date.now()}`, ...values };
    setBlocks([...blocks, newBlock]);
    message.success('Đã thêm khối kiến thức!');
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Card extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>Thêm khối</Button>}>
      <Table dataSource={blocks} rowKey="id" columns={[{ title: 'ID', dataIndex: 'id' }, { title: 'Tên khối', dataIndex: 'name' }]} />
      <Modal title="Thêm khối kiến thức" visible={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item name="name" label="Tên khối" rules={[{ required: true }]}><Input /></Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default KnowledgeBlockManager;