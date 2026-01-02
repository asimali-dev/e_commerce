import React, { useState, useEffect } from 'react';
import Sidebar from './Slider';
import ProductsManagement from './ProductsManagement';
import OrdersManagement from './OrdersManagement';
import Categories from './categories';
import axios from 'axios';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [products, setProducts] = useState(() => {
    const store = localStorage.getItem('cartProducts');
    return store ? JSON.parse(store) : [];
  });
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState(() => {
    const store = localStorage.getItem('customers');
    return store ? JSON.parse(store) : [];
  });
  const [categories, setCategories] = useState(() => {
    const store = localStorage.getItem('categories');
    return store ? JSON.parse(store) : [];
  });

  const API_BASE = 'http://localhost:8080/Ecommerce_backend';

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get_orders.php`);
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalSales = orders.reduce((acc, o) => acc + o.price * o.quantity, 0);
  const totalOrders = [...new Set(orders.map(o => o.user_email + o.created_at))].length; // unique orders
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
          {activeTab === 'Orders' && <OrdersManagement orders={orders} />}
          {activeTab === 'Products' && <ProductsManagement products={products} setProducts={setProducts} />}
          {activeTab === 'Categories' && <Categories />}
        </div>
      </div>
    </div>
  );
}
