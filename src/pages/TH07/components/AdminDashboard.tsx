import { useState } from 'react';
import { Table, Button, Space, Tag, Popconfirm, Row, Col, Card, Modal, Form, Input, Select, message } from 'antd';
import Chart from 'react-apexcharts';

const AdminDashboard = ({ posts, setPosts, tags }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [form] = Form.useForm();

  const handleEdit = (record: any) => {
    setEditingPost(record);
    form.setFieldsValue(record); 
    setIsModalVisible(true);
  };

  const handleOpenAdd = () => {
    setEditingPost(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleSave = (values: any) => {
    if (editingPost) {
      const updatedPosts = posts.map((p: any) => 
        p.id === editingPost.id ? { ...p, ...values } : p
      );
      setPosts(updatedPosts);
      message.success('Đã cập nhật bài viết thành công!');
    } else {
      const newPost = {
        ...values,
        id: Date.now().toString(),
        views: 0,
        date: new Date().toISOString().split('T')[0],
        author: 'Nguyễn Việt Hoàng' 
      };
      setPosts([newPost, ...posts]);
      message.success('Đã đăng bài viết mới!');
    }
    
    setIsModalVisible(false);
    setEditingPost(null);
    form.resetFields();
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter((p: any) => p.id !== id));
    message.success('Đã xóa bài viết.');
  };

  const chartConfig = {
    options: {
      chart: { id: 'views-bar' },
      xaxis: { categories: posts.map((p: any) => p.title.substring(0, 10) + '...') },
      colors: ['#1890ff'],
      plotOptions: { bar: { borderRadius: 4 } }
    },
    series: [{ name: 'Lượt xem', data: posts.map((p: any) => p.views) }]
  };

  const columns = [
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title', width: '30%' },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      render: (s: string) => (
        <Tag color={s === 'Published' ? 'green' : 'orange'}>
          {s === 'Published' ? 'Đã đăng' : 'Bản nháp'}
        </Tag>
      ) 
    },
    { title: 'Thẻ', dataIndex: 'tags', render: (t: string[]) => t?.map(tag => <Tag key={tag}>{tag}</Tag>) },
    { title: 'Lượt xem', dataIndex: 'views', sorter: (a: any, b: any) => a.views - b.views },
    {
      title: 'Hành động',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
          <Popconfirm 
            title="Bạn có chắc chắn muốn xóa bài viết này?" 
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '10px' }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title="Thống kê hiệu quả bài viết">
            <Chart options={chartConfig.options} series={chartConfig.series} type="bar" height={250} />
          </Card>
        </Col>
        <Col span={24}>
          <Card 
            title="Danh sách bài viết" 
            extra={<Button type="primary" onClick={handleOpenAdd}>+ Thêm bài mới</Button>}
          >
            <Table dataSource={posts} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
          </Card>
        </Col>
      </Row>

      <Modal 
        title={editingPost ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"} 
        visible={isModalVisible} 
        onOk={() => form.submit()} 
        onCancel={() => {
          setIsModalVisible(false);
          setEditingPost(null);
        }}
        width={800}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="title" label="Tiêu đề bài viết" rules={[{ required: true }]}>
                <Input placeholder="Nhập tiêu đề..." />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="status" label="Trạng thái" initialValue="Published">
                <Select>
                  <Select.Option value="Published">Đã đăng</Select.Option>
                  <Select.Option value="Draft">Bản nháp</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="slug" label="Slug (Đường dẫn tĩnh)" rules={[{ required: true }]}>
            <Input placeholder="vi-du-tieu-de-bai-viet" />
          </Form.Item>

          <Form.Item name="cover" label="Link ảnh đại diện (URL)">
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item name="tags" label="Chọn thẻ Tag">
            <Select mode="multiple" placeholder="Chọn các thẻ liên quan">
              {tags.map((t: any) => <Select.Option key={t.name} value={t.name}>{t.name}</Select.Option>)}
            </Select>
          </Form.Item>

          <Form.Item name="summary" label="Tóm tắt ngắn">
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item name="content" label="Nội dung bài viết" rules={[{ required: true }]}>
            <Input.TextArea rows={8} placeholder="Viết nội dung tại đây..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;