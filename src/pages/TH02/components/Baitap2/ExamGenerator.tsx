import React from 'react';
import { Form, Select, InputNumber, Button, Space, Card, Divider, Modal, message } from 'antd';
import { ThunderboltOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Question, Subject, KnowledgeBlock, Exam } from './data';

interface Props { allQuestions: Question[]; subjects: Subject[]; blocks: KnowledgeBlock[]; exams: Exam[]; setExams: any; }

const ExamGenerator: React.FC<Props> = ({ allQuestions, subjects, blocks, exams, setExams }) => {
  const [form] = Form.useForm();

  const handleGenerate = (values: any) => {
    const { subjectId, structure } = values;
    let selected: Question[] = [];
    let errors: string[] = [];

    structure.forEach((req: any) => {
      const pool = allQuestions.filter(q => q.subjectId === subjectId && q.blockId === req.blockId && q.level === req.level);
      if (pool.length < req.quantity) errors.push(`Khối [${blocks.find(b=>b.id===req.blockId)?.name}] mức [${req.level}] thiếu ${req.quantity - pool.length} câu.`);
      else selected.push(...[...pool].sort(() => 0.5 - Math.random()).slice(0, req.quantity));
    });

    if (errors.length > 0) Modal.error({ title: 'Lỗi tạo đề!', content: errors.map((e,i)=><p key={i}>{e}</p>) });
    else {
      const newExam: Exam = { id: `EX-${Date.now()}`, name: `Đề thi ${new Date().toLocaleDateString()}`, subjectId, questions: selected, createdAt: new Date().toLocaleString() };
      setExams([...exams, newExam]);
      message.success('Đã tạo và lưu đề thi thành công!');
    }
  };

  return (
    <Card title="Cấu hình tạo đề thi">
      <Form form={form} layout="vertical" onFinish={handleGenerate}>
        <Form.Item name="subjectId" label="Chọn môn học" rules={[{required: true}]}><Select options={subjects.map(s=>({label: s.name, value: s.id}))} /></Form.Item>
        <Form.List name="structure">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="baseline" style={{ marginBottom: 8 }}>
                  <Form.Item {...restField} name={[name, 'blockId']} rules={[{required: true}]}><Select placeholder="Khối KT" style={{width: 150}} options={blocks.map(b=>({label: b.name, value: b.id}))} /></Form.Item>
                  <Form.Item {...restField} name={[name, 'level']} rules={[{required: true}]}><Select placeholder="Độ khó" style={{width: 120}} options={['Dễ','Trung bình','Khó'].map(l=>({label:l, value:l}))} /></Form.Item>
                  <Form.Item {...restField} name={[name, 'quantity']} rules={[{required: true}]}><InputNumber min={1} placeholder="SL" style={{width: 60}} /></Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} style={{color: 'red'}} />
                </Space>
              ))}
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Thêm yêu cầu cấu trúc</Button>
            </>
          )}
        </Form.List>
        <Button type="primary" htmlType="submit" icon={<ThunderboltOutlined />} block style={{ marginTop: 20 }}>Tạo Đề Thi</Button>
      </Form>
    </Card>
  );
};
export default ExamGenerator;