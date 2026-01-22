import React from 'react'
import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaRegListAlt } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { useAuth } from "../../store/Auth";
import './AdminLayout.css';
const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <header className='layoutheader'>
      <div className={`layoutContainer`}>

        <nav className='layoutnav'>
          <ul className='layoutul'>
            <li className='layoutli'>
              <NavLink to="/">
                <IoHome />Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/users">
                <FaUser />Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/contacts">
                <FaRegMessage />Contacts
              </NavLink>
            </li>
            <li>
              <NavLink to="/service">
                <FaRegListAlt />Services
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </header>
  )
}

export default AdminLayout
