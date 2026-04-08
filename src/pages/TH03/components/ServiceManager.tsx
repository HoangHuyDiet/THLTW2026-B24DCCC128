import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, message } from 'antd';

const ServiceManager = ({ services, setServices }: any) => {
  const [open, setOpen] = useState(false), [form] = Form.useForm();

  const save = (v: any) => {
    setServices([...services, { id: `SV${Date.now()}`, ...v }]);
    setOpen(false); form.resetFields(); message.success('Đã thêm dịch vụ!');
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={{marginBottom: 16}}>Thêm dịch vụ</Button>
      <Table dataSource={services} rowKey="id" size="small" columns={[
        { title: 'Dịch vụ', dataIndex: 'name' },
        { title: 'Giá', dataIndex: 'price', render: v => `${v.toLocaleString()}đ` },
        { title: 'Thời gian', dataIndex: 'duration', render: v => `${v} phút` },
        { title: 'Xóa', render: (_, r) => <Button type="link" danger onClick={() => setServices(services.filter((s:any)=>s.id!==r.id))}>Xóa</Button> }
      ]} />
      <Modal title="Dịch vụ mới" visible={open} onCancel={() => setOpen(false)} onOk={() => form.submit()} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={save}>
          <Form.Item name="name" label="Tên dịch vụ" rules={[{required: true}]}><Input/></Form.Item>
          <Form.Item name="price" label="Giá (VNĐ)" rules={[{required: true}]}><InputNumber style={{width:'100%'}}/></Form.Item>
          <Form.Item name="duration" label="Thời gian thực hiện (phút)" rules={[{required: true}]}><InputNumber style={{width:'100%'}}/></Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ServiceManager;