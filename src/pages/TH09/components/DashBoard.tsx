import { Row, Col, Card, Statistic } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, FormOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Task } from '../data';

interface DashboardProps {
  tasks: Task[];
}

const Dashboard: React.FC<DashboardProps> = ({ tasks}) => {
  const completed = tasks.filter(t => t.status === 'Done').length;
  const today = moment().format('YYYY-MM-DD');
  const overdue = tasks.filter(t => t.deadline < today && t.status !== 'Done').length;

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false} style={{ background: '#e6f7ff' }}>
            <Statistic title="Tổng số Task" value={tasks.length} prefix={<FormOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} style={{ background: '#f6ffed' }}>
            <Statistic title="Đã hoàn thành" value={completed} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#3f9142' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} style={{ background: '#fff1f0' }}>
            <Statistic title="Quá hạn" value={overdue} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#cf1322' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;