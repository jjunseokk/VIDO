const sortDate = (data, str) => {
  data.sort(function (a, b) {
    a = a.createdDatetime.slice(0, 10).split(str).reverse().join('');
    b = b.createdDatetime.slice(0, 10).split(str).reverse().join('');
    return a > b ? 1 : a < b ? -1 : 0;
    // return a.localeCompare(b);         // <-- alternative
  });
  return data;
};

export default sortDate;
