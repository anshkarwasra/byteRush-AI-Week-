import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import Logo from './assets/logo.png'
import { useState } from 'react'
const Navbar = () => {
    const [Neon, setNeon] = useState("neon");
    return (
       <>
         <nav>
            <div className="logo">
                <img src={Logo} alt="" srcset="" />
            </div>
            <div className="menu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dashboard" state={{hideState: true}}>Dashboard</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/getStarted">GetStarted</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <button>Login</button>
                    </ul>
            </div>
        </nav>
       </>
    )
}

export default Navbar
