import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";

export default function Product(props) {
  const [active, setActive] = useState('All');
  const [data, setdata] = useState([])
  const categories = ["All", "Mens", "Womens", "Kids", "Sale", "New Arrivals"]
  const product_list = async () => {
    const url = "http://localhost:5000/product";
    const resp = await fetch(url)
    const data = await resp.json();
    setdata(data);
    console.log(data);
  }
  useEffect(() => {
    product_list()
  }, [])

  const fillterItem = data.filter(item =>{
   const matches = 
   (active === 'All') ||
   (active === 'New Arrivals' && item.new_arrival)||
   (active === 'Sale' && item.sale)||
   (active === item.category)
   ? data : active === item.category;

   const searchcategory = item.name.toLowerCase().includes(props.search.toLowerCase())
   return matches && searchcategory;
  })
  const none_font = ()=>{
    return(
      <div className='w-[55%] h-[20vh]'>
        <img className='object-cover object-center mix-blend-darken' src="https://static.tildacdn.net/tild3432-3335-4337-b130-363866343062/No_results_1.svg" alt="" />
      </div>
    )
  }

  const add_product = () => {
    return fillterItem.map((item, index) => (
      <div key={index} className='md:w-[85%] w-[100%] md:h-[330px] h-[250px] bg-white rounded-[10px] shadow-2xl p-2 select-none'>
        <div className='md:w-full md:h-[190px] h-[120px] overflow-hidden relative'>
          <img className='w-full h-full object-cover object-center' src={item.image} alt="" />
          <div className='absolute top-1.5 left-2.5 text-[25px] cursor-pointer font-bold'>
            <button className={`border-transparent cursor-pointer ${props.wish.some(val => val.id === item.id) ? 'text-zinc-700' : 'text-zinc-400'}`} onClick={()=>props.addTowish(item)}>
              <FaHeart/>
            </button>
          </div>
          <div className='absolute top-1.5 right-2.5 rounded-[20px]'>
            {(item.sale || item.new_arrival) && (
              <span className={`md:px-3 md:py-1 px-2 py-0.5 text-white ${item.sale ? "bg-red-600" : "bg-blue-600"}`}>
                {item.sale ? 'Sale' : 'New'}
              </span>
            )}
          </div>
        </div>
        <h3 className='md:text-[20px] text-[16px] mt-2 font-medium md:font-serif text-red-600 truncate'>{item.name}</h3>
        <div className='flex md:w-[60%] w-[90%] justify-between'>
          {
            item.sale && (
              <p className='md:text-[18px] text-[16px] mt-1 line-through'>${item.old_price.toFixed(2)}</p>
            )
          }
          <p className='md:text-[18px] text-[16px] mt-1 '>${item.price.toFixed(2)}</p>
        </div>
        <button className='w-full h-[40px] bg-blue-600 rounded-[10px] mt-3 text-white text-[16px] md:text-[18px] font-medium cursor-pointer hover:bg-red-500'
        onClick={()=>props.addTocart(item)}>Add to Cart</button>
      </div>

    ))
  }
  return (
    <>
      <div className='w-full h-auto pb-9' id='product-section'>
        <div className='md:w-[60%] w-[90%] h-auto md:h-auto mt-7 flex md:justify-evenly justify-center gap-3.5 flex-wrap m-auto'>
          {
            categories.map((item, index) => {
              return (
                <button key={index} className={`rounded-lg md:px-5 md:py-1.5 px-3 h-[40px] text-[16px] md:text-[18px] font-medium
                cursor-pointer  ${active === item ? "bg-blue-600 text-white" : "bg-zinc-100 text-black"}`}
                  onClick={() => setActive(item)}>{item}</button>
              )
            })
          }
        </div>
        <div className='pl-1.5 pr-1.5'>
          {
            (fillterItem.length === 0) ? 
            <div className='flex justify-center'>{none_font()}</div> : 
            <div className='md:w-[100%] w-[100%] grid md:grid-cols-4 grid-cols-2 mt-9 md:gap-6 gap-3 justify-items-center md:pl-5 md:pr-5 md:pb-7 gap-y-9'>{ add_product()}</div>

          }
        </div>

      </div>
    </>
  )
}
