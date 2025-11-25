import React, { useState } from 'react';
import Sidebar from './Slider';
import OrdersManagement from './OrdersManagement';
import ProductsManagement from './ProductsManagement';
import Categories from './categories';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const [products, setProducts] = useState(() => {
    const store = localStorage.getItem('cartProducts');
    return store ? JSON.parse(store) : [];
  });
  const [orders, setOrders] = useState(() => {
    const store = localStorage.getItem('orders');
    return store ? JSON.parse(store) : [];
  });
  const [customers, setCustomers] = useState(() => {
    const store = localStorage.getItem('customers');
    return store ? JSON.parse(store) : [];
  });

  const [categories, setCategories] = useState(() => {
    const store = localStorage.getItem('categories');
    return store ? JSON.parse(store) : [];
  });

  const totalSales = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = customers.length;
  const totalCategories = categories.length;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-64 w-full md:h-full bg-gray-800 text-white flex-shrink-0">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="flex-1 bg-gray-100 p-4 md:p-6 overflow-auto">
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow text-center sm:text-left">Total Sales: ${totalSales.toFixed(2)}</div>
            <div className="bg-white p-4 rounded shadow text-center sm:text-left">Total Orders: {totalOrders}</div>
            <div className="bg-white p-4 rounded shadow text-center sm:text-left">Total Products: {totalProducts}</div>
            <div className="bg-white p-4 rounded shadow text-center sm:text-left">Total Customers: {totalCustomers}</div>
            <div className="bg-white p-4 rounded shadow text-center sm:text-left">Total Categories: {totalCategories}</div>
          </div>
        )}

        <div className="bg-white rounded shadow p-4">
          {activeTab === 'Orders' && <OrdersManagement orders={orders} setOrders={setOrders} />}
          {activeTab === 'Products' && <ProductsManagement products={products} setProducts={setProducts} />}
          {activeTab === 'Categories' && <Categories />}
        </div>
      </div>
    </div>
  );
}
