import React from 'react'
import styled from 'styled-components';

const Header = () => {
    return (
        <MainContainer>
            <h1>All is their faults</h1><br />
        </MainContainer>
    )
}

export default Header

const MainContainer = styled.header`
    background:url(../assets/images/bg.jpg)no-repeat center cover;
    height: 25rem;

    h1{
        transform: translate(-50% -50%);
        color: #black;
        font-weight:900
        posotion: absolute;
        top:125%;
        left: 50%;
    }
`;