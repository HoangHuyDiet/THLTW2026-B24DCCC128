import { Table, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const RoomTable = ({ data, onEdit, onDelete }: any) => {
  const columns = [
    { title: 'Mã', dataIndex: 'code' },
    { title: 'Tên', dataIndex: 'name' },
    { title: 'Chỗ ngồi', dataIndex: 'capacity', sorter: (a: any, b: any) => a.capacity - b.capacity },
    { 
      title: 'Loại', 
      dataIndex: 'type',
      render: (t: string) => <Tag color="blue">{t}</Tag>
    },
    { title: 'Phụ trách', dataIndex: 'supervisor' },
    {
      title: 'Thao tác',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => onEdit(record)} />
          <Button icon={<DeleteOutlined />} size="small" danger onClick={() => onDelete(record)} />
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default RoomTable;