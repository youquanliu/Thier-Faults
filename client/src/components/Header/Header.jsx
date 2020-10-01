import React from 'react'
import styled from 'styled-components';
import './Header.css';

const Header = () => {
    return (
        <div className="background">
            <div className="hero-text-box">
                <h1 className="white">Their Faults</h1> <br />
                <h2>
                    <span className="typer" id="main" data-words="Ice Cream, Cheese Burger, Pizza, Fried Chicken, Bacon, Oreo, Hot POt, T-bone Steak, BBQ"
                        data-delay="100" data-deleteDelay="700" data-colors="red"></span>
                    <span className="cursor" data-owner="main"></span>
                </h2>
            </div>
        </div>
    )
}

export default Header
