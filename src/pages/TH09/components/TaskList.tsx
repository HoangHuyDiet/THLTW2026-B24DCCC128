import { useState } from 'react';
import { Table, Tag, Input, Button, Space, Popconfirm} from 'antd';
import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Task, TaskStatus, Priority } from '../data.d';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  const [searchText, setSearchText] = useState('');

  const columns = [
    { 
      title: 'Tên công việc', 
      dataIndex: 'title', 
      key: 'title',
      filteredValue: [searchText],
      onFilter: (value: any, record: Task) => record.title.toLowerCase().includes((value as string).toLowerCase()),
    },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status',
      filters: [
        { text: 'Todo', value: 'Todo' },
        { text: 'In Progress', value: 'In Progress' },
        { text: 'Done', value: 'Done' },
      ],
      onFilter: (value: any, record: Task) => record.status === value,
      render: (status: TaskStatus) => (
        <Tag color={status === 'Done' ? 'green' : status === 'In Progress' ? 'orange' : 'blue'}>{status}</Tag>
      )
    },
    { 
      title: 'Mức độ', 
      dataIndex: 'priority', 
      key: 'priority',
      render: (p: Priority) => <Tag color={p === 'High' ? 'red' : 'blue'}>{p}</Tag>
    },
    { 
      title: 'Hạn chót', 
      dataIndex: 'deadline', 
      key: 'deadline',
      sorter: (a: Task, b: Task) => a.deadline.localeCompare(b.deadline)
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Task) => (
        <Space>
          <Button icon={<EditOutlined />} type="link" onClick={() => onEdit(record)}>Sửa</Button>
          <Popconfirm title="Xóa task này?" onConfirm={() => onDelete(record.id)}>
            <Button icon={<DeleteOutlined />} type="link" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 16 }}>
      <Input placeholder="Tìm kiếm task..." prefix={<SearchOutlined />} 
             onChange={e => setSearchText(e.target.value)} style={{ marginBottom: 16, width: 300 }} />
      <Table dataSource={tasks} columns={columns} rowKey="id" />
    </div>
  );
};

export default TaskList;