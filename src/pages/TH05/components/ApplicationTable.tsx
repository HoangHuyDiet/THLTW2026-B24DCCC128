import React, { useState } from 'react';
import { Table, Button, Space, Modal, Tag, Form, Input, Select, Descriptions, Radio } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, HistoryOutlined } from '@ant-design/icons';

const ApplicationTable = ({ apps, clubs, updateStatus, setApps }: any) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'reject' | 'history'>('view');
  const [currentApp, setCurrentApp] = useState<any>(null);
  const [form] = Form.useForm();

  const handleOpenModal = (type: any, record: any) => {
    setModalType(type);
    setCurrentApp(record);
    form.resetFields();
    if (type === 'edit' && record) form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const onFinish = (values: any) => {
    if (modalType === 'reject') {
      updateStatus(currentApp ? [currentApp.id] : selectedRowKeys, 'Rejected', values.rejectReason);
    } else if (modalType === 'edit') {
      setApps((prev: any) => prev.map((a: any) => a.id === currentApp?.id ? { ...a, ...values } : a));
    }
    setIsModalOpen(false);
    setSelectedRowKeys([]);
  };

  const columns = [
    { title: 'Họ tên', dataIndex: 'fullName', fixed: 'left' as const, width: 120 },
    { title: 'CLB', render: (_, r: any) => (clubs || []).find((c: any) => c.id === r.clubId)?.name || 'N/A' },
    { title: 'Trạng thái', dataIndex: 'status', render: (s: any) => (
      <Tag color={s === 'Approved' ? 'green' : s === 'Rejected' ? 'red' : 'gold'}>{s}</Tag>
    )},
    { title: 'Thao tác', fixed: 'right' as const, width: 180, render: (_, r: any) => (
      <Space>
        <Button size="small" icon={<EyeOutlined />} onClick={() => handleOpenModal('view', r)} />
        <Button size="small" icon={<EditOutlined />} onClick={() => handleOpenModal('edit', r)} />
        <Button size="small" icon={<HistoryOutlined />} onClick={() => handleOpenModal('history', r)} />
        <Button size="small" danger icon={<DeleteOutlined />} onClick={() => Modal.confirm({ title: 'Xóa?', onOk: () => setApps(apps.filter((a: any) => a.id !== r.id)) })} />
      </Space>
    )},
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<CheckOutlined />} disabled={!selectedRowKeys.length} onClick={() => { updateStatus(selectedRowKeys, 'Approved'); setSelectedRowKeys([]); }}>Duyệt đã chọn</Button>
        <Button danger icon={<CloseOutlined />} disabled={!selectedRowKeys.length} onClick={() => handleOpenModal('reject', null)}>Từ chối đã chọn</Button>
      </Space>

      <Table 
        rowSelection={{ selectedRowKeys, onChange: (keys: any) => setSelectedRowKeys(keys) }}
        columns={columns} dataSource={apps} rowKey="id" scroll={{ x: 800 }}
      />

      <Modal 
        title={modalType.toUpperCase()} 
        visible={isModalOpen} 
        onCancel={() => setIsModalOpen(false)} 
        onOk={() => (modalType === 'view' || modalType === 'history' ? setIsModalOpen(false) : form.submit())}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {modalType === 'view' && currentApp && (
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Sở trường">{currentApp?.talent || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Lý do">{currentApp?.reason || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Ghi chú Admin">{currentApp?.rejectReason || 'Trống'}</Descriptions.Item>
            </Descriptions>
          )}

          {modalType === 'edit' && (
            <>
              <Form.Item name="fullName" label="Họ tên" rules={[{ required: true }]}><Input /></Form.Item>
              <Form.Item name="clubId" label="CLB"><Select>{(clubs || []).map((c: any) => <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>)}</Select></Form.Item>
              <Form.Item name="gender" label="Giới tính"><Radio.Group><Radio value="Nam">Nam</Radio><Radio value="Nữ">Nữ</Radio></Radio.Group></Form.Item>
            </>
          )}

          {modalType === 'reject' && (
            <Form.Item name="rejectReason" label="Lý do từ chối" rules={[{ required: true }]}><Input.TextArea rows={4} /></Form.Item>
          )}

          {modalType === 'history' && (
            <div style={{ maxHeight: 250, overflowY: 'auto' }}>
              {(currentApp?.history || []).map((h: any, i: number) => (
                <div key={i} style={{ padding: '5px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <Tag color="blue">{h.time}</Tag> <b>{h.action}</b> {h.note && <i>- {h.note}</i>}
                </div>
              ))}
            </div>
          )}
        </Form>
      </Modal>
    </>
  );
};
export default ApplicationTable;