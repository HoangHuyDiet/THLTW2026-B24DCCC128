import { useMemo } from 'react';
import { Card, Row, Col, Statistic, Progress, Alert, Divider, Empty } from 'antd';
import { Pie } from '@ant-design/plots';
import { WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';

const BudgetManager = ({ itinerary, budgetLimit }: any) => {
  const { stats, totalSpent } = useMemo(() => {
    const s = { food: 0, stay: 0, transport: 0 };
    (itinerary || []).forEach((item: any) => {
      s.food += (Number(item.foodCost) || 0);
      s.stay += (Number(item.stayCost) || 0);
      s.transport += (Number(item.transportCost) || 0);
    });
    const total = s.food + s.stay + s.transport;
    return { stats: s, totalSpent: total };
  }, [itinerary]);

  const isOverBudget = totalSpent > budgetLimit;
  const percent = Math.round((totalSpent / budgetLimit) * 100);

  const chartData = [
    { type: 'Ăn uống', value: stats.food },
    { type: 'Lưu trú', value: stats.stay },
    { type: 'Di chuyển', value: stats.transport },
  ].filter(d => d.value > 0);

  const config = {
    data: chartData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: { type: 'outer', content: '{name} {percentage}' },
    color: ['#1890ff', '#13c2c2', '#faad14'],
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          {itinerary.length > 0 && (
            isOverBudget ? (
              <Alert
                message="CẢNH BÁO VƯỢT NGÂN SÁCH!"
                description={`Bạn đã chi tiêu vượt quá hạn mức ${(totalSpent - budgetLimit).toLocaleString()} VNĐ. Hãy cân nhắc xóa bớt địa điểm hoặc giảm tiêu chuẩn lưu trú.`}
                type="error"
                showIcon
                icon={<WarningOutlined />}
              />
            ) : (
              <Alert
                message="Ngân sách an toàn"
                description="Kế hoạch chi tiêu của bạn vẫn nằm trong tầm kiểm soát."
                type="success"
                showIcon
                icon={<CheckCircleOutlined />}
              />
            )
          )}
        </Col>

        <Col xs={24} md={10}>
          <Card title="Tóm tắt tài chính">
            <Statistic 
              title="Tổng chi tiêu dự kiến" 
              value={totalSpent} 
              suffix="VNĐ" 
              valueStyle={{ color: isOverBudget ? '#f5222d' : '#3f8600' }} 
            />
            <Divider />
            <div style={{ marginBottom: 8 }}>
              Tỷ lệ sử dụng ngân sách ({budgetLimit.toLocaleString()} VNĐ)
            </div>
            <Progress 
              percent={percent} 
              status={isOverBudget ? "exception" : "active"} 
              strokeColor={isOverBudget ? '#f5222d' : '#52c41a'}
            />
          </Card>
        </Col>

        <Col xs={24} md={14}>
          <Card title="Biểu đồ phân bổ ngân sách">
            <div style={{ height: 300 }}>
              {chartData.length > 0 ? (
                <Pie {...(config as any)} />
              ) : (
                <Empty description="Thêm lịch trình để xem biểu đồ chi phí" />
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BudgetManager;