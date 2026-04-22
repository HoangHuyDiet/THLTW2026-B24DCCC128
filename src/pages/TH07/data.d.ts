export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover: string;
  author: string;
  date: string;
  tags: string[];
  views: number;
  status: 'Draft' | 'Published';
}

export interface Tag {
  id: string;
  name: string;
}