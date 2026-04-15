import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';

const RoomModal = ({ visible, onCancel, onSave, editingRoom, supervisors }: any) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (editingRoom) form.setFieldsValue(editingRoom);
      else form.resetFields();
    }
  }, [visible, editingRoom]);

  return (
    <Modal
      title={editingRoom ? "Sửa phòng" : "Thêm phòng"}
      visible={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onSave}>
        <Form.Item name="code" label="Mã phòng" rules={[{ required: true }, { max: 10 }]}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Tên phòng" rules={[{ required: true }, { max: 50 }]}>
          <Input />
        </Form.Item>
        <Form.Item name="capacity" label="Số chỗ (10-200)" rules={[{ required: true }]}>
          <InputNumber min={10} max={200} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="type" label="Loại phòng" rules={[{ required: true }]}>
          <Select placeholder="Chọn loại">
            <Select.Option value="Lý thuyết">Lý thuyết</Select.Option>
            <Select.Option value="Thực hành">Thực hành</Select.Option>
            <Select.Option value="Hội trường">Hội trường</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="supervisor" label="Người phụ trách" rules={[{ required: true }]}>
          <Select>
            {supervisors.map((s: string) => <Select.Option key={s} value={s}>{s}</Select.Option>)}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoomModal;