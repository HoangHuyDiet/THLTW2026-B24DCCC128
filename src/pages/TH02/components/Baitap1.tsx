import React, { useState } from 'react';
import { Card, Button, Space, Table, Tag, message, Typography, Divider } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';

const Baitap1: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const choices = ['Kéo', 'Búa', 'Bao'];

  const play = (user: string) => {
    const bot = choices[Math.floor(Math.random() * 3)];
    let res: 'Thắng' | 'Thua' | 'Hòa' = user === bot ? 'Hòa' : 
      ((user==='Kéo'&&bot==='Bao')||(user==='Búa'&&bot==='Kéo')||(user==='Bao'&&bot==='Búa')) ? 'Thắng' : 'Thua';
    
    if(res === 'Thắng') message.success('Bạn thắng!');
    else if(res === 'Thua') message.error('Bạn thua!');

    setHistory([{ key: Date.now(), user, bot, res, time: new Date().toLocaleTimeString() }, ...history]);
  };

  return (
    <Card bordered={false}>
      <Space size="large" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        {choices.map(c => <Button key={c} type="primary" size="large" onClick={() => play(c)}>{c}</Button>)}
      </Space>
      <Divider orientation="left"><HistoryOutlined /> Lịch sử đấu</Divider>
      <Table dataSource={history} size="small" columns={[
        { title: 'Thời gian', dataIndex: 'time' },
        { title: 'Bạn', dataIndex: 'user' },
        { title: 'Máy', dataIndex: 'bot' },
        { title: 'Kết quả', dataIndex: 'res', render: (r) => <Tag color={r==='Thắng'?'green':r==='Thua'?'red':'gold'}>{r}</Tag> }
      ]} />
    </Card>
  );
};
export default Baitap1;