import React from 'react';
import { Table, Button, Card, Form, Input, Select, Tag, Popconfirm, message } from 'antd';
import { SettingOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FormField } from '../data';


interface ConfigProps {
  fields: FormField[];
  setFields: (fields: FormField[]) => void;
}

const ConfigTab: React.FC<ConfigProps> = ({ fields, setFields }) => {
  const [form] = Form.useForm();

  const handleAddField = (values: any) => {
    const newField: FormField = { id: `F${Date.now()}`, ...values };
    setFields([...fields, newField]);
    form.resetFields();
    message.success('Đã thêm trường cấu hình mới!');
  };

  return (
    <Card title={<span><SettingOutlined /> Cấu hình biểu mẫu phụ lục</span>}>
      <Form form={form} layout="inline" onFinish={handleAddField} style={{ marginBottom: 24 }}>
        <Form.Item name="label" rules={[{ required: true, message: 'Nhập tên trường' }]}>
          <Input placeholder="Tên trường (VD: Nơi sinh)" />
        </Form.Item>
        <Form.Item name="type" rules={[{ required: true }]}>
          <Select style={{ width: 160 }} placeholder="Kiểu dữ liệu">
            <Select.Option value="String">Văn bản (String)</Select.Option>
            <Select.Option value="Number">Số (Number)</Select.Option>
            <Select.Option value="Date">Ngày tháng (Date)</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Thêm cấu hình
          </Button>
        </Form.Item>
      </Form>

      <Table 
        dataSource={fields} 
        rowKey="id" 
        pagination={false} 
        columns={[
          { title: 'Tên trường', dataIndex: 'label', key: 'label' },
          { 
            title: 'Kiểu dữ liệu', 
            dataIndex: 'type', 
            render: (type) => (
              <Tag color={type === 'String' ? 'blue' : type === 'Number' ? 'green' : 'orange'}>
                {type}
              </Tag>
            )
          },
          { 
            title: 'Thao tác', 
            render: (_, record) => (
              <Popconfirm title="Xóa trường này?" onConfirm={() => setFields(fields.filter(f => f.id !== record.id))}>
                <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
              </Popconfirm>
            )
          }
        ]} 
      />
    </Card>
  );
};

export default ConfigTab;