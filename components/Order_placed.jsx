import React from 'react'

export default function Order_placed(props) {
  return (
    
    <section className='bg-black/80 w-full fixed inset-0 z-1000 flex justify-center items-center'>
        <div className='bg-white md:w-[40%] w-[80%] h-auto rounded-lg px-5 py-4 flex flex-col justify-center items-center'>
            <h2 className='md:text-4xl text-2xl text-red-600 font-medium'>Order Placed!</h2>
            <p className='md:text-[18px] md:my-3.5 my-2.5 text-[16px]'>Thanks for your purchase!</p>
            <button className='px-6 py-2 bg-blue-600 active:bg-blue-700 cursor-pointer text-white font-medium mt-3 rounded-[10px]' onClick={()=>props.orderplaced(false)}>Close</button>
        </div>
    </section>
  )
}
