import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export const NavBar = props => {
    return (
        <ul className="navbar">
            <li className="navbar--item">
                <Link className="nav-link" to="/">
                    Home
                </Link>
            </li>
            <li className="navbar--item">
                <Link className="nav-link" to="/tenants">
                    Tenants
                </Link>
            </li>
            <li className="navbar--item">
                <Link className="nav-link" to="/properties">
                    Properties
                </Link>
            </li>
            <li className="navbar--item">
                <FontAwesomeIcon icon={faSignOutAlt} 
                    onClick={() => {
                        localStorage.removeItem("cc_token")
                        props.history.push({ pathname: "/" })
                    }}/>
            </li>
        </ul>
    )
}