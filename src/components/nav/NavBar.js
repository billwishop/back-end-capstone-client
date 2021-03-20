import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export const NavBar = props => {
    return (
        <ul className="navbar">
            <div className="navbar--links">
                <li className="navbar--item">
                    <Link className="nav-link" to="/">
                        HOME
                    </Link>
                </li>
                <li className="navbar--item">
                    <Link className="nav-link" to="/tenants">
                        TENANTS
                    </Link>
                </li>
                <li className="navbar--item">
                    <Link className="nav-link" to="/properties">
                        PROPERTIES
                    </Link>
                </li>
            </div>
            <li className="navbar--item logout">
                <FontAwesomeIcon className='icon' icon={faSignOutAlt} 
                    onClick={() => {
                        localStorage.removeItem("cc_token")
                        props.history.push({ pathname: "/" })
                    }}/>
            </li>
        </ul>
    )
}