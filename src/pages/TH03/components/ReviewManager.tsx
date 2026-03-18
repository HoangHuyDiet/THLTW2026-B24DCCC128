import React, { useState } from 'react';
import { Card, Rate, List, Modal, Form, Input, Select, message, Typography, Button } from 'antd';

const ReviewManager = ({ reviews, setReviews, bookings, staffs }: any) => {
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState<any>(null);
  const [form] = Form.useForm();

  const addReview = (v: any) => {
    setReviews([...reviews, { id: `RV${Date.now()}`, ...v, staffReply: '', time: new Date().toLocaleString() }]);
    setOpen(false); form.resetFields();
  };

  return (
    <Card extra={<Button type="primary" onClick={() => setOpen(true)}>Đánh giá</Button>}>
      <List dataSource={reviews} renderItem={(r: any) => (
        <List.Item actions={[<Button onClick={() => setReply(r)}>Phản hồi</Button>]}>
          <Typography.Text strong>{bookings.find((b:any)=>b.id===r.bookingId)?.customerName}</Typography.Text>
          <Rate disabled defaultValue={r.rating} /> <p>{r.comment}</p>
          {r.staffReply && <div style={{background: '#eee', padding: 8}}>{r.staffReply}</div>}
        </List.Item>
      )} />
      <Modal visible={open} onCancel={() => setOpen(false)} onOk={() => form.submit()} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={addReview}>
          <Form.Item name="bookingId" label="Lịch hẹn" rules={[{required: true}]}>
            <Select options={bookings.filter((b:any)=>b.status==='Hoàn thành').map((b:any)=>({label: b.customerName, value: b.id}))} />
          </Form.Item>
          <Form.Item name="rating" rules={[{required: true}]}><Rate/></Form.Item>
          <Form.Item name="comment" rules={[{required: true}]}><Input.TextArea/></Form.Item>
        </Form>
      </Modal>
      <Modal visible={!!reply} onCancel={() => setReply(null)} onOk={() => {
        const val = (document.getElementById('rep') as any).value;
        setReviews(reviews.map((rv:any)=>rv.id===reply.id ? {...rv, staffReply: val} : rv)); setReply(null);
      }}>
        <Input.TextArea id="rep" placeholder="Nhân viên phản hồi..." />
      </Modal>
    </Card>
  );
};
export default ReviewManager;