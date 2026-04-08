import React, { useState } from 'react';
import { Table, Button, Modal, Select, Tag, Typography } from 'antd';
import { SwapOutlined } from '@ant-design/icons';

const { Text } = Typography;

const MemberTable = ({ apps, clubs, batchChangeClub }: any) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetClubId, setTargetClubId] = useState<string | null>(null);

  const members = (apps || []).filter((a: any) => a.status === 'Approved');

  const handleBatchTransfer = () => {
    if (!targetClubId) {
      return Modal.warning({ title: 'Thông báo', content: 'Vui lòng chọn Câu lạc bộ đích!' });
    }
    
    if (batchChangeClub) {
      batchChangeClub(selectedRowKeys, targetClubId);
      
      Modal.success({
        title: 'Thành công',
        content: `Đã chuyển thành công ${selectedRowKeys.length} thành viên!`,
      });
    } else {
      console.error("Lỗi: Chưa truyền hàm batchChangeClub vào MemberTable!");
    }

    setIsModalOpen(false);
    setSelectedRowKeys([]);
    setTargetClubId(null);
  };

  const columns = [
    { 
      title: 'Họ tên', 
      dataIndex: 'fullName', 
      key: 'fullName', 
      sorter: (a: any, b: any) => (a.fullName || '').localeCompare(b.fullName || '') 
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'SĐT', dataIndex: 'phone', key: 'phone' },
    { 
      title: 'Câu lạc bộ hiện tại', 
      key: 'club',
      render: (_, r: any) => {
        const club = (clubs || []).find((c: any) => c.id === r.clubId);
        return <Tag color="blue">{club?.name || 'N/A'}</Tag>;
      }
    },
    {
      title: 'Sở trường',
      dataIndex: 'talent',
      key: 'talent',
    }
  ];

  return (
    <>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text strong>Danh sách thành viên chính thức ({members.length})</Text>
        
        <Button 
          type="primary" 
          icon={<SwapOutlined />} 
          disabled={selectedRowKeys.length === 0}
          onClick={() => setIsModalOpen(true)}
        >
          Chuyển CLB cho {selectedRowKeys.length} thành viên
        </Button>
      </div>

      <Table 
        rowSelection={{
          selectedRowKeys,
          onChange: (keys: any) => setSelectedRowKeys(keys),
        }}
        columns={columns} 
        dataSource={members} 
        rowKey="id" 
        size="small"
        pagination={{ pageSize: 5 }}
      />

      <Modal 
        title="Chuyển Câu lạc bộ hàng loạt" 
        visible={isModalOpen}
        onOk={handleBatchTransfer} 
        onCancel={() => setIsModalOpen(false)}
        okText="Xác nhận chuyển"
        cancelText="Hủy"
        destroyOnClose
      >
        <div style={{ marginBottom: 16 }}>
          <Text>Bạn đang thực hiện chuyển Câu lạc bộ cho <Text type="danger" strong>{selectedRowKeys.length}</Text> thành viên đã chọn.</Text>
        </div>
        
        <Text strong>Chọn Câu lạc bộ muốn chuyển đến:</Text>
        <Select 
          style={{ width: '100%', marginTop: 8 }} 
          placeholder="-- Chọn danh sách CLB --"
          onChange={(val) => setTargetClubId(val)}
        >
          {(clubs || []).map((c: any) => (
            <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
          ))}
        </Select>
      </Modal>
    </>
  );
};

export default MemberTable;