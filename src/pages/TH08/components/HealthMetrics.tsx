import { useState } from 'react';
import { Table, Tag, Button, Card, Modal, Form, Input, Space, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { HealthMetric } from '../data.d';

interface HealthMetricsProps {
  data: HealthMetric[];
  setData: (data: HealthMetric[]) => void;
}

const HealthMetrics = ({ data, setData }: HealthMetricsProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form] = Form.useForm();

  const calculateBMI = (w: number, h: number) => {
    if (!w || !h) return "0";
    const heightInMeters = h / 100;
    return (w / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMITag = (bmi: number) => {
    if (bmi < 18.5) return <Tag color="blue">Thiếu cân</Tag>;
    if (bmi <= 24.9) return <Tag color="green">Bình thường</Tag>;
    if (bmi <= 29.9) return <Tag color="orange">Thừa cân</Tag>;
    return <Tag color="red">Béo phì</Tag>;
  };

  const handleSave = (values: any) => {
    if (editingItem) {
      const newData = data.map((item: any) =>
        item.id === editingItem.id ? { ...item, ...values } : item
      );
      setData(newData);
      message.success('Đã cập nhật chỉ số!');
    } else {
      const newItem = { ...values, id: Date.now().toString() };
      setData([newItem, ...data]);
      message.success('Đã lưu chỉ số mới!');
    }
    setIsModalVisible(false);
    setEditingItem(null);
    form.resetFields();
  };

  const columns = [
    { title: 'Ngày', dataIndex: 'date', key: 'date' },
    { title: 'Cân nặng (kg)', dataIndex: 'weight', key: 'weight' },
    { title: 'Chiều cao (cm)', dataIndex: 'height', key: 'height' },
    { 
      title: 'BMI', 
      render: (_: any, record: any) => {
        const bmi = parseFloat(calculateBMI(record.weight, record.height));
        return <span>{bmi} {getBMITag(bmi)}</span>;
      }
    },
    { title: 'Nhịp tim (bpm)', dataIndex: 'heartRate' },
    { title: 'Giờ ngủ', dataIndex: 'sleepHours' },
    {
      title: 'Hành động',
      render: (_: any, record: any) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => { setEditingItem(record); form.setFieldsValue(record); setIsModalVisible(true); }}
          >
            Sửa
          </Button>
          <Popconfirm title="Xóa chỉ số ngày này?" onConfirm={() => setData(data.filter((i: any) => i.id !== record.id))}>
            <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <Card 
      title="Nhật ký chỉ số sức khỏe" 
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingItem(null); form.resetFields(); setIsModalVisible(true); }}>
          Ghi chỉ số mới
        </Button>
      }
    >
      <Table dataSource={data} columns={columns} rowKey="id" pagination={{ pageSize: 6 }} />

      <Modal 
        title={editingItem ? "Sửa chỉ số sức khỏe" : "Nhập chỉ số hàng ngày"} 
        visible={isModalVisible} 
        onOk={() => form.submit()} 
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="date" label="Ngày ghi nhận" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
          <Space style={{ display: 'flex' }} align="baseline">
            <Form.Item name="weight" label="Cân nặng (kg)" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="height" label="Chiều cao (cm)" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Space>
          <Space style={{ display: 'flex' }} align="baseline">
            <Form.Item name="heartRate" label="Nhịp tim (bpm)"><Input type="number" /></Form.Item>
            <Form.Item name="sleepHours" label="Giờ ngủ"><Input type="number" /></Form.Item>
          </Space>
        </Form>
      </Modal>
    </Card>
  );
};

export default HealthMetrics;