import React from 'react'
import styled from 'styled-components';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <span style={{ color: "#FFF", top: "1.5rem", left: "1rem", position: "relative" }}>
                &copy;{new Date().getFullYear()}All Rights Reserved. All Their Faults
            </span>
        </div>
    )
}

export default Footer

