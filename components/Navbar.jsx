import React from 'react'
import { IoCartOutline, IoSearch } from 'react-icons/io5'
import { FaHeart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import logo from '../src/assect/logo.png'

export default function Navbar(props) {
  return (
    <section className='w-full bg-red-800 h-[14vh] fixed top-0 left-0 z-50'>
      <nav className='w-full h-full flex justify-between items-center bg-white px-6 md:px-16'>
        <div className='w-[55px] h-[55px] rounded-full bg-zinc-100 p-2 flex items-center md:gap-3.5 '>
          <img className='object-contain object-center' src={logo} alt="" />
          <h1 className='text-3xl font-bold text-blue-500 font-serif select-none hidden md:block'>Clovet</h1>
        </div>
        <div className='flex gap-8'>
          <div className='md:flex md:items-center md:gap-2 border-2 border-blue-500 rounded-full p-1 hidden '>
            <input type="text" id='serach' placeholder='Search...' className='focus:outline-none pl-1.5 font-medium h-[5vh]'
              onFocus={props.scrolling} onChange={(e) => props.setsearch(e.target.value)}
            />
            <div className='bg-blue-500 cursor-pointer w-[30px] h-[30px] rounded-full text-white flex items-center justify-center hover:bg-blue-400'>
              <IoSearch />
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <button className='text-[22px] relative cursor-pointer' onClick={() => props.managePanel('wishlist')}>
              <FaHeart />
              {
                props.wish.length > 0 && 
                <span className='bg-blue-500 w-4 h-4 text-white text-[15px] rounded-full flex justify-center items-center absolute top-5 p-1'>{props.wish.length}</span>
              }
            </button>
            <button className='text-[22px] relative text-zinc-900 cursor-pointer' onClick={() => props.managePanel('cart')}>
              <FaShoppingBag />
              {
                props.total > 0 &&
                <span className='bg-blue-500 w-4 h-4 text-white text-[17px] rounded-full flex justify-center items-center absolute top-5 p-1'>{props.total}</span>

              }
            </button>
          </div>
        </div>
      </nav>
    </section>
  )
}
