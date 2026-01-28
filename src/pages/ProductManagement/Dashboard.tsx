import React from 'react';
import { Row, Col, Statistic, Card, Progress } from 'antd';
import { ProductItem, OrderItem } from '../../models/dataProduct';

const Dashboard: React.FC<{ products: ProductItem[]; orders: OrderItem[] }> = ({ products, orders }) => {
  const totalStockValue = products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  const revenue = orders
    .filter((o) => o.status === 'Hoàn thành')
    .reduce((acc, cur) => acc + cur.totalAmount, 0);

  const completedOrders = orders.filter((o) => o.status === 'Hoàn thành').length;

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card><Statistic title="Tổng sản phẩm" value={products.length} /></Card>
      </Col>
      <Col span={6}>
        <Card><Statistic title="Giá trị tồn kho" value={totalStockValue} suffix="đ" /></Card>
      </Col>
      <Col span={6}>
        <Card><Statistic title="Doanh thu (Hoàn thành)" value={revenue} precision={0} suffix="đ" /></Card>
      </Col>
      <Col span={6}>
        <Card>
          <span>Tỉ lệ hoàn thành đơn</span>
          <Progress percent={Math.round((completedOrders / orders.length) * 100) || 0} size="small" />
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;