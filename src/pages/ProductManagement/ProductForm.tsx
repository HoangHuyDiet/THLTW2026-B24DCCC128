import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

interface ProductFormProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ visible, onCancel, onFinish }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible, form]);

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        onFinish(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Thêm sản phẩm mới"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Lưu"
      cancelText="Hủy"
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Giá (VNĐ)"
          name="price"
          rules={[
            { required: true, message: 'Giá là bắt buộc!' },
            { type: 'number', min: 1, message: 'Giá phải là số dương!' }
          ]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Nhập giá" />
        </Form.Item>

        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[
            { required: true, message: 'Số lượng là bắt buộc!' },
            { type: 'integer', min: 1, message: 'Số lượng phải là số nguyên dương!' }
          ]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="Nhập số lượng" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductForm;