const returnTime = (time) => {
  const sec = parseInt(time);
  if (sec < 60) {
    return ['00', '00', sec < 10 ? `0${sec}` : `${sec}`];
  } else if (sec < 3600) {
    return [
      '00',
      sec / 60 < 10 ? `0${parseInt(sec / 60)}` : `${parseInt(sec / 60)}`,
      sec % 60 < 10 ? `0${parseInt(sec % 60)}` : parseInt(sec % 60),
    ];
  } else {
    return [
      sec / 3600 < 10 ? `0${parseInt(sec / 3600)}` : parseInt(sec / 3600),
      parseInt(sec % 3600) / 60 < 10
        ? `0${parseInt((sec % 3600) / 60)}`
        : parseInt((sec % 3600) / 60),
      sec % 60 < 10 ? `0${parseInt(sec % 60)}` : parseInt(sec % 60),
    ];
  }
};
export default returnTime;
