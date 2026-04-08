import React, { useState, useEffect } from 'react';
import { Tabs, Card, message, Button } from 'antd';
import { initialProducts, initialOrders, ProductItem, OrderItem } from '../../models/dataProduct';
import Dashboard from './Dashboard';
import ProductTab from './ProductTab';
import OrderTab from './OrderTab';
import OrderForm from './OrderForm';

const ProductManagementMain: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    const p = localStorage.getItem('products');
    const o = localStorage.getItem('orders');
    setProducts(p ? JSON.parse(p) : initialProducts);
    setOrders(o ? JSON.parse(o) : initialOrders);
  }, []);

  useEffect(() => {
    if (products.length) localStorage.setItem('products', JSON.stringify(products));
    if (orders.length) localStorage.setItem('orders', JSON.stringify(orders));
  }, [products, orders]);

  const handleCreateOrder = (values: any) => {
    const orderProducts = values.productIds.map((id: number) => ({
      productId: id,
      productName: products.find(p => p.id === id)?.name,
      quantity: values.quantities[id],
      price: products.find(p => p.id === id)?.price
    }));

    const newOrder: OrderItem = {
      id: `DH${Math.floor(Math.random() * 90000) + 10000}`,
      customerName: values.customerName,
      phone: values.phone,
      address: values.address,
      products: orderProducts,
      totalAmount: orderProducts.reduce((acc: number, cur: any) => acc + (cur.price * cur.quantity), 0),
      status: 'Chờ xử lý',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setOrders([newOrder, ...orders]);
    setIsOrderModalOpen(false);
    message.success('Đã tạo đơn hàng');
  };

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Dashboard products={products} orders={orders} />
      <Card title="HỆ THỐNG QUẢN LÝ" extra={<Button type="primary" onClick={() => setIsOrderModalOpen(true)}>+ Tạo đơn hàng</Button>}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Sản phẩm" key="1"><ProductTab products={products} setProducts={setProducts} /></Tabs.TabPane>
          <Tabs.TabPane tab="Đơn hàng" key="2"><OrderTab orders={orders} setOrders={setOrders} products={products} setProducts={setProducts} /></Tabs.TabPane>
        </Tabs>
      </Card>
      <OrderForm visible={isOrderModalOpen} onCancel={() => setIsOrderModalOpen(false)} onFinish={handleCreateOrder} products={products} />
    </div>
  );
};

export default ProductManagementMain;