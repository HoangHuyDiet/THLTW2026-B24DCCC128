import { useMemo } from 'react';
import { Table, Button, Select, Row, Col, Statistic, Divider, Typography, Card, Modal } from 'antd';
import { DeleteOutlined, FieldTimeOutlined, WalletOutlined, CalendarOutlined } from '@ant-design/icons';

const { Text } = Typography;

const PlanCreator = ({ itinerary, removeFromPlan, updateDay, goToBudget }: any) => {
  const days = [1, 2, 3, 4, 5];

  const totals = useMemo(() => {
    const budget = (itinerary || []).reduce((sum: number, item: any) => 
      sum + (Number(item.price) || 0) + (Number(item.transportCost) || 0), 0);
    const time = (itinerary || []).reduce((sum: number, item: any) => 
      sum + (Number(item.visitTime) || 0) + (Number(item.travelTime) || 0), 0);
    return { budget, time };
  }, [itinerary]);

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'day',
      key: 'day',
      width: 100,
      align: 'center' as const,
      sorter: (a: any, b: any) => a.day - b.day,
      defaultSortOrder: 'ascend' as const,
      render: (day: number, record: any) => (
        <Select 
          defaultValue={day} 
          size="small" 
          style={{ width: 80 }}
          onChange={(v) => updateDay(record.planId, Number(v))}
        >
          {days.map(d => <Select.Option key={d} value={d}>{d}</Select.Option>)}
        </Select>
      ),
    },
    {
      title: 'Địa điểm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Chi tiết (Tham quan/Di chuyển)',
      key: 'details',
      render: (_: any, record: any) => (
        <Text type="secondary">
          {record.visitTime}h / {record.travelTime}h
        </Text>
      ),
    },
    {
      title: 'Chi phí dự kiến',
      key: 'cost',
      align: 'right' as const,
      render: (_: any, record: any) => {
        const cost = (Number(record.price) || 0) + (Number(record.transportCost) || 0);
        return <Text style={{ color: '#f5222d' }}>{cost.toLocaleString()}đ</Text>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 80,
      align: 'center' as const,
      render: (_: any, record: any) => (
        <Button 
          danger 
          type="text"
          icon={<DeleteOutlined />} 
          onClick={() => removeFromPlan(record.planId)} 
        />
      ),
    },
  ];

  const handleComplete = () => {
    if (!itinerary || itinerary.length === 0) {
      Modal.warning({
        title: 'Thông báo',
        content: 'Vui lòng thêm địa điểm vào lịch trình trước khi hoàn tất!',
      });
      return;
    }

    Modal.success({
      title: 'Hoàn tất lịch trình!',
      content: 'Hệ thống sẽ chuyển sang mục Ngân sách để bạn xem thống kê chi tiết.',
      onOk: () => {
        if (goToBudget) goToBudget();
      },
    });
  };

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} xl={17}>
        <Card 
          title={<span><CalendarOutlined style={{ marginRight: 8 }} />Lịch trình</span>} 
          bodyStyle={{ padding: 0 }} 
        >
          <Table 
            dataSource={itinerary} 
            columns={columns} 
            rowKey="planId"
            pagination={false}
            locale={{ emptyText: 'Chưa có điểm đến nào trong lịch trình của bạn.' }}
            scroll={{ x: 600 }}
          />
        </Card>
      </Col>

      <Col xs={24} xl={7}>
        <Card title="Tổng quan chuyến đi" bordered={false} style={{ background: '#fafafa' }}>
          <Statistic 
            title="Tổng ngân sách" 
            value={totals.budget} 
            prefix={<WalletOutlined />} 
            suffix="VNĐ" 
            valueStyle={{ color: '#3f8600' }}
          />
          <Divider />
          <Statistic 
            title="Tổng thời gian" 
            value={totals.time} 
            prefix={<FieldTimeOutlined />} 
            suffix="Giờ" 
          />
          <div style={{ marginTop: 24 }}>
            <Text type="secondary" size="small">
              * Hệ thống tự động tính toán dựa trên phí tham quan và phí di chuyển dự kiến.
            </Text>
          </div>
          <Button type="primary" block size="large" style={{ marginTop: 24 }} onClick={handleComplete}>
            Hoàn tất lịch trình
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default PlanCreator;