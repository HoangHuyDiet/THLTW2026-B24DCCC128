import { useState } from 'react';
import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'; 
import { Room } from './data';

export const useRoomStore = () => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', code: 'A2-201', name: 'Phòng Lý thuyết 1', capacity: 45, type: 'Lý thuyết', supervisor: 'Nguyễn Văn A' },
    { id: '2', code: 'A2-202', name: 'Phòng Thực hành 1', capacity: 25, type: 'Thực hành', supervisor: 'Trần Thị B' },
  ]);

  const supervisors = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D'];

  const saveRoom = (values: any, editingId: string | null) => {
    const isDuplicate = rooms.some(r => 
      (r.code === values.code || r.name === values.name) && r.id !== editingId
    );
    if (isDuplicate) {
      message.error('Mã phòng hoặc Tên phòng đã tồn tại!');
      return false;
    }

    if (editingId) {
      setRooms(rooms.map(r => r.id === editingId ? { ...r, ...values } : r));
      message.success('Cập nhật thành công!');
    } else {
      setRooms([...rooms, { ...values, id: Date.now().toString() }]);
      message.success('Thêm mới thành công!');
    }
    return true;
  };

  const deleteRoom = (record: Room) => {
    console.log("Đang gọi hàm xóa phòng cho Record", record);
    if (record.capacity >= 30) {
      Modal.error({ 
        title: 'Không thể xóa!', 
        content: 'Chỉ cho phép xóa các phòng học có dưới 30 chỗ ngồi theo quy định.' 
      });
      return;
    }

    Modal.confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa phòng ${record.name} (${record.code}) không?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        setRooms(rooms.filter(r => r.id !== record.id));
        message.success('Đã xóa phòng học thành công.');
      },
    });
  };

  return { rooms, supervisors, saveRoom, deleteRoom };
};