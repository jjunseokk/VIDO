const countByte = (str) => {
  let totalByte = 0;
  for (let i = 0; i < str.length - 1; i++) {
    const char = str.charAt(i);
    const uniChar = escape(char);
    if (uniChar.length > 4) {
      totalByte += 2;
    } else {
      totalByte += 1;
    }
  }
  return totalByte;
};

export default countByte;
