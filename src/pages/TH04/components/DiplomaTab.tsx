import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, message, Card } from 'antd';


const DiplomaTab = ({ diplomas, setDiplomas, decisions, fields, getNextNo }: any) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const onDecisionSelect = (val: string) => {
    form.setFieldsValue({ enrollmentNo: getNextNo(val) });
  };

  const onFinish = (values: any) => {
    const newDiploma = { id: `DIP${Date.now()}`, ...values };
    setDiplomas([...diplomas, newDiploma]);
    message.success('Cấp bằng thành công!');
    setVisible(false);
    form.resetFields();
  };

  return (
    <Card extra={<Button type="primary" onClick={() => setVisible(true)}>+ Cấp bằng mới</Button>}>
      <Table dataSource={diplomas} rowKey="id" columns={[
        { title: 'Số hiệu', dataIndex: 'serialNo' },
        { title: 'Số vào sổ', dataIndex: 'enrollmentNo' },
        { title: 'Họ tên', dataIndex: 'fullName' },
        { title: 'Mã SV', dataIndex: 'studentId' },
        { title: 'Quyết định', render: (_, r) => decisions.find((d:any)=>d.id === r.decisionId)?.code }
      ]} />

      <Modal title="Thêm thông tin văn bằng" visible={visible} onCancel={() => setVisible(false)} onOk={() => form.submit()} width={800} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item name="decisionId" label="Quyết định tốt nghiệp" rules={[{required: true}]}>
              <Select onChange={onDecisionSelect} options={decisions.map((d:any)=>({label: d.code, value: d.id}))} />
            </Form.Item>
            <Form.Item name="enrollmentNo" label="Số vào sổ (Tự động)"><Input disabled /></Form.Item>
            <Form.Item name="serialNo" label="Số hiệu văn bằng" rules={[{required: true}]}><Input /></Form.Item>
            <Form.Item name="studentId" label="Mã sinh viên" rules={[{required: true}]}><Input /></Form.Item>
            <Form.Item name="fullName" label="Họ tên" rules={[{required: true}]}><Input /></Form.Item>
            <Form.Item name="dob" label="Ngày sinh" rules={[{required: true}]}><DatePicker style={{width:'100%'}} /></Form.Item>
          </div>

          <Card size="small" title="Thông tin phụ lục (Cấu hình động)" style={{ marginTop: 16, background: '#fafafa' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {fields.map((f: any) => (
                <Form.Item key={f.id} name={['dynamic', f.id]} label={f.label}>
                  {f.type === 'Number' ? <Input type="number" /> : f.type === 'Date' ? <DatePicker style={{width:'100%'}} /> : <Input />}
                </Form.Item>
              ))}
            </div>
          </Card>
        </Form>
      </Modal>
    </Card>
  );
};
export default DiplomaTab;