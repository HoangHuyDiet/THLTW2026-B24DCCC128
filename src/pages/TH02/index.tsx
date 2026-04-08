import React, { useState } from 'react';
import { Tabs, Typography, Layout, Card } from 'antd';
import { 
  RocketOutlined, 
  BankOutlined, 
  BookOutlined, 
  ClusterOutlined, 
  FormOutlined, 
  SecurityScanOutlined, 
  FileSearchOutlined 
} from '@ant-design/icons';

import Baitap1 from './components/Baitap1';
import SubjectManager from './components/Baitap2/SubjectManager';
import KnowledgeBlockManager from './components/Baitap2/KnowledgeBlockManager';
import QuestionManager from './components/Baitap2/QuestionManager';
import ExamGenerator from './components/Baitap2/ExamGenerator';
import ExamList from './components/Baitap2/ExamList';
import { Subject, KnowledgeBlock, Question, Exam } from './components/Baitap2/data';

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { Content } = Layout;

const TH02Page: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 's1', code: 'INT13162', name: 'Lập trình Web', credits: 3 },
    { id: 's2', code: 'INT1306', name: 'Java Core', credits: 3 },
  ]);
  const [blocks, setBlocks] = useState<KnowledgeBlock[]>([
    { id: 'b1', name: 'Tổng quan' },
    { id: 'b2', name: 'Chuyên sâu' },
  ]);
  const [questions, setQuestions] = useState<Question[]>([
    { id: 'Q001', subjectId: 's1', blockId: 'b1', level: 'Dễ', content: 'HTTP là gì?' },
    { id: 'Q002', subjectId: 's1', blockId: 'b2', level: 'Khó', content: 'Cơ chế Rendering trong React?' },
  ]);
  const [exams, setExams] = useState<Exam[]>([]);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5', padding: '24px' }}>
      <Content>
        <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={2} style={{ color: '#1890ff' }}>BÀI TẬP THỰC HÀNH TH02 - B24DCCC128</Title>
            <Text type="secondary">Quản lý Ngân hàng câu hỏi & Game Oẳn Tù Tì</Text>
          </div>

          <Tabs defaultActiveKey="1" type="line" size="large" animated>
            <TabPane tab={<span><RocketOutlined /> Bài 1</span>} key="1">
              <div style={{ padding: '20px 0' }}>
                <Baitap1 />
              </div>
            </TabPane>

            <TabPane tab={<span><BankOutlined /> Bài 2</span>} key="2">
              <Tabs tabPosition="left" defaultActiveKey="2.3" style={{ minHeight: '400px' }}>
                <TabPane tab={<span><BookOutlined /> 1. Môn học</span>} key="2.1">
                  <SubjectManager subjects={subjects} setSubjects={setSubjects} />
                </TabPane>

                <TabPane tab={<span><ClusterOutlined /> 2. Khối KT</span>} key="2.2">
                  <KnowledgeBlockManager blocks={blocks} setBlocks={setBlocks} />
                </TabPane>

                <TabPane tab={<span><FormOutlined /> 3. Câu hỏi</span>} key="2.3">
                  <QuestionManager 
                    questions={questions} 
                    setQuestions={setQuestions} 
                    subjects={subjects} 
                    blocks={blocks} 
                  />
                </TabPane>

                <TabPane tab={<span><SecurityScanOutlined /> 4. Tạo đề thi</span>} key="2.4">
                  <ExamGenerator 
                    allQuestions={questions} 
                    subjects={subjects} 
                    blocks={blocks} 
                    exams={exams} 
                    setExams={setExams} 
                  />
                </TabPane>

                <TabPane tab={<span><FileSearchOutlined /> 5. DS Đề thi</span>} key="2.5">
                  <ExamList 
                    exams={exams} 
                    setExams={setExams} 
                    subjects={subjects} 
                    blocks={blocks} 
                  />
                </TabPane>
              </Tabs>
            </TabPane>
          </Tabs>
        </Card>

        <footer style={{ textAlign: 'center', marginTop: 24, color: '#bfbfbf' }}>
          © 2026 PTIT - Web Base V3 | Sinh viên thực hiện: Hoàng
        </footer>
      </Content>
    </Layout>
  );
};

export default TH02Page;