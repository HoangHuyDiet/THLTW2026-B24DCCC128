import { useState } from 'react'; 
import { Tabs, Layout } from 'antd';
import { useTravelStore } from './useTravelStore';
import Explore from './components/Explore';
import PlanCreator from './components/PlanCreator';
import BudgetManager from './components/BudgetManager';
import AdminPanel from './components/AdminPanel';

const { Content } = Layout;

const TravelApp = () => {
  const store = useTravelStore();

  const [activeKey, setActiveKey] = useState('1'); 

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ padding: '20px' }}>
        <Tabs 
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)} 
          centered 
          type="line"
        >
          <Tabs.TabPane tab="Khám phá" key="1">
            <Explore {...store} />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Lịch trình" key="2">
            <PlanCreator {...store} goToBudget={() => setActiveKey('3')}/>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Ngân sách" key="3">
            <BudgetManager {...store} />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Quản trị" key="4">
            <AdminPanel 
            destinations={store.destinations} 
            setDestinations={store.setDestinations} 
            />
          </Tabs.TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default TravelApp;