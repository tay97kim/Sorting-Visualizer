import React from "react";
import styled from 'styled-components';

export default function Main() {
    return (
        <Footer>
            <FooterContent>
                <Name>Sort Visualizer</Name>
            </FooterContent>
            <FooterContent>Made by TaeSeong Kim for 모두를 위한 컴퓨팅 사고</FooterContent>
            <FooterContent>
                <img src="header_logo.jpg" width="295" height="56" />
            </FooterContent>
        </Footer >
    )
}

const Footer = styled.footer`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 300px;
    background-color: #71B309;
    justify-content: center;
`

const FooterContent = styled.div`
    display: flex;
    background-color: #71B309;
    width: 100%;
    align-content: center;
    justify-content: space-evenly;
    padding-top:10px;
`

const Name = styled.div`
    font-size: 40px;
    color: white;
    padding-right: 80px;
`