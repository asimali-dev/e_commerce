import React, { useState, useEffect } from 'react';

export default function Categories() {
  const [categories, setCategories] = useState(() => {
    const stored = localStorage.getItem('categories');
    return stored ? JSON.parse(stored) : [];
  });
  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (!newCategory.trim()) return;
    const updated = [...categories, { id: Date.now(), name: newCategory }];
    setCategories(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
    setNewCategory('');
  };

  const deleteCategory = (id) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Categories Management</h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={addCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <span className="font-medium">{category.name}</span>
            <button
              onClick={() => deleteCategory(category.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
