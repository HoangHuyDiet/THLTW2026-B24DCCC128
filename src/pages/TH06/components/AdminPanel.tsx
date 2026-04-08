import { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, Tag, Rate, Select } from 'antd';

const AdminPanel = ({ destinations, setDestinations }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); 
  const [form] = Form.useForm();

  const handleEdit = (record: any) => {
    setEditingId(record.id);
    form.setFieldsValue(record); 
    setIsModalVisible(true);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    form.resetFields(); 
    setIsModalVisible(true);
  };

  const handleSave = (values: any) => {
    if (editingId) {
      setDestinations((prev: any) => prev.map((item: any) => 
        item.id === editingId ? { ...item, ...values } : item
      ));
    } else {
      const newItem = {
        ...values,
        id: Date.now().toString(),
        rating: values.rating || 5,
      };
      setDestinations([...destinations, newItem]);
    }
    
    setIsModalVisible(false);
    setEditingId(null);
    form.resetFields();
  };

  const columns = [
    { title: 'Tên điểm đến', dataIndex: 'name', key: 'name' },
    { title: 'Loại', dataIndex: 'type', render: (t: string) => <Tag color="blue">{t}</Tag> },
    { title: 'Giá', dataIndex: 'price', render: (p: number) => <b>{p?.toLocaleString()}đ</b> },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button 
            type="link" 
            danger 
            onClick={() => setDestinations(destinations.filter((d: any) => d.id !== record.id))}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={handleOpenAdd} style={{ marginBottom: 16 }}>
        + Thêm điểm đến
      </Button>

      <Table dataSource={destinations} columns={columns} rowKey="id" />

      <Modal 
        title={editingId ? "Chỉnh sửa điểm đến" : "Thêm điểm đến mới"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="name" label="Tên điểm đến" rules={[{ required: true }]}><Input /></Form.Item>
          
          <Form.Item name="type" label="Loại hình" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="biển">Biển</Select.Option>
              <Select.Option value="núi">Núi</Select.Option>
              <Select.Option value="thành phố">Thành phố</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="price" label="Giá vé tham quan"><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="rating" label="Đánh giá"><Rate allowHalf /></Form.Item>
          <Form.Item name="img" label="Link hình ảnh"><Input /></Form.Item>
          
          <Form.Item name="foodCost" label="Phí ăn uống"><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="stayCost" label="Phí lưu trú"><InputNumber style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="transportCost" label="Phí di chuyển"><InputNumber style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPanel;