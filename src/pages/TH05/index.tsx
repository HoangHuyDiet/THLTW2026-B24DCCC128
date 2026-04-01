import React from 'react';
import { Tabs, Layout, Card, Typography } from 'antd';
import { useClubStore } from './useClubStore';
import ClubTable from './components/ClubTable';
import ApplicationTable from './components/ApplicationTable';
import MemberTable from './components/MemberTable';
import Dashboard from './components/DashBoard';

const ClubManagement = () => {
  const store = useClubStore();

  return (
    <Layout style={{ padding: 24, minHeight: '100vh', background: '#f0f2f5' }}>
      <Card bordered={false}>
        <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>QUẢN LÝ CÂU LẠC BỘ</Typography.Title>
        <Tabs defaultActiveKey="1" type="card">
          <Tabs.TabPane tab="1. CLB" key="1"><ClubTable {...store} /></Tabs.TabPane>
          <Tabs.TabPane tab="2. Duyệt Đơn" key="2"><ApplicationTable {...store} /></Tabs.TabPane>
          <Tabs.TabPane tab="3. Thành viên" key="3"><MemberTable apps={store.apps} clubs={store.clubs} setApps={store.setApps} batchChangeClub={store.batchChangeClub}/></Tabs.TabPane>
          <Tabs.TabPane tab="4. Thống kê" key="4"><Dashboard apps={store.apps} clubs={store.clubs} /></Tabs.TabPane>
        </Tabs>
      </Card>
    </Layout>
  );
};
export default ClubManagement;