import React from 'react';
import { Card, Row, Col, Statistic, Table, Divider } from 'antd';

const Statistics = ({ bookings, services, staffs }: any) => {
  const done = bookings.filter((b: any) => b.status === 'Hoàn thành');
  
  const total = done.reduce((acc: number, b: any) => acc + (services.find((s:any)=>s.id===b.serviceId)?.price || 0), 0);

  const revByStaff = staffs.map((st: any) => {
    const stBookings = done.filter((b: any) => b.staffId === st.id);
    const rev = stBookings.reduce((sum: number, b: any) => sum + (services.find((s:any)=>s.id===b.serviceId)?.price || 0), 0);
    return { name: st.name, count: stBookings.length, rev };
  });

  return (
    <div style={{ background: '#f5f5f5', padding: '20px' }}>
      <Row gutter={16} style={{marginBottom: 20}}>
        <Col span={12}><Card><Statistic title="Doanh thu thực tế" value={total} suffix="đ" precision={0} /></Card></Col>
        <Col span={12}><Card><Statistic title="Lịch hoàn thành" value={done.length} /></Card></Col>
      </Row>
      <Card title="Doanh thu theo Nhân viên">
        <Table dataSource={revByStaff} pagination={false} size="small" columns={[
          { title: 'Nhân viên', dataIndex: 'name' },
          { title: 'Số lịch', dataIndex: 'count' },
          { title: 'Doanh thu', dataIndex: 'rev', render: v => <b>{v.toLocaleString()}đ</b> }
        ]} />
      </Card>
    </div>
  );
};
export default Statistics;