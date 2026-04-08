import React, { useState } from 'react';
import { Card, Form, Input, Button, Table, message, Descriptions, Divider, Tag } from 'antd';


const LookupTab = ({ diplomas, decisions, setDecisions, fields }: any) => {
  const [result, setResult] = useState<any>(null);

  const handleSearch = (values: any) => {
    const filled = Object.values(values).filter(v => v).length;
    if (filled < 2) return message.error('Nhập ít nhất 2 tham số (MSV, Họ tên, Số hiệu...)');

    const found = diplomas.find((d: any) => 
      (values.studentId && d.studentId === values.studentId) || 
      (values.serialNo && d.serialNo === values.serialNo)
    );

    if (found) {
      setResult(found);
      // Tăng view count
      setDecisions((prev: any[]) => prev.map(dec => 
        dec.id === found.decisionId ? { ...dec, viewCount: (dec.viewCount || 0) + 1 } : dec
      ));
    } else {
      setResult(null);
      message.warning('Không tìm thấy văn bằng phù hợp!');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Card title="Bộ lọc tra cứu" style={{ width: 350 }}>
        <Form layout="vertical" onFinish={handleSearch}>
          <Form.Item name="studentId" label="Mã sinh viên"><Input /></Form.Item>
          <Form.Item name="serialNo" label="Số hiệu văn bằng"><Input /></Form.Item>
          <Form.Item name="fullName" label="Họ tên"><Input /></Form.Item>
          <Button type="primary" htmlType="submit" block>Tra cứu thông tin</Button>
        </Form>
      </Card>

      <Card title="Kết quả & Thống kê" style={{ flex: 1 }}>
        {result ? (
          <Descriptions title="Chi tiết văn bằng" bordered column={2}>
            <Descriptions.Item label="Họ tên">{result.fullName}</Descriptions.Item>
            <Descriptions.Item label="Mã SV">{result.studentId}</Descriptions.Item>
            <Descriptions.Item label="Số hiệu">{result.serialNo}</Descriptions.Item>
            <Descriptions.Item label="Số vào sổ">{result.enrollmentNo}</Descriptions.Item>
            {fields.map((f: any) => (
              <Descriptions.Item key={f.id} label={f.label}>
                {result.dynamic?.[f.id]?.toString() || 'N/A'}
              </Descriptions.Item>
            ))}
          </Descriptions>
        ) : <div style={{textAlign:'center', padding: 40, color: '#ccc'}}>Vui lòng nhập thông tin tra cứu</div>}
        
        <Divider orientation="left">Thống kê lượt tra cứu theo Quyết định</Divider>
        <Table dataSource={decisions} pagination={false} size="small" columns={[
          { title: 'Số Quyết định', dataIndex: 'code' },
          { title: 'Lượt xem', dataIndex: 'viewCount', render: v => <Tag color="blue">{v || 0}</Tag> }
        ]} />
      </Card>
    </div>
  );
};
export default LookupTab;