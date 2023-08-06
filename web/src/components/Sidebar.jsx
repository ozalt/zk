import React from 'react';
import { Link } from 'react-router-dom';
import { RiUser3Fill, RiLogoutCircleFill } from "react-icons/ri";
import {GiVikingLonghouse} from "react-icons/gi"
import {FaUserTie} from "react-icons/fa"
import logoWhite from '../assets/LOGO WHITE.png';
import "../App.css"
const Sidebar = () => {
    return (
        <div className="sidebar">
           <div >
            <Link to="/">
                    <img className='navbar-logo' src={logoWhite} alt="Logo" />
                </Link>
            </div> 
            <ul className='iconn'>
                <li>
                    <RiUser3Fill/>
                    <Link to="/user-detail">User Statistics</Link>
                </li>
                <li>
                    <FaUserTie/>
                    <Link to="/mechanic-detail">Vendor Statistics</Link>
                </li>
                <li>
                    <GiVikingLonghouse />
                    <Link to="/mechanic-detail">Venue Statistics</Link>
                </li>
                <li>
                    <RiLogoutCircleFill />
                    <Link to="/logout">Logout
                    </Link></li>
            </ul>
        </div>
    );
};


export default Sidebar;
