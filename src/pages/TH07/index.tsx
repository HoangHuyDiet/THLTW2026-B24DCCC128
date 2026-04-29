import React, { useState } from 'react';
import { Layout, Tabs, Typography } from 'antd';
import { useBlogStore } from './useBlogStore';
import BlogHome from './components/BlogHome';
import PostDetail from './components/PostDetail';
import AboutPage from './components/AboutPage';
import AdminDashboard from './components/AdminDashboard';
import TagManager from './components/TagManager';

const { Content, Header } = Layout;
const { Title } = Typography;

const BlogApp = () => {
  const store = useBlogStore();
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('1');

  const renderHomeOrDetail = () => {
    if (currentPost) {
      return (
        <PostDetail 
          post={currentPost} 
          posts={store.posts} 
          onBack={() => setCurrentPost(null)} 
          incrementView={store.incrementView}
        />
      );
    }
    return (
      <BlogHome 
        {...store} 
        onSelectPost={(post: any) => setCurrentPost(post)} 
      />
    );
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ background: '#001529', display: 'flex', alignItems: 'center', padding: '0 50px' }}>
        <Title level={3} style={{ color: '#fff', margin: 0 }}>HOÀNG'S BLOG</Title>
      </Header>
      
      <Content style={{ padding: '0 50px', marginTop: 24 }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 380, borderRadius: 8 }}>
          <Tabs 
            activeKey={activeTab} 
            onChange={(key) => {
              setActiveTab(key);
              if (key !== '1') setCurrentPost(null);
            }}
          >
            <Tabs.TabPane tab="Trang chủ" key="1">
              {renderHomeOrDetail()}
            </Tabs.TabPane>

            <Tabs.TabPane tab="Giới thiệu" key="2">
              <AboutPage />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Quản lý bài viết" key="3">
              <AdminDashboard posts={store.posts} setPosts={store.setPosts} tags={store.tags} />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Quản lý thẻ" key="4">
              <TagManager tags={store.tags} setTags={store.setTags} posts={store.posts} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default BlogApp;