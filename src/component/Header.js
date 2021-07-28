import React from "react";

import Slider from '@material-ui/core/Slider';

import { Button, SortButton, Container, Wrapper, ControlWrapper, SpeedWrapper, SpeedContainer, SortWrapper, CountContainer } from "./header.style";
import { Typography } from "@material-ui/core";

var valueBtn = false;
var valueSpeed = 3;
var valueCP = 0;
var valueSW = 0;
var valueMC = 0;
var sortType = 0;

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
            if (sortType === 0) {
                alert("정렬의 종류를 먼저 선택한 뒤 시작해주세요");
            }
            else {
                valueBtn = true;
                onSorting();
                sortStart();
            }
        }
    }

    function setArrayBtn() {
        if (valueBtn === false) {
            valueClear();
            setArray();
        }
    }

    function updateListBtn() {
        if (valueBtn === false) {
            valueClear();
            updateList();
        }
    }

    function rangeChangeBtn() {
        if (valueBtn === false) {
            valueClear();
            rangeChange();
        }
    }

    function select() {
        if (valueBtn === false) {
            sortType = 1;
            selectClicked();
        }
    }

    function bubble() {
        if (valueBtn === false) {
            sortType = 2;
            bubbleClicked();
        }
    }

    function insert() {
        if (valueBtn === false) {
            sortType = 3;
            insertClicked();
        }
    }

    function merge() {
        if (valueBtn === false) {
            sortType = 4;
            mergeClicked();
        }
    }

    function pause() {
        if (valueBtn === true) {
            sortPause();
        }
    }

    const onSorting = async () => {
        var top = document.getElementById("top");
        var control = document.getElementById("control");
        var sort;

        switch (sortType) {
            case 1: {
                sort = document.getElementById("select");
                break;
            }
            case 2: {
                sort = document.getElementById("bubble");
                break;
            }
            case 3: {
                sort = document.getElementById("insert");
                break;
            }
            case 4: {
                sort = document.getElementById("merge");
                break;
            }
        }
        sort.style.color = "black";
        top.style.backgroundColor = "lightgray";
        control.style.backgroundColor = "gray";
        while (valueBtn) {//on Sorting
            await sleep(100);
        }
        sort.style.color = "white";
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
                    <SortButton id="select" onClick={select}>선택정렬</SortButton>
                    <SortButton id="bubble" onClick={bubble}>버블정렬</SortButton>
                    <SortButton id="insert" onClick={insert}>삽입정렬</SortButton>
                    <SortButton id="merge" onClick={merge}>병합정렬</SortButton>
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

