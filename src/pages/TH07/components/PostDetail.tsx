import { useEffect } from 'react';
import { Typography, Tag, Divider, Button, Row, Col, Card, Space } from 'antd';
import { ArrowLeftOutlined, EyeOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const PostDetail = ({ post, posts, onBack, incrementView }: any) => {
  useEffect(() => {
    if (post?.id) {
      incrementView(post.id);
    }
    window.scrollTo(0, 0);
  }, [post?.id]);

  if (!post) return null;

  const relatedPosts = posts.filter((p: any) => 
    p.id !== post.id && 
    p.status === 'Published' &&
    p.tags.some((t: string) => post.tags.includes(t))
  ).slice(0, 3);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      <Button icon={<ArrowLeftOutlined />} onClick={onBack} type="link" style={{ marginBottom: 16 }}>
        Quay lại danh sách
      </Button>

      <img src={post.cover} style={{ width: '100%', borderRadius: 8, marginBottom: 24, maxHeight: 400, objectFit: 'cover' }} />
      
      <Title>{post.title}</Title>
      
      <Space split={<Divider type="vertical" />} style={{ marginBottom: 16 }}>
        <Text type="secondary"><UserOutlined /> {post.author}</Text>
        <Text type="secondary"><CalendarOutlined /> {post.date}</Text>
        <Text type="secondary"><EyeOutlined /> {post.views + 1} lượt xem</Text>
      </Space>

      <div style={{ marginBottom: 24 }}>
        {post.tags.map((t: string) => <Tag color="blue" key={t}>{t}</Tag>)}
      </div>

      <Divider />

      <div style={{ whiteSpace: 'pre-wrap', fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: 40 }}>
        {post.content}
      </div>

      {relatedPosts.length > 0 && (
        <>
          <Divider orientation="left">Bài viết liên quan</Divider>
          <Row gutter={16}>
            {relatedPosts.map((rp: any) => (
              <Col span={8} key={rp.id}>
                <Card 
                  hoverable 
                  size="small" 
                  title={<span style={{ fontSize: 14 }}>{rp.title}</span>}
                >
                  <Text type="secondary" style={{ fontSize: 12 }}>{rp.date}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default PostDetail;