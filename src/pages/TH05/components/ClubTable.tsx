import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const ClubTable = ({ clubs, deleteClub, saveClub }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [form] = Form.useForm();

  const openModal = (record?: any) => {
    setEditingRecord(record || null);
    if (record) form.setFieldsValue(record); else form.resetFields();
    setIsModalOpen(true);
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()} style={{ marginBottom: 16 }}>Thêm CLB</Button>
      <Table dataSource={clubs} rowKey="id" columns={[
        { title: 'Tên CLB', dataIndex: 'name' },
        { title: 'Chủ nhiệm', dataIndex: 'chairperson' },
        { title: 'Trạng thái', render: (_, r) => r.isActive ? <Tag color="green">Hoạt động</Tag> : <Tag color="red">Nghỉ</Tag> },
        { title: 'Thao tác', render: (_, r) => (
          <Space>
            <Button size="small" icon={<EditOutlined />} onClick={() => openModal(r)} />
            <Button size="small" danger icon={<DeleteOutlined />} onClick={() => Modal.confirm({ title: 'Xóa CLB?', onOk: () => deleteClub(r.id) })} />
          </Space>
        )}
      ]} />
      <Modal title={editingRecord ? "Sửa CLB" : "Thêm CLB"} visible={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={(v) => { saveClub({ ...v, id: editingRecord?.id }); setIsModalOpen(false); }}>
          <Form.Item name="name" label="Tên CLB" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="chairperson" label="Chủ nhiệm" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="description" label="Mô tả"><Input.TextArea /></Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ClubTable;