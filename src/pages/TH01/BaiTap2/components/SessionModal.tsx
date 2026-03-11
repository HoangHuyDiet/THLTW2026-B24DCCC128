import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';

const SessionModal = ({ visible, onCancel, onSave, initialValues, subjects }: any) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      initialValues ? form.setFieldsValue({...initialValues, date: moment(initialValues.date)}) : form.resetFields();
    }
  }, [visible, initialValues]);

  return (
    <Modal 
      title={initialValues ? "Sửa buổi học" : "Thêm buổi học"} 
      visible={visible} 
      onOk={() => form.submit()} 
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onSave}>
        <Form.Item name="subject" label="Môn học" rules={[{required: true}]}>
          <Select>{subjects.map((s: string) => <Select.Option key={s} value={s}>{s}</Select.Option>)}</Select>
        </Form.Item>
        <Form.Item name="date" label="Ngày giờ" rules={[{required: true}]}><DatePicker showTime style={{width:'100%'}}/></Form.Item>
        <Form.Item name="duration" label="Số phút" rules={[{required: true}]}><Input type="number"/></Form.Item>
        <Form.Item name="content" label="Nội dung"><Input.TextArea/></Form.Item>
      </Form>
    </Modal>
  );
};
export default SessionModal;