import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Product from '../components/Product';
import Cart from '../components/Cart';
import Wishlist from '../components/Wishlist';
import Order_summery from '../components/Order_summery';
import Order_placed from '../components/Order_placed';
import Footer from '../components/Footer';
import Dashboard from "../components/Dashboard";
import AdminLogin from "../components/Admin_login";
import Login from "../components/Login";
import Signup from "../components/Sign_up";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
  const [search, setSearch] = useState('');
  const [panel, setPanel] = useState('null');
  const [product, setProduct] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || []; } catch { return []; }
  });
  const [wish, setWish] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wishlist')) || []; } catch { return []; }
  });
  const [summery, setSummery] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(product)); }, [product]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wish)); }, [wish]);
  useEffect(() => {
    if(token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);
  useEffect(() => {
    if(userEmail) localStorage.setItem('userEmail', userEmail);
    else localStorage.removeItem('userEmail');
  }, [userEmail]);

  const handleScroll = () => {
    const section = document.getElementById('product-section');
    if(section) section.scrollIntoView({ behavior:'smooth' });
  }

  const managePanel = (tabName) => setPanel(prev => (prev===tabName?'null':tabName));

  const addSubTotal = product.reduce((acc,item)=>acc+item.price*item.quantity,0);
  const addTotal = product.reduce((acc,item)=>acc+item.quantity,0);
  const shippingFee = addTotal*2;
  const orderTotal = addSubTotal + shippingFee;

  const addQuantity = (prod) => setProduct(product.map(item => item.id===prod.id?{...item,quantity:item.quantity+1}:item));
  const subQuantity = (prod) => setProduct(product.map(item=>{
    if(item.id===prod.id){ const q = item.quantity>1?item.quantity-1:1; return {...item,quantity:q} }
    return item;
  }));
  const closePanel = () => setPanel('null');
  const addToCart = (prod) => { if(product.find(p=>p.id===prod.id)) return alert('Product already in cart'); setProduct([...product,{...prod,quantity:1}]); }
  const removeProduct = (prod) => setProduct(product.filter(item=>item.id!==prod.id));
  const addToWish = (item) => { if(wish.find(w=>w.id===item.id)) return alert('Product already in wishlist'); const date = new Date().toLocaleDateString('en-GB'); setWish([...wish,{...item,date}]); }
  const removeFromWish = (item) => setWish(wish.filter(w=>w.id!==item.id));

  const ProtectedRoute = ({children}) => { if(!token) return <Navigate to="/login" />; return children; }

  return (
    <HashRouter>
      <Navbar
        scrolling={handleScroll} setsearch={setSearch} managePanel={managePanel}
        total={addTotal} wish={wish} token={token} userEmail={userEmail}
        setToken={setToken} setUserEmail={setUserEmail}
      />
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <Product search={search} addTocart={addToCart} addTowish={addToWish} wish={wish} />
            <Cart panel={panel} closepanel={closePanel} product={product} removeProduct={removeProduct}
              addQuantity={addQuantity} subQuantity={subQuantity} subtotal={addSubTotal} shipping={shippingFee} ordertotal={orderTotal} summery={setSummery} />
            <Wishlist panel={panel} closepanel={closePanel} wish={wish} addTocart={addToCart} setwish={setWish} removing={removeFromWish} />
            {summery && <Order_summery product={product} ordertotal={orderTotal} shipping={shippingFee} subtotal={addSubTotal} Orderplaced={setOrderPlaced} setsummery={setSummery} setproduct={setProduct} />}
            {orderPlaced && <Order_placed orderplaced={setOrderPlaced} />}
            <Footer />
          </>
        } />
        <Route path="/login" element={!token ? <Login setToken={setToken} setUserEmail={setUserEmail} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!token ? <Signup setToken={setToken} setUserEmail={setUserEmail} /> : <Navigate to="/" />} />
        <Route path="/admin-login" element={!token ? <AdminLogin setToken={setToken} setUserEmail={setUserEmail} /> : <Navigate to="/" />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
