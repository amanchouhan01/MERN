import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from './components/Navbar';
import Error from './pages/Error';
import Footer from './components/Footer';
import Logout from './pages/Logout';
import AdminLayout from './components/layouts/AdminLayout';
import AdminUsers from './pages/AdminUsers';
import AdminContacts from './pages/AdminContacts';
import AdminUpdate from './pages/AdminUpdate';


const App = () => {
  return (
    <div>
      <BrowserRouter>
      
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/service' element={<Service />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/logout' element={<Logout />}></Route>
          <Route path='*' element={<Error />}></Route>
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='users' element={<AdminUsers />}></Route>
            <Route path='contacts' element={<AdminContacts />}></Route>
            <Route path='users/:id/edit' element={<AdminUpdate />}></Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App

