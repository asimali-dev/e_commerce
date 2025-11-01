import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Product from '../components/Product'
import Cart from '../components/Cart'
import Wishlist from '../components/Wishlist'
import Order_summery from '../components/Order_summery'
import Order_placed from '../components/Order_placed'
import Footer from '../components/Footer'

function App() {
  const [count, setCount] = useState(0)
  const [search, setsearch] = useState('');
  const [panel, setpanel] = useState('null');
  const [product, setproduct] = useState(()=>{
    const storecart = localStorage.getItem('cart')
    return storecart ? JSON.parse(storecart) : []
  });
  const [wish, setWish] = useState(()=>{
    const storewish = localStorage.getItem('wishlist')
    return storewish ? JSON.parse(storewish) : []
  });
  const [summery , setsummery] = useState(false);
  const [OrderPlaced , setOrderPlaced] = useState(false)
  const HandleScroll = () => {
    const section = document.getElementById('product-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const managePanel = (tabName) => {
    setpanel((prev) => (
      prev === tabName ? 'null' : tabName
    ))

  }
  // set item in local storage 
  useEffect(()=>
    localStorage.setItem('cart',JSON.stringify(product))
  ,[product])

  // set item in wishlist 
  useEffect(()=>
    localStorage.setItem('wishlist',JSON.stringify(wish))
  ,[wish])

  // add subtotal

  const addSubTotal = product.reduce((acc,item)=> acc + item.price * item.quantity ,0)

  // add total

  const addtotal = product.reduce((acc,item)=> acc + item.quantity , 0)

  // shipping fee
  const shippingfee = addtotal*2;

  // order total 
  const ordertotal = addSubTotal + shippingfee ;

  const addQuantity = (products) => {
    setproduct(product.map(item => item.id === products.id ? { ...item, quantity: item.quantity + 1 } : item))
  }
  const subQuantity = (products) => {
    setproduct(product.map(item => {
      if (item.id === products.id) {
        const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }
  const closingpanel = () => setpanel('null')

  const addTocart = (products) => {
    const alreadyAdd = product.find(item => item.id === products.id);
    if (alreadyAdd) {
      alert('Dear Customer! your product is already in your cart')
      return
    }
    setproduct([...product, {...products, quantity: 1 }])

  }
  const removeProduct = (products) => {
    setproduct(product.filter(item => item.id !== products.id))
  }
  const addTowish = (values) => {
    const alreadyWish = wish.find(item => item.id === values.id)
    console.log('listing',alreadyWish)
    const date = new Date().toLocaleDateString('en-GB')
    if(alreadyWish) {
      alert('Dear Customer! your product is already in your wishlist')
      return
    }
    setWish([...wish, {...values,date}])
  }

  // add total in wish 
  const totaling = wish.reduce((acc,item) => acc + item.quantity , 0)

  // remove product from wishlist

  const removing = (product)=>{
    setWish(wish.filter((item)=> item.id !== product.id))

  }


  return (
    <BrowserRouter>
      <Navbar scrolling={HandleScroll} setsearch={setsearch} managePanel={managePanel} total = {addtotal} wish = {wish}/>
      <Banner />
      <Product search={search} addTocart={addTocart} addTowish={addTowish} wish = {wish}/>
      <Cart panel={panel} closepanel={closingpanel} product={product} removeProduct={removeProduct} addQuantity={addQuantity} subQuantity={subQuantity} subtotal = {addSubTotal} shipping = {shippingfee} ordertotal = {ordertotal}
      summery = {setsummery}/>
      <Wishlist panel={panel} closepanel={closingpanel} wish={wish} addTocart={addTocart} setwish = {setWish} removing = {removing}/>
      {
      summery &&
      <Order_summery product = {product} ordertotal = {ordertotal} shipping = {shippingfee} subtotal = {addSubTotal} Orderplaced = {setOrderPlaced}
      setsummery={setsummery} setproduct = {setproduct}/>
      } 
      {
        OrderPlaced && 
        <Order_placed orderplaced={setOrderPlaced}/>
      }
      <Footer/>

    </BrowserRouter>
  )
}

export default App
