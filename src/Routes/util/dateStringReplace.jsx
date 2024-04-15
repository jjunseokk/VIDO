import React from 'react';

const dateStringReplace = (date) => {
  let dateArr = date.slice(0, 10).split('');

  const deleteMonth = (arr) => {
    console.log(arr);
    let month = [parseInt(arr[5]), parseInt(arr[6])];
    let replaceMonth = [];
    if (month[0] === 1 && (month[1] === 1 || 2)) {
      replaceMonth = [0, month[1]];
    } else if (month[1] >= 8) {
      replaceMonth = [1, month[1] - 8];
    } else {
      replaceMonth = [0, month[1] + 2];
      console.log(replaceMonth[1]);
    }
    let newArr = arr;
    newArr[5] = replaceMonth[0];
    newArr[6] = replaceMonth[1];
    console.log(replaceMonth);
    return newArr;
  };
  dateArr = deleteMonth(dateArr).join('');
  return dateArr;
};

export default dateStringReplace;
