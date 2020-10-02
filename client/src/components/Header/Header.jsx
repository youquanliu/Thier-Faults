import React, { useEffect } from 'react'
import styled from 'styled-components';
import './Header.css';

const Header = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/typer-dot-js@0.1.0/typer.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <div className="background">
            <div className="hero-text-box">
                <h2 className="white">Their Faults!</h2>
                <br/><br/>
                <h1>
                    <span className="typer" id="main" data-words=
                        "Ice Cream, Cheese Burger, Pizza Pizza Pizza, Fried Chicken, Bacon, Oreo, Hot Pot, T-bone Steak, BBQ BBQ BBQ "
                        data-delay="100" data-deleteDelay="700" data-colors="red"></span>
                    <span className="cursor" data-owner="main"></span>
                </h1>
            </div>
        </div>
    )
}

export default Header
