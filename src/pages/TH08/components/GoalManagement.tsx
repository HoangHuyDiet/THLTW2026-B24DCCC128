import { useState } from 'react';
import { Segmented, Row, Col, Card, Progress, Input, Button, Drawer, Tag, Popconfirm, Form, Select, DatePicker, message } from 'antd';
import { Goal } from '../data.d';

interface GoalManagementProps {
  data: Goal[];
  setData: (data: Goal[]) => void;
}

const GoalManagement = ({ data, setData }: GoalManagementProps) => {
  const [statusFilter, setStatusFilter] = useState('Đang thực hiện');
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleUpdateCurrentValue = (id: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    const newData = data.map((g: any) => 
      g.id === id ? { ...g, currentValue: numValue } : g
    );
    setData(newData);
  };

  const handleSaveGoal = (values: any) => {
    const newGoal = {
      ...values,
      id: Date.now().toString(),
      currentValue: values.currentValue || 0,
      deadline: values.deadline.format('YYYY-MM-DD'),
      status: 'Đang thực hiện'
    };
    
    setData([...data, newGoal]); 
    setOpen(false);
    form.resetFields();
    message.success('Đã thiết lập mục tiêu mới!');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Segmented 
          options={['Đang thực hiện', 'Đã đạt', 'Đã hủy']} 
          value={statusFilter} 
          onChange={(v) => setStatusFilter(v as string)} 
        />
        <Button type="primary" onClick={() => setOpen(true)}>Thiết lập mục tiêu mới</Button>
      </div>

      <Row gutter={[16, 16]}>
        {data.filter((g: any) => g.status === statusFilter).map((goal: any) => (
          <Col span={8} key={goal.id}>
            <Card title={goal.title} extra={<Tag color="purple">{goal.type}</Tag>}>
              <Progress 
                percent={Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100))} 
                status="active" 
              />
              
              <div style={{ marginTop: 15 }}>
                Tiến độ: 
                <Input 
                  style={{ width: 80, marginLeft: 8 }} 
                  type="number"
                  defaultValue={goal.currentValue} 
                  onBlur={(e) => handleUpdateCurrentValue(goal.id, e.target.value)}
                /> / {goal.targetValue}
              </div>
              
              <div style={{ marginTop: 10, color: '#8c8c8c' }}>
                Deadline: {goal.deadline}
              </div>

              <Popconfirm title="Xóa mục tiêu này?" onConfirm={() => setData(data.filter((i:any)=>i.id !== goal.id))}>
                <Button type="link" danger style={{ padding: 0, marginTop: 10 }}>Xóa</Button>
              </Popconfirm>
            </Card>
          </Col>
        ))}
      </Row>

      <Drawer 
        title="Thiết lập mục tiêu mới" 
        width={400} 
        onClose={() => setOpen(false)} 
        visible={open}
        destroyOnClose 
      >
        <Form form={form} layout="vertical" onFinish={handleSaveGoal}>
          <Form.Item name="title" label="Tên mục tiêu" rules={[{ required: true }]}><Input /></Form.Item>
          
          <Form.Item name="type" label="Loại mục tiêu" rules={[{ required: true }]}>
            <Select options={[
              {label: 'Giảm cân', value:'Giảm cân'}, 
              {label: 'Tăng cơ', value:'Tăng cơ'}, 
              {label: 'Sức bền', value:'Sức bền'},
              {label: 'Khác', value:'Khác'}
            ]} />
          </Form.Item>

          <Form.Item name="targetValue" label="Giá trị mục tiêu (kg/phút/buổi)" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="deadline" label="Ngày hết hạn" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>Tạo mục tiêu</Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default GoalManagement;