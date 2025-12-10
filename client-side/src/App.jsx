import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import React from "react";
import Home from "./components/Products/Home";
import LogIn from "./components/SignIn/LogIn";
import SignUp from "./components/Registration/SignUp";
import Payment from "./components/PaymentFile/Payment";
import AddingProducts from "./components/ADMIN/AddingProducts";
import Profile from "./components/Profile/Profile";
import Cart from "./components/Shopping/Cart";
import Orders from "./components/OrderHistory/Orders";
import ProductInfo from "./components/ProductDetails/ProductInfo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/AddingProducts" element={<AddingProducts />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/products/:id" element={<ProductInfo />} />
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
