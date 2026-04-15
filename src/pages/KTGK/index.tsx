import React, { useState } from 'react';
import { Card, Button, Space, Input, Select, Typography } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useRoomStore } from './useRoomStore';
import RoomTable from './components/RoomTable';
import RoomModal from './components/RoomModal';

const { Title } = Typography;

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: { 
    padding: '24px', 
    background: '#f0f2f5', 
    minHeight: '100vh' 
  },
  card: { 
    borderRadius: '8px', 
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)' 
  },
  toolBar: { 
    marginBottom: '24px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  }
};

const RoomManagement = () => {
  const { rooms, supervisors, saveRoom, deleteRoom } = useRoomStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');

  const filteredData = rooms.filter(r => 
    (r.code.toLowerCase().includes(search.toLowerCase()) || 
     r.name.toLowerCase().includes(search.toLowerCase())) && 
    (type === 'All' || r.type === type)
  );

  return (
    <div style={styles.wrapper}>
      <Card style={styles.card}>
        <Title level={3} style={{ marginBottom: 24, textAlign: 'center', color: '#1890ff' }}>
          HỆ THỐNG QUẢN LÝ PHÒNG HỌC
        </Title>

        <div style={styles.toolBar}>
          <Space size="middle">
            <Input 
              placeholder="Mã hoặc tên phòng..." 
              prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} 
              onChange={e => setSearch(e.target.value)} 
              style={{ width: 250 }}
              allowClear
            />
            <Select 
              defaultValue="All" 
              style={{ width: 160 }} 
              onChange={setType}
            >
              <Select.Option value="All">Tất cả loại phòng</Select.Option>
              <Select.Option value="Lý thuyết">Lý thuyết</Select.Option>
              <Select.Option value="Thực hành">Thực hành</Select.Option>
              <Select.Option value="Hội trường">Hội trường</Select.Option>
            </Select>
          </Space>

          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            size="large"
            onClick={() => { setEditingRoom(null); setIsModalVisible(true); }}
          >
            Thêm phòng mới
          </Button>
        </div>

        <RoomTable 
          data={filteredData} 
          onEdit={(r: any) => { setEditingRoom(r); setIsModalVisible(true); }}
          onDelete={deleteRoom} 
        />

        <RoomModal 
          visible={isModalVisible}
          supervisors={supervisors}
          editingRoom={editingRoom}
          onCancel={() => setIsModalVisible(false)}
          onSave={(values: any) => {
            const success = saveRoom(values, editingRoom ? (editingRoom as any).id : null);
            if (success) setIsModalVisible(false);
          }}
        />
      </Card>
    </div>
  );
};

export default RoomManagement;