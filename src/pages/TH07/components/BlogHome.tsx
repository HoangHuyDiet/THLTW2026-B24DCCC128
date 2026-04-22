import React, { useState } from 'react';
import { Row, Col, Card, Tag, Input, Pagination, Typography, Space } from 'antd';
const { Title, Paragraph, Text } = Typography;

const BlogHome = ({ posts, tags, handleSearch, searchTerm, onSelectPost }: any) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const displayPosts = posts.filter((p: any) => 
    p.status === 'Published' &&
    (selectedTag ? p.tags.includes(selectedTag) : true) &&
    (p.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pageSize = 9;
  const currentData = displayPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Tất cả bài viết</Title>
      <Space direction="vertical" style={{ width: '100%', marginBottom: 32 }}>
        <Input.Search placeholder="Tìm kiếm bài viết..." onChange={(e) => handleSearch(e.target.value)} style={{ width: 300 }} />
        <Space wrap>
          <Text strong>Thẻ phổ biến:</Text>
          {tags.map((t: any) => (
            <Tag.CheckableTag key={t.id} checked={selectedTag === t.name} onChange={() => setSelectedTag(selectedTag === t.name ? null : t.name)}>
              {t.name}
            </Tag.CheckableTag>
          ))}
        </Space>
      </Space>

      <Row gutter={[24, 24]}>
        {currentData.map((post: any) => (
          <Col xs={24} sm={12} lg={8} key={post.id}>
            <Card hoverable cover={<img src={post.cover} style={{height: 200, objectFit: 'cover'}} />} onClick={() => onSelectPost(post)}>
              <Card.Meta title={post.title} description={<Paragraph ellipsis={{ rows: 2 }}>{post.summary}</Paragraph>} />
              <div style={{ marginTop: 12 }}>
                {post.tags.map((t: string) => <Tag color="blue" key={t}>{t}</Tag>)}
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: '#8c8c8c' }}>
                {post.author} • {post.date}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination current={currentPage} total={displayPosts.length} pageSize={pageSize} onChange={setCurrentPage} style={{ marginTop: 40, textAlign: 'center' }} />
    </div>
  );
};

export default BlogHome;