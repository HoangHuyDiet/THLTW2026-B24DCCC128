import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Tag, Select, TimePicker, Space, message } from 'antd';
import { StarFilled } from '@ant-design/icons';

const StaffManager = ({ staffs, setStaffs, reviews, bookings }: any) => {
  const [open, setOpen] = useState(false), [form] = Form.useForm();

  const getRate = (staffId: string) => {
    const sReviews = reviews.filter((r: any) => bookings.find((b: any) => b.id === r.bookingId)?.staffId === staffId);
    return sReviews.length ? (sReviews.reduce((a: any, b: any) => a + b.rating, 0) / sReviews.length).toFixed(1) : "0.0";
  };

  const save = (v: any) => {
    const schedule = `${v.days.join(', ')} (${v.time[0].format('HH:mm')}-${v.time[1].format('HH:mm')})`;
    setStaffs([...staffs, { id: `ST${Date.now()}`, ...v, schedule }]);
    setOpen(false); form.resetFields(); message.success('Đã thêm!');
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={{marginBottom: 16}}>+ Nhân viên</Button>
      <Table dataSource={staffs} rowKey="id" size="small" columns={[
        { title: 'Họ tên', dataIndex: 'name' },
        { title: 'Lịch làm việc', dataIndex: 'schedule' },
        { title: 'Đánh giá', render: (_, r) => <Tag color="orange">{getRate(r.id)} <StarFilled/></Tag> },
        { title: 'Max khách', dataIndex: 'maxCustomers', render: v => <Tag color="blue">{v}</Tag> },
        { title: 'Xóa', render: (_, r) => <Button type="link" danger onClick={() => setStaffs(staffs.filter((s:any)=>s.id!==r.id))}>Xóa</Button> }
      ]} />

      <Modal title="Nhân viên mới" visible={open} onCancel={() => setOpen(false)} onOk={() => form.submit()} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={save}>
          <Form.Item name="name" label="Tên" rules={[{required: true}]}><Input/></Form.Item>
          <Form.Item name="days" label="Ngày làm việc" rules={[{required: true}]}>
            <Select mode="multiple" placeholder="Chọn các thứ">
              {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'].map(d => <Select.Option key={d} value={d}>{d}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="time" label="Giờ làm việc" rules={[{required: true}]}>
            <TimePicker.RangePicker format="HH:mm" style={{width: '100%'}} />
          </Form.Item>
          <Form.Item name="maxCustomers" label="Giới hạn khách/ngày" rules={[{required: true}]}><InputNumber min={1} style={{width:'100%'}}/></Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default StaffManager;