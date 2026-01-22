import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "./Navbar.css";
import { useAuth } from '../store/Auth';
import { CgMenu, CgClose } from "react-icons/cg";

const Navbar = () => {
    const { isLoggedIn } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // 🔒 Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
        }
        
        // Cleanup on unmount
        return () => {
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    // ❌ Close menu automatically on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return (
        <header className="navbar">
            <div className="nav-container">
                
                {/* Logo Section */}
                <div className='logo-brand'>
                    <NavLink to="/">
                        <img className='logoimage' src="/cropped_circle_image.png" alt="Logo" />
                    </NavLink>
                </div>

                {/* Navigation Menu */}
                <nav className={menuOpen ? "navComponents active" : "navComponents"}>
                    <ul>
                        <li>
                            <NavLink to="/" onClick={() => setMenuOpen(false)}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/service" onClick={() => setMenuOpen(false)}>
                                Service
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
                                Contact
                            </NavLink>
                        </li>
                        
                        {/* Authentication Logic */}
                        {isLoggedIn ? (
                            <li>
                                <NavLink to="/logout" onClick={() => setMenuOpen(false)}>
                                    Logout
                                </NavLink>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                {/* Mobile Hamburger Button */}
                <button
                    className="mobile-nav-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <CgClose /> : <CgMenu />}
                </button>

            </div>
        </header>
    );
}

export default Navbar;