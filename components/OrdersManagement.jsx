import React from 'react';

export default function OrdersManagement({orders,setOrders}) {
  const updateStatus = (id,status)=>{
    const updated = orders.map(o=> o.id===id ? {...o, status} : o);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Orders Management</h2>
      {orders.length===0 ? <p>No orders yet!</p> : (
      <table className="w-full text-left border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Customer</th>
            <th className="p-2">Product</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Total</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o,index)=> (
            <tr key={index} className="border-b">
              <td className="p-2">{o.customer}</td>
              <td className="p-2">{o.productName}</td>
              <td className="p-2">{o.quantity}</td>
              <td className="p-2">${o.total.toFixed(2)}</td>
              <td className="p-2">
                <select value={o.status} onChange={(e)=>updateStatus(o.id,e.target.value)} className="border rounded px-2 py-1">
                  <option>Pending</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}
