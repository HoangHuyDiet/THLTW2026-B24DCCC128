import { Row, Col, Card, Statistic, } from 'antd';
import Chart from 'react-apexcharts';
import { FireOutlined, ThunderboltOutlined, TrophyOutlined, CalendarOutlined } from '@ant-design/icons';
import { Workout, HealthMetric } from '../data.d';

interface DashboardProps {
  workouts: Workout[];
  metrics: HealthMetric[];
}

const Dashboard = ({ workouts, metrics }: DashboardProps) => {
  const barOptions: any = {
    chart: { id: 'workout-bar', toolbar: { show: false } },
    xaxis: { categories: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'] },
    colors: ['#52c41a'],
    plotOptions: { bar: { borderRadius: 4 } },
    title: { text: 'Số buổi tập trong tháng', align: 'center' }
  };

  const lineOptions: any = {
    chart: { id: 'weight-line' },
    xaxis: { categories: metrics.map((m: any) => m.date) },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#1890ff'],
    title: { text: 'Biến động cân nặng (kg)', align: 'center' }
  };

  return (
    <div style={{ padding: '10px' }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card bordered={false} style={{ background: '#e6f7ff' }}>
            <Statistic title="Buổi tập/tháng" value={workouts.length} prefix={<CalendarOutlined />} valueStyle={{ color: '#1890ff' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ background: '#fff1f0' }}>
            <Statistic title="Calo đã đốt" value={15200} prefix={<FireOutlined />} valueStyle={{ color: '#cf1322' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ background: '#fffbe6' }}>
            <Statistic title="Streak (Ngày)" value={7} prefix={<ThunderboltOutlined />} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} style={{ background: '#f6ffed' }}>
            <Statistic title="Mục tiêu (%)" value={82} prefix={<TrophyOutlined />} valueStyle={{ color: '#52c41a' }} suffix="%" />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card><Chart options={barOptions} series={[{ name: 'Buổi tập', data: [3, 4, 2, 5] }]} type="bar" height={300} /></Card>
        </Col>
        <Col span={12}>
          <Card><Chart options={lineOptions} series={[{ name: 'Cân nặng', data: metrics.map((m: any) => m.weight) }]} type="line" height={300} /></Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;