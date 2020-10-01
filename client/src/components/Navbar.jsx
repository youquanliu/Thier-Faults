import React from 'react';
import styled from 'styled-components';

const Navbar = () => {
    return (
        <NavbarContainer>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/#">
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item mr-auto active">
                            <a className="nav-link" href="/#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item mr-auto ">
                            <a className="nav-link" href="/#">New</a>
                        </li>
                        <li className="nav-item mr-auto ">
                            <a className="nav-link" href="/#">Login</a>
                        </li>
                        <li className="nav-item mr-auto ">
                            <a className="nav-link" href="/#">Register</a>
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