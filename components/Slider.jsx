import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';

export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = ['Dashboard', 'Orders', 'Products', 'Categories'];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-center bg-blue-600 text-white p-4">
        <HiMenu className="text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
        <h1 className="text-xl font-bold ml-4">Admin Panel</h1>
      </div>

      <div
        className={`bg-blue-600 text-white md:w-64 w-64 h-screen flex flex-col p-4 fixed top-0 left-0 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-8 hidden md:block">Admin Panel</h1>
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`text-left mb-2 p-2 rounded hover:bg-blue-500 ${activeTab === tab ? 'bg-blue-700' : ''}`}
            onClick={() => {
              setActiveTab(tab);
              setIsOpen(false);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
