import React from 'react'
import { FaTrash } from 'react-icons/fa'

function Cart(props) {
  return (
    <div className={`flex flex-col justify-between w-[75%] md:w-[25%] h-[100vh] z-999 bg-white shadow-2xl border-y-0 border-gray-600 fixed top-0 right-0 pt-3.5 p-2
    transform select-none ${props.panel == 'cart' ? 'translate-x-0' : 'translate-x-full'}  transition-all duration-100`}>
      <div className='text-2xl text-blue-600 font-serif font-bold text-center w-full h-11 border-b-2 border-gray-500'>
         <h2>Your Cart</h2>
      </div>

      {/* prduct-list */}
      <div className='flex-1 pt-2.5 overflow-y-auto scroll'>
      {
          props.product.length === 0 ? (<p className='text-2xl text-gray-600 flex justify-center mt-[50%]'>Your cart is empty!</p>) :
            (
              props.product.map((item, index) => {
                return (
                  <div key={index} className='flex-1 justify-between border-b-2 border-gray-600 flex mt-1.5'>
                    <div className='w-[80px] h-[90px]'>
                      <img className='w-full h-full object-cover object-center' src={item.image} alt="" />
                    </div>
                    <div className='w-[70%] flex justify-between pb-2'>
                      <div className='w-[70%] ml-2 md:ml-0'>
                        <h3 className='text-lg font-medium text-zinc-700'>{item.name}</h3>
                        <p className='text-lg font-medium text-zinc-700'>${item.price}</p>
                        <div className='w-[55%] h-8 border-[2px] border-gray-600 flex justify-between items-center rounded-[10px] mt-1.5'>
                          <button className='text-xl font-medium border-r-[1px] border-gray-600 md:px-1.5 px-0.5 cursor-pointer' onClick={()=>props.addQuantity(item)}>+</button>
                          <p className='text-xl'>{item.quantity}</p>
                          <button className='text-2xl font-medium border-l-[1px] border-gray-600 px-1.5 cursor-pointer'onClick={()=>props.subQuantity(item)} >-</button>
                        </div>
                      </div>
                      <button className='text-xl cursor-pointer mt-[-50px]' onClick={() => props.removeProduct(item)}>
                        <FaTrash />
                      </button>
                    </div>

                  </div>
                )

              })
            )
      }
      </div>

      <div className='w-full h-28 px-3 pt-2'>
        <div className='flex justify-between text-[18px]'>
          <span className='text-zinc-700'>Subtotal</span>
          <span className='text-zinc-700'>${props.subtotal.toFixed(2)}</span>
        </div>
        <div className='flex justify-between text-[18px] pb-2.5'>
          <span className='text-zinc-700'>Shiping & Handling</span>
          <span className='text-zinc-700'>${props.shipping.toFixed(2)}</span>
        </div>
      <div className='flex justify-between text-[18px] border-t-2 border-gray-600 text-red-600 font-medium pt-1.5 border-b-2 pb-2'>
          <span>Order Total</span>
          <span>${props.ordertotal.toFixed(2)}</span>
        </div>

      </div>
      <div className='w-[90%] h-10 flex justify-between mt-3 m-auto'>
        <button className='bg-blue-500 text-white text-lg font-medium font-serif w-[49%] h-full rounded-lg hover:bg-red-500 cursor-pointer'onClick={props.closepanel}>Close</button>
        <button className={`text-white text-lg font-medium font-serif w-[49%] h-full rounded-lg ${props.product.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 cursor-pointer hover:bg-red-500'}`} disabled={props.product.length === 0}
        onClick={()=>props.summery(true)}>Checkout</button>
      </div>
    </div>
  )
}

export default Cart