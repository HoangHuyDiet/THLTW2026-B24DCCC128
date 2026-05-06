import { useState } from 'react';
import { Layout, Tabs } from 'antd';
import { Workout, HealthMetric, Goal, Exercise } from './data.d'; 
import Dashboard from './components/Dashboard';
import WorkoutLog from './components/WorkoutLog';
import HealthMetrics from './components/HealthMetrics';
import GoalManagement from './components/GoalManagement';
import ExerciseLibrary from './components/ExerciseLibrary';

const { Header, Content } = Layout;

const FitnessApp = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([
    { id: '1', date: '2026-04-28', type: 'Cardio', duration: 45, calories: 350, status: 'Hoàn thành', note: 'Chạy bộ công viên' },
    { id: '2', date: '2026-04-29', type: 'Strength', duration: 60, calories: 400, status: 'Hoàn thành', note: 'Tập ngực' },
  ]);

  const [metrics, setMetrics] = useState<HealthMetric[]>([
    { id: '1', date: '2026-04-20', weight: 70, height: 170, heartRate: 72, sleepHours: 7 },
    { id: '2', date: '2026-04-25', weight: 69, height: 170, heartRate: 70, sleepHours: 8 },
    { id: '3', date: '2026-04-29', weight: 68.5, height: 170, heartRate: 68, sleepHours: 7.5 },
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: 'Giảm cân đón hè', type: 'Giảm cân', targetValue: 65, currentValue: 68.5, deadline: '2026-06-01', status: 'Đang thực hiện' }
  ]);

  const [exercises, setExercises] = useState<Exercise[]>([
    { id: '1', name: 'Push up', muscleGroup: 'Chest', difficulty: 'Trung bình', description: 'Chống đẩy cơ bản', calPerHour: 300 }
  ]);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ 
        background: '#001529', 
        color: '#fff', 
        fontSize: '20px', 
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center'
      }}>
        FITNESS TRACKER PRO
      </Header>
      <Content style={{ padding: '24px' }}>
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Tabs defaultActiveKey="1" type="card">
            <Tabs.TabPane tab="Dashboard" key="1">
              <Dashboard workouts={workouts} metrics={metrics} />
            </Tabs.TabPane>
            
            <Tabs.TabPane tab="Nhật ký tập luyện" key="2">
              <WorkoutLog data={workouts} setData={setWorkouts} />
            </Tabs.TabPane>
            
            <Tabs.TabPane tab="Chỉ số sức khỏe" key="3">
              <HealthMetrics data={metrics} setData={setMetrics} />
            </Tabs.TabPane>
            
            <Tabs.TabPane tab="Mục tiêu" key="4">
              <GoalManagement data={goals} setData={setGoals} />
            </Tabs.TabPane>
            
            <Tabs.TabPane tab="Thư viện" key="5">
              <ExerciseLibrary data={exercises} setData={setExercises} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Content>
      <footer style={{ textAlign: 'center', padding: '16px', color: '#8c8c8c' }}>
        Fitness Tracker Pro ©2026 - Phát triển bởi Việt Hoàng PTIT
      </footer>
    </Layout>
  );
};

export default FitnessApp;