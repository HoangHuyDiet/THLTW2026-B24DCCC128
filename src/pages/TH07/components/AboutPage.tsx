import { Card, Avatar, Typography, Space, Divider, Tag } from 'antd';
import { GithubOutlined, FacebookOutlined, MailOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const AboutPage = () => {
  const skills = ['Java', 'Spring Boot', 'ReactJS', 'Ant Design', 'SQL'];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
      <Card style={{ width: 600, textAlign: 'center', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Avatar 
            size={120} src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/633700210_1429046642041803_4585870600498135928_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEx9Gf3eEBSSJA74eckIz61kTEdm0w3tAORMR2bTDe0A63me0Uws3QSGnWxB0SB9XlzLCWcQbFrsReXfwrGOGxh&_nc_ohc=Aa3agGLrkpQQ7kNvwH5yy4p&_nc_oc=AdpCpDx2KZb8N2PhS_7ZdCExNPneej-2PUdou7ulqd_OF-WzulTJa2t5fdM51BHnx-8&_nc_zt=24&_nc_ht=scontent.fhan18-1.fna&_nc_gid=2W-2iSRv-8CW_KDxDH63NA&_nc_ss=7a3a8&oh=00_Af2HiMpKndjPmXxYdKyHxuj78X7YvPeqGkNH0liAAhEtzA&oe=69EE1D3F" 
            style={{ border: '4px solid #1890ff' }} 
        />
        
        <Title level={2} style={{ marginTop: 16, marginBottom: 0 }}>Nguyễn Việt Hoàng</Title>
        <Text type="secondary">Backend Developer | Sinh viên IT PTIT</Text>
        
        <Divider />
        
        <Paragraph style={{ fontSize: 16, textAlign: 'left' }}>
          Chào mọi người! Mình là Hoàng, sinh viên năm 2 chuyên ngành Công nghệ thông tin. 
          Mình có niềm đam mê với việc xây dựng hệ thống phía Server và đang tập trung học hỏi các công nghệ liên quan đến Java/Spring Boot.
        </Paragraph>

        <div style={{ textAlign: 'left', marginBottom: 20 }}>
          <Title level={5}>Kỹ năng chuyên môn:</Title>
          {skills.map(skill => <Tag color="blue" key={skill} style={{ marginBottom: 8 }}>{skill}</Tag>)}
        </div>

        <Divider />

        <Space size="large" style={{ fontSize: 24 }}>
          <GithubOutlined style={{ color: '#000' }} />
          <LinkedinOutlined style={{ color: '#0077b5' }} />
          <FacebookOutlined style={{ color: '#1877f2' }} />
          <MailOutlined style={{ color: '#d44638' }} />
        </Space>
      </Card>
    </div>
  );
};

export default AboutPage;