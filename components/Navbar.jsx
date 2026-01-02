import React, { useState } from 'react'
import { IoSearch, IoMenu, IoClose } from 'react-icons/io5'
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import logo from "../src/assect/logo.png";
import { useNavigate } from 'react-router-dom';

export default function Navbar({ scrolling, setsearch, managePanel, total, wish, token, userEmail, setToken, setUserEmail }) {
  const navigate = useNavigate();
  const [showLoginChoice, setShowLoginChoice] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const isAdmin = userEmail?.endsWith("@admin.clovet.com");

  const handleLogout = () => {
    setToken("");
    setUserEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/");
    setMobileMenu(false);
  }

  return (
    <section className='w-full bg-red-800 h-[14vh] fixed top-0 left-0 z-50'>
      <nav className='w-full h-full flex justify-between items-center bg-white px-6 md:px-16'>
        
        <div className='w-[55px] h-[55px] rounded-full bg-zinc-100 p-2 flex items-center md:gap-3.5'>
          <img className='object-contain object-center' src={logo} alt="Logo" />
          <h1 className='text-3xl font-bold text-blue-500 font-serif select-none hidden md:block'>Clovet</h1>
        </div>

        <div className='flex items-center gap-5 relative'>

          <div className='md:flex md:items-center md:gap-2 border-2 border-blue-500 rounded-full p-1 hidden'>
            <input
              type="text"
              id='search'
              placeholder='Search...'
              className='focus:outline-none pl-1.5 font-medium h-[5vh]'
              onFocus={scrolling}
              onChange={(e) => setsearch(e.target.value)}
            />
            <div className='bg-blue-500 cursor-pointer w-[30px] h-[30px] rounded-full text-white flex items-center justify-center hover:bg-blue-400'>
              <IoSearch />
            </div>
          </div>

          <button
            className='text-[22px] relative cursor-pointer'
            onClick={() => managePanel('wishlist')}
          >
            <FaHeart />
            {wish.length > 0 && (
              <span className='bg-blue-500 w-4 h-4 text-white text-[15px] rounded-full flex justify-center items-center absolute top-5 p-1'>
                {wish.length}
              </span>
            )}
          </button>

          <button
            className='text-[22px] relative text-zinc-900 cursor-pointer'
            onClick={() => managePanel('cart')}
          >
            <FaShoppingBag />
            {total > 0 && (
              <span className='bg-blue-500 w-4 h-4 text-white text-[17px] rounded-full flex justify-center items-center absolute top-5 p-1'>
                {total}
              </span>
            )}
          </button>

          <div className='md:hidden'>
            <button onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <IoClose size={26} /> : <IoMenu size={26} />}
            </button>
          </div>

          {!token && (
            <div className='hidden md:flex gap-2'>
              <button 
                className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 text-[16px] font-medium'
                onClick={() => setShowLoginChoice(!showLoginChoice)}
              >
                Login
              </button>
              <button
                className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-[16px] font-medium'
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          )}

          {token && (
            <div className='hidden md:flex gap-2'>
              {isAdmin && <button className='bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-[16px] font-medium' onClick={() => navigate("/admin/dashboard")}>Admin Panel</button>}
              <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-[16px] font-medium' onClick={handleLogout}>Logout</button>
            </div>
          )}

          {showLoginChoice && !token && (
            <div className='absolute top-14 right-0 bg-white shadow-lg rounded w-44 z-50'>
              <button
                className='w-full text-left px-4 py-2 hover:bg-gray-100'
                onClick={() => { navigate("/login"); setShowLoginChoice(false); }}
              >
                User Login
              </button>
              <button
                className='w-full text-left px-4 py-2 hover:bg-gray-100'
                onClick={() => { navigate("/admin-login"); setShowLoginChoice(false); }}
              >
                Admin Login
              </button>
              <button
                className='w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'
                onClick={() => setShowLoginChoice(false)}
              >
                Cancel
              </button>
            </div>
          )}

        </div>
      </nav>

      {mobileMenu && !token && (
        <div className='absolute top-[14vh] right-0 w-64 bg-white shadow-lg rounded p-4 flex flex-col gap-2 z-50 md:hidden'>
          <button onClick={() => { navigate("/login"); setMobileMenu(false); }} className='px-2 py-1 hover:bg-gray-100 rounded'>Login</button>
          <button onClick={() => { navigate("/signup"); setMobileMenu(false); }} className='px-2 py-1 hover:bg-gray-100 rounded'>Sign Up</button>
        </div>
      )}

      {mobileMenu && token && (
        <div className='absolute top-[14vh] right-0 w-64 bg-white shadow-lg rounded p-4 flex flex-col gap-2 z-50 md:hidden'>
          {isAdmin && <button onClick={() => { navigate("/admin/dashboard"); setMobileMenu(false); }} className='px-2 py-1 hover:bg-gray-100 rounded'>Admin Panel</button>}
          <button onClick={handleLogout} className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'>Logout</button>
        </div>
      )}

    </section>
  )
}
