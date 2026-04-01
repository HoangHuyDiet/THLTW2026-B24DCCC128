import React from 'react';
import { Column } from '@ant-design/plots';
import { Card, Row, Col, Statistic } from 'antd';

const Dashboard = ({ apps, clubs }: any) => {
  const chartData: any[] = [];
  (clubs || []).forEach((c: any) => {
    ['Pending', 'Approved', 'Rejected'].forEach(s => {
      chartData.push({ 
        club: c.name, 
        type: s, 
        value: (apps || []).filter((a: any) => a.clubId === c.id && a.status === s).length 
      });
    });
  });

  const config = {
    data: chartData, isGroup: true, xField: 'club', yField: 'value', seriesField: 'type',
    color: ['#fadb14', '#52c41a', '#ff4d4f'],
    appendPadding: 10,
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={8}><Card><Statistic title="CLB" value={clubs?.length} /></Card></Col>
        <Col span={8}><Card><Statistic title="Đã duyệt" value={apps?.filter((a:any)=>a.status==='Approved').length} valueStyle={{color: 'green'}} /></Card></Col>
        <Col span={8}><Card><Statistic title="Đang chờ" value={apps?.filter((a:any)=>a.status==='Pending').length} valueStyle={{color: 'orange'}} /></Card></Col>
      </Row>
      <Card title="Thống kê trạng thái đơn">
        <div style={{ height: 350 }}>
          {chartData.length > 0 ? <Column {...(config as any)} /> : "Chưa có dữ liệu"}
        </div>
      </Card>
    </div>
  );
};
export default Dashboard;