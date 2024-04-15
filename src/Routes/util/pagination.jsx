export const pagination = (arr, setList, setWholePage, num = 10) => {
  const pageArr = [];
  for (let i = 0; i < arr.length; i += num) {
    pageArr.push(arr.slice(i, i + num));
  }
  setList(pageArr);
  setWholePage(pageArr.length);
};
