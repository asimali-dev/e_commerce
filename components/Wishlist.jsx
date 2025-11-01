import React from 'react'
import { FaTrash } from 'react-icons/fa'

export default function Wishlist(props) {
    const clear = ()=>{
        props.setwish([]);
    }
    return (
        <div className={`flex flex-col justify-between w-[75%] md:w-[25%] h-[100vh] z-999 bg-white shadow-xl border-y-0 border-gray-600 fixed top-0 right-0 pt-3.5 p-2 transform ${props.panel == 'wishlist' ? 'translate-x-0' : 'translate-x-full'} transition-all duration-100`}>
            <div className='text-2xl text-blue-600 font-serif font-bold text-center w-full h-11 border-b-2 border-gray-500'>
                <h2>Your Wishlist</h2>
            </div>

            {/* prduct-list */}
            <div className='flex-1 pt-2.5'>
                {
                    props.wish.length === 0 ? (<p className='text-xl text-gray-600 flex justify-center mt-[70%] md:text-2xl'>Your wishlist is empty!</p>) :
                        (
                            props.wish.map((item, index) => {
                                return (
                                    <div className='flex-1 justify-between border-b-2 border-gray-600 flex mt-1.5 pb-1.5 relative' key={index}>
                                        <div className='w-[80px] h-[90px]'>
                                            <img className='w-full h-full object-cover object-center' src={item.image} alt="" />
                                        </div>
                                        <div className='md:w-[70%] w-[80%] flex flex-col pb-1 pl-1.5 md:pl-0'>
                                            <h3 className='text-[17px] font-medium text-zinc-700'>{item.name}</h3>
                                            <p className='text-[17px] font-medium text-zinc-700'>${item.price}</p>
                                            <div className='flex items-center justify-between mt-1 w-full h-[30px]'>
                                                <div className='text-[16px] hidden md:block'>{item.date}</div>
                                                <button className='md:px-2.5 px-3.5 py-1 text-[16px] md:py-1 bg-blue-600 text-white md:text-[17px] rounded-[5px] cursor-pointer active:bg-blue-700' onClick={() => props.addTocart(item)}>Add to Cart</button>
                                            </div>
                                        </div>
                                        <button className='text-xl cursor-pointer absolute top-2 right-2.5' onClick={() => props.removing(item)}>
                                           <FaTrash />
                                        </button>

                                    </div>
                                )

                            })
                        )
                }
            </div>
            <div className='w-full h-10 flex justify-between mt-3'>
                <button className='bg-blue-500 text-white text-lg font-medium font-serif w-[47%] h-full rounded-lg hover:bg-red-500 cursor-pointer' onClick={clear}>Clear All</button>
                <button className='bg-blue-500 text-white text-lg font-medium font-serif w-[47%] h-full rounded-lg hover:bg-red-500 cursor-pointer'
                    onClick={props.closepanel}>Close</button>
            </div>
        </div>
    )
}
