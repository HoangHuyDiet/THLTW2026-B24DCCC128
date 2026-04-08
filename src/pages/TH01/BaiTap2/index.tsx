import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Card } from 'antd';
import { getStoredData, saveStudyData } from './utils';
import { SubjectManager } from './components/SubjectManager';
import { GoalProgress } from './components/GoalProgress';
import SessionTable from './components/SessionTable';

const { TabPane } = Tabs;

const StudyManager: React.FC = () => {
  const [data, setData] = useState(() => getStoredData());

  useEffect(() => saveStudyData(data), [data]);

  return (

      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tiến độ học tập" key="1">
            <SessionTable 
              sessions={data.sessions} 
              subjects={data.subjects} 
              setSessions={(s: any) => setData({...data, sessions: s})} 
            />
          </TabPane>
          <TabPane tab="Danh mục môn" key="2">
            <SubjectManager 
              subjects={data.subjects} 
              setSubjects={(s: any) => setData({...data, subjects: s})} 
            />
          </TabPane>
          <TabPane tab="Mục tiêu tháng" key="3">
            <GoalProgress 
              sessions={data.sessions} 
              goal={data.goal} 
              setGoal={(g: any) => setData({...data, goal: g})} 
            />
          </TabPane>
        </Tabs>
      </Card>
  );
};
export default StudyManager;