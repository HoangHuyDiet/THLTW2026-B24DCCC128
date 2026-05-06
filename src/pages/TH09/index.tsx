import { useState } from 'react';
import { Layout, Tabs, Button, Modal, Form, Input, DatePicker, Select, Typography } from 'antd';
import { useTaskStore } from './useTaskStore';
import Dashboard from './components/DashBoard';
import KanbanBoard from './components/KanbanBoard';
import TaskList from './components/TaskList';
import { Task } from './data.d';
import moment from 'moment';

const TaskApp = () => {
  const { tasks, setTasks, addTask, updateTask, deleteTask } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form] = Form.useForm();

  const openAdd = () => {
    setEditingTask(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    form.setFieldsValue({ ...task, deadline: moment(task.deadline) });
    setIsModalOpen(true);
  };

  const handleFinish = (values: any) => {
    const taskData: Task = {
      ...values,
      id: editingTask ? editingTask.id : Date.now().toString(),
      status: editingTask ? editingTask.status : 'Todo',
      deadline: values.deadline.format('YYYY-MM-DD'),
      tags: values.tags || []
    };

    if (editingTask) updateTask(taskData);
    else addTask(taskData);

    setIsModalOpen(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ background: '#001529', display: 'flex', justifyContent: 'space-between', padding: '0 24px' }}>
        <Typography.Title level={4} style={{ color: '#fff', margin: '15px 0' }}>Hệ thống quản lý công việc</Typography.Title>
        <Button type="primary" onClick={openAdd}>+ Công việc mới</Button>
      </Layout.Header>

      <Layout.Content style={{ padding: 24 }}>
        <Tabs defaultActiveKey="1" type="card">
          <Tabs.TabPane tab="Thống kê" key="1"><Dashboard tasks={tasks} /></Tabs.TabPane>
          <Tabs.TabPane tab="Kanban Board" key="2"><KanbanBoard tasks={tasks} setTasks={setTasks} /></Tabs.TabPane>
          <Tabs.TabPane tab="Danh sách chi tiết" key="3"><TaskList tasks={tasks} onDelete={deleteTask} onEdit={openEdit} /></Tabs.TabPane>
        </Tabs>
      </Layout.Content>

      <Modal 
        title={editingTask ? "Cập nhật công việc" : "Thêm công việc mới"} 
        visible={isModalOpen} 
        onOk={() => form.submit()} 
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="title" label="Tên công việc" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="description" label="Mô tả"><Input.TextArea /></Form.Item>
          <Form.Item name="deadline" label="Hạn chót" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="priority" label="Mức độ ưu tiên" initialValue="Medium">
            <Select options={[{ value: 'High' }, { value: 'Medium' }, { value: 'Low' }]} />
          </Form.Item>
          <Form.Item name="tags" label="Tags (Cách nhau bằng dấu phẩy)">
             <Select mode="tags" placeholder="Gõ rồi Enter" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default TaskApp;