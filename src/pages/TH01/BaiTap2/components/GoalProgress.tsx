import React from 'react';
import { Progress, Statistic, Row, Col, Input } from 'antd';
import { calcProgress } from '../utils';

export const GoalProgress = ({ sessions, goal, setGoal }: any) => {
  const { hours, percent } = calcProgress(sessions, goal);
  return (
    <Row gutter={16} align="middle">
      <Col span={12}>
        <Statistic title="Đã học tháng này" value={hours} suffix={`/ ${goal} giờ`} />
        <Progress percent={percent} status={percent >= 100 ? 'success' : 'active'} />
      </Col>
      <Col span={12}>
        <Input.Search type="number" placeholder="Đổi mục tiêu..." enterButton="Lưu" onSearch={v => setGoal(Number(v))} />
      </Col>
    </Row>
  );
};