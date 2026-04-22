import { useState, useCallback } from 'react';
import _ from 'lodash';

export const useBlogStore = () => {
  const [posts, setPosts] = useState<any[]>([
    { id: '1', title: 'Học React tại PTIT', slug: 'hoc-react-ptit', summary: 'Kinh nghiệm học React cho sinh viên IT...', content: 'Nội dung chi tiết bài viết...', cover: 'https://picsum.photos/id/10/800/400', author: 'Hoàng', date: '2026-04-22', tags: ['React', 'Frontend'], views: 120, status: 'Published' },
    { id: '2', title: 'Backend với Spring Boot', slug: 'spring-boot-basic', summary: 'Cơ bản về Spring Boot cho người mới...', content: 'Hướng dẫn Spring Boot...', cover: 'https://picsum.photos/id/20/800/400', author: 'Hoàng', date: '2026-04-21', tags: ['Java', 'Backend'], views: 85, status: 'Published' },
  ]);

  const [tags, setTags] = useState([
    { id: '1', name: 'React' }, { id: '2', name: 'Java' }, { id: '3', name: 'Backend' }, { id: '4', name: 'Frontend' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback(
    _.debounce((value: string) => setSearchTerm(value), 300),
    []
  );

  const incrementView = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, views: p.views + 1 } : p));
  };

  return { posts, setPosts, tags, setTags, handleSearch, searchTerm, incrementView };
};