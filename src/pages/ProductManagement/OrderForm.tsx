import React, { useState } from 'react';
import { Modal, Form, Input, Select, InputNumber, Row, Col, Divider } from 'antd';
import { ProductItem } from '../../models/dataProduct';

interface OrderFormProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  products: ProductItem[];
}

const OrderForm: React.FC<OrderFormProps> = ({ visible, onCancel, onFinish, products }) => {
  const [form] = Form.useForm();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        onFinish(values);
        form.resetFields();
        setSelectedIds([]);
      })
      .catch((info) => console.log(info));
  };

  return (
    <Modal
      title="TẠO ĐƠN HÀNG MỚI"
      visible={visible}
      onOk={handleOk}
      onCancel={() => { form.resetFields(); setSelectedIds([]); onCancel(); }}
      width={700}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}><Form.Item name="customerName" label="Tên khách hàng" rules={[{ required: true }]}><Input /></Form.Item></Col>
          <Col span={12}><Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, pattern: /^\d{10,11}$/ }]}><Input /></Form.Item></Col>
        </Row>
        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}><Input /></Form.Item>
        <Divider />
        <Form.Item name="productIds" label="Chọn sản phẩm" rules={[{ required: true }]}>
          <Select mode="multiple" onChange={setSelectedIds} optionFilterProp="children">
            {products.map(p => (
              <Select.Option key={p.id} value={p.id} disabled={p.quantity <= 0}>
                {p.name} (Kho: {p.quantity})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {selectedIds.map(id => {
          const product = products.find(p => p.id === id);
          return (
            <Row gutter={16} key={id} style={{ marginBottom: 12, alignItems: 'center' }}>
              <Col span={16}>{product?.name}</Col>
              <Col span={8}>
                <Form.Item name={['quantities', id]} noStyle rules={[{ required: true }, { type: 'number', min: 1, max: product?.quantity }]}>
                  <InputNumber placeholder="Số lượng" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          );
        })}
      </Form>
    </Modal>
  );
};

export default OrderForm;