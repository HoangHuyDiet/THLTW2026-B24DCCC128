import { useState } from 'react';
import { Table, Button, Space, Card, Modal, Form, Input, message, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const TagManager = ({ tags, setTags, posts }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);
  const [form] = Form.useForm();

  const handleEdit = (record: any) => {
    setEditingTag(record);
    form.setFieldsValue(record); 
    setIsModalVisible(true);
  };

  const handleOpenAdd = () => {
    setEditingTag(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleSave = (values: any) => {
    if (editingTag) {
      const updatedTags = tags.map((t: any) => 
        t.id === editingTag.id ? { ...t, name: values.name } : t
      );
      setTags(updatedTags);
      message.success('Đã cập nhật thẻ!');
    } else {
      const newTag = { id: Date.now().toString(), name: values.name };
      setTags([...tags, newTag]);
      message.success('Đã thêm thẻ mới!');
    }
    
    setIsModalVisible(false);
    setEditingTag(null);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Tên thẻ Tag',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Tag color="blue">{text}</Tag>
    },
    {
      title: 'Số bài viết sử dụng',
      key: 'postCount',
      render: (_: any, record: any) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
          {posts.filter((p: any) => p.tags.includes(record.name)).length} bài
        </span>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            type="link" 
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button 
            icon={<DeleteOutlined />} 
            type="link" 
            danger 
            onClick={() => {
              Modal.confirm({
                title: 'Xác nhận xóa',
                content: `Bạn có chắc muốn xóa thẻ "${record.name}"?`,
                onOk: () => setTags(tags.filter((t: any) => t.id !== record.id))
              });
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title="Quản lý danh mục thẻ" 
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenAdd}>
          Thêm thẻ mới
        </Button>
      }
    >
      <Table 
        dataSource={tags} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 5 }} 
      />

      <Modal 
        title={editingTag ? "Chỉnh sửa thẻ" : "Thêm thẻ mới"} 
        visible={isModalVisible} 
        onOk={() => form.submit()} 
        onCancel={() => {
          setIsModalVisible(false);
          setEditingTag(null);
        }}
        okText="Lưu lại"
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item 
            name="name" 
            label="Tên thẻ" 
            rules={[{ required: true, message: 'Tên thẻ không được để trống!' }]}
          >
            <Input placeholder="Ví dụ: React, Java, Backend..." />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default TagManager;