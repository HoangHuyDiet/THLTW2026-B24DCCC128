import React, { useState, useMemo } from 'react';
import { Table, Tag, Select, Input, DatePicker, Space, Button, Modal, Descriptions, message } from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { OrderItem, ProductItem } from '../../models/dataProduct';

const { RangePicker } = DatePicker;

const OrderTab: React.FC<{ orders: OrderItem[]; setOrders: any; products: ProductItem[]; setProducts: any }> = ({ orders, setOrders, products, setProducts }) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState<any>(null);
  const [detailOrder, setDetailOrder] = useState<OrderItem | null>(null);

  const handleStatusChange = (orderId: string, newStatus: OrderItem['status']) => {
    const updatedOrders = [...orders];
    const idx = updatedOrders.findIndex(o => o.id === orderId);
    const oldStatus = updatedOrders[idx].status;
    let newProducts = [...products];

    if (newStatus === 'Hoàn thành' && oldStatus !== 'Hoàn thành') {
      updatedOrders[idx].products.forEach(item => {
        const pIdx = newProducts.findIndex(p => p.id === item.productId);
        if (pIdx !== -1) newProducts[pIdx].quantity -= item.quantity;
      });
    }

    if (newStatus === 'Đã hủy' && oldStatus === 'Hoàn thành') {
      updatedOrders[idx].products.forEach(item => {
        const pIdx = newProducts.findIndex(p => p.id === item.productId);
        if (pIdx !== -1) newProducts[pIdx].quantity += item.quantity;
      });
    }

    updatedOrders[idx].status = newStatus;
    setOrders(updatedOrders);
    setProducts(newProducts);
    message.success('Cập nhật thành công');
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const mText = o.customerName.toLowerCase().includes(searchText.toLowerCase()) || o.id.includes(searchText);
      const mStatus = statusFilter === 'All' || o.status === statusFilter;
      const mDate = !dateRange || (moment(o.createdAt).isSameOrAfter(dateRange[0], 'day') && moment(o.createdAt).isSameOrBefore(dateRange[1], 'day'));
      return mText && mStatus && mDate;
    });
  }, [orders, searchText, statusFilter, dateRange]);

  const columns = [
    { title: 'Mã đơn', dataIndex: 'id' },
    { title: 'Khách hàng', dataIndex: 'customerName' },
    { title: 'Tổng tiền', dataIndex: 'totalAmount', render: (v: number) => v.toLocaleString() + '₫', sorter: (a: any, b: any) => a.totalAmount - b.totalAmount },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (st: string, record: OrderItem) => (
        <Select value={st} style={{ width: 130 }} onChange={(val) => handleStatusChange(record.id, val)} disabled={st === 'Hoàn thành' || st === 'Đã hủy'}>
          <Select.Option value="Chờ xử lý">Chờ xử lý</Select.Option>
          <Select.Option value="Đang giao">Đang giao</Select.Option>
          <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
          <Select.Option value="Đã hủy">Đã hủy</Select.Option>
        </Select>
      )
    },
    { title: 'Ngày tạo', dataIndex: 'createdAt', sorter: (a: any, b: any) => moment(a.createdAt).unix() - moment(b.createdAt).unix() },
    { title: 'Thao tác', render: (_: any, r: OrderItem) => <Button icon={<EyeOutlined />} onClick={() => setDetailOrder(r)}>Chi tiết</Button> }
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input placeholder="Tìm khách hàng/Mã đơn..." prefix={<SearchOutlined />} onChange={e => setSearchText(e.target.value)} />
        <Select defaultValue="All" style={{ width: 150 }} onChange={setStatusFilter}>
          <Select.Option value="All">Tất cả trạng thái</Select.Option>
          <Select.Option value="Chờ xử lý">Chờ xử lý</Select.Option>
          <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
          <Select.Option value="Đã hủy">Đã hủy</Select.Option>
        </Select>
        <RangePicker onChange={setDateRange} />
      </Space>
      <Table columns={columns} dataSource={filteredOrders} rowKey="id" bordered />
      <Modal title="Chi tiết đơn hàng" visible={!!detailOrder} onCancel={() => setDetailOrder(null)} footer={null} width={700}>
        {detailOrder && (
          <>
            <Descriptions bordered size="small">
              <Descriptions.Item label="Khách hàng">{detailOrder.customerName}</Descriptions.Item>
              <Descriptions.Item label="SĐT">{detailOrder.phone}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ" span={2}>{detailOrder.address}</Descriptions.Item>
            </Descriptions>
            <Table 
              style={{ marginTop: 16 }} 
              dataSource={detailOrder.products} 
              pagination={false} 
              columns={[{ title: 'Sản phẩm', dataIndex: 'productName' }, { title: 'SL', dataIndex: 'quantity' }, { title: 'Giá', render: (_, r) => (r.price * r.quantity).toLocaleString() }]} 
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default OrderTab;