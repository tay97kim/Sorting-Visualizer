/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import Header, { buttonOn, getSpeed, valueClear, plusValue } from "../component/Header";
import Main from './Main';
import Footer from './Footer';

import './App.style.css';

function App() {
  var indexLimit = 100;
  const [size, setSize] = useState(8);
  const [arr, setArr] = useState([]);
  const [sortType, setSort] = useState(0);
  var sortSpeed = 3;
  const [curIdx, setCurIdx] = useState(null);
  const [nexIdx, setNexIdx] = useState(null);
  var mergeHistory = [];
  var mergeTotalIdx = 0;
  var changeHistory = [];
  var changeTotalIdx = 0;
  var countHistory = [];
  var countTotalIdx = 0;

  useEffect(() => {
    updateList();
  }, [size]);

  //useEffect(() => { console.log("arr updated") }, [arr]);

  const sleep = (milliseconds) => { //딜레이 메소드
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const updateList = () => { //새 배열 생성
    var newArray = [];

    while (newArray.length < size) {
      var r = Math.floor(Math.random() * indexLimit) + 1;
      if (newArray.indexOf(r) === -1) newArray.push(r);
    }
    setArr(newArray);
  }

  const setArray = async () => { // 배열 직접 입력
    var toBig = false;
    var input = prompt("배열의 원소를 스페이스로 구분하여 입력해주세요. (ex: 12 3 45 6 7 8)\n- 원소의 최댓값은 100입니다.\n- 중복된 원소값은 정상적으로 동작하지 않을 수 있습니다.");
    if (input == null) {
    } else {
      const newArr = input.split(' ').map(Number);
      setSize(newArr.length);
      updateList();
      await sleep(10);
      for (var i = 0; i < newArr.length; i++) {
        if (newArr[i] > 100) {
          alert("원소의 최댓값 100보다 더 큰 값을 입력하였습니다. 랜덤으로 배열을 생성합니다.");
          toBig = true;
          break;
        }
      }
      if (toBig === false)
        setArr(newArr);
    }
  }

  const rangeChange = () => { // 배열 크기 지정
    const range = prompt("배열의 크기를 입력해주세요 [ 최대 100 ]\n- 30 이상부터는 숫자가 표시되지 않습니다.");
    if (range == null) {
    } else if (range > 100) {
      alert("배열의 최대크기보다 더 높게 입력하였습니다.\n배열의 크기가 100로 설정됩니다.");
      setSize(100);
      updateList();
    }
    else {
      setSize(range);
      updateList();

    }
  };

  const selectClicked = () => {
    setSort(1);
  }

  const bubbleClicked = () => {
    setSort(2);
  }

  const insertClicked = () => {
    setSort(3);
  }

  const mergeClicked = () => {
    setSort(4);
  }

  const selectSort = async () => {
    const inputArr = arr;
    let len = inputArr.length;
    let least;

    for (let i = 0; i < len; i++) {
      setCurIdx(null);
      setNexIdx(null);
      least = i;
      for (let j = i + 1; j < len; j++) {
        setNexIdx(inputArr[j]);
        if (inputArr[j] < inputArr[least]) {
          setNexIdx(null);
          least = j;
        }
        plusValue(1);
        setArr([...arr]);
        setCurIdx(inputArr[least]);
        await sleep(375 / sortSpeed);
      }
      if (i !== least) {//swap
        setNexIdx(inputArr[i]);
        let tmp = inputArr[least];
        inputArr[least] = inputArr[i];
        inputArr[i] = tmp;
        plusValue(2);
        setArr([...arr]);
        await sleep(375 / sortSpeed);
      } else {
        await sleep(375 / sortSpeed);
        //do nothing
      }
    }
    buttonOn();
  }

  const bubbleSort = async () => {
    const inputArr = arr;
    let len = inputArr.length;
    var sorted = len;
    var swapped = false;
    for (let i = 0; i < len; i++) {
      swapped = false;
      for (let j = 0; j < sorted - 1; j++) {
        setCurIdx(inputArr[j]);
        await sleep(375 / sortSpeed);
        if (inputArr[j] > inputArr[j + 1]) {//swap
          setNexIdx(inputArr[j + 1]);
          await sleep(375 / sortSpeed);
          plusValue(1);
          setArr([...arr]);
          let tmp = inputArr[j];
          inputArr[j] = inputArr[j + 1];
          inputArr[j + 1] = tmp;
          plusValue(2);
          setArr([...arr]);
          swapped = true;
        } else {
          plusValue(1);
          setArr([...arr]);
          await sleep(375 / sortSpeed);
        }
        await sleep(375 / sortSpeed);
        setNexIdx(null);
      }
      sorted--;
      setCurIdx(null);
      if (swapped === false)
        break;
    }
    buttonOn();
  }

  const insertionSort = async () => {
    const inputArr = arr;
    let len = inputArr.length;

    for (let i = 0; i < len; i++) {
      setNexIdx(inputArr[i]);
      await sleep(375 / sortSpeed);
      for (let j = i; j > 0; j--) {
        if (inputArr[j] < inputArr[j - 1]) {//swap
          setNexIdx(null);
          setCurIdx(inputArr[j]);
          plusValue(1);
          setArr([...arr]);
          let tmp = inputArr[j];
          inputArr[j] = inputArr[j - 1];
          inputArr[j - 1] = tmp;
          plusValue(2);
          setArr([...arr]);
        } else {
        }
        await sleep(375 / sortSpeed);
      }
      setCurIdx(null);
    }
    setNexIdx(null);
    buttonOn();
  }

  const mergeSort = (receivedArr) => {
    mergeHistory = [];
    mergeTotalIdx = 0;
    recursion(receivedArr);
    mergeTimeLine();
  }

  const recursion = (receivedArr) => {
    setArr([...arr]);
    let recurArr = receivedArr;
    if (recurArr.length <= 1) {
      return recurArr;
    }

    const midIdx = Math.floor(recurArr.length / 2);
    let left = recurArr.slice(0, midIdx);
    let right = recurArr.slice(midIdx);

    let leftArr = recursion(left);
    let rightArr = recursion(right);

    let newArr = domerge(leftArr, rightArr);
    return newArr;
  }

  const domerge = (leftArr, rightArr) => {//대체 배열이 아닌 실제 배열의 인덱스를 서로 교환할 수 있게(반환x)
    plusValue(3);
    setArr([...arr]);
    var left = leftArr.length;
    var right = rightArr.length;
    let least = 0;
    var compArr = [];
    compArr = leftArr.concat(rightArr);

    for (let i = 0; i < (left + right - 1); i++) {//두 배열의 크기만큼 반복하며 실제 배열을 정렬(최솟값 탐색)
      least = i;
      for (let j = (i + 1); j < (left + right); j++) {
        if (compArr[j] < compArr[least]) {
          least = j;
        }
      }
      if (least !== i) {//비교 > swap 함수에서 교환 증가
        addMergeHistory(arr);
        let tmp = compArr[i];
        compArr[i] = compArr[least];
        compArr[least] = tmp;
        addCountHistory([true, false]);

        var comp = [compArr[i], compArr[least]];
        addChangeHistory(comp);
        swapInMerge(compArr[i], compArr[least]);
      } else {//비교만 하는 것
        addMergeHistory(arr);
        addCountHistory([true, false]);
        var comp = [compArr[i], 0];
        addChangeHistory(comp);
      }
    }
    return (compArr);
  }

  const swapInMerge = (leastIdx, swapIdx) => {
    let realIdx1 = 0; //최소값 인덱스
    let realIdx2 = 0; //바꿀 인덱스
    for (let k = 0; k < arr.length; k++) {
      if (arr[k] === leastIdx)
        realIdx1 = k;
      else if (arr[k] === swapIdx)
        realIdx2 = k;
    }
    let tmp = arr[realIdx2];
    arr[realIdx2] = arr[realIdx1];
    arr[realIdx1] = tmp;

    var changed = [arr[realIdx2], arr[realIdx1]];
    addCountHistory([false, true]);
    addChangeHistory(changed);
    addMergeHistory(arr);
  }

  const addChangeHistory = (arr) => {
    changeHistory.push([]);
    for (var i = 0; i < arr.length; i++) {
      changeHistory[changeTotalIdx].push(arr[i]);
    }
    changeTotalIdx++;
  }

  const addMergeHistory = (receivingArr) => {
    mergeHistory.push([]);
    for (var j = 0; j < receivingArr.length; j++) {
      mergeHistory[mergeTotalIdx].push(receivingArr[j]);
    }
    mergeTotalIdx++;
  }

  const addCountHistory = (compNswap) => {
    countHistory.push([]);
    for (var k = 0; k < compNswap.length; k++) {
      countHistory[countTotalIdx].push(compNswap[k]);
    }
    countTotalIdx++;
  }

  const mergeTimeLine = async () => {
    for (let i = 0; i < mergeHistory.length; i++) {
      if (countHistory[i][0] === true)
        plusValue(1);
      if (countHistory[i][1] === true)
        plusValue(2);

      setCurIdx(changeHistory[i][0]);
      setNexIdx(changeHistory[i][1]);
      setArr(mergeHistory[i]);
      await sleep(750 / sortSpeed);
    }
    setCurIdx(null);
    setNexIdx(null);
    buttonOn();
  }

  const sortStart = async () => {
    valueClear();

    var speed = getSpeed();
    if (speed === 1) {
      sortSpeed = speed / 2;
    } else if (speed === 5) {
      sortSpeed = arr.length / 2;
    } else {
      sortSpeed = speed * (arr.length / 5);
    }
    await sleep(100);
    switch (sortType) {
      case 1: {
        selectSort();
        break;
      }
      case 2: {
        bubbleSort();
        break;
      }
      case 3: {
        insertionSort();
        break;
      }
      case 4: {
        mergeSort(arr);
        break;
      }
      default:
      //do nothing
    }
  }

  function sortPause() {
    alert("정렬이 일시정지 되었습니다. 계속 진행하시려면 확인을 누르세요.");
  }

  return (
    <div className="App">
      <Header setArray={setArray}
        updateList={updateList}
        rangeChange={rangeChange}
        selectClicked={selectClicked}
        bubbleClicked={bubbleClicked}
        insertClicked={insertClicked}
        mergeClicked={mergeClicked}
        sortStart={sortStart}
        sortPause={sortPause}></Header>
      <Main data={arr} currentIdx={curIdx} nextIdx={nexIdx} />
      <Footer />
    </div>
  );
}

export default App;
