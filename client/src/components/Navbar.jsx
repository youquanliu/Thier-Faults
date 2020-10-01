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
                            <a className="nav-link" href="/#">Features</a>
                        </li>
                        <li className="nav-item mr-auto ">
                            <a className="nav-link" href="/#">Pricing</a>
                        </li>
                        <li className="nav-item mr-auto ">
                            <a className="nav-link" href="/#">About</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/#">Action</a>
                                <a className="dropdown-item" href="/#">Another action</a>
                                <a className="dropdown-item" href="/#">Something else here</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/#">Separated link</a>
                            </div>
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