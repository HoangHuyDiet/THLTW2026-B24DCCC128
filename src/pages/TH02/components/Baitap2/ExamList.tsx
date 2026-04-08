import React, { useState } from 'react';
import { Table, Button, Card, Tag, Modal, List, Space, Typography, Badge, Divider } from 'antd';
import { EyeOutlined, DeleteOutlined, FileTextOutlined, BookOutlined } from '@ant-design/icons';
import { Exam, Subject, KnowledgeBlock } from './data';

const { Text, Title, Paragraph } = Typography;

interface Props { 
  exams: Exam[]; 
  setExams: any; 
  subjects: Subject[]; 
  blocks: KnowledgeBlock[];
}

const ExamList: React.FC<Props> = ({ exams, setExams, subjects, blocks }) => {
  const [view, setView] = useState<Exam | null>(null);

  const getLevelColor = (l: string) => {
    switch(l) {
      case 'Dễ': return 'green';
      case 'Trung bình': return 'blue';
      case 'Khó': return 'volcano';
      case 'Rất khó': return 'purple';
      default: return 'default';
    }
  };

  return (
    <Card title={<span><FileTextOutlined /> Kho lưu trữ đề thi đã tạo</span>}>
      <Table 
        dataSource={exams} 
        rowKey="id" 
        pagination={{ pageSize: 5 }}
        columns={[
          { title: 'Tên đề thi', dataIndex: 'name', key: 'name', render: (t) => <Text strong>{t}</Text> },
          { title: 'Môn học', dataIndex: 'subjectId', render: (id) => subjects.find(s=>s.id===id)?.name },
          { title: 'Số câu', render: (_, r) => <Badge count={r.questions.length} showZero color="#108ee9" /> },
          { title: 'Ngày tạo', dataIndex: 'createdAt' },
          { title: 'Thao tác', render: (_, r) => (
            <Space>
              <Button type="primary" ghost icon={<EyeOutlined />} onClick={() => setView(r)}>Xem chi tiết</Button>
              <Button icon={<DeleteOutlined />} danger onClick={() => setExams(exams.filter(e=>e.id!==r.id))} />
            </Space>
          )}
        ]} 
      />

      <Modal 
        title={<span><BookOutlined /> Chi tiết nội dung: {view?.name}</span>} 
        visible={!!view} 
        onCancel={() => setView(null)} 
        footer={[<Button key="close" onClick={() => setView(null)}>Đóng cửa sổ</Button>]}
        width={900}
        style={{ top: 20 }}
      >
        {view && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <Text type="secondary">Môn học: </Text> <Text strong>{subjects.find(s=>s.id===view.subjectId)?.name}</Text>
              <Divider type="vertical" />
              <Text type="secondary">Mã đề: </Text> <Text code>{view.id}</Text>
            </div>
            
            <List
              itemLayout="vertical"
              dataSource={view.questions}
              renderItem={(item, i) => (
                <List.Item 
                  key={item.id}
                  style={{ background: '#fafafa', marginBottom: 12, borderRadius: 8, padding: '16px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Space>
                      <Tag color="blue">Câu {i + 1}</Tag>
                      <Tag color={getLevelColor(item.level)}>{item.level.toUpperCase()}</Tag>
                      <Text type="secondary">Khối: </Text>
                      <Text strong>{blocks.find(b => b.id === item.blockId)?.name || 'N/A'}</Text>
                    </Space>
                    <Text type="secondary" style={{ fontSize: '12px' }}>ID: {item.id}</Text>
                  </div>
                  <Paragraph style={{ fontSize: '16px', marginTop: 8 }}>
                    {item.content}
                  </Paragraph>
                  <div style={{ textAlign: 'right', borderTop: '1px dashed #e8e8e8', paddingTop: 8 }}>
                    <Text type="secondary" italic>Hình thức: Tự luận</Text>
                  </div>
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default ExamList;