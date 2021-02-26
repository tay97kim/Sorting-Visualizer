import React from "react";
import styled from 'styled-components';

export default function Main() {
    return (
        <Footer>
            <FooterContent>
                <Name>Sort Visualizer</Name>
            </FooterContent>
            <FooterContent>
                <InnerContent>
                    [2021.02] Made by TaeSeong Kim for 모두를 위한 컴퓨팅 사고
                    <p />Advised by Prof. Jongwan Kim
                </InnerContent>
            </FooterContent>
            <FooterContent>
                <InnerContent>
                    <img src="header_logo.jpg" width="295" height="56" />
                    <img src="ccl.png" width="295" height="50" />
                </InnerContent>
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

const InnerContent = styled.div`
    display: flex;
    flex-direction: column;
    font-Size:14px;
`
