import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Input, Button, Alert, Space } from 'antd';

const GuessingGame: React.FC = () => {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState('');
  const [count, setCount] = useState(0);
  const [res, setRes] = useState({ msg: 'Đoán từ 1-100 (10 lượt)', type: 'info' as any });

  const start = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setCount(0);
    setGuess('');
    setRes({ msg: 'Bắt đầu lượt chơi mới!', type: 'info' });
  };

  useEffect(() => start(), []);

  const onCheck = () => {
    const v = parseInt(guess);
    const n = count + 1;
    setCount(n);
    if (v === target) setRes({ msg: `Đúng rồi! Số là ${target}`, type: 'success' });
    else if (n >= 10) setRes({ msg: `Thua! Số đúng là ${target}`, type: 'error' });
    else setRes({ msg: v < target ? 'Quá thấp!' : 'Quá cao!', type: 'warning' });
    setGuess('');
  };

  const done = res.type === 'success' || res.type === 'error';

  return (
      <Card style={{ width: 400, margin: 'auto' }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Alert message={res.msg} type={res.type} showIcon />
          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Lượt: {count}/10</div>
          <Input type="number" value={guess} onChange={e => setGuess(e.target.value)} disabled={done} placeholder="Nhập số..." />
          <Button type="primary" block onClick={onCheck} disabled={done || !guess}>Đoán</Button>
          {done && <Button block onClick={start}>Chơi lại</Button>}
        </Space>
      </Card>
  );
};

export default GuessingGame;