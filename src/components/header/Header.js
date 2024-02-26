import React from 'react'
import './style.css'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <div className='navbar'>
            <div className="gradient" />
            <div className="links">
                <NavLink to='/' className='link' activeclassname={'active'}>Sign Up</NavLink>
                <NavLink to='/podcasts' className='link' activeclassname={'active'}>Podcasts</NavLink>
                <NavLink to='/create-podcast' className='link' activeclassname={'active'}>Start A Podcast</NavLink>
                <NavLink to='/profile' className='link' activeclassname={'active'}>Profile</NavLink>
            </div>
        </div>
    )
}

export default Header