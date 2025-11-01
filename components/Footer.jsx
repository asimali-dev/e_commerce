import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoCall, IoMail } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 py-6 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 border-b border-gray-700">
        
        <div>
          <h2 className="text-2xl font-bold text-blue-500 font-serif mb-2">Clovet</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover the latest trends and timeless fashion pieces at Clovet.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a href="#" className="p-2 bg-gray-800 hover:bg-blue-600 rounded-full"><FaFacebookF /></a>
            <a href="#" className="p-2 bg-gray-800 hover:bg-pink-500 rounded-full"><FaInstagram /></a>
            <a href="#" className="p-2 bg-gray-800 hover:bg-sky-400 rounded-full"><FaTwitter /></a>
            <a href="#" className="p-2 bg-gray-800 hover:bg-red-600 rounded-full"><FaYoutube /></a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">Help & FAQs</a></li>
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">Track Your Order</a></li>
            <li><a href="#" className="hover:text-white">Payment Options</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Shop</h3>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">Men's Collection</a></li>
            <li><a href="#" className="hover:text-white">Women's Collection</a></li>
            <li><a href="#" className="hover:text-white">Kids Wear</a></li>
            <li><a href="#" className="hover:text-white">New Arrivals</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-center gap-2"><IoCall className="text-blue-500" /> +92 301 1234567</li>
            <li className="flex items-center gap-2"><IoMail className="text-blue-500" /> support@clovet.com</li>
          </ul>
        </div>
      </div>

      <div className="text-center py-2 text-gray-500 text-sm border-t border-gray-700">
        © {new Date().getFullYear()} <span className="text-blue-500 font-semibold">Clovet</span>. All rights reserved.
      </div>
    </footer>
  );
}
