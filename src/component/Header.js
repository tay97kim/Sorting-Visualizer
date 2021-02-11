import React from "react";

import Slider from '@material-ui/core/Slider';

import { Button, SortButton, Container, Wrapper, ControlWrapper, SpeedWrapper, SpeedContainer, SortWrapper, CountContainer } from "./header.style";
import { Typography } from "@material-ui/core";

var valueBtn = false;
var valueSpeed = 3;
var valueCP = 0;
var valueSW = 0;
var valueMC = 0;
var sortState = true;

export function valueClear() {
    valueCP = 0;
    valueSW = 0;
    valueMC = 0;
}

export function plusValue(int) {
    switch (int) {
        case 1: {
            valueCP++;
            break;
        }
        case 2: {
            valueSW++;
            break;
        }
        case 3: {
            valueMC++;
            break;
        }
        default: {
        }
    }
}

export function getSpeed() {
    return valueSpeed;
}

export function buttonOn() {
    valueBtn = false;
}

export default function Header({ sortPause, sortRestart, setArray, updateList, rangeChange, selectClicked, bubbleClicked, insertClicked, mergeClicked, sortStart }) {
    const [valueS, setValueS] = React.useState(3);

    const sleep = (milliseconds) => { //딜레이 메소드
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    const handleSliderChangeSpeed = (event, newValue) => {
        setValueS(newValue);
        setSpeed(valueS);
    };

    function setSpeed(inputSpeed) {
        valueSpeed = inputSpeed;
    }

    function buttonOff() {
        if (valueBtn === false) {
            valueBtn = true;
            onSorting();
            sortStart();
        }
    }

    function setArrayBtn() {
        if (valueBtn === false)
            setArray();
    }

    function updateListBtn() {
        if (valueBtn === false)
            updateList();
    }

    function rangeChangeBtn() {
        if (valueBtn === false)
            rangeChange();
    }

    function select() {
        if (valueBtn === false)
            selectClicked();
    }

    function bubble() {
        if (valueBtn === false)
            bubbleClicked();
    }

    function insert() {
        if (valueBtn === false)
            insertClicked();
    }

    function merge() {
        if (valueBtn === false)
            mergeClicked();
    }

    function pause() {
        if (valueBtn === true) {
            sortPause();
        }
    }

    const onSorting = async () => {
        var top = document.getElementById("top");
        var control = document.getElementById("control");
        top.style.backgroundColor = "lightgray";
        control.style.backgroundColor = "gray";
        while (valueBtn) {//on Sorting
            await sleep(100);
        }
        top.style.backgroundColor = "#77E000";
        control.style.backgroundColor = "#1CD90B";
    }

    return (
        <Container>
            < Wrapper id="top" >
                <Button onClick={setArrayBtn}>직접배열생성</Button>
                <Button onClick={updateListBtn}>새 배열생성</Button>
                <Button onClick={rangeChangeBtn}>원소개수설정</Button>

                <SpeedContainer>
                    <SpeedWrapper>
                        <Typography id="discrete-slider-alwaysS" gutterBottom>
                            {valueS}
                        </Typography>
                        <Slider
                            value={typeof valueS === 'number' ? valueS : 0}
                            onChange={handleSliderChangeSpeed}
                            aria-labelledby="discrete-slider-alwaysS"
                            min={1}
                            max={5}
                        />
                    </SpeedWrapper>
                    <p >속도설정</p>
                </SpeedContainer>

                <SortWrapper>
                    <SortButton onClick={select}>선택정렬</SortButton>
                    <SortButton onClick={bubble}>버블정렬</SortButton>
                    <SortButton onClick={insert}>삽입정렬</SortButton>
                    <SortButton onClick={merge}>병합정렬</SortButton>
                </SortWrapper>
            </ Wrapper >
            <ControlWrapper id="control">
                <Button onClick={buttonOff}>정렬 시작</Button>
                <Button onClick={pause}>일시정지</Button>
                <CountContainer>
                    비교횟수:
                    <Typography>{valueCP}</Typography>
                </CountContainer>
                <CountContainer>
                    교환횟수:
                    <Typography>{valueSW}</Typography>
                </CountContainer>
                <CountContainer>
                    병합횟수:
                    <Typography>{valueMC}</Typography>
                </CountContainer>
            </ControlWrapper>
        </Container>
    );
}

