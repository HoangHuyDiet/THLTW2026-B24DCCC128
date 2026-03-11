import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Card } from 'antd';

import BaiTap1 from './BaiTap1';
import BaiTap2 from './BaiTap2';

const { TabPane } = Tabs;

const TH01Page: React.FC = () => {
  return (
    <PageContainer title="Thực hành 01">
      <Card>
        <Tabs defaultActiveKey="1" type="line" size="large">
          <TabPane tab="Bài 1: Đoán Số" key="1">
            <BaiTap1 />
          </TabPane>
          <TabPane tab="Bài 2: Quản lý học tập" key="2">
            <BaiTap2 />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default TH01Page;