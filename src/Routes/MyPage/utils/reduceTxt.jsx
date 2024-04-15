export const reduceTxt = (str, length, winWidth) => {
  if (winWidth > 1600) {
    return str.slice(0, length - 2) + '...';
  }
};
