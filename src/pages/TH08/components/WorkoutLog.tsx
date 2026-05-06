import { useState } from 'react';
import { Table, Button, Space, Input, Select, DatePicker, Modal, Form, Tag, Popconfirm, message } from 'antd';
import { Workout } from '../data.d';

interface WorkoutLogProps {
  data: Workout[];
  setData: (data: Workout[]) => void;
}

const { RangePicker } = DatePicker;

const WorkoutLog = ({ data, setData }: WorkoutLogProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form] = Form.useForm();

  const handleSaveWorkout = (values: any) => {
    if (editingItem) {
      const newData = data.map((item: any) => 
        item.id === editingItem.id ? { ...item, ...values } : item
      );
      setData(newData);
      message.success('Đã cập nhật buổi tập!');
    } else {
      const newItem = {
        ...values,
        id: Date.now().toString(),
        calories: values.calories || (values.duration * 8) 
      };
      setData([newItem, ...data]);
      message.success('Đã thêm buổi tập mới!');
    }
    setIsModalVisible(false);
    setEditingItem(null);
  };

  const columns = [
    { title: 'Ngày', dataIndex: 'date', key: 'date' },
    { title: 'Loại bài tập', dataIndex: 'type', key: 'type' },
    { title: 'Thời lượng (p)', dataIndex: 'duration', key: 'duration' },
    { title: 'Calo', dataIndex: 'calories', key: 'calories' },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      render: (s: string) => <Tag color={s === 'Hoàn thành' ? 'green' : 'red'}>{s}</Tag> 
    },
    {
      title: 'Hành động',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" onClick={() => { setEditingItem(record); form.setFieldsValue(record); setIsModalVisible(true); }}>Sửa</Button>
          <Popconfirm title="Xóa buổi tập này?" onConfirm={() => setData(data.filter((i: any) => i.id !== record.id))}>
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search placeholder="Tìm bài tập..." style={{ width: 200 }} />
        <RangePicker />
        <Button type="primary" onClick={() => { setEditingItem(null); form.resetFields(); setIsModalVisible(true); }}>+ Thêm buổi tập</Button>
      </Space>
      <Table dataSource={data} columns={columns} rowKey="id" />

      <Modal title={editingItem ? "Sửa buổi tập" : "Thêm buổi tập"} visible={isModalVisible} onOk={() => form.submit()} onCancel={() => setIsModalVisible(false)}>
        <Form form={form} layout="vertical" onFinish={handleSaveWorkout}>
          <Form.Item name="date" label="Ngày"><Input type="date" /></Form.Item>
          <Form.Item name="type" label="Loại bài tập"><Select options={[{value:'Cardio'}, {value:'Strength'}, {value:'Yoga'}]} /></Form.Item>
          <Form.Item name="duration" label="Thời lượng (phút)"><Input type="number" /></Form.Item>
          <Form.Item name="status" label="Trạng thái"><Select options={[{value:'Hoàn thành'}, {value:'Bỏ lỡ'}]} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WorkoutLog;