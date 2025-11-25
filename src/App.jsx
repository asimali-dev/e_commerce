import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Product from '../components/Product';
import Cart from '../components/Cart';
import Wishlist from '../components/Wishlist';
import Order_summery from '../components/Order_summery';
import Order_placed from '../components/Order_placed';
import Footer from '../components/Footer';
import Dashboard from "../components/Dashboard";

function App() {
  const isProd = import.meta.env.PROD;

  const [search, setSearch] = useState('');
  const [panel, setPanel] = useState('null');
  const [product, setProduct] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [wish, setWish] = useState(() => {
    try {
      const stored = localStorage.getItem('wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [summery, setSummery] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleScroll = () => {
    const section = document.getElementById('product-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const managePanel = (tabName) => {
    setPanel(prev => (prev === tabName ? 'null' : tabName));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(product));
  }, [product]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wish));
  }, [wish]);

  const addSubTotal = product.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const addTotal = product.reduce((acc, item) => acc + item.quantity, 0);
  const shippingFee = addTotal * 2;
  const orderTotal = addSubTotal + shippingFee;

  const addQuantity = (prod) => {
    setProduct(product.map(item => item.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const subQuantity = (prod) => {
    setProduct(product.map(item => {
      if (item.id === prod.id) {
        const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const closePanel = () => setPanel('null');

  const addToCart = (prod) => {
    const exists = product.find(item => item.id === prod.id);
    if (exists) return alert('Product already in cart');
    setProduct([...product, { ...prod, quantity: 1 }]);
  };

  const removeProduct = (prod) => {
    setProduct(product.filter(item => item.id !== prod.id));
  };

  const addToWish = (item) => {
    const exists = wish.find(w => w.id === item.id);
    const date = new Date().toLocaleDateString('en-GB');
    if (exists) return alert('Product already in wishlist');
    setWish([...wish, { ...item, date }]);
  };

  const removeFromWish = (item) => {
    setWish(wish.filter(w => w.id !== item.id));
  };

  return (
    <HashRouter basename={isProd ? '/e_commerce' : '/'}>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar scrolling={handleScroll} setsearch={setSearch} managePanel={managePanel} total={addTotal} wish={wish} />
            <Banner />
            <Product search={search} addTocart={addToCart} addTowish={addToWish} wish={wish} />
            <Cart
              panel={panel}
              closepanel={closePanel}
              product={product}
              removeProduct={removeProduct}
              addQuantity={addQuantity}
              subQuantity={subQuantity}
              subtotal={addSubTotal}
              shipping={shippingFee}
              ordertotal={orderTotal}
              summery={setSummery}
            />
            <Wishlist
              panel={panel}
              closepanel={closePanel}
              wish={wish}
              addTocart={addToCart}
              setwish={setWish}
              removing={removeFromWish}
            />
            {summery && <Order_summery
              product={product}
              ordertotal={orderTotal}
              shipping={shippingFee}
              subtotal={addSubTotal}
              Orderplaced={setOrderPlaced}
              setsummery={setSummery}
              setproduct={setProduct}
            />}
            {orderPlaced && <Order_placed orderplaced={setOrderPlaced} />}
            <Footer />
          </>
        } />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
