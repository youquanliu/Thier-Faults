import React from 'react';
import styled from 'styled-components';
import logo from '../assets/images/cake-logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <NavbarContainer>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/#">
                    <img style={{ width: "5rem" }} stc={{ logo }} alt="logo" />
                </Link>
                <div className="" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item mr-auto active">
                            <Link className="nav-link" to="/#">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item mr-auto ">
                            <Link className="nav-link" to="/add-post">New</Link>
                        </li>
                        <li className="nav-item mr-auto ">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item mr-auto ">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </NavbarContainer>
    )
}
export default Navbar


//main navbar container
const NavbarContainer = styled.div`
background:/#f7f7f9
`