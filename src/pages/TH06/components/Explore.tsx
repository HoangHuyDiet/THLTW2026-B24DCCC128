import { useState, useMemo } from 'react';
import { Row, Col, Card, Rate, Tag, Button, Select, Space, Input, notification } from 'antd';

const Explore = ({ destinations, addToPlan }: any) => {
  const [filter, setFilter] = useState({ type: 'all', sort: 'none', search: '' });

  const displayData = useMemo(() => {
    let result = [...destinations];

    if (filter.type !== 'all') result = result.filter(d => d.type === filter.type);
    if (filter.search) result = result.filter(d => d.name.toLowerCase().includes(filter.search.toLowerCase()));
    if (filter.sort === 'priceAsc') result.sort((a, b) => a.price - b.price);
    if (filter.sort === 'priceDesc') result.sort((a, b) => b.price - a.price);
    if (filter.sort === 'rating') result.sort((a, b) => b.rating - a.rating);


    
    return result;
  }, [destinations, filter]);

  const handleAdd = (item: any) => {
        addToPlan(item);
            notification.success({
                message: 'Thành công!',
                description: `Đã thêm ${item.name} vào lịch trình của bạn.`,
                placement: 'bottomRight',
                duration: 2,
            });}

  return (
    <div style={{ padding: '0 20px' }}>
      <Space wrap style={{ marginBottom: 24, justifyContent: 'center', width: '100%' }}>
        <Input.Search placeholder="Tìm tên địa điểm..." onSearch={(v) => setFilter({...filter, search: v})} style={{ width: 200 }} />
        <Select defaultValue="all" onChange={(v) => setFilter({...filter, type: v})} style={{ width: 120 }}>
          <Select.Option value="all">Tất cả loại</Select.Option>
          <Select.Option value="biển">Biển</Select.Option>
          <Select.Option value="núi">Núi</Select.Option>
          <Select.Option value="thành phố">Thành phố</Select.Option>
        </Select>
        <Select placeholder="Sắp xếp" onChange={(v) => setFilter({...filter, sort: v})} style={{ width: 150 }}>
          <Select.Option value="priceAsc">Giá: Thấp đến Cao</Select.Option>
          <Select.Option value="priceDesc">Giá: Cao đến Thấp</Select.Option>
          <Select.Option value="rating">Đánh giá cao nhất</Select.Option>
        </Select>
      </Space>

      <Row gutter={[16, 16]}>
        {displayData.map((item: any) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <Card
              hoverable
              cover={<img src={item.img} style={{ height: 180, objectFit: 'cover' }} />}
              actions={[<Button type="primary" onClick={() => handleAdd(item)}>Thêm chuyến đi</Button>]}
            >
              <Card.Meta title={item.name} description={<Tag color="blue">{item.type}</Tag>} />
              <div style={{ marginTop: 12 }}>
                <Rate disabled defaultValue={item.rating} allowHalf style={{ fontSize: 14 }} />
                <div style={{ color: '#f5222d', fontWeight: 'bold', marginTop: 8 }}>{item.price.toLocaleString()} đ</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Explore;