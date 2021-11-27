import React from 'react';
import { Link } from 'react-router-dom'

const NavbarItem = ({ hreference, title }) =>{
    return(
        <>
            {/* <li><a href={hreference} className="nav-link px-2 text-white">{title}</a></li> */}
            <li><Link to={hreference} className="nav-link px-2 text-white">{title}</Link></li>
        </>
    )
}

export default NavbarItem;