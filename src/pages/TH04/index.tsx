import React from 'react';
import { Tabs, Layout, Card, Typography } from 'antd';
import { useDiplomaStore } from './useDiplomaStore';
import RegisterTab from './components/RegisterTab';
import ConfigTab from './components/ConfigTab';
import DiplomaTab from './components/DiplomaTab';
import LookupTab from './components/LookUpTab';

const {Title} = Typography;

const DiplomaManagement = () => {
  const store = useDiplomaStore();

  return (
    <Layout style={{ padding: '24px', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card bordered={false} style={{ borderRadius: '12px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>HỆ THỐNG QUẢN LÝ SỔ VĂN BẰNG</Title>
        </div>

        <Tabs defaultActiveKey="3" type="card">
          <Tabs.TabPane tab="1. Sổ & Quyết định" key="1"><RegisterTab {...store} /></Tabs.TabPane>
          <Tabs.TabPane tab="2. Biểu mẫu" key="2"><ConfigTab {...store} /></Tabs.TabPane>
          <Tabs.TabPane tab="3. Quản lý Văn bằng" key="3"><DiplomaTab {...store} /></Tabs.TabPane>
          <Tabs.TabPane tab="4. Tra cứu công khai" key="4"><LookupTab {...store} /></Tabs.TabPane>
        </Tabs>
      </Card>
    </Layout>
  );
};

export default DiplomaManagement;