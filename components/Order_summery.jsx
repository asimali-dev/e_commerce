import React from 'react'

export default function Order_summery(props) {
    const placeorder = ()=>{
        props.setsummery(false)
        props.Orderplaced(true)
        props.setproduct([])
    }
  return (
    <section className='bg-black/80 w-full fixed inset-0 z-1000 flex justify-center items-center'>
      <div className='bg-white md:w-[40%] w-[80%] h-auto rounded-lg px-5 py-4 flex flex-col justify-center items-center'>
        <div className='md:w-[45%] w-[80%] bg-black text-center py-2 text-white md:text-2xl text-xl px-2 rounded-[10px]'>
          <h2>Order Summery</h2>
        </div>
        <div className='w-full h-[80px] pb-2 mt-2 border-b-2 border-gray-500 overflow-y-auto scroll'>
          {
            props.product.map((item, index) =>
              <div className='flex justify-between text-lg text-zinc-800' key={index}>
                <span className='font-medium'>{item.name} x {item.quantity}</span>
                <span>${item.quantity * item.price.toFixed(2)}</span>
              </div>
            )
          }
        </div>
        <div className='w-full h-[auto]'>
          {
            <>
              <div className='pb-1.5'>
              <div className='flex justify-between text-[18px] mt-1 text-blue-600'>
                <span className='font-medium'>Sub Total</span>
                <span>${props.subtotal.toFixed(2)}</span>

              </div>
              <div className='flex justify-between text-[18px] text-blue-600'>
                <span className='font-medium'>Shipping Fee</span>
                <span>${props.shipping.toFixed(2)}</span>
              </div>
              </div>
              <div className='flex justify-between text-[20px] font-meduim text-red-600 border-t-[2px] border-b-[2px] border-gray-600 py-1'>
                <span className='font-medium'>Order Total</span>
                <span>${props.ordertotal.toFixed(2)}</span>
              </div>
              <div className='w-[100%] mt-3 h-[40px] flex justify-between m-auto'>
                <button className='w-[47%] text-[18px] text-white bg-black rounded-[10px] cursor-pointer' onClick={()=>props.setsummery(false)}>Close</button>
                <button className='w-[47%] text-[18px] text-white bg-blue-500 active:bg-blue-600 rounded-[10px] cursor-pointer' onClick={placeorder}>Place Order</button>
              </div>
            </>
          }


        </div>
      </div >
    </section >
  )
}
