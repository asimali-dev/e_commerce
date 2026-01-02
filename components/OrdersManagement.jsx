import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const API_BASE = 'http://localhost:8080/Ecommerce_backend';

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get_orders.php`);
      setOrders(res.data);
    } catch (err) {
      console.error("Orders fetch error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Orders Management</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">User Email</th>
            <th className="p-3 border">Product Name</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Quantity</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan="6" className="p-3 text-center text-gray-500">No orders yet</td>
            </tr>
          )}
          {orders.map((o, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-3 border">{o.user_email}</td>
              <td className="p-3 border">{o.product_name}</td>
              <td className="p-3 border">${parseFloat(o.price).toFixed(2)}</td>
              <td className="p-3 border">{o.quantity}</td>
              <td className="p-3 border">${(o.price * o.quantity).toFixed(2)}</td>
              <td className="p-3 border">{o.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
