import React, { useState, useMemo } from 'react';
import { Table, Tag, Space, Button, Input, Select, Slider, Row, Col } from 'antd';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { ProductItem } from '../../models/dataProduct';

const ProductTab: React.FC<{ products: ProductItem[]; setProducts: any }> = ({ products }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [stockStatus, setStockStatus] = useState('All');

  const filteredData = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'All' || p.category === category;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      
      let matchStatus = true;
      if (stockStatus === 'InStock') matchStatus = p.quantity > 10;
      else if (stockStatus === 'LowStock') matchStatus = p.quantity > 0 && p.quantity <= 10;
      else if (stockStatus === 'OutOfStock') matchStatus = p.quantity === 0;

      return matchSearch && matchCategory && matchPrice && matchStatus;
    });
  }, [products, search, category, priceRange, stockStatus]);

  const columns = [
    { title: 'STT', render: (_: any, __: any, i: number) => i + 1, width: 60 },
    { title: 'Tên sản phẩm', dataIndex: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
    { title: 'Danh mục', dataIndex: 'category' },
    { title: 'Giá', dataIndex: 'price', render: (v: number) => v.toLocaleString() + '₫', sorter: (a: any, b: any) => a.price - b.price },
    { title: 'Tồn kho', dataIndex: 'quantity', sorter: (a: any, b: any) => a.quantity - b.quantity },
    {
      title: 'Trạng thái',
      dataIndex: 'quantity',
      render: (qty: number) => {
        if (qty > 10) return <Tag color="green">Còn hàng</Tag>;
        if (qty > 0) return <Tag color="orange">Sắp hết</Tag>;
        return <Tag color="red">Hết hàng</Tag>;
      }
    },
    {
      title: 'Thao tác',
      render: () => <Button type="link" icon={<EditOutlined />}>Sửa</Button>
    }
  ];

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }} align="middle">
        <Col span={6}>
          <Input placeholder="Tìm tên sản phẩm..." prefix={<SearchOutlined />} onChange={e => setSearch(e.target.value)} />
        </Col>
        <Col span={4}>
          <Select style={{ width: '100%' }} defaultValue="All" onChange={setCategory}>
            <Select.Option value="All">Tất cả danh mục</Select.Option>
            <Select.Option value="Laptop">Laptop</Select.Option>
            <Select.Option value="Điện thoại">Điện thoại</Select.Option>
            <Select.Option value="Máy tính bảng">Máy tính bảng</Select.Option>
            <Select.Option value="Phụ kiện">Phụ kiện</Select.Option>
          </Select>
        </Col>
        <Col span={5}>
          <Select style={{ width: '100%' }} defaultValue="All" onChange={setStockStatus} placeholder="Lọc trạng thái">
            <Select.Option value="All">Tất cả trạng thái</Select.Option>
            <Select.Option value="InStock">Còn hàng (>10)</Select.Option>
            <Select.Option value="LowStock">Sắp hết (1-10)</Select.Option>
            <Select.Option value="OutOfStock">Hết hàng (0)</Select.Option>
          </Select>
        </Col>
        <Col span={9}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ whiteSpace: 'nowrap' }}>Giá:</span>
            <Slider range min={0} max={50000000} step={1000000} defaultValue={[0, 50000000]} style={{ flex: 1 }} onAfterChange={setPriceRange} />
          </div>
        </Col>
      </Row>
      <Table columns={columns} dataSource={filteredData} rowKey="id" pagination={{ pageSize: 5 }} bordered />
    </>
  );
};

export default ProductTab;