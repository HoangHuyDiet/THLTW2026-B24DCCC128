import React, { useState, useMemo } from 'react';
import { Table, Card, Button, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { initialData, ProductItem } from './data';
import ProductForm from './ProductForm';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>(initialData);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    message.success('Xóa sản phẩm thành công!');
  };

  const handleAddProduct = (values: any) => {
    const newProduct = { ...values, id: Date.now() };
    setProducts([newProduct, ...products]);
    message.success('Thêm thành công!');
    setIsModalOpen(false);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, products]);

  const columns = [
    { title: 'STT', key: 'stt', render: (_: any, __: any, i: number) => i + 1, width: 70 },
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
    { title: 'Giá', dataIndex: 'price', key: 'price', render: (v: number) => v.toLocaleString('vi-VN') },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: ProductItem) => (
        <Popconfirm title="Xóa sản phẩm này?" onConfirm={() => handleDelete(record.id)}>
          <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card title="QUẢN LÝ SẢN PHẨM">
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Thêm sản phẩm
          </Button>

          <Input
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <Table columns={columns} dataSource={filteredProducts} rowKey="id" bordered />
      </Card>

      <ProductForm 
        visible={isModalOpen} 
        onCancel={() => setIsModalOpen(false)} 
        onFinish={handleAddProduct} 
      />
    </div>
  );
};

export default ProductManagement;