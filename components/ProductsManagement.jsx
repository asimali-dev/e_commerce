import React, { useState } from 'react';

export default function ProductsManagement({ products, setProducts }) {
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, quantity: 1, image: '', category: '' });

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Please enter product name and price');
      return;
    }
    const id = Date.now();
    const updated = [...products, { ...newProduct, id }];
    setProducts(updated);
    localStorage.setItem('cartProducts', JSON.stringify(updated));
    setNewProduct({ name: '', price: 0, quantity: 1, image: '', category: '' });
  };

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('cartProducts', JSON.stringify(updated));
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Products Management</h2>

        {/* Add Product Form */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 mb-6">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border p-2 rounded w-full md:w-1/5"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            className="border p-2 rounded w-full md:w-1/5"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={e => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
            className="border p-2 rounded w-full md:w-1/5"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
            className="border p-2 rounded w-full md:w-1/5"
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
            className="border p-2 rounded w-full md:w-1/5"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full md:w-auto"
            onClick={addProduct}
          >
            Add
          </button>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Qty</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    No products added yet.
                  </td>
                </tr>
              )}
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{p.name}</td>
                  <td className="p-3 border">${p.price.toFixed(2)}</td>
                  <td className="p-3 border">{p.quantity}</td>
                  <td className="p-3 border">{p.category}</td>
                  <td className="p-3 border">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition w-full md:w-auto"
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
