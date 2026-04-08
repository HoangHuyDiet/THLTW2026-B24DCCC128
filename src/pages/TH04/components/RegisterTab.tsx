import React, { useState } from 'react';
import { Table, Button, Card, Modal, Form, Input, Select, Row, Col, message, Tag } from 'antd';
import { BookOutlined, FileTextOutlined, PlusOutlined } from '@ant-design/icons';

const RegisterTab = ({ registers, setRegisters, decisions, setDecisions }: any) => {
  const [isRegModal, setIsRegModal] = useState(false);
  const [isDecModal, setIsDecModal] = useState(false);
  const [form] = Form.useForm();

  const addRegister = (values: any) => {
    if (registers.find((r: any) => r.year === values.year)) return message.error('Sổ năm này đã tồn tại!');
    setRegisters([...registers, { id: `R${Date.now()}`, ...values, currentNo: 0 }]);
    setIsRegModal(false); form.resetFields();
  };

  const addDecision = (values: any) => {
    setDecisions([...decisions, { id: `D${Date.now()}`, ...values, viewCount: 0 }]);
    setIsDecModal(false); form.resetFields();
    message.success('Đã ban hành quyết định tốt nghiệp!');
  };

  return (
    <Row gutter={16}>
      <Col span={9}>
        <Card title={<span><BookOutlined /> Sổ Văn Bằng</span>} extra={<Button size="small" icon={<PlusOutlined />} onClick={() => setIsRegModal(true)}>Mở sổ</Button>}>
          <Table dataSource={registers} rowKey="id" pagination={false} size="small" columns={[
            { title: 'Năm', dataIndex: 'year', render: y => <b>{y}</b> },
            { title: 'Số hiện tại', dataIndex: 'currentNo', render: n => <Tag color="blue">{n}</Tag> }
          ]} />
        </Card>
      </Col>

      <Col span={15}>
        <Card title={<span><FileTextOutlined /> Quyết định tốt nghiệp</span>} extra={<Button type="primary" size="small" icon={<PlusOutlined />} onClick={() => setIsDecModal(true)}>Thêm QĐ</Button>}>
          <Table dataSource={decisions} rowKey="id" size="small" columns={[
            { title: 'Số QĐ', dataIndex: 'code' },
            { title: 'Ngày ban hành', dataIndex: 'date' },
            { title: 'Sổ năm', render: (_, r) => registers.find((reg: any) => reg.id === r.registerId)?.year }
          ]} />
        </Card>
      </Col>

      <Modal title="Mở sổ văn bằng mới" visible={isRegModal} onCancel={() => setIsRegModal(false)} onOk={() => form.submit()} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={addRegister}>
          <Form.Item name="year" label="Năm tốt nghiệp" rules={[{ required: true }]}><Input type="number" placeholder="VD: 2026" /></Form.Item>
        </Form>
      </Modal>

      <Modal title="Thêm quyết định tốt nghiệp" visible={isDecModal} onCancel={() => setIsDecModal(false)} onOk={() => form.submit()} destroyOnClose width={600}>
        <Form form={form} layout="vertical" onFinish={addDecision}>
          <Form.Item name="registerId" label="Thuộc sổ văn bằng năm" rules={[{ required: true }]}>
            <Select placeholder="Chọn sổ">
              {registers.map((r: any) => <Select.Option key={r.id} value={r.id}>Sổ năm {r.year}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="code" label="Số hiệu Quyết định" rules={[{ required: true }]}><Input placeholder="VD: 123/QĐ-PTIT" /></Form.Item>
          <Form.Item name="date" label="Ngày ban hành" rules={[{ required: true }]}><Input type="date" /></Form.Item>
          <Form.Item name="summary" label="Trích yếu nội dung"><Input.TextArea rows={3} /></Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};
export default RegisterTab;