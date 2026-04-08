import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, TimePicker, Tag, message, Space } from 'antd';

const BookingForm = ({ bookings, setBookings, staffs, services }: any) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSave = (v: any) => {
    const { staffId, date, time } = v;
    const dateStr = date.format('YYYY-MM-DD'), timeStr = time.format('HH:mm');
    
    const staff = staffs.find((s:any) => s.id === staffId);
    if (bookings.some((b:any) => b.staffId === staffId && b.date === dateStr && b.time === timeStr && b.status !== 'Hủy')) 
      return message.error('Trùng lịch!');
    if (bookings.filter((b:any) => b.staffId === staffId && b.date === dateStr).length >= (staff?.maxCustomers || 0)) 
      return message.error('Hết chỗ!');

    setBookings([...bookings, { id: `BK${Date.now()}`, ...v, date: dateStr, time: timeStr, status: 'Chờ duyệt' }]);
    setOpen(false); form.resetFields(); message.success('Xong!');
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={{marginBottom: 16}}>Đặt lịch mới</Button>
      <Table dataSource={bookings} rowKey="id" size="small" columns={[
        { title: 'Khách', dataIndex: 'customerName' },
        { title: 'NV', dataIndex: 'staffId', render: id => staffs.find((s:any)=>s.id===id)?.name },
        { title: 'Thời gian', render: (_, r) => `${r.date} ${r.time}` },
        { title: 'Trạng thái', dataIndex: 'status', render: s => <Tag color="blue">{s}</Tag> },
        { title: 'Sửa', render: (_, r) => (
          <Select value={r.status} onChange={val => setBookings(bookings.map((b:any)=>b.id===r.id ? {...b, status: val} : b))}>
            {['Xác nhận', 'Hoàn thành', 'Hủy'].map(st => <Select.Option value={st}>{st}</Select.Option>)}
          </Select>
        )}
      ]} />
      <Modal visible={open} onCancel={() => setOpen(false)} onOk={() => form.submit()} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="customerName" label="Tên khách" rules={[{required: true}]}><Input/></Form.Item>
          <Form.Item name="staffId" label="Nhân viên" rules={[{required: true}]}><Select options={staffs.map((s:any)=>({label:s.name, value:s.id}))}/></Form.Item>
          <Form.Item name="serviceId" label="Dịch vụ" rules={[{required: true}]}><Select options={services.map((s:any)=>({label:s.name, value:s.id}))}/></Form.Item>
          <Space><Form.Item name="date" rules={[{required: true}]}><DatePicker/></Form.Item><Form.Item name="time" rules={[{required: true}]}><TimePicker format="HH:mm"/></Form.Item></Space>
        </Form>
      </Modal>
    </>
  );
};
export default BookingForm;