import React, { useState } from 'react';
import { Tabs, Layout, Card, Typography } from 'antd';
import { UserOutlined, CustomerServiceOutlined, CalendarOutlined, StarOutlined, BarChartOutlined } from '@ant-design/icons';
import StaffManager from './components/StaffManager';
import ServiceManager from './components/ServiceManager';
import BookingForm from './components/BookingForm';
import ReviewManager from './components/ReviewManager';
import Statistics from './components/Statistics';

const TH03Page = () => {
  const [staffs, setStaffs] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  const commonProps = { staffs, setStaffs, services, setServices, bookings, setBookings, reviews, setReviews };

  return (
    <Layout style={{ padding: 24, minHeight: '100vh' }}>
      <Card title={<Typography.Title level={2} style={{textAlign: 'center'}}>Quản lý dịch vụ</Typography.Title>}>
        <Tabs defaultActiveKey="1" type="card">
          <Tabs.TabPane tab={<span><UserOutlined/> Nhân viên</span>} key="1"><StaffManager {...commonProps} /></Tabs.TabPane>
          <Tabs.TabPane tab={<span><CustomerServiceOutlined/> Dịch vụ</span>} key="2"><ServiceManager {...commonProps} /></Tabs.TabPane>
          <Tabs.TabPane tab={<span><CalendarOutlined/> Đặt lịch</span>} key="3"><BookingForm {...commonProps} /></Tabs.TabPane>
          <Tabs.TabPane tab={<span><StarOutlined/> Đánh giá</span>} key="4"><ReviewManager {...commonProps} /></Tabs.TabPane>
          <Tabs.TabPane tab={<span><BarChartOutlined/> Thống kê</span>} key="5"><Statistics {...commonProps} /></Tabs.TabPane>
        </Tabs>
      </Card>
    </Layout>
  );
};
export default TH03Page;