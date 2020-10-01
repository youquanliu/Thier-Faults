import React from 'react'
import styled from 'styled-components';

const Footer = () => {
    return (
        <FootyerContainer>
            <span style={{ color: "#FFF", top: "1.5rem", left: "1rem", position: "relative" }}>
                &copy;{new Date().getFullYear()}All Rights Reserved. All Their Faults
            </span>
        </FootyerContainer>
    )
}

export default Footer

const FootyerContainer = styled.footer`
background:#3e655a;
height:4rem;
postition:fixed;
left:0;
bottom:0;
width:100%;
`