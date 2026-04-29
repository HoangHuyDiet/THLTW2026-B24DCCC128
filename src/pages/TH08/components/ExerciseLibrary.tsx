import { useState } from 'react';
import { Row, Col, Card, Tag, Input, Select, Modal, Space, Button, Form, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Exercise } from '../data.d';

interface ExerciseLibraryProps {
  data: Exercise[];
  setData: (data: Exercise[]) => void;
}

const ExerciseLibrary = ({ data, setData }: ExerciseLibraryProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingEx, setEditingEx] = useState<Exercise | null>(null);
  const [selectedEx, setSelectedEx] = useState<Exercise | null>(null);
  
  const [searchText, setSearchText] = useState('');
  const [muscleFilter, setMuscleFilter] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  
  const [form] = Form.useForm();

  const filteredData = data.filter(ex => {
    const matchName = ex.name.toLowerCase().includes(searchText.toLowerCase());
    const matchMuscle = muscleFilter ? ex.muscleGroup === muscleFilter : true;
    const matchLevel = levelFilter ? ex.difficulty === levelFilter : true;
    return matchName && matchMuscle && matchLevel;
  });

  const handleSave = (values: any) => {
    if (editingEx) {
      const newData = data.map(item => item.id === editingEx.id ? { ...item, ...values } : item);
      setData(newData);
      message.success('Đã cập nhật bài tập!');
    } else {
      const newItem = { ...values, id: Date.now().toString() };
      setData([...data, newItem]);
      message.success('Đã thêm bài tập mới vào thư viện!');
    }
    setIsModalVisible(false);
    setEditingEx(null);
    form.resetFields();
  };

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
    message.success('Đã xóa bài tập.');
  };

  return (
    <div>
      <Card style={{ marginBottom: 20 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Input 
              placeholder="Tìm kiếm theo tên bài tập..." 
              prefix={<SearchOutlined />} 
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={12} md={6}>
            <Select 
              placeholder="Nhóm cơ" 
              style={{ width: '100%' }} 
              allowClear
              onChange={setMuscleFilter}
              options={[
                { value: 'Chest', label: 'Chest' }, { value: 'Back', label: 'Back' },
                { value: 'Legs', label: 'Legs' }, { value: 'Shoulders', label: 'Shoulders' },
                { value: 'Arms', label: 'Arms' }, { value: 'Core', label: 'Core' },
                { value: 'Full Body', label: 'Full Body' }
              ]}
            />
          </Col>
          <Col xs={12} md={6}>
            <Select 
              placeholder="Mức độ khó" 
              style={{ width: '100%' }} 
              allowClear
              onChange={setLevelFilter}
              options={[
                { value: 'Dễ', label: 'Dễ' },
                { value: 'Trung bình', label: 'Trung bình' },
                { value: 'Khó', label: 'Khó' }
              ]}
            />
          </Col>
          <Col xs={24} md={4}>
            <Button type="primary" block icon={<PlusOutlined />} onClick={() => { setEditingEx(null); form.resetFields(); setIsModalVisible(true); }}>
              Thêm mới
            </Button>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        {filteredData.map((ex) => (
          <Col xs={24} sm={12} md={8} key={ex.id}>
            <Card 
              hoverable 
              title={ex.name}
              actions={[
                <EditOutlined key="edit" onClick={(e) => { e.stopPropagation(); setEditingEx(ex); form.setFieldsValue(ex); setIsModalVisible(true); }} />,
                <Popconfirm title="Xóa bài tập này?" onConfirm={() => handleDelete(ex.id)}>
                  <DeleteOutlined key="delete" style={{ color: 'red' }} />
                </Popconfirm>
              ]}
              onClick={() => { setSelectedEx(ex); setDetailModalVisible(true); }}
            >
              <div style={{ marginBottom: 8 }}>
                <Tag color="blue">{ex.muscleGroup}</Tag>
                <Tag color={ex.difficulty === 'Khó' ? 'red' : ex.difficulty === 'Trung bình' ? 'orange' : 'green'}>
                  {ex.difficulty}
                </Tag>
              </div>
              <p style={{ height: 45, overflow: 'hidden', textOverflow: 'ellipsis' }}>{ex.description}</p>
              <div style={{ fontWeight: 'bold', color: '#cf1322' }}>
                {ex.calPerHour} kcal/giờ
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal 
        title={editingEx ? "Sửa bài tập" : "Thêm bài tập mới"} 
        visible={isModalVisible} 
        onOk={() => form.submit()} 
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="name" label="Tên bài tập" rules={[{ required: true }]}><Input /></Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="muscleGroup" label="Nhóm cơ" rules={[{ required: true }]}>
                <Select options={[
                  { value: 'Chest' }, { value: 'Back' }, { value: 'Legs' }, 
                  { value: 'Shoulders' }, { value: 'Arms' }, { value: 'Core' }, { value: 'Full Body' }
                ]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="difficulty" label="Mức độ" rules={[{ required: true }]}>
                <Select options={[{ value: 'Dễ' }, { value: 'Trung bình' }, { value: 'Khó' }]} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="calPerHour" label="Calo đốt trung bình/giờ" rules={[{ required: true }]}><Input type="number" /></Form.Item>
          <Form.Item name="description" label="Hướng dẫn thực hiện" rules={[{ required: true }]}><Input.TextArea rows={4} /></Form.Item>
        </Form>
      </Modal>

      <Modal 
        title={`Hướng dẫn: ${selectedEx?.name}`} 
        visible={detailModalVisible} 
        onCancel={() => setDetailModalVisible(false)} 
        footer={[<Button key="close" onClick={() => setDetailModalVisible(false)}>Đóng</Button>]}
      >
        <Space direction="vertical">
          <div><Tag color="blue">{selectedEx?.muscleGroup}</Tag><Tag color="orange">{selectedEx?.difficulty}</Tag></div>
          <p><b>Lượng calo tiêu thụ:</b> {selectedEx?.calPerHour} kcal/giờ</p>
          <p><b>Mô tả & Hướng dẫn:</b></p>
          <div style={{ background: '#f5f5f5', padding: 15, borderRadius: 8 }}>{selectedEx?.description}</div>
        </Space>
      </Modal>
    </div>
  );
};

export default ExerciseLibrary;