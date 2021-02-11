import React from "react";
import styled from 'styled-components';

export default function Main({ data, currentIdx, nextIdx, onSorting }) {

    const width = 500 / data.length;
    var height = 5;

    if (data.length > 29) {
        if (data.length >= 50)
            height = 4;
        else if (data.length >= 75)
            height = 3;
        else if (data.length >= 100)
            height = 2;
        return (
            <Container>
                {data.map((size, i) => (
                    <Bar id={i} height={`${(size * height) + 20}px`} width={`${width}px`} active={currentIdx === size} style={nextIdx === size ? { backgroundColor: "purple" } : null} />
                ))}
            </Container>
        );
    }
    else {
        return (
            <Container>
                {data.map((size, i) => (
                    <Bar id={i} height={`${(size * height) + 20}px`} width={`${width}px`} active={currentIdx === size} style={nextIdx === size ? { backgroundColor: "purple" } : null}>{size}</Bar>
                ))}
            </Container >
        );
    }

}

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 88%;
    height: 300px;
    justify-content: space-evenly;
    margin-left: 50px;
    margin-right: 50px;
    padding-top: 250px;
    align-items: flex-end;
`

const Bar = styled.div`
    text-Align: center;
    font-weight: bold;
    width: ${props => props.width};
    height: ${props => props.height || '500px'};
    background-color: ${(props) => (props.active ? "#B50002" : "#33A5DE")};
    margin - right: 2px;
`